<template>
  <div class="container">
    <div class="header">
      <Header />
    </div>
    <div class="content">
      <Content />
    </div>
  </div>
</template>

<script setup>
import Header from "./Header.vue";
import Content from "./Content.vue";
</script>
<style scoped>
.header {
  height: 200px;
  margin-bottom: 10px;
}
</style>
