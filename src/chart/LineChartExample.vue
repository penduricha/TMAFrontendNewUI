<template>
  <div>
    <canvas ref="chartCanvas" style="width: 100%; height: 100%; "/>
  </div>
</template>

<script>
import { Chart } from 'chart.js/auto';
import timeSiteViews from '@/dataset/timeSiteViews.json';
export default {
  name: 'LineChartExample',
  data(){
    return{
      timeSiteViews:[],
    }
  },
  mounted() {
    this.createChart();
    this.getDataTimeSiteViews();
  },
  methods: {
    getDataTimeSiteViews(){
      this.timeSiteViews=timeSiteViews.map(item => ({
        time: item.time,
        siteViews: item.siteViews,
      }));
      console.log(this.timeSiteViews);
      console.log('List time:', this.timeSiteViews.map(item => item.time))
      console.log('List site Views:', this.timeSiteViews.map(item => item.siteViews))
      return this.timeSiteViews;
    },
    createChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d')
      new Chart(ctx, {
        type: 'line',
        data: {
          labels:this.getDataTimeSiteViews().map(item => item.time),
          datasets: [
            {
              label: 'Time',
              data: this.getDataTimeSiteViews().map(item => item.siteViews),
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
              text: 'Line Chart'
            }
          },
          //cai dat truc toa do
          scales: {
            y: {
              min: 0,
              max: 1000,
              ticks: {
                stepSize: 500
              }
            }
          }
        }
      })
    }
  }
}
</script>