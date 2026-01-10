<template>
  <div class="context">
    <a-table :columns="columns" :data-source="data" bordered>
      <template v-slot:role="{ text }">
        <a-tag :color="getRoleColor(text)">
          {{ text }}
        </a-tag>
      </template>
      <template v-slot:status="{ text }">
        <a-tag :color="getStatusColor(text)">
          {{ text }}
        </a-tag>
      </template>
      <template v-slot:action="{ record }">
        <div style="display: flex; justify-content: space-around; width: 100%">
          <a-button size="small" @click="handleEdit(record)">
            <EditTwoTone />
          </a-button>
          <a-button size="small" @click="handleDelete(record)">
            <DeleteTwoTone />
          </a-button>
        </div>
      </template>
    </a-table>
    <modal ref="editModal">
      <a-form layout="vertical">
        <a-form-item label="用户名">
          <a-input
            v-model:value="records.username"
            placeholder="请输入用户名"
          />
        </a-form-item>
        <a-form-item label="姓名">
          <a-input v-model:value="records.name" placeholder="请输入姓名" />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-model:value="records.email" placeholder="请输入邮箱" />
        </a-form-item>
        <a-form-item label="角色">
          <a-select v-model:value="records.role" placeholder="请选择角色">
            <a-select-option value="管理员">管理员</a-select-option>
            <a-select-option value="部门经理">部门经理</a-select-option>
            <a-select-option value="普通用户">普通用户</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="部门">
          <a-input
            v-model:value="records.department"
            placeholder="请输入部门"
          />
        </a-form-item>
        <a-form-item label="状态">
          <a-select v-model:value="records.status" placeholder="请选择状态">
            <a-select-option value="在线">在线</a-select-option>
            <a-select-option value="离线">离线</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </modal>
  </div>
</template>
<script setup>
// 引入Modal组件
import Modal from "./Modal.vue";
import { ref } from "vue";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons-vue";
const editModal = ref(null);
const columns = [
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
    //   align: 'center'
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
    ellipsis: true,
  },
  {
    title: "角色",
    dataIndex: "role",
    key: "role",
    slots: { customRender: "role" },
  },
  {
    title: "部门",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    slots: { customRender: "status" },
  },
  {
    title: "最后登录",
    dataIndex: "lastLogin",
    key: "lastLogin",
  },
  {
    title: "操作",
    key: "action",
    width: 120,
    fixed: "right",
    slots: { customRender: "action" },
  },
];
const data = [
  {
    key: "1",
    username: "admin",
    name: "张三",
    email: "zhangsan@example.com",
    role: "管理员",
    department: "技术部",
    status: "在线",
    lastLogin: "2026-01-08 10:30:00",
  },
  {
    key: "2",
    username: "user001",
    name: "李四",
    email: "lisi@example.com",
    role: "普通用户",
    department: "市场部",
    status: "离线",
    lastLogin: "2026-01-07 16:45:00",
  },
  {
    key: "3",
    username: "user002",
    name: "王五",
    email: "wangwu@example.com",
    role: "普通用户",
    department: "财务部",
    status: "在线",
    lastLogin: "2026-01-08 09:15:00",
  },
  {
    key: "4",
    username: "manager",
    name: "赵六",
    email: "zhaoliu@example.com",
    role: "部门经理",
    department: "技术部",
    status: "离线",
    lastLogin: "2026-01-06 14:20:00",
  },
];
const records = ref(null);
const getStatusColor = (status) => {
  return status === "在线" ? "green" : "red";
};
const getRoleColor = (role) => {
  switch (role) {
    case "管理员":
      return "red";
    case "部门经理":
      return "orange";
    case "普通用户":
      return "green";
    default:
      return "default";
  }
};
const handleEdit = (record) => {
  console.log("编辑记录:", record);
  records.value = record;
  // 显示Modal
  editModal.value.showModal(record);
};
const handleDelete = (record) => {
  console.log("删除记录:", record);
  // 添加删除
};
</script>

<style lang="less" scoped></style>
