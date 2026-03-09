<template>
  <div>
    <div class="header">
      <a-form layout="inline" class="search-form">
        <a-form-item label="归属年份">
          <a-select v-model:value="formData.year" placeholder="所有年份">
            <a-select-option value="all">所有年份</a-select-option>
            <a-select-option value="2026">2026</a-select-option>
            <a-select-option value="2025">2025</a-select-option>
            <a-select-option value="2024">2024</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="外协合同编号">
          <a-input placeholder="请输入合同编号" v-model:value="formData.contractNumber" />
        </a-form-item>
        <a-form-item label="外协合同识别号">
          <a-input placeholder="请输入合同识别号" v-model:value="formData.uniqueNumber" />
        </a-form-item>
        <a-form-item label="外协合同名称">
          <a-input placeholder="请输入合同名称" v-model:value="formData.contractName" />
        </a-form-item>
        <a-form-item label="主合同名称">
          <a-input placeholder="请输入主合同名称" v-model:value="formData.mainContractName" />
        </a-form-item>
        <a-form-item label="主合同编号" v-show="isExpanded">
          <a-input placeholder="请输入主合同编号" v-model:value="formData.mainContractNumber" />
        </a-form-item>
        <a-form-item label="外协单位" v-show="isExpanded">
          <a-input placeholder="请输入外协单位" v-model:value="formData.executionUnit" />
        </a-form-item>
        <a-form-item label="外协类型" v-show="isExpanded">
          <a-select v-model:value="formData.outsourcingType" placeholder="全部">
            <a-select-option value="all">全部</a-select-option>
            <a-select-option value="1">类型1</a-select-option>
            <a-select-option value="2">类型2</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="主合同识别号" v-show="isExpanded">
          <a-input placeholder="请输入主合同识别号" v-model:value="formData.mainContractUniqueNumber" />
        </a-form-item>
        <a-form-item label="性质" v-show="isExpanded">
          <a-select v-model:value="formData.nature" placeholder="全部">
            <a-select-option value="all">全部</a-select-option>
            <a-select-option value="1">性质1</a-select-option>
            <a-select-option value="2">性质2</a-select-option>
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
          <a-select v-model:value="formData.paymentInfoGoverned" placeholder="全部">
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
        <a-form-item label="是否封存" v-show="isExpanded">
          <a-select v-model:value="formData.isSealed" placeholder="全部">
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
    <div class="context">
      <a-button type="primary" style="margin-right: 10px" @click="handleAdd()">新增</a-button>
      <a-button @click="exportExcelHandle">导出excel</a-button>
      <div class="table" style="margin-top: 10px">
        <a-table :columns="columns" :data-source="tabledata" :pagination="pagination" :row-selection="rowSelection"
          :scroll="{ x: 'max-content', y: 600 }">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <a style="margin-right: 10px" @click="handleEdit(record)">编辑</a>
            </template>
            <template v-if="column.key === 'name'">
              <a @click="handleNameClick(record)">{{ record.name }}</a>
            </template>
          </template>
        </a-table>
      </div>
      <outsourcingAdd ref="outsourcingAddRef" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import outsourcingAdd from "../contractMgment/outsourcingAdd.vue";
import getDates from "@/network/index";
import { message } from "ant-design-vue";
import { exportExcel } from "@/utils/common";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import axios from "axios";
// import axios from "axios";
// import { saveAs } from "file-saver";

const router = useRouter();
const outsourcingAddRef = ref();
const isExpanded = ref(false);
const formData = ref({
  year: "all",
  contractNumber: "",
  uniqueNumber: "",
  contractName: "",
  mainContractName: "",
  mainContractNumber: "",
  executionUnit: "",
  outsourcingType: "all",
  mainContractUniqueNumber: "",
  nature: "all",
  hasAttachment: "all",
  basicInfoGoverned: "all",
  paymentInfoGoverned: "all",
  isArchived: "all",
  isSealed: "all",
  parentContractInfo: {
    name: "",
    number: "",
  }, //父合同信息
});
const selectedRowinfo = ref<any[]>([]); //选中行数据
const selectedRowid = ref<string[]>([]);
//行选择器
const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
    selectedRowid.value = selectedRowKeys;
    selectedRowinfo.value = selectedRows;
    console.log("已选择的行键:", selectedRowKeys);
    console.log("已选择的行数据:", selectedRows);
    console.log(selectedRowinfo.value);
    console.log(selectedRowid);
  },
  onSelect: (
    record: any,
    selected: boolean,
    selectedRows: any[], //选中的行数据
    nativeEvent: Event, //点击事件
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
    dataIndex: "paymentAuditStatus",
    key: "paymentAuditStatus",
    width: 100,
  },
  {
    title: "外协合同名称",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: "外协合同编号",
    dataIndex: "number",
    key: "number",
    width: 120,
    ellipsis: true,
  },
  {
    title: "合同识别号",
    dataIndex: "uniqueNumber",
    key: "uniqueNumber",
    width: 120,
    ellipsis: true,
  },
  {
    title: "合同金额（万元）",
    dataIndex: "amount",
    key: "amount",
    width: 150,
  },
  {
    title: "累计支付金额（万元）",
    dataIndex: "totalReceivedAmount",
    key: "totalReceivedAmount",
    width: 180,
  },
  {
    title: "主合同名称",
    dataIndex: "parentContractInfoname",
    key: "parentContractInfoname",
    width: 120,
  },
  {
    title: "主合同编号",
    dataIndex: "parentContractInfonumber",
    key: "parentContractInfonumber",
    width: 150,
    ellipsis: true,
  },
  {
    title: "外协单位",
    dataIndex: "customer",
    key: "customer",
    width: 150,
    ellipsis: true,
  },
  {
    title: "外协承担单位",
    dataIndex: "ownershipUnit",
    key: "ownershipUnit",
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
    dataIndex: "signTime",
    key: "signTime",
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
    // slots: { customRender: "action" },
  },
];
//行数据(修改)
const tabledata = ref([
  {
    key: "1",
    index: 1,
    approvalStatus: "已审核",
    contractName: "合同名称",
  },
]);

//导出
const exportExcelFn = async () => {
  try {
    const token = localStorage.getItem("accesstoken");
    const res = await axios({
      method: "GET",
      url: "/jeecg-boot/contract/export",
      headers: {
        "x-access-token": token,
      },
      responseType: "blob",
    });
    console.log(res.data);
    const blob = new Blob([res.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    // 触发下载
    // 触发下载
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `外协合同数据.xlsx`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    ElMessage.success("导出成功");
  } catch (error) {
    ElMessage.error("导出失败");
    console.log(error);
  }

};
//导出new
const exportExcelHandle = () => {
  if (selectedRowinfo.value.length === 0) {
    //弹出确认框提示是否需要导出所有的合同数据
    ElMessageBox.confirm(
      "是否需要导出所有的合同数据？",
      "提示",
      {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      }
    )
      .then(() => {
        // 用户点击了“是”，执行导出操作
        exportExcelFn();
      })
      .catch(() => {
        // 用户点击了“否”或关闭了弹窗，不执行任何操作
        ElMessage.info("已取消导出");
      });
    return;

  }
  // 过滤选中的合同数据
  const selectedData = tabledata.value.filter((item) =>
    selectedRowid.value.includes(item.key),
  );

  const exportColumns = columns
    // 过滤不用导出的列
    .filter(
      (col) =>
        col.dataIndex &&
        col.dataIndex !== "action" &&
        col.dataIndex !== "index",
    )
    .map((col) => ({
      title: col.title,
      dataIndex: col.dataIndex as string,
    }));
  // 导出选中的合同数据
  exportExcel(selectedData, exportColumns, {
    fileName: "合同数据",
    sheetName: "合同数据",
  });
};
//点击合同名称跳转操作
const handleNameClick = (record: any) => {
  router.push({
    path: `/contractMgment/outsourcingDetail/${record.key}/${record.name}`,
  });
  // console.log("点击的合同名称:", record.name, "合同id:", record.key);
};
//编辑
const handleEdit = (record: any) => {
  console.log("编辑", record);
};
//分页
const pagination = ref({
  current: 1, // 当前页数
  pageSize: 10, // 每页显示条数
  total: "", // 总条数
  showSizeChanger: true, // 显示每页条数选择器
  showQuickJumper: true, // 显示快速跳转
  showTotal: (total: number) => `共 ${total} 条记录`, // 显示总数
  pageSizeOptions: ["10", "20", "50", "100"], // 每页条数选项
  onChange: (page: number, pageSize: number) => {
    pagination.value.current = page;
    pagination.value.pageSize = pageSize;
  },
});
//新增
const handleAdd = () => {
  console.log("弹抽屉");
  outsourcingAddRef.value.showModal();
};
//获取数据
const getOutsourcingList = async () => {
  const res = await getDates("contract/GetContractList", {
    pageNum: 1,
    pageSize: 10,
  });
  const data = res.data.result.records;
  console.log("外协合同列表222", data);
  tabledata.value = data.map((item: any, index: number) => {
    const contractInfo = item.contractInfo || {};
    const parentContractInfo = item.contractInfo.parentContractInfo || {};
    return {
      ...contractInfo,
      // ...parentContractInfo,
      parentContractInfoname: parentContractInfo.name || "",
      parentContractInfonumber: parentContractInfo.number || "",
      key: contractInfo.id,
      index: index + 1,
      contractState: contractInfo.contractState === 1 ? "已通过" : "已超期",
      statusText: contractInfo.status === 1 ? "生效" : "未生效",
      isJrText: contractInfo.isJr === 1 ? "是" : "否",
      isReportText: contractInfo.isReport === 1 ? "是" : "否",
    };
  });
};
onMounted(() => {
  getOutsourcingList();
  console.log("组件挂载完成");
  adc(1);
});

const adc = (item: any) => {
  console.log("item", JSON.parse(JSON.stringify(item)));
};
const handleSearch = async () => {
  //打印搜索参数
  console.log("搜索参数", formData.value);

  const params: any = {
    pageNum: pagination.value.current,
    pageSize: pagination.value.pageSize,
  };
  if (formData.value.year !== "all") {
    params.year = parseInt(formData.value.year);
  }
  if (formData.value.contractNumber) {
    params.number = formData.value.contractNumber;
  }
  if (formData.value.uniqueNumber) {
    params.uniqueNumber = formData.value.uniqueNumber;
  }
  if (formData.value.contractName) {
    params.name = formData.value.contractName;
  }
  if (formData.value.mainContractName) {
    params.mainContractName = formData.value.mainContractName;
  }
  if (formData.value.mainContractNumber) {
    params.mainContractNumber = formData.value.mainContractNumber;
  }
  if (formData.value.executionUnit) {
    params.customer = formData.value.executionUnit;
  }
  if (formData.value.outsourcingType !== "all") {
    params.outsourcingType = formData.value.outsourcingType;
  }
  if (formData.value.mainContractUniqueNumber) {
    params.mainContractUniqueNumber = formData.value.mainContractUniqueNumber;
  }
  if (formData.value.nature !== "all") {
    params.nature = formData.value.nature;
  }
  if (formData.value.hasAttachment !== "all") {
    params.hasAttachment = formData.value.hasAttachment;
  }
  if (formData.value.basicInfoGoverned !== "all") {
    params.basicInfoGoverned = formData.value.basicInfoGoverned;
  }
  if (formData.value.paymentInfoGoverned !== "all") {
    params.paymentInfoGoverned = formData.value.paymentInfoGoverned;
  }
  if (formData.value.isArchived !== "all") {
    params.isArchived = formData.value.isArchived;
  }
  if (formData.value.isSealed !== "all") {
    params.isSealed = formData.value.isSealed;
  }

  try {
    const res = await getDates("contract/GetContractList", params);
    const data = res.data.result.records;
    tabledata.value = data.map((item: any, index: number) => {
      const contractInfo = item.contractInfo || {};
      return {
        ...contractInfo,
        key: contractInfo.id,
        index: index + 1,
        contractState: contractInfo.contractState === 1 ? "已通过" : "已超期",
        statusText: contractInfo.status === 1 ? "生效" : "未生效",
        isJrText: contractInfo.isJr === 1 ? "是" : "否",
        isReportText: contractInfo.isReport === 1 ? "是" : "否",
      };
    });
    pagination.value.total = res.data.result.total;
  } catch (error) {
    console.error("搜索失败:", error);
  }
};
const handleReset = () => {
  formData.value = {
    year: "all",
    contractNumber: "",
    uniqueNumber: "",
    contractName: "",
    mainContractName: "",
    mainContractNumber: "",
    executionUnit: "",
    outsourcingType: "all",
    mainContractUniqueNumber: "",
    nature: "all",
    hasAttachment: "all",
    basicInfoGoverned: "all",
    paymentInfoGoverned: "all",
    isArchived: "all",
    isSealed: "all",
    parentContractInfo: {
      name: "",
      number: "",
    },
  };
  pagination.value.current = 1;
  getOutsourcingList();
};
const handleExpand = () => {
  isExpanded.value = !isExpanded.value;
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

  // .search-form {
  //   :deep(.ant-form-item) {
  //     margin-bottom: 16px;
  //     margin-right: 16px;

  //     .ant-form-item-label {
  //       padding-right: 12px;

  //       > label {
  //         font-size: 14px;
  //         color: #333333;
  //         font-weight: 500;
  //         margin-bottom: 0;
  //       }
  //     }

  //     .ant-form-item-control-input {
  //       min-height: 32px;
  //     }

  //     .ant-form-item-control-input-content {
  //       width: 180px;
  //     }
  //   }

  //   :deep(.ant-select),
  //   :deep(.ant-input) {
  //     width: 100%;
  //     border-radius: 4px;
  //     font-size: 14px;
  //     transition: all 0.3s ease;
  //   }

  //   :deep(.ant-input) {
  //     padding: 4px 11px;
  //     height: 32px;

  //     &:hover {
  //       border-color: #40a9ff;
  //     }

  //     &:focus {
  //       border-color: #1890ff;
  //       box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  //     }
  //   }

  //   :deep(.ant-select-selector) {
  //     height: 32px;
  //     border-radius: 4px;
  //   }

  //   :deep(.ant-btn) {
  //     height: 32px;
  //     padding: 4px 20px;
  //     font-size: 14px;
  //     border-radius: 4px;
  //     margin-right: 8px;
  //     transition: all 0.3s ease;
  //     white-space: nowrap;

  //     &.ant-btn-primary {
  //       background-color: #1890ff;
  //       border-color: #1890ff;

  //       &:hover {
  //         background-color: #40a9ff;
  //         border-color: #40a9ff;
  //       }

  //       &:active {
  //         background-color: #096dd9;
  //         border-color: #096dd9;
  //       }
  //     }

  //     &:not(.ant-btn-primary):not(.ant-btn-link) {
  //       background-color: #ffffff;
  //       border-color: #d9d9d9;
  //       color: #333333;

  //       &:hover {
  //         color: #1890ff;
  //         border-color: #1890ff;
  //       }
  //     }

  //     &.ant-btn-link {
  //       padding: 4px 8px;
  //       height: 32px;
  //       display: inline-flex;
  //       align-items: center;
  //       gap: 4px;

  //       &:hover {
  //         color: #1890ff;
  //       }
  //     }

  //     &:last-child {
  //       margin-right: 0;
  //     }
  //   }
  // }
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
}

.context {
  width: 100%;
  min-height: calc(100vh - 120px);
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 20px;
}
</style>
