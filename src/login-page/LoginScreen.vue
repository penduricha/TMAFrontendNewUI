<script>
import ProfileService from "@/services/ProfileService.js";
import LoginService from "@/services/LoginService.js";

export default{
  name:'LoginScreen',

  data(){
    return {
      email:null,
      password:null,
      loginErrorMessage:null,
      showPassword: false,
      passwordFieldType: 'password',
    }
  },
  created(){
    //this.fetchProfileByEmail(email);
  },
  mounted(){

  },
  methods:{
     async getEmailFetchProfileByEmail(email){
      let profileCheck=null;
      await ProfileService.getProfileByEmail(email).then(response => {
        profileCheck = response.data;
        //console.log('Profile check from API: ',profileCheck);
      }).catch(error => {
        console.error(error);
      });
      return profileCheck;
    },
    validateFieldLogin(){
      if(!this.email||!this.password){
        this.loginErrorMessage="Vui lòng nhập email và mật khẩu.";
        return false;
      }else{
        this.loginErrorMessage="";
        return true;
      }
    },
    async updateAccess(email, profile){
       const updateProfile = {
         //nho +1 nha ong gia
         id: profile.id,
         email: profile.email,
         password: profile.password,
         phoneNumber: profile.phoneNumber,
         name: profile.name,
         address: profile.address,
         gender: profile.gender,
         access: true,
       };
      //console.log(newProfile);
      try {
        await ProfileService.updateProfile(email,updateProfile)
        console.log('Update status successfully.');
      } catch (error) {
        console.error('Error:', error)
      }
    },
    getDateNow(){
      return new Date();
    },
    async postLogin(){
       const newLogin= {
         //nho +1 nha ong gia
         email: this.email.trim(),
         //nhan 7 vi VN o GMT +7
         date_login: new Date(this.getDateNow().getTime() + 7 *60 *60 * 1000).toISOString().split('.')[0]
       };
      try {
        await LoginService.createLogin(newLogin);
        console.log('Thêm thông tin đăng nhập thành công');
      } catch (error) {
        console.error('Error creating :', error);
      }
    },
    async checkAndLogin() {
      async function sha512(password) {
        let buf = await crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(password));
        return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
      }
      if (this.validateFieldLogin()) {
        //console.log(this.getEmailFetchProfileByEmail(this.email.trim()));
        let profileCheck= await this.getEmailFetchProfileByEmail(this.email.trim());
        if(!profileCheck ||
            (profileCheck.password.trim()!==await sha512(this.password.trim()))){
          this.loginErrorMessage = "Email hoặc mật khẩu không đúng.";
          profileCheck=null;
        }else {
            this.loginErrorMessage = "";
            // code để chuyển hướng đến trang chính
            alert("Đăng nhập thành công");
            await this.updateAccess(this.email.trim(),profileCheck);
            //localstorage
            localStorage.setItem('email', this.email.trim());
            await this.postLogin();
            this.$router.replace({
              path: '/main',
              query: {
                emailMain: this.email.trim()
              }
            }).catch((error) => {
              console.error('Error navigating :', error);
            });
        }
      }
    },
    preventPaste(event) {
      event.preventDefault();
    }
  },
  watch: {
    showPassword(newValue) {
      this.passwordFieldType = newValue ? 'text' : 'password';
    }
  }
}
</script>
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Đăng nhập</h3>
            <form>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email"
                       class="form-control"
                       id="email"
                       placeholder="Nhập email"
                       v-model="email"
                       maxlength="40"
                >
              </div>
              <div class="form-group">
                <label for="password">Mật khẩu</label>
                <input :type="passwordFieldType"
                       class="form-control"
                       id="password"
                       placeholder="Nhập mật khẩu"
                       v-model="password"
                       maxlength="40"
                       @paste="preventPaste($event)"
                >
              </div>
              <span style="color: red">{{
                  loginErrorMessage
              }}</span>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="showPassword" v-model="showPassword">
                <label class="form-check-label" for="showPassword">Hiện mật khẩu</label>
              </div>
            </form>
            <div class="text-center">
              <button type="submit" class="btn btn-primary" @click="checkAndLogin">Đăng nhập</button>
              <router-link to="/signUpScreen" class="btn btn-link">Đăng ký tài khoản</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.container {
  display: flex;
  flex-direction: column;
  height: 820px;
  width: 2280px;
  margin-top: -20px;
  padding: 0;
  margin-left: 10px;
}
.card {
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin-left: 100px;
  width: 500px;
  margin-top: 200px;
}

.btn-link {
  color: #007bff;
  text-decoration: none;
}

.btn-link:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>