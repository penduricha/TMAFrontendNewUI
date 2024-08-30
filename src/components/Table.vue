<script>
import users from '@/dataset/users.json';
import userService from "@/services/UserService.js";
export default {
  name:"Table",
  components:{

  },
  beforeCreate() {

  },
  created() {
    //this.getDataUsers();
    this.fetchDataUsers();
  },
  beforeMount() {

  },
  mounted() {

  },
  updated() {

  },
  beforeUpdate() {

  },
  data(){
    return{
      users: null,
      //usersFromAPI: null,
    }
  },
  methods:{
    /*
     "name": "Leanne Graham",
     "username": "Bret",
     "email": "Sincere@april.biz",
     "phone": "1-700-736-8031 x56442",
     "company": "Romaguera-Crona",
     "website": "hildegard.org"
      */
    // getDataUsers(){
    //   this.users=users.map(item => ({
    //     name: item.name,
    //     username: item.username,
    //     email: item.email,
    //     phone: item.phone,
    //     company: item.company,
    //     website: item.website
    //   }));
    //   console.log('List data users: ',this.users);
    //   return this.users;
    // },
    async fetchDataUsers(){
      await userService.getUsers().then(response => {
        this.users = response.data;
        console.log('List user from API: ',this.users);
      }).catch(error => {
        console.error(error);
      });
    }
  }
}
</script>

<template>
  <table class="table table-striped table-bordered">
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Company</th>
        <th>Website</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users">
        <td>{{user.name}}</td>
        <td>{{user.username}}</td>
        <td>{{user.email}}</td>
        <td>{{user.phone}}</td>
        <td>{{user.company}}</td>
        <td>{{user.website}}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>