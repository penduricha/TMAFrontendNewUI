<template>
  <div class="timeline-container">
    <div class="top-section">
      <h5 style="
        color: white;
        text-align: center;
        ">Timeline</h5>
    </div>
    <div class="bottom-section">
      <h1 style="font-size: 150px;
                 margin-top: 40px;
                 color: white;
                 margin-left: 15px;
                ">
      {{getCurrentDay().getDate()}}
      </h1>
      <h1 style="font-size: 30px;
                 margin-top: 5px;
                 color: white;
                 margin-left: 90px;
                ">
        {{daysOfWeek[getCurrentDay().getDay()]}}
      </h1>

    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeLine',
  components: {

  },
  data(){
    return{
      daysOfWeek : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    }
  },
  created(){
    this.getCurrentDay();
  },
  methods:{
    getCurrentDay(){
      return new Date();
    }
  }
}
</script>

<style>
.timeline-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.top-section {
  flex-basis: 15%; /* Chiếm 1/10 chiều cao màn hình */
  /* Thêm các style khác cho phần trên */
  background-color: #cc94dc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom-section {
  flex-basis: 85%; /* Chiếm 9/10 chiều cao màn hình */
  /* Thêm các style khác cho phần dưới */
  background-image: url('@/assets/hillLandCape.jpg'); /* Đường dẫn đến hình ảnh */
}
</style>