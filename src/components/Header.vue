<!-- Header.vue -->
<template>
  <header class="header">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-lg-4 col-md-4 col-sm-6">
          <div class="d-flex align-items-center">
            <img src="@/assets/logo.svg" alt="Vue.js Favicon" class="favicon">
            <p class="mb-0 ml-3 font-weight-bold"
               style="margin-left: 20px;
              margin-top: 15px;
              font-weight: bold;
              font-size:18px;
              color:white">Vue Admin Template</p>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6">
          <input type="text"
                 v-model="searchText"
                 placeholder="Search"
                 maxlength="30"
                 class="form-control"
                 style="margin-left:-100px;
                        background-color: white;
                        color:black;
                        width: 120%;
                        height: 40px;
                        margin-top: 10px;">
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6">
          <img src="@/assets/man.png" alt="Man avatar" class="avatarMan">
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      searchText: ''
    }
  }
}
</script>

<style scoped>
.header {
  flex: 0 0 8vh;
  background-color: #194d33;
  color: #fff;
  width: 100%;
}

.favicon {
  width: 32px; /* Điều chỉnh kích thước tùy ý */
  height: 32px;
  margin-top: 15px;
}
.avatarMan{
  width: 60px; /* Điều chỉnh kích thước tùy ý */
  height: 40px;
  margin-top: 12px;
  margin-left: 350px;
}
</style>