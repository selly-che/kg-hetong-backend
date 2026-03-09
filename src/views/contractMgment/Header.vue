<template>
  <div class="header-container">
    <a-form layout="inline" class="search-form">
      <a-form-item label="归属年份">
        <a-date-picker picker="year" v-model:value="formData.ownershipYear" />
      </a-form-item>
      <a-form-item label="板块">
        <a-select v-model:value="formData.sector" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">板块1</a-select-option>
          <a-select-option value="2">板块2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="承揽类型">
        <a-select v-model:value="formData.contractType" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">类型1</a-select-option>
          <a-select-option value="2">类型2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="合同编号">
        <a-input
          placeholder="请输入合同编号"
          v-model:value="formData.contractNumber"
        />
      </a-form-item>
      <a-form-item label="合同识别号">
        <a-input
          placeholder="请输入合同识别号"
          v-model:value="formData.contractIdNumber"
        />
      </a-form-item>
      <a-form-item label="合同名称">
        <a-input
          placeholder="请输入合同名称"
          v-model:value="formData.contractName"
        />
      </a-form-item>
      <a-form-item label="所属项目" v-show="isExpanded">
        <a-input
          placeholder="请输入所属项目"
          v-model:value="formData.projectName"
        />
      </a-form-item>
      <a-form-item label="业主单位" v-show="isExpanded">
        <a-input
          placeholder="请输入业主单位"
          v-model:value="formData.ownerUnit"
        />
      </a-form-item>
      <a-form-item label="签订年份" v-show="isExpanded">
        <a-select v-model:value="formData.signYear" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="2024">2024</a-select-option>
          <a-select-option value="2023">2023</a-select-option>
          <a-select-option value="2022">2022</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="执行单位" v-show="isExpanded">
        <a-select v-model:value="formData.executionUnit" placeholder="所有单位">
          <a-select-option value="all">所有单位</a-select-option>
          <a-select-option value="1">中铁开发投资集团有限公司</a-select-option>
          <a-select-option value="2">2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="区域" v-show="isExpanded">
        <a-select v-model:value="formData.region" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">区域1</a-select-option>
          <a-select-option value="2">区域2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="类型一" v-show="isExpanded">
        <a-select v-model:value="formData.typeOne" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">类型1</a-select-option>
          <a-select-option value="2">类型2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="类型二" v-show="isExpanded">
        <a-select v-model:value="formData.typeTwo" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">类型1</a-select-option>
          <a-select-option value="2">类型2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态" v-show="isExpanded">
        <a-select v-model:value="formData.status" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">状态1</a-select-option>
          <a-select-option value="2">状态2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="进营销系统" v-show="isExpanded">
        <a-select v-model:value="formData.inMarketingSystem" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="2">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="上报起始时间" v-show="isExpanded">
        <a-date-picker
          v-model:value="formData.reportStartTime"
          placeholder="请选择起始时间"
        />
      </a-form-item>
      <a-form-item label="上报截止时间" v-show="isExpanded">
        <a-date-picker
          v-model:value="formData.reportEndTime"
          placeholder="请选择截止时间"
        />
      </a-form-item>
      <a-form-item label="是否军融" v-show="isExpanded">
        <a-select v-model:value="formData.isMilitary" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="2">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否有变更" v-show="isExpanded">
        <a-select v-model:value="formData.hasChange" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="2">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否内部合同" v-show="isExpanded">
        <a-select v-model:value="formData.isInternal" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="2">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否补充合同" v-show="isExpanded">
        <a-select v-model:value="formData.isSupplement" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="2">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否上传附件" v-show="isExpanded">
        <a-select v-model:value="formData.hasAttachment" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="2">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="基本信息是否已治理" v-show="isExpanded">
        <a-select v-model:value="formData.basicInfoGoverned" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="2">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="收款信息是否已治理" v-show="isExpanded">
        <a-select
          v-model:value="formData.paymentInfoGoverned"
          placeholder="全部"
        >
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="2">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否封存" v-show="isExpanded">
        <a-select v-model:value="formData.isSealed" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="2">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否归档" v-show="isExpanded">
        <a-select v-model:value="formData.isArchived" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="2">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSearch">搜索</a-button>
        <a-button @click="handleReset">重置</a-button>
        <a-button type="link" @click="handleExpand">
          {{ isExpanded ? "收起" : "展开" }}
          <DownOutlined v-if="!isExpanded" />
          <UpOutlined v-else />
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";

const emit = defineEmits(["search", "reset"]);
const isExpanded = ref(false);
const formData = ref({
  ownershipYear: null as any,
  sector: "all",
  contractType: "all",
  contractNumber: "",
  contractIdNumber: "",
  contractName: "",
  projectName: "",
  ownerUnit: "",
  signYear: "all",
  executionUnit: "all",
  region: "all",
  typeOne: "all",
  typeTwo: "all",
  status: "all",
  inMarketingSystem: "all",
  reportStartTime: "" as any,
  reportEndTime: "" as any,
  isMilitary: "all",
  hasChange: "all",
  isInternal: "all",
  isSupplement: "all",
  hasAttachment: "all",
  basicInfoGoverned: "all",
  paymentInfoGoverned: "all",
  isSealed: "all",
  isArchived: "all",
});
const handleSearch = () => {
  console.log("表单数据:", formData.value);
  const searchParams = {
    ownershipYear: formData.value.ownershipYear
      ? formData.value.ownershipYear.format("YYYY")
      : "",
    sector: formData.value.sector === "all" ? "" : formData.value.sector,
    contractType:
      formData.value.contractType === "all" ? "" : formData.value.contractType,
    contractNumber: formData.value.contractNumber,
    contractIdNumber: formData.value.contractIdNumber,
    contractName: formData.value.contractName,
    projectName: formData.value.projectName,
    ownerUnit: formData.value.ownerUnit,
    signYear: formData.value.signYear === "all" ? "" : formData.value.signYear,
    executionUnit:
      formData.value.executionUnit === "all"
        ? ""
        : formData.value.executionUnit,
    region: formData.value.region === "all" ? "" : formData.value.region,
    typeOne: formData.value.typeOne === "all" ? "" : formData.value.typeOne,
    typeTwo: formData.value.typeTwo === "all" ? "" : formData.value.typeTwo,
    status: formData.value.status === "all" ? "" : formData.value.status,
    inMarketingSystem:
      formData.value.inMarketingSystem === "all"
        ? ""
        : formData.value.inMarketingSystem,
    reportStartTime: formData.value.reportStartTime
      ? formData.value.reportStartTime.format("YYYY-MM-DD")
      : "",
    reportEndTime: formData.value.reportEndTime
      ? formData.value.reportEndTime.format("YYYY-MM-DD")
      : "",
    isMilitary:
      formData.value.isMilitary === "all" ? "" : formData.value.isMilitary,
    hasChange:
      formData.value.hasChange === "all" ? "" : formData.value.hasChange,
    isInternal:
      formData.value.isInternal === "all" ? "" : formData.value.isInternal,
    isSupplement:
      formData.value.isSupplement === "all" ? "" : formData.value.isSupplement,
    hasAttachment:
      formData.value.hasAttachment === "all"
        ? ""
        : formData.value.hasAttachment,
    basicInfoGoverned:
      formData.value.basicInfoGoverned === "all"
        ? ""
        : formData.value.basicInfoGoverned,
    paymentInfoGoverned:
      formData.value.paymentInfoGoverned === "all"
        ? ""
        : formData.value.paymentInfoGoverned,
    isSealed: formData.value.isSealed === "all" ? "" : formData.value.isSealed,
    isArchived:
      formData.value.isArchived === "all" ? "" : formData.value.isArchived,
  };
  console.log("搜索参数:", searchParams);
  emit("search", searchParams);
};
const handleReset = () => {
  formData.value = {
    ownershipYear: "null",
    sector: "all",
    contractType: "all",
    contractNumber: "",
    contractIdNumber: "",
    contractName: "",
    projectName: "",
    ownerUnit: "",
    signYear: "all",
    executionUnit: "all",
    region: "all",
    typeOne: "all",
    typeTwo: "all",
    status: "all",
    inMarketingSystem: "all",
    reportStartTime: null,
    reportEndTime: null,
    isMilitary: "all",
    hasChange: "all",
    isInternal: "all",
    isSupplement: "all",
    hasAttachment: "all",
    basicInfoGoverned: "all",
    paymentInfoGoverned: "all",
    isSealed: "all",
    isArchived: "all",
  };
  emit("reset");
};
const handleExpand = () => {
  isExpanded.value = !isExpanded.value;
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
