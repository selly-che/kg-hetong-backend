<template>
  <div>
    <div class="header">
      <a-form layout="inline" class="search-form">
        <a-form-item label="归属年份">
          <a-select v-model="formData.year" placeholder="所有年份">
            <a-select-option value="all">所有年份</a-select-option>
            <a-select-option value="1">2025</a-select-option>
            <a-select-option value="2">2024</a-select-option>
            <a-select-option value="2">2023</a-select-option>
            <a-select-option value="2">2022</a-select-option>
            <a-select-option value="2">2020</a-select-option>
            <a-select-option value="2">2019</a-select-option>
            <a-select-option value="2">2018</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="外协合同编号">
          <a-input
            placeholder="请输入合同编号"
            v-model="formData.contractNumber"
          />
        </a-form-item>
        <a-form-item label="外协合同识别号">
          <a-input
            placeholder="请输入合同识别号"
            v-model="formData.contractNumber"
          />
        </a-form-item>
        <a-form-item label="外协合同名称">
          <a-input
            placeholder="请输入合同名称"
            v-model="formData.contractName"
          />
        </a-form-item>
        <a-form-item label="主合同名称">
          <a-input
            placeholder="请输入主合同名称"
            v-model="formData.mainContractName"
          />
        </a-form-item>
        <a-form-item label="主合同编号">
          <a-input
            placeholder="请输入主合同编号"
            v-model="formData.mainContractNumber"
          />
        </a-form-item>
        <a-form-item label="外协单位">
          <a-input
            placeholder="请输入外协单位"
            v-model="formData.executionUnit"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSearch">搜索</a-button>
          <a-button @click="handleReset">重置</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="context">
      <a-button type="primary" style="margin-right: 10px">新增</a-button>
      <a-button>导出excel</a-button>
      <div class="table" style="margin-top: 10px">
        <a-table
          :columns="columns"
          :data-source="tabledata"
          :pagination="false"
          :row-selection="rowSelection"
          :scroll="{ x: 'max-content', y: 600 }"
        >
          <template #action="{ record }">
            <a
              style="margin-right: 10px"
              @click="handleEdit(record)"
              >编辑</a>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";

const formData = ref({
  year: "all",
  contractNumber: "",
  contractName: "",
  mainContractName: "",
  mainContractNumber: "",
  executionUnit: "",
});
//行选择器
const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
    console.log("已选择的行键:", selectedRowKeys);
    console.log("已选择的行数据:", selectedRows);
  },
  onSelect: (
    record: any,
    selected: boolean,
    selectedRows: any[],
    nativeEvent: Event,
  ) => {
    const rowIndex = tabledata.value.findIndex(
      (row) => row.index === record.index,
    );
    console.log(
      `第 ${rowIndex} 行被${selected ? "选中" : "取消"}，行数据：`,
      record,
    );
  },
  onSelectAll: (selected: boolean, selectedRows: any[]) => {
    console.log(`全选操作：${selected ? "选中" : "取消"}`, selectedRows);
  },
});
const columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    width: 80,
  },
  {
    title: "审核状态",
    dataIndex: "approvalStatus",
    key: "approvalStatus",
    width: 100,
  },
  {
    title: "外协合同名称",
    dataIndex: "contractName",
    key: "contractName",
    ellipsis: true,
  },
  {
    title: "外协合同编号",
    dataIndex: "contractNumber",
    key: "contractNumber",
    width: 120,
    ellipsis: true,
  },
  {
    title: "合同识别号",
    dataIndex: "contractIdNumber",
    key: "contractIdNumber",
    width: 120,
    ellipsis: true,
  },
  {
    title: "合同金额（万元）",
    dataIndex: "contractAmount",
    key: "contractAmount",
    width: 150,
  },
  {
    title: "累计支付金额（万元）",
    dataIndex: "paidAmount",
    key: "paidAmount",
    width: 180,
  },
  {
    title: "主合同名称",
    dataIndex: "mainContractName",
    key: "mainContractName",
    width: 120,
  },
  {
    title: "主合同编号",
    dataIndex: "mainContractNumber",
    key: "mainContractNumber",
    width: 150,
    ellipsis: true,
  },
  {
    title: "外协单位",
    dataIndex: "outsourcingUnit",
    key: "outsourcingUnit",
    width: 150,
    ellipsis: true,
  },
  {
    title: "外协承担单位",
    dataIndex: "undertakingUnit",
    key: "undertakingUnit",
    width: 150,
    ellipsis: true,
  },
  {
    title: "归属年份",
    dataIndex: "year",
    key: "year",
    width: 100,
  },
  {
    title: "签订日期",
    dataIndex: "signDate",
    key: "signDate",
    width: 120,
  },
  {
    title: "合同状态",
    dataIndex: "status",
    key: "status",
    width: 100,
  },
  {
    title: "操作",
    key: "action",
    width: 80,
    fixed: "right",
    slots: { customRender: 'action' },
  },
];
//行数据
const tabledata = ref([
  {
    key: "1",
    index: 1,
    approvalStatus: "已审核",
    contractName: "合同名称",
  },
  {
    key: "2",
    index: 2,
    approvalStatus: "未审核",
    contractName: "合同名称2",
  },
  {
    key: "3",
    index: 3,
    approvalStatus: "已审核",
    contractName: "合同名称3",
  },
]);
//编辑
const handleEdit = (record: any) => {
  console.log("编辑", record);
};

onMounted(() => {
  console.log("组件挂载完成");
  adc(1);
});

const adc = (item: any) => {
  console.log("item", JSON.parse(JSON.stringify(item)));
};
const handleSearch = () => {
  console.log("formData", formData.value);
};
const handleReset = () => {
  formData.value = {
    year: "all",
    contractNumber: "",
    contractName: "",
    executionUnit: "",
  };
};
</script>

<style scoped lang="less">
.header {
  width: 100%;
  min-height: 88px;
  background-color: #ffffff;
  margin-bottom: 20px;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .search-form {
    :deep(.ant-form-item) {
      margin-bottom: 16px;
      margin-right: 16px;

      .ant-form-item-label {
        padding-right: 12px;

        > label {
          font-size: 14px;
          color: #333333;
          font-weight: 500;
          margin-bottom: 0;
        }
      }

      .ant-form-item-control-input {
        min-height: 32px;
      }

      .ant-form-item-control-input-content {
        width: 180px;
      }
    }

    :deep(.ant-select),
    :deep(.ant-input) {
      width: 100%;
      border-radius: 4px;
      font-size: 14px;
      transition: all 0.3s ease;
    }

    :deep(.ant-input) {
      padding: 4px 11px;
      height: 32px;

      &:hover {
        border-color: #40a9ff;
      }

      &:focus {
        border-color: #1890ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      }
    }

    :deep(.ant-select-selector) {
      height: 32px;
      border-radius: 4px;
    }

    :deep(.ant-btn) {
      height: 32px;
      padding: 4px 20px;
      font-size: 14px;
      border-radius: 4px;
      margin-right: 8px;
      transition: all 0.3s ease;

      &.ant-btn-primary {
        background-color: #1890ff;
        border-color: #1890ff;

        &:hover {
          background-color: #40a9ff;
          border-color: #40a9ff;
        }

        &:active {
          background-color: #096dd9;
          border-color: #096dd9;
        }
      }

      &:not(.ant-btn-primary) {
        background-color: #ffffff;
        border-color: #d9d9d9;
        color: #333333;

        &:hover {
          color: #1890ff;
          border-color: #1890ff;
        }
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.context {
  width: 100%;
  min-height: calc(100vh - 120px);
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 20px;
}

// @media screen and (max-width: 1440px) {
//   .header {
//     .search-form {
//       :deep(.ant-form-item) {
//         margin-right: 12px;
//       }
//     }
//   }
// }

// @media screen and (max-width: 1200px) {
//   .header {
//     .search-form {
//       :deep(.ant-form-item) {
//         margin-right: 10px;
//       }

//       :deep(.ant-form-item-control-input-content) {
//         width: 160px;
//       }
//     }
//   }
// }

// @media screen and (max-width: 768px) {
//   .header {
//     padding: 12px 16px;
//     min-height: auto;

//     .search-form {
//       :deep(.ant-form-item) {
//         margin-right: 0;
//         margin-bottom: 12px;
//         width: 100%;
//       }

//       :deep(.ant-form-item-control-input-content) {
//         width: 100%;
//       }

//       :deep(.ant-btn) {
//         width: 100%;
//         margin-right: 0;
//         margin-bottom: 8px;
//       }
//     }
//   }
// }
</style>
