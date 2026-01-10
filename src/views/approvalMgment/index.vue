<template>
  <div class="container">
    <div class="contract-audit">
      <div class="tabs">
        <div
          class="tab"
          :class="{ active: activeTab === 'pending' }"
          @click="switchTab('pending')"
        >
          待审核 ({{ pendingCount }})
        </div>
        <div
          class="tab"
          :class="{ active: activeTab === 'approved' }"
          @click="switchTab('approved')"
        >
          已审核 ({{ approvedCount }})
        </div>
      </div>
      <table class="contract-table">
        <thead>
          <tr>
            <th>序号</th>
            <th>合同名称</th>
            <th>合同编号</th>
            <th>创建时间</th>
            <th>创建人</th>
            <th>合同状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(contract, index) in filteredContracts" :key="contract.id">
            <td>{{ index + 1 }}</td>
            <td class="contract-name">{{ contract.contractName }}</td>
            <td>{{ contract.contractNo }}</td>
            <td>{{ contract.createTime }}</td>
            <td>{{ contract.creator }}</td>
            <td>
              <span :class="['status', contract.status]">
                {{ contract.status === "pending" ? "待审核" : "已审核" }}
              </span>
            </td>
            <td><a href="#" class="view-btn">查看</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 使用ref定义响应式状态
const activeTab = ref("pending"); // 当前选中的标签：pending-待审核, approved-已审核
const contracts = ref([
  {
    id: 1,
    contractName:
      "中铁开发投资集团有限公司重庆市永川至璧山高速公路弱电系统销售",
    contractNo: "2025-矿谷公司-001",
    createTime: "2023-12-25 14:35:35",
    creator: "张三",
    status: "pending", // pending-待审核, approved-已审核
  },
  {
    id: 2,
    contractName:
      "粤港澳大湾区深圳市都市圈城际铁路深惠城际大鹏支线段场工设备监控系统销售",
    contractNo: "2025-矿谷公司-004",
    createTime: "2023-12-25 14:35:35",
    creator: "李四",
    status: "approved",
  },
  {
    id: 3,
    contractName:
      "中国铁路昆明局集团有限公司普洱基础设施段2025年中老昆万线玉磨段隧道防灾救援设备监控系统技术服务",
    contractNo: "2025-矿谷公司-005",
    createTime: "2023-12-25 14:35:35",
    creator: "王五",
    status: "approved",
  },
  {
    id: 4,
    contractName:
      "中铁二十四局集团有限公司沪昆铁路JSZFSG-3标房建配套工程内业资料管理系统技术服务",
    contractNo: "2025-矿谷公司-007",
    createTime: "2023-12-25 14:35:35",
    creator: "李二",
    status: "pending",
  },
  {
    id: 5,
    contractName:
      "中铁二局集团有限公司新建川藏铁路雅安至林芝段CZXZZQ-13A标隧道超前地质预报信息化管理系统技术服务",
    contractNo: "2025-矿谷公司-008",
    createTime: "2023-12-25 14:35:35",
    creator: "王老五",
    status: "pending",
  },
]);

// 使用computed定义计算属性
// 计算待审核合同数量
const pendingCount = computed(() => {
  return contracts.value.filter((contract) => contract.status === "pending")
    .length;
});

// 计算已审核合同数量
const approvedCount = computed(() => {
  return contracts.value.filter((contract) => contract.status === "approved")
    .length;
});

// 根据当前选中的标签过滤合同
const filteredContracts = computed(() => {
  if (activeTab.value === "pending") {
    return contracts.value.filter((contract) => contract.status === "pending");
  } else {
    return contracts.value.filter((contract) => contract.status === "approved");
  }
});

// 切换标签页
const switchTab = (tab) => {
  activeTab.value = tab;
};
</script>

<style scoped lang="less">
.container {
  padding: 20px;
}

.contract-audit {
  width: 100%;
}

.tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
}

.tab {
  padding: 10px 20px;
  margin-right: 30px;
  cursor: pointer;
  color: #666;
  position: relative;
  font-size: 14px;

  &.active {
    color: #1890ff;
    font-weight: 500;

    &::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #1890ff;
    }
  }
}

.contract-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  background-color: #fff;
}

.contract-table th,
.contract-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e8e8e8;
  border-left: 1px solid #e8e8e8;
}

.contract-table th:first-child,
.contract-table td:first-child {
  border-left: none;
}

.contract-table th {
  background-color: #f5f5f5;
  font-weight: 500;
  color: #333;
}

.contract-name {
  color: #1890ff;
  cursor: pointer;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status.pending {
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  color: #52c41a;
}

.status.approved {
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  color: #1890ff;
}

.view-btn {
  color: #1890ff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
