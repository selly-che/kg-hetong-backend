<template>
  <div class="container  br8">
    <div class="header mb-10 bgf">
      <Header />
    </div>
    <div class="content bgf pd20 br8">
      <Content />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "InTernal",
};
</script>

<script setup lang="ts">
import Header from "./Header.vue";
import Content from "./Content.vue";
</script>
<style scoped>
</style>
