<template>
  <div>
    <a-card class="contract-card" :style="{ height: '200px' }">
    <div class="contract-header">
      <h2 class="contract-title"> {{ contractName }}</h2>
      <div class="contract-actions">
      <a-button type="primary" style="margin-right: 8px;">通过</a-button>
      <a-button style="margin-right: 8px;">不通过</a-button>
      <a-button danger>驳回</a-button>
    </div>
    </div>
    <div class="contract-info">
      <div class="info-row">
        <span class="info-label">创建人：</span>
        <span class="info-value">张三</span>
      </div>
      <div class="info-row">
        <span class="info-label">创建时间：</span>
        <span class="info-value">2017-01-10</span>
      </div>
      <div class="info-row">
        <span class="info-label">合同编号：</span>
        <span class="info-value">2017-01-004</span>
      </div>
      <div class="info-row">
        <span class="info-label">合同附件：</span>
        <a class="info-link" href="#">关于中铁开发投资有限公司合同.pdf</a>
      </div>
    </div>
  </a-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
//拿到路由携带的参数
const route = useRoute()
const contractName = ref(route.query.contractName)
// console.log(contractName.value)
</script>

<style scoped>
.contract-card {
  display: flex;
  flex-direction: column;
  /* padding: 16px; */
  box-sizing: border-box;
}

.contract-header {
  margin-bottom: 6px;
  display: flex;
}

.contract-title {
  margin: 0;
  color: #141414;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contract-info {
  flex: 1;
  overflow: auto;
  /* margin-bottom: 16px; */
}

.info-row {
  display: flex;
  /* margin-bottom: 8px; */
  font-size: 14px;
}

.info-label {
  color: #666;
  width: 80px;
  flex-shrink: 0;
}

.info-value {
  color: #333;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info-link {
  color: #1890ff;
  text-decoration: none;
}

.contract-actions {
  display: flex;
  justify-content: flex-end;
  /* 靠右 */
  margin-left: auto;
}
</style>
