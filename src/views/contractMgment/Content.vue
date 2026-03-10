<template>
  <div class="container">
    <div class="spbu">
      <span>合同数量：{{ contractStatistics.contractCount }}</span>
      <span>合同金额：{{ contractStatistics.contractAmount }}万元</span>
      <span>审定金额：{{ contractStatistics.approvedAmount }}万元</span>
      <span>开票金额：{{ contractStatistics.invoiceAmount }}万元</span>
      <span>收款金额：{{ contractStatistics.receivedAmount }}万元</span>
      <a-button type="primary" @click="exportExcelHandler">导出excel</a-button>
    </div>
    <a-table :row-selection="rowSelection" :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 500 }"
      bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'contractState'">
          <a-tag :color="record.contractState === '已通过' ? 'green' : 'red'">{{
            record.contractState
          }}</a-tag>
        </template>
        <template v-if="column.key === 'name'">
          <a @click="handleNameClick(record)">{{ record.name }}</a>
        </template>
        <template v-if="column.key === 'action'">
          <a @click="handleActionClick(record)">
            <Edit />
          </a>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import getDates from "@/network/index";
import { useRouter } from "vue-router";
import Edit from "@/views/contractMgment/Edit.vue";
import { exportExcel } from "@/utils/common";
import { ElMessageBox, ElMessage } from 'element-plus';
import axios from "axios";
const router = useRouter();
const props = defineProps({
  searchParams: {
    type: Object,
    default: () => ({}),
  },
});
const selectedRowKeys = ref([]);
const data = ref([]);
const columns = [
  {
    title: "序号",
    width: 70,
    dataIndex: "index",
    key: "index",
    fixed: "left",
    align: "center",
  },
  {
    title: "合同节点状态",
    width: 120,
    dataIndex: "contractState",
    key: "contractState",
    align: "center",
  },
  // {
  //   title: "操作",
  //   dataIndex: "action",
  //   key: "action",
  //   width: 150,
  //   align: "center",
  // },
  {
    title: "合同编号",
    dataIndex: "number",
    key: "number",
    width: 150,
    align: "center",
  },
  {
    title: "合同识别号",
    dataIndex: "uniqueNumber",
    key: "uniqueNumber",
    width: 150,
    align: "center",
  },
  {
    title: "合同名称",
    dataIndex: "name",
    key: "name",
    width: 150,
    ellipsis: true,
    align: "center",
  },
  {
    title: "委托单位",
    dataIndex: "customerName",
    key: "customerName",
    width: 100,
    ellipsis: true,
    align: "center",
  },
  {
    title: "合同金额（万元）",
    dataIndex: "amount",
    key: "amount",
    width: 150,
    align: "center",
  },
  {
    title: "累计收款金额（万元）",
    dataIndex: "totalReceivedAmount",
    key: "totalReceivedAmount",
    width: 150,
    align: "center",
  },
  {
    title: "累计开票金额（万元）",
    dataIndex: "totallnvoiceAmount",
    key: "totallnvoiceAmount",
    width: 150,
    align: "center",
  },
  {
    title: "投资金额（万元）",
    dataIndex: "investment",
    key: "investment",
    width: 150,
    align: "center",
  },
  {
    title: "签订日期",
    dataIndex: "signTime",
    key: "signTime",
    width: 150,
    align: "center",
  },
  {
    title: "区域",
    dataIndex: "commandPost",
    key: "commandPost",
    width: 150,
    align: "center",
  },
  {
    title: "省份",
    dataIndex: "province",
    key: "province",
    width: 150,
    align: "center",
  },
  {
    title: "经办人",
    dataIndex: "charge",
    key: "charge",
    width: 150,
    align: "center",
  },
  {
    title: "板块",
    dataIndex: "section",
    key: "section",
    width: 150,
    align: "center",
  },
  {
    title: "类型一",
    dataIndex: "typeOne",
    key: "typeOne",
    width: 120,
    align: "center",
  },
  {
    title: "类型二",
    dataIndex: "typeTwo",
    key: "typeTwo",
    width: 120,
    align: "center",
  },
  {
    title: "合同状态",
    dataIndex: "statusText",
    key: "statusText",
    width: 120,
    align: "center",
  },
  {
    title: "是否军融",
    dataIndex: "isJrText",
    key: "isJrText",
    width: 100,
    align: "center",
  },
  {
    title: "是否进营销系统",
    dataIndex: "isReportText",
    key: "isReportText",
    width: 140,
    align: "center",
  },
  {
    title: "上报营销系统时间",
    dataIndex: "auditTime",
    key: "auditTime",
    width: 160,
    align: "center",
  },
  {
    title: "审定金额（万元）",
    dataIndex: "auditAmount",
    key: "auditAmount",
    width: 150,
    align: "center",
  },
  {
    title: "归属年份",
    dataIndex: "year",
    key: "year",
    width: 100,
    align: "center",
  },
];
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
      responseType: "blob", //当二进制文件处理
    });

    const blob = new Blob([res.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    // 触发下载
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `内部合同数据.xlsx`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    ElMessage.success("导出成功");
  } catch (error) {
    console.error("导出Excel失败:", error);
  }
};
//导出new
const exportExcelHandler = () => {
  if (selectedRowKeys.value.length === 0) {
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
  const selectedData = data.value.filter((item) =>
    selectedRowKeys.value.includes(item.key),
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
      dataIndex: col.dataIndex,
    }));

  exportExcel(selectedData, exportColumns, {
    fileName: "合同数据",
    sheetName: "合同数据",
  });
};
//合同统计数据
const contractStatistics = ref({
  capprovedAmount: 0,
  contractAmount: 400,
  contractCount: 5,
  invoiceAmount: 10,
  receivedAmount: 10,
});

onMounted(() => {
  getContractStatistics();
  getContractList();
});

watch(
  () => props.searchParams,
  (newParams) => {
    // console.log("searchParams变化:", newParams);
    getContractList();
  },
  { deep: true },
);
//点击合同名称跳转操作
const handleNameClick = (record) => {
  console.log("点击的合同名称:", record.name, "合同id:", record.key);
  router.push({
    path: `/contractMgment/htDetail/${record.key}/${record.name}`,
  });
};
//操作-编辑
// const handleActionClick = (record) => {
//   console.log("合同id:", record.key);
// };

const refreshContractList = () => {
  getContractList();
};

defineExpose({
  refreshContractList,
});
// 行选择
const rowSelection = computed(() => {
  return {
    type: "checkbox",
    selectedRowKeys: selectedRowKeys.value,
    onChange: handleSelectChange,
    fixed: "left",
  };
});

const handleSelectChange = (keys, selectedRows) => {
  selectedRowKeys.value = keys;
  console.log(keys, selectedRows);
};
// 合同统计数据
const getContractStatistics = async () => {
  const res = await getDates("contract/GetContractStatistics");
  const data = res.data.result;
  contractStatistics.value = data;
  console.log("合同统计数据", data);
};
// 分页查询合同列表
const getContractList = async () => {
  const requestParams = {
    pageNum: 1,
    pageSize: 10,
    ...props.searchParams,
  };
  const res = await getDates("contract/GetContractList", requestParams);
  const resData = res.data.result.records;
  console.log("分页查询合同列表111", resData[0].contractInfo);
  if (res.data.code === 200) {
    const records = resData || [];
    data.value = records.map((item, index) => {
      const contractInfo = item.contractInfo || {};
      const contractDetails = item.contractDetails || {};
      return {
        ...contractInfo,
        ...contractDetails,
        key: contractInfo.id,
        index: index + 1,
        contractState: contractInfo.contractState === 1 ? "已通过" : "已超期",
        statusText: contractInfo.status === 1 ? "生效" : "未生效",
        isJrText: contractInfo.isJr === 1 ? "是" : "否",
        isReportText: contractInfo.isReport === 1 ? "是" : "否",
      };
    });
  }
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 600px;
  background-color: #fff;

  .spbu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
  }
}
</style>
