<template>
  <div>
    <!-- 搜索区域 -->
    <div class="search" style="display: flex">
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
    <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
      <i class="anticon anticon-info-circle ant-alert-icon"></i>
      已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a
      >项&nbsp;&nbsp;
      <a style="margin-left: 24px" @click="onClearSelected">清空</a>
    </div>
    <!-- table -->
    <a-table
      :columns="columns"
      :data-source="data"
      class="components-table-demo-nested"
    >
      <!-- 操作键 -->
      <template #action="{ record }">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-dropdown :placement="bottomRight">
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;" @click="handleDetail(record)">详情</a>
              </a-menu-item>

              <a-menu-item>
                <a
                  href="javascript:;"
                  @click="handleChangePassword(record.username)"
                  >密码</a
                >
              </a-menu-item>

              <a-menu-item>
                <a-popconfirm
                  title="确定删除吗?"
                  @confirm="() => handleDelete(record.id)"
                >
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item v-if="record.status == 1">
                <a-popconfirm
                  title="确定冻结吗?"
                  @confirm="() => handleFrozen(record.id, 2, record.username)"
                >
                  <a>冻结</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item v-if="record.status == 2">
                <a-popconfirm
                  title="确定解冻吗?"
                  @confirm="() => handleFrozen(record.id, 1, record.username)"
                >
                  <a>解冻</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item>
                <a
                  href="javascript:;"
                  @click="handleAgentSettings(record.username)"
                  >代理人</a
                >
              </a-menu-item>
            </a-menu>
          </template>
          <a> 更多 <DownOutlined /> </a>
        </a-dropdown>
      </template>

      <template #bodyCell="{ column }">
        <template v-if="column.key === 'operation'">
          <a>Publish</a>
        </template>
      </template>
      <template #expandedRowRender>
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
              <span class="table-operation">
                <a>Pause</a>
                <a>Stop</a>
                <a-dropdown>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item>Action 1</a-menu-item>
                      <a-menu-item>Action 2</a-menu-item>
                    </a-menu>
                  </template>
                  <a>
                    More
                    <down-outlined />
                  </a>
                </a-dropdown>
              </span>
            </template>
          </template>
        </a-table>
      </template>
    </a-table>
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
//当前子列点击显示后是排在主列的下面的，我想让子列排在主列的右边（它们各占一半）
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
for (let i = 0; i < 4; ++i) {
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
<style lang="less" scoped></style>
