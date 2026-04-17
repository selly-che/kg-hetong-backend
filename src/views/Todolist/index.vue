<template>
  <div class="todolist-container">
    <div class="search-form-wrapper">
      <a-form layout="inline" :model="searchForm">
        <a-form-item label="任务名称">
          <a-input
            v-model:value="searchForm.taskName"
            placeholder="请输入任务名称"
          />
        </a-form-item>
        <a-form-item label="任务状态">
          <a-select
            v-model:value="searchForm.completeStatus"
            style="width: 150px"
          >
            <a-select-option value="">全部</a-select-option>
            <a-select-option value="0">未完成</a-select-option>
            <a-select-option value="1">已完成</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <div style="display: flex; gap: 10px">
            <a-button type="primary" @click="handleSearch">查询</a-button>
            <a-button type="primary" @click="handleReset">重置</a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>

    <div class="table-container">
      <div class="table-toolbar">
        <a-space>
          <a-button size="small" @click="handleReset">
            <template #icon><ReloadOutlined /></template>
          </a-button>
          <!-- <a-button size="small">
            <template #icon><TableOutlined /></template>
            <DownOutlined />
          </a-button> -->
        </a-space>
      </div>

      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        bordered
        size="middle"
        :row-class-name="() => 'table-row'"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'taskName'">
            <a class="task-link" @click="handleTaskClick(record)">{{
              record.taskName
            }}</a>
          </template>
          <template v-if="column.key === 'completeStatus'">
            {{ record.completeStatus === "1" ? "已完成" : "未完成" }}
          </template>
        </template>
      </a-table>
      <!-- 分页 -->
      <div class="custom-pagination">
        <div class="pagination-info">
          显示第
          {{
            pagination.total > 0
              ? (pagination.current - 1) * pagination.pageSize + 1
              : 0
          }}
          到第
          {{
            Math.min(pagination.current * pagination.pageSize, pagination.total)
          }}
          条记录，总共 {{ pagination.total }} 条记录 每页显示
          <a-select
            v-model:value="pagination.pageSize"
            size="small"
            style="width: 70px; margin: 0 5px"
            @change="handlePageSizeChange"
          >
            <a-select-option :value="10">10</a-select-option>
            <a-select-option :value="20">20</a-select-option>
            <a-select-option :value="50">50</a-select-option>
            <a-select-option :value="100">100</a-select-option>
          </a-select>
          条记录
        </div>
        <div class="pagination-buttons">
          <div
            class="page-btn"
            :class="{ disabled: pagination.current === 1 }"
            @click="goToPage(1)"
          >
            «
          </div>
          <div
            class="page-btn"
            :class="{ disabled: pagination.current === 1 }"
            @click="goToPage(pagination.current - 1)"
          >
            ‹
          </div>
          <div
            v-for="page in displayedPages"
            :key="page"
            class="page-btn"
            :class="{ active: pagination.current === page }"
            @click="goToPage(page)"
          >
            {{ page }}
          </div>
          <div
            class="page-btn"
            :class="{ disabled: pagination.current === totalPages }"
            @click="goToPage(pagination.current + 1)"
          >
            ›
          </div>
          <div
            class="page-btn"
            :class="{ disabled: pagination.current === totalPages }"
            @click="goToPage(totalPages)"
          >
            »
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { ReloadOutlined } from "@ant-design/icons-vue";
import getDatas from "@/network/index";

onMounted(() => {
  List();
});
const searchForm = reactive({
  taskName: "",
  completeStatus: "",
  endTime: "",
  startTime: "",
  pageNo: 1,
  pageSize: 10,
});

const columns = [
  {
    title: "任务名称",
    dataIndex: "taskName",
    key: "taskName",
    align: "left",
    headerAlign: "center",
  },
  {
    title: "所属模块",
    dataIndex: "module",
    key: "module",
    align: "center",
    width: 120,
  },
  {
    title: "任务状态",
    dataIndex: "completeStatus",
    key: "completeStatus",
    align: "center",
    width: 100,
  },
  {
    title: "发布人",
    dataIndex: "createBy",
    key: "createBy",
    align: "center",
    width: 100,
  },
  {
    title: "发布时间",
    dataIndex: "createTime",
    key: "createTime",
    align: "center",
    width: 120,
  },
];

const dataSource = ref([
  {
    completeStatus: "1",
    completeTime: "2025-01-03 17:10:00",
    createBy: "zhangsan",
    createTime: "2025-01-03 14:00:00",
    doId: "admin",
    doName: "王建国】下达了《234234234》的事务性工作，请填写完成情况",
    id: "TASK003",
    taskId: "d88c275e981f9c3c763ef6884877041d",
    taskName: "工作名称11",
  },
]);
const List = async () => {
  const res = await getDatas("message/getTaskArrangementTodoList", searchForm);
  console.log("待办列表22", res);
  if (res.data.code === 200) {
    dataSource.value = res.data.result.records;
    pagination.total = res.data.result.total || 0;
  }
};

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});

const totalPages = computed(() =>
  Math.ceil(pagination.total / pagination.pageSize),
);

const displayedPages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = pagination.current;

  let start = Math.max(1, current - 2);
  let end = Math.min(total, start + 4);
  if (end - start < 4) {
    start = Math.max(1, end - 4);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value || page === pagination.current)
    return;
  pagination.current = page;
  searchForm.pageNo = page;
  List();
};

const handlePageSizeChange = (val) => {
  pagination.pageSize = val;
  pagination.current = 1;
  searchForm.pageNo = 1;
  searchForm.pageSize = val;
  List();
};

const handleSearch = () => {
  List();
  console.log(searchForm);
};
const handleReset = () => {
  searchForm.taskName = "";
  searchForm.completeStatus = "";
  List();
};

const handleTaskClick = (record) => {
  console.log("Task clicked:", record);
};
</script>

<style lang="less" scoped>
.todolist-container {
  padding: 20px;
  background-color: #fff;
  min-height: 100vh;

  .search-form-wrapper {
    margin-bottom: 24px;

    :deep(.ant-form-item-label) {
      font-weight: bold;
    }
  }

  .table-container {
    background: #fff;
    border-radius: 4px;

    .table-toolbar {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 12px;
    }

    :deep(.ant-table-thead > tr > th) {
      background-color: #fafafa;
      font-weight: bold;
      color: #333;
      text-align: center !important;
    }

    .task-link {
      color: #1890ff;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .custom-pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    font-size: 14px;
    color: #666;

    .pagination-info {
      display: flex;
      align-items: center;
    }

    .pagination-buttons {
      display: flex;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      overflow: hidden;

      .page-btn {
        min-width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #dcdfe6;
        cursor: pointer;
        background: #fff;
        padding: 0 10px;
        transition: all 0.3s;
        user-select: none;

        &:last-child {
          border-right: none;
        }

        &:hover:not(.disabled) {
          background-color: #f5f7fa;
          color: #1890ff;
        }

        &.active {
          background-color: #f0f0f0;
          color: #333;
          font-weight: bold;
        }

        &.disabled {
          color: #c0c4cc;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
