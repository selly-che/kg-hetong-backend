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
            <a-menu-item key="taTaskName">
              <a-checkbox v-model:checked="columnVisible.taTaskName">通知名称</a-checkbox>
            </a-menu-item>
            <a-menu-item key="taCreator">
              <a-checkbox v-model:checked="columnVisible.taCreator">下发人</a-checkbox>
            </a-menu-item>
            <a-menu-item key="tcName">
              <a-checkbox v-model:checked="columnVisible.tcName">任务名称</a-checkbox>
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
            <a-menu-item key="taSerialNumber">
              <a-checkbox v-model:checked="columnVisible.taSerialNumber">编号</a-checkbox>
            </a-menu-item>
            <a-menu-item key="taEndDate">
              <a-checkbox v-model:checked="columnVisible.taEndDate">截止时间</a-checkbox>
            </a-menu-item>
            <a-menu-item key="completionCount">
              <a-checkbox v-model:checked="columnVisible.completionCount">完成量</a-checkbox>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

    <!-- 表格区域 -->
    <a-table :dataSource="tableData" :columns="visibleColumns" :loading="tableLoading" :pagination="paginationConfig"
      size="small" bordered class="work-arrangement-table" @change="handleTableChange">
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
      <template #taTaskName="{ record }">
        <span class="notice-name-link" @click="showTaskContentModal(record)" style="color: #1890ff; cursor: pointer;">
          {{ record.taTaskName }}
        </span>
      </template>
      <!-- 操作 -->
      <template #operation="{ record }">
        <a-space>
          <PicLeftOutlined style="color: #1890ff;" @click="handleEdit(record)" />
        </a-space>
      </template>
    </a-table>

    <!-- 任务内容弹窗 -->
    <a-modal v-model:visible="taskContentModalVisible" :title="currentTaskContentTitle" width="800px" :footer="null">
      <a-table :dataSource="currentTaskContentData" :columns="taskContentColumns" :pagination="false" size="middle"
        bordered>
        <template #empty>
          <div class="empty-text">暂无任务内容</div>
        </template>

        <template #Taskcontent="{ record, index }">
          <span>
            {{ `任务${index + 1}` }}
          </span>
        </template>
      </a-table>
    </a-modal>

    <!-- PDF 文件弹窗 -->
    <a-modal v-model:visible="pdfModalVisible" :title="pdfTitle" width="1200px" :footer="null">
      <embed :src="pdfUrl" type="application/pdf" width="100%" height="700px" />
    </a-modal>


    <!-- 展示pdf 弹窗 -->
    <a-modal v-model:visible="pdfModalDetails" :title="pdfDetailsTitle" width="90%" :footer="null">
      <pdfDetail v-if="pdfModalDetails" :fromData="pdftableDetail"></pdfDetail>
    </a-modal>

    <!-- 展示工作详情 弹窗 -->
    <a-modal v-model:visible="detailModalVisible" width="80%" :title="detailModalTitle">
      <taskDetails v-if="detailModalVisible" :detailData="detailModalData" :type="'workList'"></taskDetails>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { SettingOutlined, PicLeftOutlined } from '@ant-design/icons-vue';
import getDatas from "@/network/index";
import { ElMessage } from 'element-plus';
// 引入组件pdfDetail 并展示
import pdfDetail from "./components/pdfDetail.vue";

import taskDetails from './components/taskDetails.vue';

const pdfModalDetails = ref(false)
const pdfDetailsTitle = ref('显示文件')
const pdftableDetail = ref({})

const detailModalTitle = ref('查看工作安排');

// 弹窗相关
const pdfModalVisible = ref(false);
const pdfTitle = ref('');
const pdfUrl = ref('https://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf');


// 路由相关
const route = useRoute();

// 搜索相关
const searchType = ref('noticeName');
const searchText = ref('');

// 分页相关
const pageSize = ref(10);
const currentPage = ref(1);
const total = ref(0);
const handlePageChange = (page: number, pageSize?: number) => {
  currentPage.value = page;
  console.log(page, pageSize);

};
// 状态筛选
const statusFilters = ref(['1', '2']);
const planFilters = ref(['0', '1']);
const tableLoading = ref(false);

// 列可见性控制
const columnVisible = ref({
  operation: true,
  taTaskName: true,
  taCreator: true,
  tcName: false,
  fileName: false,
  drawingName: false,
  planType: true,
  taSerialNumber: true,
  taEndDate: true,
  completionCount: true,
});

// 任务内容弹窗相关
const taskContentModalVisible = ref(false);
const currentTaskContentTitle = ref('任务内容列表');
const currentTaskContentData = ref<any[]>([]);

const taskContentColumns = [
  {
    title: '任务内容',
    ellipsis: true,
    slots: { customRender: 'Taskcontent' },
  },
  {
    title: '任务名称',
    dataIndex: 'tcName',
    key: 'tcName',
    width: 300,
    ellipsis: true,
  },
  {
    title: '完成时间',
    dataIndex: 'tcLimitDate',
    key: 'tcLimitDate',
    width: 200,
  },
];

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
      dataIndex: 'taTaskName',
      key: 'taTaskName',
      ellipsis: true,
      slots: { customRender: 'taTaskName' },
    },
    {
      title: '下发人',
      dataIndex: 'taCreator',
      key: 'taCreator',
    },
    {
      title: '任务名称',
      dataIndex: 'tcName',
      key: 'tcName',
      width: 200,
      ellipsis: true,
    },
    {
      title: '文件名称',
      dataIndex: 'fileName',
      key: 'fileName',
      ellipsis: true,
    },
    {
      title: '图纸名称',
      dataIndex: 'drawingName',
      key: 'drawingName',
      slots: { customRender: 'drawingName' },
    },
    {
      title: '计划类型',
      dataIndex: 'planType',
      key: 'planType',
      slots: { customRender: 'planType' },
    },
    {
      title: '编号',
      dataIndex: 'taSerialNumber',
      key: 'taSerialNumber',
    },
    {
      title: '截止时间',
      dataIndex: 'taEndDate',
      key: 'taEndDate',
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

// 判断是否有任务内容
const hasTaskContents = (record: any) => {
  return record.twaTaskContents && record.twaTaskContents.length > 0;
};

// 显示任务内容弹窗
const showTaskContentModal = (record: any) => {
  console.log(record, 'record');

  pdfModalDetails.value = true
  pdftableDetail.value = record
  return
  if (!hasTaskContents(record)) {
    ElMessage.info('该记录没有任务内容');
    return;
  }

  currentTaskContentTitle.value = `任务内容列表 - ${record.taTaskName || record.taTaskName}`;
  currentTaskContentData.value = record.twaTaskContents.map((task: any) => ({
    tcName: task.tcName || '-',
    tcLimitDate: task.tcLimitDate || '-'
  }));
  taskContentModalVisible.value = true;
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

    const projectId = route.query.projectId || '1'; // 从路由获取项目 ID

    const res = await getDatas("project/GetWorkArrangement", {
      pageNo: currentPage.value,
      pageSize: pageSize.value,
      projectId: projectId,
      stepId: '', // 全部
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
};

// 点击编辑
const detailModalVisible = ref(false);
const detailModalData = ref<any>({});
const detailForm = reactive({
  status: '',
  taTaskName: '',
});
const unitOptions = ref([
  { label: '规划院(运输组织)', value: '规划院(运输组织)' },
]);

// 任务详情数据
const taskDetailList = ref<any[]>([]);


// 点击编辑
const handleEdit = async (record: any) => {
  console.log('编辑记录:', record);
  detailModalVisible.value = true;
  detailModalData.value = record;

  // 加载任务详情数据
  await loadTaskDetails(record.Id);
};

// 加载任务详情数据
const loadTaskDetails = async (taskId: string) => {
  try {
    // const res = await getDatas("project/GetTaskDetails", {
    //   taskId: taskId
    // });

    // if (res && res.data.code === 200) {
    //   taskDetailList.value = res.data.result || [];
    // } else {
    //   ElMessage.warning(res.data.message || '加载任务详情失败');
    //   taskDetailList.value = [];
    // }
    taskDetailList.value = [
      {
        "Id": "5eb045c1-1109-80c9-c811-ef0678e782f9",
        "TD_Order": "1",
        "TD_Name": "1",
        "TD_WorkPointsName": null,
        "TD_DeptMajor": null,
        "TD_LimitTime": "2025年12月14日",
        "TD_CompletionTime": null,
        "Remark": "",
        "Is_Delete": 0,
        "TD_WorkPointsId": null,
        "TD_MajorId": null,
        "TD_MajorCharge": null,
        "TD_Deptid": null,
        "TC_Id": null,
        "Parent_Id": "843c36a6-c03f-ae76-f581-20a652f91f6e",
        "CompleteStatistics": null,
        "Is_Group": false,
        "Level": 1,
        "Is_Red": false,
        "isCG": true,
        "Colour": "#52D017",
        "Material_id": null,
        "input_file": null,
        "speciality": null,
        "MaterialIncomplete": null,
        "MaterialTotal": null,
        "MaterialColour": null,
        "TD_ProjectName": null,
        "TD_NoticeName": null,
        "Status": null,
        "Reason": null
      },
      {
        "Id": "050d9f34-dfc8-44e5-b7a2-e7e1da075f3a",
        "TD_Order": "2",
        "TD_Name": "11",
        "TD_WorkPointsName": "工点车站",
        "TD_DeptMajor": "规划院(运输组织)",
        "TD_LimitTime": "2025-12-13",
        "TD_CompletionTime": "2025-12-15",
        "Remark": null,
        "Is_Delete": 0,
        "TD_WorkPointsId": "2101",
        "TD_MajorId": null,
        "TD_MajorCharge": "曾扬",
        "TD_Deptid": null,
        "TC_Id": "5eb045c1-1109-80c9-c811-ef0678e782f9",
        "Parent_Id": "5eb045c1-1109-80c9-c811-ef0678e782f9",
        "CompleteStatistics": null,
        "Is_Group": false,
        "Level": 2,
        "Is_Red": false,
        "isCG": true,
        "Colour": "#52D017",
        "Material_id": null,
        "input_file": null,
        "speciality": null,
        "MaterialIncomplete": null,
        "MaterialTotal": null,
        "MaterialColour": "",
        "TD_ProjectName": null,
        "TD_NoticeName": null,
        "Status": null,
        "Reason": null
      },
      {
        "Id": "82d9d8be-e045-49c6-82b0-dcbe831af2cc",
        "TD_Order": "3",
        "TD_Name": "22",
        "TD_WorkPointsName": "工点车站",
        "TD_DeptMajor": "规划院(运输组织)",
        "TD_LimitTime": "2025-12-14",
        "TD_CompletionTime": "2025-12-15",
        "Remark": null,
        "Is_Delete": 0,
        "TD_WorkPointsId": "2101",
        "TD_MajorId": null,
        "TD_MajorCharge": "曾扬",
        "TD_Deptid": null,
        "TC_Id": "5eb045c1-1109-80c9-c811-ef0678e782f9",
        "Parent_Id": "5eb045c1-1109-80c9-c811-ef0678e782f9",
        "CompleteStatistics": null,
        "Is_Group": false,
        "Level": 2,
        "Is_Red": false,
        "isCG": true,
        "Colour": "#52D017",
        "Material_id": null,
        "input_file": null,
        "speciality": null,
        "MaterialIncomplete": null,
        "MaterialTotal": null,
        "MaterialColour": "",
        "TD_ProjectName": null,
        "TD_NoticeName": null,
        "Status": null,
        "Reason": null
      },
      {
        "Id": "20220a6d-db6c-1721-b482-4d7dc9390918",
        "TD_Order": "2",
        "TD_Name": "2",
        "TD_WorkPointsName": null,
        "TD_DeptMajor": null,
        "TD_LimitTime": "2025年12月15日",
        "TD_CompletionTime": null,
        "Remark": "",
        "Is_Delete": 0,
        "TD_WorkPointsId": null,
        "TD_MajorId": null,
        "TD_MajorCharge": null,
        "TD_Deptid": null,
        "TC_Id": null,
        "Parent_Id": "843c36a6-c03f-ae76-f581-20a652f91f6e",
        "CompleteStatistics": null,
        "Is_Group": false,
        "Level": 1,
        "Is_Red": false,
        "isCG": true,
        "Colour": "#52D017",
        "Material_id": null,
        "input_file": null,
        "speciality": null,
        "MaterialIncomplete": null,
        "MaterialTotal": null,
        "MaterialColour": null,
        "TD_ProjectName": null,
        "TD_NoticeName": null,
        "Status": null,
        "Reason": null
      },
      {
        "Id": "bc9bebe7-8b37-421f-997a-3c32a7233c7b",
        "TD_Order": "3",
        "TD_Name": "33",
        "TD_WorkPointsName": "工点车站",
        "TD_DeptMajor": "规划院(运输组织)",
        "TD_LimitTime": "2025-12-14",
        "TD_CompletionTime": "2025-12-15",
        "Remark": null,
        "Is_Delete": 0,
        "TD_WorkPointsId": "2101",
        "TD_MajorId": null,
        "TD_MajorCharge": "曾扬",
        "TD_Deptid": null,
        "TC_Id": "20220a6d-db6c-1721-b482-4d7dc9390918",
        "Parent_Id": "20220a6d-db6c-1721-b482-4d7dc9390918",
        "CompleteStatistics": null,
        "Is_Group": false,
        "Level": 2,
        "Is_Red": false,
        "isCG": true,
        "Colour": "#52D017",
        "Material_id": null,
        "input_file": null,
        "speciality": null,
        "MaterialIncomplete": null,
        "MaterialTotal": null,
        "MaterialColour": "",
        "TD_ProjectName": null,
        "TD_NoticeName": null,
        "Status": null,
        "Reason": null
      },
      {
        "Id": "7bb8bf1f-7d58-42d0-b968-5083b4f10f88",
        "TD_Order": "4",
        "TD_Name": "44",
        "TD_WorkPointsName": "工点车站",
        "TD_DeptMajor": "规划院(运输组织)",
        "TD_LimitTime": "2025-12-15",
        "TD_CompletionTime": "2025-12-15",
        "Remark": null,
        "Is_Delete": 0,
        "TD_WorkPointsId": "2101",
        "TD_MajorId": null,
        "TD_MajorCharge": "曾扬",
        "TD_Deptid": null,
        "TC_Id": "20220a6d-db6c-1721-b482-4d7dc9390918",
        "Parent_Id": "20220a6d-db6c-1721-b482-4d7dc9390918",
        "CompleteStatistics": null,
        "Is_Group": false,
        "Level": 2,
        "Is_Red": false,
        "isCG": true,
        "Colour": "#52D017",
        "Material_id": null,
        "input_file": null,
        "speciality": null,
        "MaterialIncomplete": null,
        "MaterialTotal": null,
        "MaterialColour": "",
        "TD_ProjectName": null,
        "TD_NoticeName": null,
        "Status": null,
        "Reason": null
      },
      {
        "Id": "2689801f-ea9d-b7d7-d6df-ee2fb783a93d",
        "TD_Order": "3",
        "TD_Name": "3",
        "TD_WorkPointsName": null,
        "TD_DeptMajor": null,
        "TD_LimitTime": "2025年12月16日",
        "TD_CompletionTime": null,
        "Remark": "",
        "Is_Delete": 0,
        "TD_WorkPointsId": null,
        "TD_MajorId": null,
        "TD_MajorCharge": null,
        "TD_Deptid": null,
        "TC_Id": null,
        "Parent_Id": "843c36a6-c03f-ae76-f581-20a652f91f6e",
        "CompleteStatistics": null,
        "Is_Group": false,
        "Level": 1,
        "Is_Red": false,
        "isCG": true,
        "Colour": "#FF0000",
        "Material_id": null,
        "input_file": null,
        "speciality": null,
        "MaterialIncomplete": null,
        "MaterialTotal": null,
        "MaterialColour": null,
        "TD_ProjectName": null,
        "TD_NoticeName": null,
        "Status": null,
        "Reason": null
      },
      {
        "Id": "4e43cc97-0ea9-473a-a765-d1e27379b47c",
        "TD_Order": "4",
        "TD_Name": "55",
        "TD_WorkPointsName": "工点车站",
        "TD_DeptMajor": "规划院(运输组织)",
        "TD_LimitTime": "2025-12-16",
        "TD_CompletionTime": "",
        "Remark": null,
        "Is_Delete": 0,
        "TD_WorkPointsId": "2101",
        "TD_MajorId": null,
        "TD_MajorCharge": "曾扬",
        "TD_Deptid": null,
        "TC_Id": "2689801f-ea9d-b7d7-d6df-ee2fb783a93d",
        "Parent_Id": "2689801f-ea9d-b7d7-d6df-ee2fb783a93d",
        "CompleteStatistics": null,
        "Is_Group": false,
        "Level": 2,
        "Is_Red": false,
        "isCG": true,
        "Colour": "#FF0000",
        "Material_id": null,
        "input_file": null,
        "speciality": null,
        "MaterialIncomplete": null,
        "MaterialTotal": null,
        "MaterialColour": "",
        "TD_ProjectName": null,
        "TD_NoticeName": null,
        "Status": null,
        "Reason": "未上传成果"
      }
    ];
  } catch (error) {
    console.error('加载任务详情异常:', error);
    ElMessage.error('加载任务详情过程中发生错误');
    taskDetailList.value = [];
  }
};


// 监听路由参数变化
watch(() => [route.query.projectId, route.query.stepId], () => {
  console.log('路由参数变化，重新查询数据');
  handleSearch();
});

onMounted(() => {
  console.log('WorkArrangementList mounted');
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

.notice-name-link {
  transition: all 0.3s;
}

.notice-name-link:hover {
  text-decoration: underline;
  opacity: 0.8;
}

:deep(.ant-table-thead > tr > th) {
  background-color: #f5f9ff !important;
}

/* 详情弹窗样式 */
.detail-container {
  max-height: 70vh;
  overflow-y: auto;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f5f9ff;
  border-radius: 4px;
  margin-bottom: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.detail-image {
  width: 95px;
  height: 85px;
  border-radius: 4px;
  object-fit: contain;
}

.header-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.info-subtitle {
  font-size: 12px;
  padding: 0 2px;
  border: 1px solid #1c84c6;
  color: #1c84c6;
  border-radius: 4px;
  cursor: pointer;
  width: 40%;

  &:hover {
    /* 加延迟 */
    transition: all 0.5s;
    background: #1c84c6;
    color: #fff;
  }
}

.detail-filter {
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
  margin-bottom: 16px;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-left: 4px solid #1890ff;
  border-radius: 4px;
  transition: all 0.3s;
}

.task-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.parent-task {
  background: #f0f7ff;
  border-left-width: 5px;
}

.child-task {
  margin-left: 40px;
  border-left-width: 3px;
}

.task-order {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1890ff;
  color: #fff;
  border-radius: 50%;
  font-weight: 600;
  margin-right: 12px;
  flex-shrink: 0;
}

.parent-task .task-order {
  background: #0050b3;
}

.task-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.task-name {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.task-detail {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.detail-item {
  font-size: 13px;
  color: #666;
}

.task-time {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #999;
}

.task-reason {
  margin-top: 4px;
}

.reason-text {
  font-size: 13px;
  color: #ff4d4f;
  background: #fff1f0;
  padding: 2px 8px;
  border-radius: 2px;
}

.task-status {
  margin-left: 12px;
  flex-shrink: 0;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-green {
  background: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

.status-red {
  background: #fff1f0;
  color: #ff4d4f;
  border: 1px solid #ffa39e;
}

.empty-state {
  padding: 60px 0;
  text-align: center;
}



:deep(.el-radio-group) {
  display: flex;
  gap: 16px;
}

:deep(.ant-form-inline .ant-form-item) {
  margin-right: 16px;
  margin-bottom: 0;
}
</style>