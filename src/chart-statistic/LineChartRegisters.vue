<script>
import { Chart } from 'chart.js/auto';
import RegisterService from "@/services/RegisterService.js";
export default {
  name: 'LineChartRegisters',
  data(){
    return{

    }
  },
  created(){
    this.getListRegisters();
  },
  mounted() {
    this.createChart();
    this.getRegistersGroupByDateSignup();
    // this.getGroupByRegistersByDate();
  },
  methods:{
    async getListRegisters(){
      let registers=null;
      await RegisterService.getRegisters_SevenDayToNow().then(response => {
        registers= response.data;
        //console.log('Registers: ',registers);
      }).catch(error => {
        console.error(error);
      });
      return registers;
    },

    async getRegistersGroupByDateSignup(){
      let registersGroupBy=null;
      await RegisterService.getRegistersGroupByDateRegister().then(response => {
        registersGroupBy= response.data;
        console.log('Registers Group by: ',registersGroupBy);
      }).catch(error => {
        console.error(error);
      });
      return registersGroupBy;
    },

    async createChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      let registersGroupBy = await this.getRegistersGroupByDateSignup();
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: registersGroupBy.map(item => item.date_signup),
          datasets: [
            {
              label: 'Number of Registers',
              data: registersGroupBy.map(item => item.email_count),
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
              text: 'Line Chart Statistic Registers'
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
    },
  }
}
</script>

<template>
  <div>
    <canvas ref="chartCanvas" style="width: 100%; height: 100%; "/>
  </div>
</template>
