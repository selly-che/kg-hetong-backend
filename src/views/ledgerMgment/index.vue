<template>
  <div>
    <div class="pd20 bgf br8">
      <div>台账管理123</div>

    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LedgerManagement",
};
</script>

<script lang="ts" setup>
import { ref } from "vue";
import { onMounted, computed } from "vue";

</script>

<style lang="less" scoped>
.peijianSort {
  padding: 1rem;
  // border: 1px solid #ebeef5;
  background-color: white;
  // margin-top: 1rem;
  margin: 1rem;
}

.custom-label-width {
  --label-width: 150px !important;
}

.project_mainTitle {
  font-size: 20px;
  font-weight: 700;
  margin: 10px 0;
}
</style>
