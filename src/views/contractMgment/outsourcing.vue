<template>
  <div class="pd20 bgf br8">外协合同</div>
</template>
<script lang="ts">
export default {
  name: "OutSourcing",
};
</script>
<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("组件挂载完成");
  adc(1);
});

const adc = (item: any) => {
  console.log("item", JSON.parse(JSON.stringify(item)));
};
</script>

<style lang="less" scoped></style>
