<!-- Main.vue -->
<template>
  <div class="container">
    <Header/>
    <main class="main">
      <h5>Hello</h5>
    </main>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'

export default {
  name: 'Main',
  components: {
    Header
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 830px;
  width: 2500px;
  margin-top: -20px;
  margin-left: -50px;
  border-style: solid;
  padding: 0;
}
.main {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 20px;
}
</style>