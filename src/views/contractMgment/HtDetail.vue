<template>
  <div>
    <!-- <a-breadcrumb>
      <a-breadcrumb-item
        ><a href="/contractMgment/internal">内部合同</a></a-breadcrumb-item
      >
      <a-breadcrumb-item><a href="">合同详情</a></a-breadcrumb-item>
    </a-breadcrumb> -->
    <div>
      <a-tabs v-model:activeKey="activeKey">
        <!-- 基本信息 开票申请信息 收款信息 外协合同 补充合同 变更信息 中标审批表 -->
        <a-tab-pane key="1" tab="基本信息"> 表单 </a-tab-pane>
        <a-tab-pane key="2" tab="开票申请信息">Content of Tab 2</a-tab-pane>
        <a-tab-pane key="3" tab="收款信息">Content of Tab Pane 3</a-tab-pane>
        <a-tab-pane key="4" tab="外协合同">Content of Tab Pane 4</a-tab-pane>
        <a-tab-pane key="5" tab="补充合同">Content of Tab Pane 5</a-tab-pane>
        <a-tab-pane key="6" tab="变更信息">Content of Tab Pane 6</a-tab-pane>
        <a-tab-pane key="7" tab="中标审批表">Content of Tab Pane 7</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const contractId = ref(route.params.id);
const contractName = ref(route.params.name);
onMounted(() => {
  console.log(contractId.value);
  console.log(contractName.value);
});
</script>

<style lang="less" scoped></style>
