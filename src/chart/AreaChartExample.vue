<template>
<!--  <div>-->
<!--    <canvas id="area-chart" style="width: 450px;height:50px;"/>-->
<!--  </div>-->
</template>

<script>
import { Chart} from 'chart.js/auto';
// import earningService from "@/services/EarningService.js";
//
// export default {
//   name: 'AreaChartExample',
//   data(){
//     return{
//       earningsFromAPI:[],
//     }
//   },
//   mounted() {
//     //this.renderAreaChart();
//
//   },
//   created(){
//     this.fetchDataEarnings();
//   },
//   methods: {
//     async fetchDataEarnings(){
//       await earningService.getEarnings().then(response => {
//         this.earningsFromAPI= response.data;
//         console.log('List earnings from API: ',this.earningsFromAPI);
//       }).catch(error => {
//         console.error(error);
//       });
//       this.renderAreaChart();
//     },
//     renderAreaChart() {
//       const ctx = document.getElementById('area-chart').getContext('2d');
//       new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: this.earningsFromAPI.map(item => item.time),
//           datasets: [
//             {
//               label: 'USD',
//               data: this.earningsFromAPI.map(item => item.salary),
//               backgroundColor: '#bc0404',
//               fill: true,
//               tension: 0.4
//             }
//           ]
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             title: {
//               display: true,
//               text: 'Earning'
//             },
//             legend: {
//               position: 'right',
//               align: 'center'
//             }
//           },
//           scales: {
//             y: {
//               min: 0,
//               max: 1000,
//               ticks: {
//                 stepSize: 500
//               }
//             }
//           }
//         }
//       });
//     },
//   }
// }
</script>