<template>
  <div class="work-arrangement-container">
    <!-- 搜索区域 -->
    <div class="search-bar">
      <a-select v-model:value="searchType" style="width: 100px; margin-right: 8px">
        <a-select-option value="noticeName">通知名称</a-select-option>
        <a-select-option value="taskName">任务名称</a-select-option>
      </a-select>

      <a-input v-model:value="searchText" placeholder="请输入名称" style="width: 300px; margin-right: 16px" />

      <!-- 状态筛选 -->
      <a-checkbox-group v-model:value="statusFilters" style="margin-right: 16px">
        <a-checkbox value="1">未完成</a-checkbox>
        <a-checkbox value="2">已完成</a-checkbox>
      </a-checkbox-group>

      <!-- 计划类型筛选 -->
      <a-checkbox-group v-model:value="planFilters" style="margin-right: 16px">
        <a-checkbox value="0">过程计划</a-checkbox>
        <a-checkbox value="1">阶段计划</a-checkbox>
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
            <a-menu-item key="completionCount">
              <a-checkbox v-model:checked="columnVisible.completionCount">完成量</a-checkbox>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

    <!-- 表格区域 -->
    <a-table 
      :dataSource="processedTableData" 
      :columns="visibleColumns" 
      :loading="tableLoading" 
      :pagination="paginationConfig"
      size="small"
      bordered 
      class="work-arrangement-table"
      @change="handleTableChange">
      <template #empty>
        <div class="empty-text">没有找到匹配的记录</div>
      </template>
      
      <!-- 自定义列渲染 -->
      <template #planType="{ record }">
        <span>{{ getPlanTypeName(record.taPlanType) }}</span>
      </template>
      
      <template #drawingName="{ record }">
        <span>{{ record.taHasPictureWork ? '有' : '无' }}</span>
      </template>
      
      <!-- <template #operation="{ record }">
        <a-space>
          <a-button type="link" size="small" @click="handleViewDetail(record)">查看</a-button>
          <a-button type="link" size="small" @click="handleEdit(record)">编辑</a-button>
        </a-space>
      </template> -->
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { SettingOutlined } from '@ant-design/icons-vue';
import getDatas from "@/network/index";
import { ElMessage } from 'element-plus';

const route = useRoute();

// 搜索相关
const searchType = ref('noticeName');
const searchText = ref('');

// 分页相关
const pageSize = ref(10);
const currentPage = ref(1);
const total = ref(0);

// 状态筛选
const statusFilters = ref(['1', '2']);
const planFilters = ref(['0', '1']);
const tableLoading = ref(false);

// 列可见性控制
const columnVisible = ref({
  operation: false,
  noticeName: true,
  assigner: true,
  taskName: true,
  fileName: true,
  drawingName: true,
  planType: true,
  number: true,
  deadline: true,
  completionCount: true,
});

// 表格数据
const tableData = ref<any[]>([]);

// 动态计算可见列
const visibleColumns = computed(() => {
  const baseColumns = [
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 120,
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
      width: 120,
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName',
      width: 200,
      ellipsis: true,
    },
    {
      title: '文件名称',
      dataIndex: 'fileName',
      key: 'fileName',
      width: 200,
      ellipsis: true,
    },
    {
      title: '图纸名称',
      dataIndex: 'drawingName',
      key: 'drawingName',
      width: 100,
      slots: { customRender: 'drawingName' },
    },
    {
      title: '计划类型',
      dataIndex: 'planType',
      key: 'planType',
      width: 120,
      slots: { customRender: 'planType' },
    },
    {
      title: '编号',
      dataIndex: 'number',
      key: 'number',
      width: 150,
    },
    {
      title: '截止时间',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 160,
    },
    {
      title: '完成量',
      dataIndex: 'completionCount',
      key: 'completionCount',
      width: 100,
    },
  ];

  return baseColumns.filter((col) => columnVisible.value[col.key as keyof typeof columnVisible.value]);
});

// 处理后的表格数据（展平嵌套数据）
const processedTableData = computed(() => {
  return tableData.value.flatMap((item: any) => {
    // 如果有twaTaskContents数组，为每个任务内容创建一行
    if (item.twaTaskContents && item.twaTaskContents.length > 0) {
      return item.twaTaskContents.map((taskContent: any) => ({
        key: `${item.id}-${taskContent.id}`,
        id: item.id,
        noticeName: taskContent.tcName || '-', // 通知名称
        assigner: item.taCreator || '-', // 下发人
        taskName: item.taTaskName || '-', // 任务名称
        fileName: item.taPreface || '-', // 文件名称
        drawingName: item.taHasPictureWork, // 图纸名称（布尔值）
        planType: item.taPlanType || 0, // 计划类型
        number: item.taSerialNumber || '-', // 编号
        deadline: taskContent.tcLimitDate || item.taEndDate || '-', // 截止时间
        completionCount: item.completionCount || '0/0', // 完成量
        originalData: item, // 保存原始数据用于操作
        taskContent: taskContent // 保存任务内容
      }));
    } else {
      // 如果没有任务内容，创建单行数据
      return [{
        key: item.id,
        id: item.id,
        noticeName: '-', // 通知名称
        assigner: item.taCreator || '-', // 下发人
        taskName: item.taTaskName || '-', // 任务名称
        fileName: item.taPreface || '-', // 文件名称
        drawingName: item.taHasPictureWork, // 图纸名称
        planType: item.taPlanType || 0, // 计划类型
        number: item.taSerialNumber || '-', // 编号
        deadline: item.taEndDate || '-', // 截止时间
        completionCount: item.completionCount || '0/0', // 完成量
        originalData: item
      }];
    }
  });
});

// 分页配置
const paginationConfig = computed(() => ({
  current: currentPage.value,
  pageSize: pageSize.value,
  total: total.value,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条记录`,
  pageSizeOptions: ['10', '20', '50', '100']
}));

// 获取计划类型名称
const getPlanTypeName = (planType: number) => {
  const planTypeMap: Record<number, string> = {
    0: '过程计划',
    1: '阶段计划',
    2: '其他计划'
  };
  return planTypeMap[planType] || '未知类型';
};

// 查询处理
const handleSearch = async () => {
  try {
    tableLoading.value = true;
    
    console.log('查询条件:', {
      searchType: searchType.value,
      searchText: searchText.value,
      statusFilters: statusFilters.value,
      planFilters: planFilters.value,
    });
    
    const projectId = route.query.projectId || '1'; // 从路由获取项目ID
    
    const res = await getDatas("project/GetWorkArrangement", {
      pageNo: currentPage.value,
      pageSize: pageSize.value,
      projectId: projectId,
      projectStep: '', // 全部
      // 可以根据需要添加更多筛选条件
    });
    
    if (res && res.data.code === 200) {
      tableData.value = res.data.result.records || [];
      total.value = res.data.result.total || 0;
    } else {
      ElMessage.warning(res.data.message || '查询失败');
      tableData.value = [];
      total.value = 0;
    }
  } catch (error) {
    console.error('查询异常:', error);
    ElMessage.error('查询过程中发生错误');
    tableData.value = [];
    total.value = 0;
  } finally {
    tableLoading.value = false;
  }
};

// 重置处理
const handleReset = () => {
  searchText.value = '';
  statusFilters.value = ['1', '2'];
  planFilters.value = ['0', '1'];
  currentPage.value = 1;
  handleSearch();
};

// 表格分页变化处理
const handleTableChange = (pagination: any) => {
  currentPage.value = pagination.current;
  pageSize.value = pagination.pageSize;
  handleSearch();
};

// 查看详情
const handleViewDetail = (record: any) => {
  console.log('查看详情:', record);
  // 这里可以跳转到详情页面或打开模态框
};

// 编辑操作
const handleEdit = (record: any) => {
  console.log('编辑记录:', record);
  // 这里可以跳转到编辑页面或打开编辑模态框
};

onMounted(() => {
  handleSearch();
});
</script>

<style scoped>
.work-arrangement-container {
  padding: 20px;
  background: #fff;
  height: 100%;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
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

:deep(.ant-table-thead > tr > th) {
  background-color: #fafafa;
  font-weight: 600;
}

:deep(.ant-table-tbody > tr:hover) {
  background-color: #f5f5f5;
}
</style>