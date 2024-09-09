<script>
import { Chart } from 'chart.js/auto';
import LoginService from "@/services/LoginService.js";
import RegisterService from "@/services/RegisterService.js";
export default {
  name:'LineChartLogins',
  data(){
    return{

    }
  },
  created(){

  },
  mounted() {
    this.createChart();
    this.getLoginsGroupByDateLogin();
    // this.getGroupByRegistersByDate();
  },
  methods:{
    async getLoginsGroupByDateLogin(){
      let loginsGroupBy=null;
      await LoginService.getLoginsGroupByDateLogin().then(response => {
        loginsGroupBy= response.data;
        console.log('Logins Group by: ',loginsGroupBy);
      }).catch(error => {
        console.error(error);
      });
      return loginsGroupBy;
    },
    async createChart(){
      const ctx = this.$refs.chartCanvas.getContext('2d');
      let loginsGroupBy = await this.getLoginsGroupByDateLogin();
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: loginsGroupBy.map(item => item.date_login),
          datasets: [
            {
              label: 'Number of Logins',
              data: loginsGroupBy.map(item => item.email_count),
              fill: false,
              borderColor: '#617cac',
              tension: 0.2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Line Chart Statistic Logins'
            }
          },
          //cai dat truc toa do
          scales: {
            y: {
              min: 0,
              max: 15,
              ticks: {
                stepSize: 5
              }
            }
          }
        }
      })
    }

  }
}
</script>

<template>
  <div>
    <canvas ref="chartCanvas" style="width: 100%; height: 100%; "/>
  </div>
</template>

<style scoped>

</style>