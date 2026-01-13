<template>
  <div style="margin: 20px">
    <!-- 搜索区域 -->
    <div
      class="search"
      style="display: flex; margin-top: 10px; font-size: 18px"
    >
      <a-form-item label="账号" style="width: 400px; margin-right: 10px">
        <a-input placeholder="请输入角色名" v-model="roleName"></a-input>
      </a-form-item>
      <a-button type="primary" @click="handleSearch" style="margin-right: 10px"
        >查询</a-button
      >
      <a-button type="primary" @click="handleReset">重置</a-button>
    </div>
    <!-- 按钮区 -->
    <div style="display: flex">
      <div class="button" style="margin-right: 10px">
        <a-button type="primary" @click="handleAdd">
          <template #icon><PlusOutlined /></template>
          新增</a-button
        >
      </div>
      <div class="button" style="margin-right: 10px">
        <a-button type="primary" @click="handleAdd">
          <template #icon><LoginOutlined /></template>
          导入</a-button
        >
      </div>
      <div class="button" style="margin-right: 10px">
        <a-button type="primary" @click="handleAdd">
          <template #icon><VerticalAlignBottomOutlined /></template>
          导出
        </a-button>
      </div>
    </div>
    <!-- 已选择项 -->
    <div
      class="ant-alert ant-alert-info"
      style="margin-bottom: 16px; margin-top: 10px"
    >
      <i class="anticon anticon-info-circle ant-alert-icon"></i>
      已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a
      >项&nbsp;&nbsp;
      <a style="margin-left: 24px" @click="onClearSelected">清空</a>
    </div>
    <!-- table -->
    <div class="table-container">
      <!-- 左侧主表格 -->
      <div class="table-wrapperzhu">
        <a-table
          :columns="columns"
          :data-source="data"
          class="components-table-demo-nested"
        >
          <!-- 操作键 -->
          <template #action="{ record }">
            <a
              @click="
                () => {
                  handleEdit(record);
                  showDetailTable = !showDetailTable;
                }
              "
            >
              {{ showDetailTable ? "隐藏" : "查看" }}
            </a>
          </template>
        </a-table>
      </div>

      <!-- 右侧子表格 -->
      <div class="table-wrapperzi">
        <a-table
          :columns="innerColumns"
          :data-source="innerData"
          :pagination="false"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
        >
          <template #bodyCell="{ column }">
            <template v-if="column.key === 'state'">
              <span>
                <a-badge status="success" />
                Finished
              </span>
            </template>
            <template v-else-if="column.key === 'operation'">
              <!-- 编辑+删除 -->
              <span class="table-operation">
                <a-button type="primary" @click="handleEdit(record)"
                  >编辑</a-button
                >
                <a-button type="danger" @click="handlaDelete(record)"
                  >删除</a-button
                >
              </span>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  PlusOutlined,
  VerticalAlignBottomOutlined,
  LoginOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";

const roleName = ref("");
const selectedRowKeys = ref([]);
const table = ref(null);
const showDetailTable = ref(false); // 控制右侧子表格的显示/隐藏
const columns = ref([
  {
    title: "角色名称",
    align: "center",
    dataIndex: "roleName",
    key: "roleName",
  },
  {
    title: "角色编码",
    align: "center",
    dataIndex: "roleCode",
    key: "roleCode",
  },
  {
    title: "备注",
    align: "center",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    align: "center",
    sorter: true,
    key: "createTime",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    align: "center",
    sorter: true,
    key: "updateTime",
  },
  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    key: "action",
    slots: { customRender: "action" },
  },
]);
const ipagination = ref({
  total: 0,
  current: 1,
  pageSize: 10,
});
const loading = ref(false);
const data = [
  {
    id: 1,
    roleName: "管理员",
    roleCode: "ADMIN",
    description: "系统管理员，拥有所有权限",
    createTime: "2026-01-10 10:30:00",
    updateTime: "2026-01-10 10:30:00",
  },
];
// 子表格列
const innerColumns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Status",
    key: "state",
  },
  {
    title: "Upgrade Status",
    dataIndex: "upgradeNum",
    key: "upgradeNum",
  },
  {
    title: "Action",
    dataIndex: "operation",
    key: "operation",
  },
];
// 子表格数据
const innerData = [];
for (let i = 0; i < 2; ++i) {
  innerData.push({
    key: i,
    date: "2014-12-24 23:12:00",
    name: `This is production name ${i + 1}`,
    upgradeNum: "Upgraded: 56",
  });
}
// 清空选择
const onClearSelected = () => {
  selectedRowKeys.value = [];
};

// 选择变更
const onSelectChange = (newSelectedRowKeys) => {
  selectedRowKeys.value = newSelectedRowKeys;
};

// 授权
const handlePerssion = (id) => {
  console.log("授权功能待实现", id);
};

// 编辑
const handleEdit = (record) => {
  console.log("编辑功能待实现", record);
};

// 删除
const handleDelete = (id) => {
  console.log("删除功能待实现", id);
};

// 查询
const handleSearch = () => {
  console.log("查询功能待实现", roleName.value);
};

// 重置
const handleReset = () => {
  roleName.value = "";
};

// 新增
const handleAdd = () => {
  console.log("新增功能待实现");
};

// 表格变化
const handleTableChange = (pagination, filters, sorter) => {
  console.log("表格变化", pagination, filters, sorter);
};
</script>
<style lang="less" scoped>
.table-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.table-wrapperzhu {
  width: v-bind('showDetailTable ? "49%" : "100%"');
}

.table-wrapperzi {
  width: v-bind('showDetailTable ? "49%" : "0%"');
  overflow: hidden;
  transition: width 0.3s ease;
}
button {
  border-radius: 5px;
}
</style>
