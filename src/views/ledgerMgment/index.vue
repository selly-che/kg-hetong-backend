<template>
  <div>
    <div class="pd20 bgf br8">台账管理</div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LedgerManagement", 
};
</script>

<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {
  console.log("组件挂载完成");
});
</script>

<style lang="less" scoped>
.peijianSort {
  padding: 1rem;
  // border: 1px solid #ebeef5;
  background-color: white;
  // margin-top: 1rem;
  margin: 1rem;
}
</style>
