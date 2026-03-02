<template>
    <div class="work-arrangement-container">
        <!-- 搜索与筛选区域 -->
        <div class="search-bar">
            <!-- 下拉选择搜索字段 -->
            <a-select v-model:value="searchType" style="width: 100px; margin-right: 8px">
                <a-select-option value="noticeName">通知名称</a-select-option>
                <a-select-option value="taskName">任务名称</a-select-option>
            </a-select>

            <!-- 搜索输入框 -->
            <a-input v-model:value="searchText" placeholder="请输入名称" style="width: 300px; margin-right: 16px" />

            <!-- 状态筛选 -->
            <a-checkbox-group v-model:value="statusFilters" style="margin-right: 16px">
                <a-checkbox value="notIssued">未下发</a-checkbox>
                <a-checkbox value="notSigned">未签发</a-checkbox>
                <a-checkbox value="unfinished">未完成</a-checkbox>
                <a-checkbox value="returned">已退回</a-checkbox>
                <a-checkbox value="finished">已完成</a-checkbox>
                <a-checkbox value="notDecomposed">未分解</a-checkbox>
            </a-checkbox-group>

            <!-- 计划类型筛选 -->
            <a-checkbox-group v-model:value="planFilters" style="margin-right: 16px">
                <a-checkbox value="processPlan">过程计划</a-checkbox>
                <a-checkbox value="phasePlan">阶段计划</a-checkbox>
            </a-checkbox-group>

            <!-- 操作按钮 -->
            <a-button type="primary" @click="handleSearch">查询</a-button>
            <a-button @click="handleReset">重置</a-button>
            <a-button type="dashed" @click="handleAdd">新增</a-button>

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
                        <a-menu-item key="noticeName">
                            <a-checkbox v-model:checked="columnVisible.noticeName">通知名称</a-checkbox>
                        </a-menu-item>
                        <a-menu-item key="assigner">
                            <a-checkbox v-model:checked="columnVisible.assigner">下发人</a-checkbox>
                        </a-menu-item>
                        <a-menu-item key="number">
                            <a-checkbox v-model:checked="columnVisible.number">编号</a-checkbox>
                        </a-menu-item>
                        <a-menu-item key="deadline">
                            <a-checkbox v-model:checked="columnVisible.deadline">截止时间</a-checkbox>
                        </a-menu-item>
                        <a-menu-item key="status">
                            <a-checkbox v-model:checked="columnVisible.status">状态</a-checkbox>
                        </a-menu-item>
                        <a-menu-item key="reason">
                            <a-checkbox v-model:checked="columnVisible.reason">签发退回原因</a-checkbox>
                        </a-menu-item>
                        <a-menu-item key="progress">
                            <a-checkbox v-model:checked="columnVisible.progress">阶段计划执行进度</a-checkbox>
                        </a-menu-item>
                        <a-menu-item key="completion">
                            <a-checkbox v-model:checked="columnVisible.completion">完成量</a-checkbox>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>

        <!-- 表格区域 -->
        <a-table :dataSource="tableData" :columns="visibleColumns" :pagination="false" size="small" bordered
            class="work-arrangement-table">
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
const statusFilters = ref(['notIssued', 'notSigned', 'unfinished', 'returned', 'finished', 'notDecomposed']);
const planFilters = ref(['processPlan', 'phasePlan']);

// 列可见性控制
const columnVisible = ref({
    operation: true,
    noticeName: true,
    assigner: true,
    number: true,
    deadline: true,
    status: true,
    reason: true,
    progress: true,
    completion: true,
});

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
            sorter: (a: any, b: any) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
        },
        {
            title: '签发退回原因',
            dataIndex: 'reason',
            key: 'reason',
            width: 150,
            ellipsis: true,
        }, 
      
        {
            title: '阶段计划执行进度',
            dataIndex: 'progress',
            key: 'progress',
            width: 150,
        },
          {
            title: '完成量',
            dataIndex: 'completion',
            key: 'completion',
            width: 150,
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
    statusFilters.value = ['notIssued', 'notSigned', 'unfinished', 'returned', 'finished', 'notDecomposed'];
    planFilters.value = ['processPlan', 'phasePlan'];
};

// 新增处理
const handleAdd = () => {
    console.log('点击新增');
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