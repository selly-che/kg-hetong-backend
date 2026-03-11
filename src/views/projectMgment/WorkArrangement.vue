<template>
    <div class="work-arrangement-container">
        <!-- 搜索与筛选区域 -->
        <div class="search-bar">
            <!-- 下拉选择搜索字段 -->
            <a-select v-model:value="searchType" style="width: 100px; margin-right: 8px">
                <a-select-option value="0">通知名称</a-select-option>
                <a-select-option value="1">任务名称</a-select-option>
            </a-select>

            <!-- 搜索输入框 -->
            <a-input v-model:value="searchText" placeholder="请输入名称" style="width: 300px; margin-right: 16px" />

            <!-- 状态筛选 -->
            <a-checkbox-group v-model:value="statusFilters" style="margin-right: 16px">
                <a-checkbox value="-1">未下发</a-checkbox>
                <a-checkbox value="0">未签发</a-checkbox>
                <a-checkbox value="1">未完成</a-checkbox>
                <a-checkbox value="-2">已退回</a-checkbox>
                <a-checkbox value="2">已完成</a-checkbox>
                <a-checkbox value="5">未分解</a-checkbox>
            </a-checkbox-group>

            <!-- 计划类型筛选 -->
            <a-checkbox-group v-model:value="planFilters" style="margin-right: 16px">
                <a-checkbox value="processPlan">过程计划</a-checkbox>
                <a-checkbox value="phasePlan">阶段计划</a-checkbox>
            </a-checkbox-group>

            <!-- 操作按钮 -->
            <a-button type="primary" @click="handleSearch">查询</a-button>
            <a-button @click="handleReset">重置</a-button>
            <!-- <a-button type="dashed" @click="handleAdd">新增</a-button> -->

            <!-- 列设置 -->
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
                        <a-menu-item key="taSerialNumber">
                            <a-checkbox v-model:checked="columnVisible.taSerialNumber">编号</a-checkbox>
                        </a-menu-item>
                        <a-menu-item key="taEndDate">
                            <a-checkbox v-model:checked="columnVisible.taEndDate">截止时间</a-checkbox>
                        </a-menu-item>
                        <a-menu-item key="taStatus">
                            <a-checkbox v-model:checked="columnVisible.taStatus">状态</a-checkbox>
                        </a-menu-item>
                        <a-menu-item key="taReason">
                            <a-checkbox v-model:checked="columnVisible.taReason">签发退回原因</a-checkbox>
                        </a-menu-item>
                        <a-menu-item key="planExecutionProgress">
                            <a-checkbox v-model:checked="columnVisible.planExecutionProgress">阶段计划执行进度</a-checkbox>
                        </a-menu-item>
                        <a-menu-item key="completionCount">
                            <a-checkbox v-model:checked="columnVisible.completionCount">完成量</a-checkbox>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>

        <!-- 表格区域 -->
        <a-table :dataSource="tableData" :columns="visibleColumns" :loading="tableLoading" :pagination="false"
            size="small" bordered class="work-arrangement-table">
            <template #empty>
                <div class="empty-text">没有找到匹配的记录</div>
            </template>
            <template #taStatus="{ record }">
                <a-tag>
                    {{ getStatusText(record.taStatus) }}
                </a-tag>
            </template>
        </a-table>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted,watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { SettingOutlined } from '@ant-design/icons-vue';
import getDatas from "@/network/index";
import { ElMessage } from 'element-plus';
// 搜索相关
const searchType = ref('0');
const searchText = ref('');
// 分页相关
const pageSize = ref(10);
const currentPage = ref(1);
const total = ref(0);
// 状态筛选
const statusFilters = ref(['-1', '0', '1', '-2', '2', '5']);
const planFilters = ref(['processPlan', 'phasePlan']);

const tableLoading = ref(false);

// 列可见性控制
const columnVisible = ref({
    operation: false,
    taTaskName: true,
    taCreator: true,
    taSerialNumber: true,
    taEndDate: true,
    taStatus: true,
    taReason: true,
    planExecutionProgress: true,
    completionCount: true,
});
// 状态映射函数
const getStatusText = (status: number) => {
    const statusMap: Record<number, string> = {
        '-2': '已退回',
        '-1': '未下发',
        '0': '未签发',
        '1': '未完成',
        '2': '已完成',
        '3': '已作废',
        '4': '已暂停',
        '5': '未分解'
    };
    return statusMap[status] || '未知状态';
};
// 表格数据（模拟）
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
            dataIndex: 'taTaskName',
            key: 'taTaskName',
            width: 150,
            ellipsis: true,
        },
        {
            title: '下发人',
            dataIndex: 'taCreator',
            key: 'taCreator',
            width: 100,
        },
        {
            title: '编号',
            dataIndex: 'taSerialNumber',
            key: 'taSerialNumber',
            width: 100,
        },
        {
            title: '截止时间',
            dataIndex: 'taEndDate',
            key: 'taEndDate',
            width: 120,
            sorter: (a: any, b: any) => new Date(a.taEndDate).getTime() - new Date(b.taEndDate).getTime(),
        },
        {
            title: '状态',
            dataIndex: 'taStatus',
            key: 'taStatus',
            width: 100,
            slots: { customRender: 'taStatus' },
        },
        {
            title: '签发退回原因',
            dataIndex: 'taReason',
            key: 'taReason',
            width: 150,
            ellipsis: true,
        },

        {
            title: '阶段计划执行进度',
            dataIndex: 'planExecutionProgress',
            key: 'planExecutionProgress',
            width: 150,
        },
        {
            title: '完成量',
            dataIndex: 'completionCount',
            key: 'completionCount',
            width: 150,
        },

    ];

    return columns.filter((col) => columnVisible.value[col.key as keyof typeof columnVisible.value]);
});

// 查询处理
const router = useRouter();
const handleSearch = async () => {
    try {
        tableLoading.value = true;
        const projectId = router.currentRoute.value.query.projectId;
        const projectStep = router.currentRoute.value.query.projectStep;
        const res = await getDatas("project/GetWorkArrangement", {
            // id: 1,
            // workType: searchType.value,
            pageNo: currentPage.value,
            pageSize: pageSize.value,
            projectId: projectId,
            projectStep: projectStep, // 全部
            taPlanType: statusFilters.value.join(','),
        })
        if (res && res.data.code === 200) {
            tableData.value = res.data.result.records || [];
            total.value = res.data.result.total || 0;
        } else {
            ElMessage.warning(res.data.message || '查询失败');
            tableData.value = [];
            total.value = 0;
        }
    } catch (error) {
        ElMessage.warning('查询失败');
        tableData.value = [];
        total.value = 0;
        tableLoading.value = false;
    } finally {
        tableLoading.value = false;
    }
};

// 重置处理
const handleReset = () => {
    searchText.value = '';
    statusFilters.value = ['-1', '0', '1', '-2', '2', '5'];
    planFilters.value = ['processPlan', 'phasePlan'];
};

// 新增处理
const handleAdd = () => {
    console.log('点击新增');
};
console.log('页面加载了多次');

const route = useRoute();
// 判断url中的projectId和projectStep是否变化，如果变化则重新查询数据
watch(() => [route.query.projectId, route.query.projectStep], () => {
  console.log('路由参数变化，重新查询数据');
  handleSearch();
});
onMounted(() => {
    handleSearch();
    console.log('WorkArrangement mounted');
    
})
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
</style>