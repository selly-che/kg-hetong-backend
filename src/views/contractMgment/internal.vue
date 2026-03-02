<template>
  <div class="container br8">
    <div class="header mb-10 bgf">
      <Header @search="handleSearch" @reset="handleReset" />
    </div>
    <div class="content bgf pd20 br8">
      <Content ref="contentRef" :searchParams="currentSearchParams" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "./Header.vue";
import Content from "./Content.vue";
import { ref } from "vue";

const contentRef = ref();
const currentSearchParams = ref({});

const handleSearch = (params: any) => {
  currentSearchParams.value = params;
  contentRef.value?.refreshContractList();
};

const handleReset = () => {
  currentSearchParams.value = {};
  contentRef.value?.refreshContractList();
};
</script>
<style scoped></style>
