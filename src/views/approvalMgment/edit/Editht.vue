<template>
  <div class="container">
    <div class="header">
      <Header />
    </div>
    <div class="context">
      <Footer />
    </div>
  </div>
</template>
<script setup>
import Header from './Header.vue';
import Footer from './Footer.vue';

</script>
<style lang="less" scoped>
.header {
  height: 200px;
  background-color: rgb(255, 255, 255);
  margin-bottom: 20px;
}
.context {
  width: 98%;
  height: calc(100vh - 300px);
  background-color: rgb(255, 255, 255);
  //居中
  margin: 0 auto;
}
</style>