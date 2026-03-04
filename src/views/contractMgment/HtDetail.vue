<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item
        ><a href="/contractMgment/internal">内部合同</a></a-breadcrumb-item
      >
      <a-breadcrumb-item><a href="">合同详情</a></a-breadcrumb-item>
    </a-breadcrumb>
  </div>
  <div>
    <!-- header -->
    <div class="contract-card">
      <!-- 标题 -->
      <div class="card-header">
        <h3 class="title">{{ headerinfo.name }}</h3>
        <div class="status-wrapper">
          <a-tag class="badge">{{ headerinfo.type }}</a-tag>
          <a-tag class="badge">{{ headerinfo.status }}</a-tag>
        </div>
      </div>
      <!-- 信息主体 双列布局-->
      <div class="card-body">
        <!-- 合同编号 + 业主单位 -->
        <div class="info-row double">
          <div class="info-col">
            <span class="label">合同编号：</span>
            <span class="value contract-id">{{ headerinfo.contractId }}</span>
          </div>
          <div class="info-col">
            <span class="label">业主单位：</span>
            <span class="value owner-unit">{{ headerinfo.ownerUnit }}</span>
          </div>
        </div>
        <!-- 创建人 + 创建时间 -->
        <div class="info-row double">
          <div class="info-col">
            <span class="label">创建人：</span>
            <span class="value">{{ headerinfo.creator }}</span>
          </div>
          <div class="info-col">
            <span class="label">创建时间：</span>
            <span class="value">{{ headerinfo.createTime }}</span>
          </div>
        </div>
        <!-- 中标金额 + 中标时间 -->
        <div class="info-row double">
          <div class="info-col">
            <span class="label">中标金额：</span>
            <span class="value amount">{{ headerinfo.bidAmount }}</span>
          </div>
          <div class="info-col">
            <span class="label">中标时间：</span>
            <span class="value">{{ headerinfo.bidTime }}</span>
          </div>
        </div>
        <!-- 备注行 -->
        <div class="info-row">
          <span class="label">备注：</span>
          <span class="value remark">{{ headerinfo.remark }}</span>
        </div>
      </div>
    </div>
    <!-- 进度条 -->
    <div></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const contractId = ref(route.params.id);
const contractName = ref(route.params.name);
const headerinfo = ref({
  name: "合同1",
  contractId: "HT20230101",
  creator: "张三",
  createTime: "2023-01-01",
  type: "桥梁",
  status: "进行中",
  ownerUnit: "业主单位A",
  bidAmount: "100,000.00",
  bidTime: "2023-01-01",
  remark: "这是一个备注",
});
onMounted(() => {
  console.log(contractId.value);
  console.log(contractName.value);
});
</script>

<style lang="less" scoped>
.contract-card {
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
}

.card-header {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  margin: 0;
  color: #141414;
  font-size: 18px;
  font-weight: 500;
}

.status-wrapper {
  flex-shrink: 0;
}

.card-body {
  flex: 1;
}

.info-row {
  display: flex;
  margin-bottom: 12px;
  font-size: 14px;
  align-items: center;

  &.double {
    display: flex;
    gap: 40px;
  }
}

.info-col {
  display: flex;
  align-items: center;
  flex: 1;
}

.label {
  color: #666;
  width: 80px;
  flex-shrink: 0;
}

.value {
  color: #333;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &.contract-id {
    font-weight: 500;
    color: #1890ff;
  }

  &.owner-unit {
    font-weight: 500;
  }

  &.amount {
    font-weight: 500;
    color: #fa8c16;
  }

  &.remark {
    color: #666;
  }
}

.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 12px;
  margin-right: 20px;
}
</style>
