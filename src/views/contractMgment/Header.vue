<template>
  <div class="header-container">
    <a-form layout="inline" class="search-form">
      <a-form-item label="归属年份">
        <a-date-picker picker="year" v-model:value="formData.year" />
      </a-form-item>
      <a-form-item label="板块">
        <a-select v-model:value="formData.section" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="铁路">铁路</a-select-option>
          <a-select-option value="2">板块2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="承揽类型">
        <a-select v-model:value="formData.contractType" placeholder="全部">
          <a-select-option value="0">0</a-select-option>
          <a-select-option value="1">1</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="合同编号">
        <a-input placeholder="请输入合同编号" v-model:value="formData.code" />
      </a-form-item>
      <a-form-item label="合同识别号">
        <a-input
          placeholder="请输入合同识别号"
          v-model:value="formData.number"
        />
      </a-form-item>
      <a-form-item label="合同名称">
        <a-input placeholder="请输入合同名称" v-model:value="formData.name" />
      </a-form-item>
      <a-form-item label="所属项目" v-show="isExpanded">
        <a-input
          placeholder="请输入所属项目"
          v-model:value="formData.projectId"
        />
      </a-form-item>
      <a-form-item label="业主单位" v-show="isExpanded">
        <a-input
          placeholder="请输入业主单位"
          v-model:value="formData.customerName"
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
        <a-select v-model:value="formData.ownershipUnit" placeholder="所有单位">
          <a-select-option value="all">所有单位</a-select-option>
          <a-select-option value="1">中铁开发投资集团有限公司</a-select-option>
          <a-select-option value="2">2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="区域" v-show="isExpanded">
        <a-select v-model:value="formData.commandPost" placeholder="全部">
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
        <a-select v-model:value="formData.isReport" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="0">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="上报起始时间" v-show="isExpanded">
        <a-date-picker
          v-model:value="formData.auditTime"
          placeholder="请选择起始时间"
        />
      </a-form-item>
      <a-form-item label="上报截止时间" v-show="isExpanded">
        <a-date-picker
          v-model:value="formData.modifyTime"
          placeholder="请选择截止时间"
        />
      </a-form-item>
      <a-form-item label="是否军融" v-show="isExpanded">
        <a-select v-model:value="formData.isJr" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="0">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否有变更" v-show="isExpanded">
        <a-select v-model:value="formData.hasChange" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="0">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否内部合同" v-show="isExpanded">
        <a-select v-model:value="formData.isInside" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="0">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否补充合同" v-show="isExpanded">
        <a-select v-model:value="formData.isSupplementary" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="0">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否上传附件" v-show="isExpanded">
        <a-select v-model:value="formData.hasAttachment" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="0">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="基本信息是否已治理" v-show="isExpanded">
        <a-select v-model:value="formData.basicInfoManaged" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="0">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="收款信息是否已治理" v-show="isExpanded">
        <a-select
          v-model:value="formData.paymentInfoManaged"
          placeholder="全部"
        >
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="0">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否封存" v-show="isExpanded">
        <a-select v-model:value="formData.isArchived" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="0">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否归档" v-show="isExpanded">
        <a-select v-model:value="formData.isArchived" placeholder="全部">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="0">否</a-select-option>
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
  year: null as any,
  section: "all", //
  contractType: "all",
  code: "",
  number: "",
  name: "",
  projectId: "",
  customerName: "",
  signYear: "all",
  ownershipUnit: "all",
  commandPost: "all",
  typeOne: "all",
  typeTwo: "all",
  status: "all",
  isReport: "all",
  auditTime: "" as any,
  modifyTime: "" as any,
  isJr: "all",
  hasChange: "all",
  isInside: "all",
  isSupplementary: "all",
  hasAttachment: "all",
  basicInfoManaged: "all",
  paymentInfoManaged: "all",
  isSealed: "all",
  isArchived: "all",
});
// 搜索
const handleSearch = () => {
  console.log("表单数据:", formData.value);
  const searchParams = {
    year: formData.value.year ? formData.value.year.format("YYYY") : "",
    section: formData.value.section === "all" ? "" : formData.value.section,
    contractType:
      formData.value.contractType === "all" ? "" : formData.value.contractType,
    code: formData.value.code,
    number: formData.value.number,
    name: formData.value.name,
    projectId: formData.value.projectId,
    customerName: formData.value.customerName,
    signYear: formData.value.signYear === "all" ? "" : formData.value.signYear,
    ownershipUnit:
      formData.value.ownershipUnit === "all"
        ? ""
        : formData.value.ownershipUnit,
    commandPost:
      formData.value.commandPost === "all" ? "" : formData.value.commandPost,
    typeOne: formData.value.typeOne === "all" ? "" : formData.value.typeOne,
    typeTwo: formData.value.typeTwo === "all" ? "" : formData.value.typeTwo,
    status: formData.value.status === "all" ? "" : formData.value.status,
    isReport: formData.value.isReport === "all" ? "" : formData.value.isReport,
    auditTime: formData.value.auditTime
      ? formData.value.auditTime.format("YYYY-MM-DD")
      : "",
    modifyTime: formData.value.modifyTime
      ? formData.value.modifyTime.format("YYYY-MM-DD")
      : "",
    isJr: formData.value.isJr === "all" ? "" : formData.value.isJr,
    hasChange:
      formData.value.hasChange === "all" ? "" : formData.value.hasChange,
    isInside: formData.value.isInside === "all" ? "" : formData.value.isInside,
    isSupplementary:
      formData.value.isSupplementary === "all"
        ? ""
        : formData.value.isSupplementary,
    hasAttachment:
      formData.value.hasAttachment === "all"
        ? ""
        : formData.value.hasAttachment,
    basicInfoManaged:
      formData.value.basicInfoManaged === "all"
        ? ""
        : formData.value.basicInfoManaged,
    paymentInfoManaged:
      formData.value.paymentInfoManaged === "all"
        ? ""
        : formData.value.paymentInfoManaged,
    isSealed: formData.value.isSealed === "all" ? "" : formData.value.isSealed,
    isArchived:
      formData.value.isArchived === "all" ? "" : formData.value.isArchived,
  };
  console.log("搜索参数:", searchParams);
  emit("search", searchParams);
};
const handleReset = () => {
  formData.value = {
    year: null,
    section: "all",
    contractType: "all",
    code: "",
    number: "",
    name: "",
    projectId: "",
    customerName: "",
    signYear: "all",
    ownershipUnit: "all",
    commandPost: "all",
    typeOne: "all",
    typeTwo: "all",
    status: "all",
    isReport: "all",
    auditTime: null,
    modifyTime: null,
    isJr: "all",
    hasChange: "all",
    isInside: "all",
    isSupplementary: "all",
    hasAttachment: "all",
    basicInfoManaged: "all",
    paymentInfoManaged: "all",
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
  border-radius: 10px;
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
