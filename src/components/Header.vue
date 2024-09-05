<!-- Header.vue -->
<template>
  <header class="header">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-lg-4 col-md-4 col-sm-6" style="display: flex;">
          <div class="d-flex align-items-center">
            <img src="@/assets/logo.svg" alt="Vue.js Favicon" class="favicon">
            <p class="mb-0 ml-3 font-weight-bold"
               style="margin-left: 20px;
              margin-top: 15px;
              font-weight: bold;
              font-size:18px;
              color:white">Vue Admin Template</p>
          <!--            Vue Admin Template-->
          </div>
          <img src="@/assets/menuBarIconOutput.png"
               alt="Menu Bar"
               class="menu-bar-icon"
               @click="toggleSidebar"
          >
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6" >
          <div style="display: flex;">
            <input type="text"
                   v-model="searchText"
                   placeholder="Search"
                   maxlength="30"
                   class="form-control"
                   style="
                        margin-left:-100px;
                        color:black;
                        width: 100%;
                        height: 40px;
                        margin-top: 10px;
                        border-radius: 1px;
                        background-color:#989CAC;
                        border-color: #949CAC;">
            <div style="height: 40px; margin-top: 10px;background-color: #949CAC;">
              <img src="@/assets/magnifyingGlassIcon.png" alt="Glass" class="glass-icon" @click="handleClickSearch()">
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6" style="text-align: right;">
          <img src="@/assets/message.png" alt="Github avatar" class="message-icon">
          <img src="@/assets/githubImage.png" alt="Github avatar" class="github-icon">
          <img src="@/assets/man.png" alt="Man avatar" class="avatar-man">
        </div>
      </div>
    </div>
  </header>
  <div class="sidebar-overlay" :class="{ open: showSidebar }" @click="toggleSidebar">
    <ModalConfirmLogout ref="logoutModal" @handleLogout="handleLogout()" />
  </div>
  <div class="sidebar" :class="{ open: showSidebar }">
    <ul class="sidebar-menu">
      <li class="sidebar-menu-item" v-for="item in menuItems" :key="item.title">
        <div style="
          width: 150%;
          display: flex;
        ">
          <img :src="item.src"
               alt="imageMenu"
               :style="item.style"/>
          <a style="color: black; margin-left: 15px;" :href="item.href"
             @click.prevent="handleClick(item)"
          >{{ item.title }}</a>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>
import ProfileService from "@/services/ProfileService.js";
import ModalConfirmLogout from "@/components/ModalConfirmLogout.vue";
import ButtonSearch from "@/services/ButtonSearch.js";

export default {
  name: 'Header',
  components:{
    ModalConfirmLogout

  },
  props: ['emailmain'],
  created(){
    //this.getEmailMainFromMainPage();
    //this.getEmail();
  },
  mounted() {
    //this.getEmail();
  },
  data() {
    return {
      searchText: '',
      emailMain:null,
      showSidebar: false,
      menuItems: [
        {
          title: 'Dashboard',
          src: new URL('@/logo-menu/dashboardMenu.png',import.meta.url).href,
          style:'width: 20px; height: 20px; margin-top: 12px',
          href:''
        },
        {
          title: 'Mailbox',
          src: new URL('@/logo-menu/mailBoxMenu.png',import.meta.url).href,
          style:'width: 20px; height: 20px; margin-top: 12px',
          href:null,
        },
        {
          title: 'Calendar',
          src: new URL('@/logo-menu/calendarMenu.png',import.meta.url).href,
          style:'width: 20px; height: 20px; margin-top: 12px',
          href:null,
        },
        {
          title: 'Pages',
          src: new URL('@/logo-menu/pagesMenu.png',import.meta.url).href,
          style:'width: 20px; height: 15px; margin-top: 15px',
          href:null,
        },
        {
          title: 'Authorization',
          src: new URL('@/logo-menu/authorizationMenu.png',import.meta.url).href,
          style:'width: 20px; height: 20px; margin-top: 12px',
          href:null,
        },
        {
          title: 'Users',
          src: new URL('@/logo-menu/userMenu.png',import.meta.url).href,
          style:'width: 20px; height: 20px; margin-top: 12px',
          href:null,
        },
        {
          title: 'Log out',
          src: new URL('@/logo-menu/logouticon.png',import.meta.url).href,
          style:'width: 20px; height: 20px; margin-top: 12px',
          href:null,
        },
      ],
    }
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    async updateAccess(email, profile){
      const updateProfile = {
        id: profile.id,
        email: profile.email,
        password: profile.password,
        phoneNumber: profile.phoneNumber,
        name: profile.name,
        address: profile.address,
        gender: profile.gender,
        access: false,
      };
      //console.log(newProfile);
      try {
        await ProfileService.updateProfile(email,updateProfile)
        console.log('Update status access successfully.');
      } catch (error) {
        console.error('Error:', error)
      }
    },
    async getProfileFetchByEmail(email){
      let profileGet=null;
      await ProfileService.getProfileByEmail(email).then(response => {
        profileGet= response.data;
        //console.log('Your profile: ',profileGet);
      }).catch(error => {
        console.error(error);
      });
      return profileGet;
    },
    async handleLogout(){
      let profileGet = await this.getProfileFetchByEmail(this.emailmain);
      await this.updateAccess(this.emailmain.trim(),profileGet);
      alert('Đăng xuất thành công.');
      this.$router.replace({path: '/loginScreen'}).catch((error) => {
        console.error('Error navigating :', error);
      });
    },
    async handleClick(item) {
      if (item.title === 'Log out') {
        //await this.handleLogout();
        this.$refs.logoutModal.openModal();
      }
    },
    getDateNow(){
      return new Date();
    },
    async postButtonClick(){
      const newButtonClick= {
        //nho +1 nha ong gia
        email: this.emailmain.trim(),
        //nhan 7 vi VN o GMT +7
        date_click: new Date(this.getDateNow().getTime() + 7 *60 *60 * 1000).toISOString().split('.')[0],
        key_word: this.searchText,
      };
      try {
        await ButtonSearch.createButtonSearch(newButtonClick);
        console.log('Thêm thông tin thành công');
      } catch (error) {
        console.error('Error creating :', error);
      }
    },
    async handleClickSearch() {
      console.log('Search is clicked.');
      await this.postButtonClick();
    }
  }
}
</script>

<style scoped>
.header {
  flex: 0 0 8vh;
  background-color: #2E3A49;
  color: #fff;
  width: 1700px;
}

.favicon {
  width: 32px; /* Điều chỉnh kích thước tùy ý */
  height: 32px;
  margin-top: 15px;
}
.avatar-man{
  width: 55px; /* Điều chỉnh kích thước tùy ý */
  height: 35px;
  margin-top: 12px;
}
.github-icon{
  width: 30px; /* Điều chỉnh kích thước tùy ý */
  height: 30px;
  margin-top: 12px;
}
.message-icon{
  width: 30px; /* Điều chỉnh kích thước tùy ý */
  height: 30px;
  margin-top: 18px;
  margin-right: 10px;
}
::placeholder{
  color: #CFD2D8;
}
.glass-icon{
  width: 25px; /* Điều chỉnh kích thước tùy ý */
  height: 25px;
  margin-top: 7px;
  background-color: #949CAC;
  border-color: black;
  margin-right: 10px;
}
.menu-bar-icon{
  width: 30px; /* Điều chỉnh kích thước tùy ý */
  height: 30px;
  margin-top: 15px;
  margin-left: 200px;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: white;
  color: black;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-100%);
  z-index: 1000;

  &.open {
    transform: translateX(0);
  }

  .sidebar-menu {
    list-style: none;
    padding: 1rem;
    margin: 0;
    .sidebar-menu-item {
      a {
        display: block;
        padding: 0.5rem 1rem;
        width: 60%;
        color: #fff;
        text-decoration: none;
        transition: background-color 0.3s;
      }
    }
  }
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;

  &.open {
    display: block;
  }
}

</style>
