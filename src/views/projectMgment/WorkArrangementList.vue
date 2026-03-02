<template>
  <div class="work-arrangement-container">
    <!-- 搜索区域 -->
    <div class="search-bar">
      <a-select v-model:value="searchType" style="width: 100px; margin-right: 8px">
        <a-select-option value="noticeName">通知名称</a-select-option>
        <a-select-option value="taskName">任务名称</a-select-option>
      </a-select>

      <a-input
        v-model:value="searchText"
        placeholder="请输入名称"
        style="width: 300px; margin-right: 16px"
      />

      <!-- 状态筛选 -->
      <a-checkbox-group v-model:value="statusFilters" style="margin-right: 16px">
        <a-checkbox value="unfinished">未完成</a-checkbox>
        <a-checkbox value="finished">已完成</a-checkbox>
      </a-checkbox-group>

      <!-- 计划类型筛选 -->
      <a-checkbox-group v-model:value="planFilters" style="margin-right: 16px">
        <a-checkbox value="processPlan">过程计划</a-checkbox>
        <a-checkbox value="phasePlan">阶段计划</a-checkbox>
      </a-checkbox-group>

      <!-- 查询和重置按钮 -->
      <a-button type="primary" @click="handleSearch">查询</a-button>
      <a-button @click="handleReset">重置</a-button>
          <!-- 列筛选菜单 -->
    <a-dropdown overlayClassName="column-filter-dropdown" trigger="click">
      <a-button>
        <SettingOutlined />
        <span>列设置</span>
      </a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item key="operation">
            <a-checkbox v-model:checked="columnVisible.operation">操作</a-checkbox>
          </a-menu-item>
          <a-menu-item key="noticeName">
            <a-checkbox v-model:checked="columnVisible.noticeName">通知名称</a-checkbox>
          </a-menu-item>
          <a-menu-item key="assigner">
            <a-checkbox v-model:checked="columnVisible.assigner">下发人</a-checkbox>
          </a-menu-item>
          <a-menu-item key="taskName">
            <a-checkbox v-model:checked="columnVisible.taskName">任务名称</a-checkbox>
          </a-menu-item>
          <a-menu-item key="fileName">
            <a-checkbox v-model:checked="columnVisible.fileName">文件名称</a-checkbox>
          </a-menu-item>
          <a-menu-item key="drawingName">
            <a-checkbox v-model:checked="columnVisible.drawingName">图纸名称</a-checkbox>
          </a-menu-item>
          <a-menu-item key="planType">
            <a-checkbox v-model:checked="columnVisible.planType">计划类型</a-checkbox>
          </a-menu-item>
          <a-menu-item key="number">
            <a-checkbox v-model:checked="columnVisible.number">编号</a-checkbox>
          </a-menu-item>
          <a-menu-item key="deadline">
            <a-checkbox v-model:checked="columnVisible.deadline">截止时间</a-checkbox>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    </div>

    <!-- 表格区域 -->
    <a-table
      :dataSource="tableData"
      :columns="visibleColumns"
      :pagination="false"
      size="small"
      bordered
      class="work-arrangement-table"
    >
      <template #empty>
        <div class="empty-text">没有找到匹配的记录</div>
      </template>
    </a-table>


  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { SettingOutlined } from '@ant-design/icons-vue';

// 搜索相关
const searchType = ref('noticeName');
const searchText = ref('');
const statusFilters = ref(['unfinished', 'finished']);
const planFilters = ref(['processPlan', 'phasePlan']);

// 列可见性控制
const columnVisible = ref({
  operation: true,
  noticeName: true,
  assigner: true,
  taskName: false,
  fileName: false,
  drawingName: false,
  planType: true,
  number: true,
  deadline: true,
});

// 表格数据
const tableData = ref([]);

// 动态计算可见列
const visibleColumns = computed(() => {
  const columns = [
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 80,
      fixed: 'left',
      align: 'center',
      slots: { customRender: 'operation' },
    },
    {
      title: '通知名称',
      dataIndex: 'noticeName',
      key: 'noticeName',
      width: 150,
      ellipsis: true,
    },
    {
      title: '下发人',
      dataIndex: 'assigner',
      key: 'assigner',
      width: 100,
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName',
      width: 150,
      ellipsis: true,
    },
    {
      title: '文件名称',
      dataIndex: 'fileName',
      key: 'fileName',
      width: 150,
      ellipsis: true,
    },
    {
      title: '图纸名称',
      dataIndex: 'drawingName',
      key: 'drawingName',
      width: 150,
      ellipsis: true,
    },
    {
      title: '计划类型',
      dataIndex: 'planType',
      key: 'planType',
      width: 100,
    },
    {
      title: '编号',
      dataIndex: 'number',
      key: 'number',
      width: 100,
    },
    {
      title: '截止时间',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 120,
    },
    {
      title: '完成量',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 120,
    },
  ];

  return columns.filter((col) => columnVisible.value[col.key as keyof typeof columnVisible.value]);
});

// 查询处理
const handleSearch = () => {
  console.log('查询条件:', {
    searchType: searchType.value,
    searchText: searchText.value,
    statusFilters: statusFilters.value,
    planFilters: planFilters.value,
  });
};

// 重置处理
const handleReset = () => {
  searchText.value = '';
  statusFilters.value = ['unfinished', 'finished'];
  planFilters.value = ['processPlan', 'phasePlan'];
};
</script>

<style scoped>
.work-arrangement-container {
  padding: 20px;
  background: #fff;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.work-arrangement-table {
  margin-top: 16px;
}

.empty-text {
  text-align: center;
  color: #999;
  padding: 40px 0;
}

.column-filter-dropdown {
  margin-left: 16px;
}
</style>