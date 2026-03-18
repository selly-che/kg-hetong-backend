<template>
  <div class="container br8">
    <div class="header mb-10 bgf br8">
      <Header @search="handleSearch" @reset="handleReset" />
    </div>
    <div class="content bgf br10">
      <Content ref="contentRef" :searchParams="currentSearchParams" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "./Header.vue";
import Content from "./Content.vue";
import { ref, nextTick } from "vue";

const contentRef = ref();
const currentSearchParams = ref({});

const handleSearch = (params: any) => {
  currentSearchParams.value = params;
  nextTick(() => {
    contentRef.value?.refreshContractList();
  });
};

const handleReset = () => {
  currentSearchParams.value = {};
  contentRef.value?.refreshContractList();
};
</script>
<style scoped>
.content .header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
</style>
