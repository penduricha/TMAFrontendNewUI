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
              {{ hospital.rate}}
            </p>
            <p style="color: white; font-size: 25px; margin-top: 0; margin-bottom: 0">
              {{
                hospital.number = hospital.number.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}}
            </p>
            <p style="color: white; font-size: 12px; margin-bottom: 0">
              {{ hospital.status}}
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
              {{ finance.rate}}
            </p>
            <p style="color: white; font-size: 25px; margin-top: 0; margin-bottom: 0">
              ${{
                finance.number = finance.number.toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}}
            </p>
            <p style="color: white; font-size: 12px; margin-bottom: 0">
              {{ finance.status}}
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
              {{ device.status}}
            </p>
          </div>
        </div>
        <div class="flex-item flex-item-2 flex-item-2-4" style="display: flex;">
          <div style="margin-top: 7px; margin-left: 30px">
            <img :src="time.image"
                 alt="Image time"
                 style="width: 60px; height: 60px"/>
          </div>
          <div style="margin-left: 20px">
            <p style="color: white; font-size: 12px; margin-bottom: 0">
              {{ time.rate}}
            </p>
            <p style="color: white; font-size: 25px; margin-top: 0; margin-bottom: 0">
              {{time.number.toFixed(2)}}%
            </p>
            <p style="color: white; font-size: 12px; margin-bottom: 0">
              {{time.status}}
            </p>
          </div>
        </div>
      </div>
      <div class="flex-item flex-item-3">
        <div class="flex-item flex-item-3 flex-item-3-1">
          <LineChartExample/>
        </div>
        <div class="flex-item flex-item-3 flex-item-3-2">
          <DonutChartExample/>
        </div>
        <div class="flex-item flex-item-3 flex-item-3-3">
          <AreaChartExample/>
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
import LineChartExample from "@/chart/LineChartExample.vue";
import DonutChartExample from "@/chart/DonutChartExample.vue";
import AreaChartExample from "@/chart/AreaChartExample.vue";
import Table from "@/components/Table.vue";
import TimeLine from "@/components/TimeLine.vue";
import ProfileService from "@/services/ProfileService.js";

export default {
  name: 'Main',
  components: {
    DonutChartExample,
    Header,
    LineChartExample,
    AreaChartExample,
    Table,
    TimeLine,
  },
  created(){
    this.getNameProfileFetchByEmail();
    //this.getListRouters();
  },
  mounted() {
    //this.setupReloadListener();
    //this.updateRouters();
  },
  beforeUnmount() {
    //this.removeReloadListener();
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
    }
  },
  methods:{
    getEmailMain(){
      //this.email=this.emailMain;
      console.log('Email: ',this.email);
      return this.emailMain;
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
.flex-item-2-4{
  flex:1;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: #1e2c3b;
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