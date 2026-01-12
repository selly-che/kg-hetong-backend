<template>
  <div class="container">
    <div class="spbu">
      <span>合同数量：62</span>
      <span>合同金额：23，564.3658万元</span>
      <span>审定金额：46，564.3658万元</span>
      <span>开票金额：63，263.3658万元</span>
      <span>收款金额：63，263.3658万元</span>
      <a-button type="primary" @click="exportExcel">导出excel</a-button>
    </div>
    <a-table
      :row-selection="rowSelection"
      :columns="columns"
      :data-source="data"
      :scroll="{ x: 1500, y: 500 }"
      bordered
    >
      <template #action>
        <a>action</a>
      </template>
      <template #status="text">
        <a-tag :color="text === '已通过' ? 'green' : 'red'">{{ text }}</a-tag>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
const selectedRowKeys = ref([]);

const data = ref([]);
const columns = [
  {
    title: "序号",
    width: 70,
    dataIndex: "name",
    key: "name",
    fixed: "left",
    align: "center",
  },
  {
    title: "合同节点状态",
    width: 120,
    dataIndex: "age",
    key: "age",
    scopedSlots: { customRender: "status" },
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "address",
    key: "1",
    width: 150,
    align: "center",
  },
  {
    title: "合同编号",
    dataIndex: "address",
    key: "2",
    width: 150,
    align: "center",
  },
  {
    title: "合同识别号",
    dataIndex: "address",
    key: "3",
    width: 150,
    align: "center",
  },
  {
    title: "合同名称",
    dataIndex: "address",
    key: "4",
    width: 150,
    ellipsis: true,
    align: "center",
  },
  {
    title: "委托单位",
    dataIndex: "address",
    key: "5",
    width: 100,
    ellipsis: true,
    align: "center",
  },
  {
    title: "合同金额（万元）",
    dataIndex: "address",
    key: "6",
    width: 150,
    align: "center",
  },
  {
    title: "累计收款金额（万元）",
    dataIndex: "address",
    key: "7",
    width: 150,
    align: "center",
  },
  {
    title: "累计开票金额（万元）",
    dataIndex: "address",
    key: "8",
    width: 150,
    align: "center",
  },
  {
    title: "投资金额（万元）",
    dataIndex: "address",
    key: "8",
    width: 150,
    align: "center",
  },
  {
    title: "签订日期",
    dataIndex: "address",
    key: "9",
    width: 150,
    align: "center",
  },
  {
    title: "区域",
    dataIndex: "address",
    key: "10",
    width: 150,
    align: "center",
  },
  {
    title: "省份",
    dataIndex: "address",
    key: "11",
    width: 150,
    align: "center",
  },
  {
    title: "经办人",
    dataIndex: "address",
    key: "12",
    width: 150,
    align: "center",
  },
  {
    title: "板块",
    dataIndex: "address",
    key: "13",
    width: 150,
    align: "center",
  },
];

const exportExcel = () => {
  console.log("导出excel");
}
onMounted(() => {
  for (let i = 0; i < 100; i++) {
    data.value.push({
      key: i,
      name: `${i}`,
      age: i % 2 === 0 ? "已通过" : "已超期",
      address: `London Park no. ${i}`,
    });
  }
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
  }
}
</style>
