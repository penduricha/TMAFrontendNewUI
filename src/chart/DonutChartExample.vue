<template>
  <div>
    <canvas id="donut-chart" style="width: 450px;height:50px;"/>
  </div>
</template>

<script>
import { Chart} from 'chart.js/auto';
import countriesGDPService from "@/services/CountriesGDPService.js";
export default {
  name: 'DonutChartExample',
  data(){
    return{
      //countriesGDP:[],
      countriesGDPFromAPI:[],
    }
  },
  mounted() {
    //this.renderDonutChart();
    //this.getDataCountriesGDP();
  },
  beforeMount() {

  },
  created(){
    this.fetchGetCountriesGDP();
  },
  methods: {
    // getDataCountriesGDP(){
    //   this.countriesGDP=countriesGDP.map(item => ({
    //     name: item.name,
    //     GDP: item.GDP,
    //     backgroundColor: item.backgroundColor,
    //   }));
    //   console.log('List from JSON file: ',this.countriesGDP);
    //   console.log('List name:', this.countriesGDP.map(item => item.name))
    //   console.log('List GDP:', this.countriesGDP.map(item => item.GDP))
    //   console.log('List Background Color:', this.countriesGDP.map(item => item.backgroundColor))
    //   return this.countriesGDP;
    // },
    // async getDataCountriesGDP(){
    //   await countriesGDPService.getCountriesGDP().then(response => {
    //     this.countriesGDP= response.data.map((item) => ({
    //       name: item.name,
    //       GDP: item.GDP,
    //       backgroundColor: item.backgroundColor,
    //     }));
    //     console.log('List user from API: ',this.countriesGDP);
    //
    //   }).catch(error => {
    //     console.error(error);
    //   });
    // },
    //Fetch xong roi render bieu do
    async fetchGetCountriesGDP(){
      await countriesGDPService.getCountriesGDP().then(response => {
        this.countriesGDPFromAPI= response.data;
        console.log('List countries GDP from API: ',this.countriesGDPFromAPI);
      }).catch(error => {
        console.error(error);
      });
      this.renderDonutChart();
    },
    renderDonutChart() {
      const ctx = document.getElementById('donut-chart').getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.countriesGDPFromAPI.map(item => item.name),
          datasets: [
            {
              data: this.countriesGDPFromAPI.map(item => item.gdp),
              backgroundColor: this.countriesGDPFromAPI.map(item => item.backgroundColor),
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
            },
            legend: {
              position: 'right',
              align: 'center',
            },
          },
        },
      });
    }

  }
}
</script>