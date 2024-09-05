<!-- Main.vue -->
<template>
  <div class="container">
    <Header :emailmain="emailMain"/>
    <!-- tham so truyen bang props-->
    <main class="main" :emailMain="emailMain">
      <div class="flex-item flex-item-1">
        <p style="font-size: 20px; font-weight: bold; color: #8F8F8F;">Dashboard</p>
        <p style="font-size: 20px; font-weight: bold; color: #8F8F8F; margin-left: 500px">Hello: {{name}}</p>
      </div>
      <div class="flex-item flex-item-2">
        <div class="flex-item flex-item-2 flex-item-2-1" style="display: flex;">
          <div style="margin-top: 7px; margin-left: 30px">
            <img :src="hospital.image"
                 alt="Image hospital"
                 style="width: 60px; height: 60px"/>
          </div>
          <div style="margin-left: 20px">
            <p style="color: white; font-size: 12px; margin-bottom: 0">
              {{Math.round(rateRegister*100)/100}}% {{compareStatementRegister}}
            </p>
            <p style="color: white; font-size: 25px; margin-top: 0; margin-bottom: 0">
              {{numberRegisterToday}} Registers today.
            </p>
            <p style="color: white; font-size: 12px; margin-bottom: 0">
              Today's visits
            </p>
          </div>
        </div>
        <div class="flex-item flex-item-2 flex-item-2-2" style="display: flex;">
          <div style="margin-top: 7px; margin-left: 30px">
            <img :src="finance.image"
                 alt="Image finance"
                 style="width: 45px; height: 60px"/>
          </div>
          <div style="margin-left: 20px">
            <p style="color: white; font-size: 12px; margin-bottom: 0">
              {{Math.round(rateLogin*100)/100}}% {{compareStatementLogin}}
            </p>
            <p style="color: white; font-size: 25px; margin-top: 0; margin-bottom: 0">
              {{numberLoginToday}} Logins today
            </p>
            <p style="color: white; font-size: 12px; margin-bottom: 0">
              Today's visits
            </p>
          </div>
        </div>
        <div class="flex-item flex-item-2 flex-item-2-3" style="display: flex;">
          <div style="margin-top: 7px; margin-left: 30px">
            <img :src="device.image"
                 alt="Image device"
                 style="width: 80px; height: 60px"/>
          </div>
          <div style="margin-left: 20px">
            <p style="color: white; font-size: 12px; margin-bottom: 0">
              {{ device.rate}}
            </p>
            <p style="color: white; font-size: 25px; margin-top: 0; margin-bottom: 0">
              {{device.number*100}}%
            </p>
            <p style="color: white; font-size: 12px; margin-bottom: 0">
              Today's visits
            </p>
          </div>
        </div>

      </div>
      <div class="flex-item flex-item-3">
        <div class="flex-item flex-item-3 flex-item-3-1">
          <LineChartRegisters/>
        </div>
        <div class="flex-item flex-item-3 flex-item-3-2">
          <DonutChartExample/>
        </div>
        <div class="flex-item flex-item-3 flex-item-3-3">
          <LineChartLogins/>
        </div>
      </div>
      <div class="flex-item flex-item-4">
        <div class="flex-item flex-item-3 flex-item-4-1">
          <Table/>
        </div>
        <div class="flex-item flex-item-3 flex-item-4-2">
          <TimeLine/>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'

import DonutChartExample from "@/chart/DonutChartExample.vue";
import AreaChartExample from "@/chart/AreaChartExample.vue";
import Table from "@/components/Table.vue";
import TimeLine from "@/components/TimeLine.vue";
import ProfileService from "@/services/ProfileService.js";
import LineChartRegisters from "@/chart-statistic/LineChartRegisters.vue";
import LineChartLogins from "@/chart-statistic/LineChartLogins.vue";
import RegisterService from "@/services/RegisterService.js";
import LoginService from "@/services/LoginService.js";

export default {
  name: 'Main',
  components: {
    LineChartLogins,
    DonutChartExample,
    Header,
    LineChartRegisters,
    AreaChartExample,
    Table,
    TimeLine,
  },
  created(){
    this.getNameProfileFetchByEmail();
    //
    this.countRegistersToday();
    this.countRegistersInLast3Days();
    this.getNumberRegisterToday();

    this.countLoginToday();
    this.countLoginYesterday();
    this.getNumberLoginToday();
  },
  mounted() {
    //get
    this.getRateRegisterToday();
    this.getRateLoginToday();
  },
  beforeMount() {

  },
  props: {
    emailMain: {
      type: String,
      required: true
    }
  },
  data(){
    return{
      hospital: {
        rate: '13% higher yesterday',
        number: 1287687,
        status:"Today's visits",
        image: new URL('@/imageDashBoard/hospitalimage.png',import.meta.url).href,
      },
      finance:{
        rate: '$117,212 before tax',
        number: 141291,
        status:"Today's sales",
        image: new URL('@/imageDashBoard/financeimage.png',import.meta.url).href,
      },
      device:{
        rate: '13% average duration',
        number: 0.3345,
        status:'% Unique visits',
        image: new URL('@/imageDashBoard/deviceimage.png',import.meta.url).href,
      },
      time:{
        rate: '17.25% on average time',
        number: 13,
        status:'Bounce Rate',
        image: new URL('@/imageDashBoard/timeimage.png',import.meta.url).href,
      },

      //profile: null,
      name:null,
      email:this.emailMain,

      //statistic
      //register
      numberRegisterToday: null,
      rateRegister: null,
      compareStatementRegister: null,

      //login
      numberLoginToday: null,
      rateLogin: null,
      compareStatementLogin: null,

    }
  },
  methods:{
    getEmailMain(){
      //this.email=this.emailMain;
      console.log('Email: ',this.email);
      return this.emailMain;
    },

    async countRegistersToday(){
      let number=null;
      await RegisterService.countRegistersToday().then(async response => {
         number= response.data;
        console.log('Number registers today: ', number);
      }).catch(error => {
        console.error(error);
      });
      return number;
    },

    async getNumberRegisterToday(){
      this.numberRegisterToday=await this.countRegistersToday();
    },

    async getRateRegisterToday(){

      let registersInLast3Days=await this.countRegistersInLast3Days();

      if(registersInLast3Days===0 || this.numberRegisterToday===0){
        this.rateRegister=0;
        this.compareStatementRegister='There are no register in today or in 3 days last.';
      }

      if(registersInLast3Days > this.numberRegisterToday){
        this.rateRegister = 100-(this.numberRegisterToday/registersInLast3Days)*100;
        this.compareStatementRegister='lower than 3 days lasted.';
      }

      if(registersInLast3Days < this.numberRegisterToday){
        this.rateRegister = 100-(registersInLast3Days/this.numberRegisterToday)*100;
        this.compareStatementRegister='higher than 3 days lasted.';
      }

      if(registersInLast3Days === this.numberRegisterToday){
        this.rateRegister=0;
        this.compareStatementRegister='same 3 days lasted.';
      }
    },

    async countRegistersInLast3Days(){
      let number=null;
      await RegisterService.countRegistersInLast3Days().then(response => {
        number= response.data;
        console.log('Number registers 3 day lasted: ',number);
      }).catch(error => {
        console.error(error);
      });
      return number;
    },

    async getNameProfileFetchByEmail(){
      let profileGet=null;
      await ProfileService.getProfileByEmail(this.getEmailMain()).then(response => {
        profileGet= response.data;
        console.log('Your profile: ',profileGet);
      }).catch(error => {
        console.error(error);
      });
      this.name= await profileGet.name;
    },

    async countLoginToday(){
      let number=null;
      await LoginService.countLoginToday().then(response => {
        number= response.data;
        console.log('Number logins today: ',number);
      }).catch(error => {
        console.error(error);
      });
      return number;
    },

    async getNumberLoginToday(){
      this.numberLoginToday=await this.countLoginToday();
    },

    async countLoginYesterday(){
      let number=null;
      await LoginService.countLoginYesterday().then(response => {
        number= response.data;
        console.log('Number logins yesterday: ',number);
      }).catch(error => {
        console.error(error);
      });
      return number;
    },

    async getRateLoginToday(){

      let loginYesterday=await this.countLoginYesterday();

      if(loginYesterday===0 || this.numberLoginToday===0){
        this.rateLogin=0;
        this.compareStatementLogin='There are no login in today or in yesterday.'
      }

      if(loginYesterday > this.numberLoginToday){
        this.rateLogin=100-(this.numberLoginToday/loginYesterday)*100;
        this.compareStatementLogin='lower than yesterday';
      }

      if(loginYesterday < this.numberLoginToday){
        this.rateLogin=100-(loginYesterday/this.numberLoginToday)*100;
        this.compareStatementLogin='higher than yesterday';
      }

      if(loginYesterday === this.numberLoginToday){
        this.rateLogin=0;
        this.compareStatementLogin='same yesterday';
      }
    }

  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 820px;
  width: 2280px;
  margin-top: -20px;
  padding: 0;
  margin-left: -25px;
}
.main {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 1700px;
}


.flex-item {
  background-color: white;

}

.flex-item-1 {
  flex:1;
  display: flex;
}

.flex-item-2 {
  flex:1.5;
  display: flex;
  flex-direction: row;
  height: 80%;
}
.flex-item-2-1{
  flex:1;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-right: 5px;
  background-color: #08b49b;
  height: 90%;
}
.flex-item-2-2{
  flex:1;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-right: 5px;
  background-color: #d53c4c;
  height: 90%;
}
.flex-item-2-3{
  flex:1;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-right: 5px;
  background-color: #1769bf;
  height: 90%;
}


.flex-item-3 {
  flex:4;
  display: flex;
  flex-direction: row;
}
.flex-item-3-1{
  flex:1;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-right: 5px;
}
.flex-item-3-2{
  flex:1;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-right: 5px;
}
.flex-item-3-3{
  flex:1;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.flex-item-4 {
  flex:6;
  display: flex;
  margin-top: 20px;

}
.flex-item-4-1{
  flex:2;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-right: 8px;
}
.flex-item-4-2{
  flex:1;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>