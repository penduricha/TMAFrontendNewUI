<script>
import ButtonSearch from "@/services/ButtonSearch.js";
import buttonSearch from "@/services/ButtonSearch.js";
export default {
  name:"Table",
  components:{

  },
  beforeCreate() {

  },
  created() {
    this.getButtonSearch_KeyWordMuch_TimeLasted();
    this.getButtonSearch();
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
      buttonSearch: [],
    }
  },
  methods:{
    async getButtonSearch_KeyWordMuch_TimeLasted(){
      let buttonSearch=null;
      await ButtonSearch.getButtonSearch_KeyWordMuch_TimeLasted().then(async response => {
        buttonSearch=response.data;
        console.log('Number button searches: ', this.buttonSearch);
      }).catch(error => {
        console.error(error);
      });
      return buttonSearch
    },
    async getButtonSearch(){
      this.buttonSearch=await this.getButtonSearch_KeyWordMuch_TimeLasted();
    }
  }
}
</script>
<!--      <tr v-for="user in users">-->
<!--        <td>{{user.name}}</td>-->
<!--        <td>{{user.username}}</td>-->
<!--        <td>{{user.email}}</td>-->
<!--        <td>{{user.phone}}</td>-->
<!--        <td>{{user.company}}</td>-->
<!--        <td>{{user.website}}</td>-->
<!--      </tr>-->
<template>
  <table class="table table-striped table-bordered">
    <thead>
      <tr>
        <th>Index</th>
        <th>Key word</th>
        <th>Email</th>
        <th>Time search lasted</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(b, index) in buttonSearch" :key="b.id">
        <td>{{ index + 1 }}</td> <!-- Thêm chỉ số tăng dần -->
        <td>{{ b.key_word }}</td>
        <td>{{ b.email }}</td>
        <td>{{ new Date(b.date_click) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
/* Setting column widths */
th:nth-child(1), td:nth-child(1) {
  width: 5%; /* 1 part */
}
th:nth-child(2), td:nth-child(2) {
  width: 20%; /* 4 parts */
}
th:nth-child(3), td:nth-child(3) {
  width: 20%; /* 4 parts */
}
th:nth-child(4), td:nth-child(4) {
  width: 40%; /* 4 parts */
}
</style>