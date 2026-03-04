<template>
  <div class="header-container">
    <a-form layout="inline" class="search-form">
      <a-form-item label="合同名称">
        <a-input
          placeholder="请输入合同名称"
          v-model:value="formData.contractName"
        />
      </a-form-item>
      <a-form-item label="合同编号">
        <a-input
          placeholder="请输入合同编号"
          v-model:value="formData.contractNumber"
        />
      </a-form-item>
      <a-form-item label="执行单位">
        <a-select v-model:value="formData.executionUnit" placeholder="所有单位">
          <a-select-option value="all">所有单位</a-select-option>
          <a-select-option value="1">中铁开发投资集团有限公司</a-select-option>
          <a-select-option value="2">2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="业主名称">
        <a-input
          placeholder="请输入业主名称"
          v-model:value="formData.ownerName"
        />
      </a-form-item>
      <a-form-item label="合同金额">
        <a-input
          placeholder="请输入合同金额"
          v-model:value="formData.contractAmount"
        />
      </a-form-item>
      <a-form-item label="合同金额范围">
        <a-select v-model:value="formData.amountRange" placeholder="所有单位">
          <a-select-option value="all">所有单位</a-select-option>
          <a-select-option value="1">1-10万</a-select-option>
          <a-select-option value="2">10-50万</a-select-option>
          <a-select-option value="3">50-100万</a-select-option>
          <a-select-option value="4">100-500万</a-select-option>
          <a-select-option value="5">500-1000万</a-select-option>
          <a-select-option value="6">1000万以上</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="有应收款">
        <a-select v-model:value="formData.hasReceivable" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">有</a-select-option>
          <a-select-option value="2">无</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="合同日期">
        <a-date-picker
          v-model:value="formData.contractDate"
          placeholder="请选择合同日期"
        />
      </a-form-item>
      <a-form-item label="签订时间范围">
        <a-range-picker
          v-model:value="formData.signDateRange"
          placeholder="开始时间 - 结束时间"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSearch">搜索</a-button>
        <a-button @click="handleReset">重置</a-button>
        <!-- <a-button @click="handleExpand">展开</a-button> -->
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["search", "reset"]);
const formData = ref({
  contractName: "",
  contractNumber: "",
  executionUnit: "all",
  ownerName: "",
  contractAmount: "",
  amountRange: "all",
  hasReceivable: "all",
  contractDate: "" as any,
  signDateRange: [] as any[],
});
const handleSearch = () => {
  console.log("表单数据:", formData.value);
  const searchParams = {
    name: formData.value.contractName,
    number: formData.value.contractNumber,
    ownershipUnit:
      formData.value.executionUnit === "all"
        ? ""
        : formData.value.executionUnit,
    customerName: formData.value.ownerName,
    amount: formData.value.contractAmount,
    amountRange:
      formData.value.amountRange === "all" ? "" : formData.value.amountRange,
    hasReceivable:
      formData.value.hasReceivable === "all"
        ? ""
        : formData.value.hasReceivable,
    contractDate: formData.value.contractDate
      ? formData.value.contractDate.format("YYYY-MM-DD")
      : "",
    signTimeStart:
      formData.value.signDateRange && formData.value.signDateRange[0]
        ? formData.value.signDateRange[0].format("YYYY-MM-DD")
        : "",
    signTimeEnd:
      formData.value.signDateRange && formData.value.signDateRange[1]
        ? formData.value.signDateRange[1].format("YYYY-MM-DD")
        : "",
  };
  console.log("搜索参数:", searchParams);
  emit("search", searchParams);
};
const handleReset = () => {
  // 重置
  formData.value = {
    contractName: "",
    contractNumber: "",
    executionUnit: "all",
    ownerName: "",
    contractAmount: "",
    amountRange: "all",
    hasReceivable: "",
    contractDate: null,
    signDateRange: [],
  };
  emit("reset");
};
const handleExpand = () => {
  // 展开/收起逻辑
  console.log("展开/收起");
};
</script>
<style lang="less" scoped>
.header-container {
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  width: 100%;
}

.search-form {
  .ant-form-item {
    margin-right: 16px;
    margin-bottom: 16px;
  }

  .ant-form-item-label {
    padding-right: 8px;
  }

  .ant-form-item-control-input-content {
    width: 180px;
  }

  .ant-btn {
    margin-right: 8px;

    &.ant-btn-primary {
      background-color: #1890ff;
      border-color: #1890ff;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .ant-select,
  .ant-input {
    width: 100%;
  }
}
</style>
