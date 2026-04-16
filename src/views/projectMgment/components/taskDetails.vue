<template>
    <div class="job-details-container">
        <!-- 头部信息 -->
        <div class="detail-header">
            <div class="header-left">
                <el-image :src="Imgurl" :fit="fit" alt="图片" class="detail-image" />
                <div class="header-info">
                    <div class="info-title">{{ detailData.taTaskName || '土一-自揽-20251216-城轨[初步设计]' }}</div>
                    <div class="info-subtitle">
                        {{ detailData.tcName || '1216-1216-自揽-城轨-主责1' }}
                    </div>
                    <!-- 筛选区域 -->
                    <div class="detail-filter">
                        <a-form :model="filterForm" layout="inline">
                            <a-form-item label="状态">
                                <el-radio-group v-model="filterForm.status">
                                    <el-radio :value="1">未完成</el-radio>
                                    <el-radio :value="2">已完成</el-radio>
                                </el-radio-group>
                            </a-form-item>
                            <a-form-item label="单位">
                                <el-select v-model="filterForm.unit" placeholder="请选择" style="width: 200px">
                                    <el-option v-for="item in unitOptions" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </a-form-item>
                        </a-form>
                    </div>
                </div>
            </div>
            <div class="header-right">
                <a-space>
                    <a-button type="primary" @click="handleSearch">查询</a-button>
                    <a-button @click="handleReset">重置</a-button>
                    <a-button @click="toggleFullScreen">全屏</a-button>
                </a-space>
            </div>
            <div class="header_last">
                <div class="header_last_box" @click="handleAdjust">
                    <SettingOutlined style="font-size: 30px;" />
                    <span>工作调整</span>
                </div>
                <div class="header_last_box" @click="handleUrgentReminder">
                    <SoundOutlined style="font-size: 30px;" /><span>催办</span>
                </div>
                <div class="header_last_box" @click="handleClosingTime">
                    <HistoryOutlined style="font-size: 30px;" /><span>关门时间</span>
                </div>
            </div>
        </div>

        <!-- 任务表格 -->
        <div class="task-table-container">
            <a-table :columns="columns" :data-source="tableData" :pagination="false" :bordered="true" size="middle"
                :row-key="(record: any) => record.id" :scroll="{ x: 1200 }" :expandable="{
                    defaultExpandAllRows: false,
                    expandRowByClick: true,
                    expandedRowKeys: expandedRowKeys,
                    onExpand: handleExpand
                }">
                <template #bodyCell="{ column, text, record, index }">
                    <template v-if="column.key === 'index'">
                        <span>{{ index + 1 }}</span>
                    </template>
                    <template v-else-if="column.key === 'groupName'">
                        <div class="group-name-cell">
                            <div class="group-name-text">{{ record.tgName || text }}</div>
                            <div v-if="record.tcName" >{{ record.tcName }}</div>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'taskContent'">
                        <div class="task-content-cell">
                            <div class="task-name">{{ record.tcName || text }}</div>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'deptMajor'">
                        <span>{{ record.deptMajor || text || '-' }}</span>
                    </template>
                    <template v-else-if="column.key === 'requireDate'">
                        <div>
                            <span>{{ formatDate(record.tcLimitDate || text) }}</span>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'actualDate'">
                        <div>
                            <span>{{ formatDate(record.euCompleteDate || text) }}</span>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'remark'">
                        <span>{{ record.tcRemark || text || '-' }}</span>
                    </template>
                </template>
            </a-table>
        </div>

        <!-- 关门时间弹窗 -->
        <a-modal v-model:visible="closingTimeVisible" title="关门时间" @ok="handleClosingTimeOk"
            @cancel="handleClosingTimeCancel">
            <a-form :model="closingTimeForm" layout="horizontal">
                <a-form-item label="关门时间">
                    <span>{{ closingTimeForm.closingTime }}</span>
                </a-form-item>
                <a-form-item label="调整后关门时间">
                    <a-date-picker value-format="YYYY-MM-DD HH:mm:ss" v-model:value="closingTimeForm.ClosingReason"
                        style="width: 100%;" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from 'vue';
import { SettingOutlined, SoundOutlined, HistoryOutlined } from '@ant-design/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';

// 图片引入
const Imgurl = require("@/static/image/e93263af-ce49-4278-b619-6d6b4ef6f015.png");
const fit = ref('contain');

// Props
interface Props {
    detailData: any;
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
    (e: 'adjust'): void;
    (e: 'search', data: any): void;
    (e: 'reset'): void;
}>();

// 筛选表单
const filterForm = reactive({
    status: '',
    unit: '',
});

// 单位选项
const unitOptions = ref([
    { label: '规划院(运输组织)', value: '规划院(运输组织)' },
]);

// 表格数据
const tableData = ref<any[]>([]);

// 展开的行keys
const expandedRowKeys = ref<string[]>([]);

// 初始化数据
onMounted(() => {
    if (props.detailData && props.detailData.taskGroups) {
        const processedData = processTaskGroups(props.detailData.taskGroups);
        console.log(processedData, "processedData");
        tableData.value = processedData;
    }
});

// 监听detailData变化
watch(() => props.detailData, (newVal) => {
    if (newVal && newVal.taskGroups) {
        const processedData = processTaskGroups(newVal.taskGroups);
        tableData.value = processedData;
        console.log(processedData, "processedData111");
    }
}, { deep: true });

// 处理任务分组数据 - 改为树形结构
const processTaskGroups = (taskGroups: any[]) => {
    return taskGroups.map((group, groupIndex) => {
        // 构建子任务数组
        const children: any[] = [];
        if (group.twaTaskContentStatuses && group.twaTaskContentStatuses.length > 0) {
            group.twaTaskContentStatuses.forEach((subtask: any, subIndex: number) => {
                children.push({
                    id: subtask.id || `subtask-${groupIndex}-${subIndex}`,
                    type: 'task',
                    tcName: subtask.tcName || '-',
                    deptMajor: subtask.deptMajor || '-',
                    tcLimitDate: subtask.tcLimitDate,
                    euCompleteDate: subtask.euCompleteDate,
                    tcRemark: subtask.tcRemark,
                    isGroup: false
                });
            });
        }

        // 返回分组节点，包含children
        return {
            id: group.id || `group-${groupIndex}`,
            type: 'group',
            tgName: group.tgName,
            tgDescription: group.tgDescription,
            isGroup: true,
            children: children.length > 0 ? children : undefined
        };
    });
};

// 处理展开/折叠
const handleExpand = (expanded: boolean, record: any) => {
    if (expanded) {
        expandedRowKeys.value.push(record.id);
    } else {
        expandedRowKeys.value = expandedRowKeys.value.filter(key => key !== record.id);
    }
};

// 格式化日期
const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    if (/年/.test(dateString)) return dateString;
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '-';
        return date.toLocaleDateString('zh-CN');
    } catch (e) {
        return '-';
    }
};

// 表格列定义
const columns = [
    {
        title: '序号',
        key: 'index',
        width: 60
    },
    {
        title: '任务名称',
        key: 'groupName',
        dataIndex: 'tgName',
        width: 200
    },
    {
        title: '任务说明',
        key: 'tgDescription',
        dataIndex: 'tgDescription',
        width: 200
    },
    {
        title: '完成单位',
        key: 'deptMajor',
        dataIndex: 'deptMajor',
        width: 150
    },
    {
        title: '完成时间',
        key: 'actualDate',
        dataIndex: 'euCompleteDate',
        width: 150
    },
    {
        title: '备注',
        key: 'remark',
        dataIndex: 'tcRemark',
        width: 200
    },
];

// 查询处理
const handleSearch = () => {
    console.log('查询:', filterForm);
    emit('search', filterForm);
};

// 重置处理
const handleReset = () => {
    filterForm.status = '';
    filterForm.unit = '';
    emit('reset');
};

// 全屏切换
const toggleFullScreen = () => {
    const modalElement = document.querySelector('.job-details-container');
    if (modalElement) {
        if (!document.fullscreenElement) {
            modalElement.requestFullscreen().catch(err => {
                console.error('全屏失败:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
};

// 工作调整
const handleAdjust = () => {
    emit('adjust');
};

// 催办
const handleUrgentReminder = () => {
    ElMessageBox.confirm('是否确认催办？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        ElMessage.success('催办成功');
    }).catch(() => {
        ElMessage.info('取消催办');
    });
};

// 关门时间
const closingTimeVisible = ref(false);
const closingTimeForm = ref({
    closingTime: '2025-12-16',
    ClosingReason: '',
});

const handleClosingTime = () => {
    closingTimeVisible.value = true;
};

const handleClosingTimeOk = () => {
    console.log('关门时间:', closingTimeForm.value.ClosingReason);
    closingTimeVisible.value = false;
};

const handleClosingTimeCancel = () => {
    closingTimeVisible.value = false;
};

</script>

<style scoped lang="less">
.job-details-container {
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

.task-table-container {
    margin: 16px 0;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.group-name-cell {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.group-name-text {
    font-size: 14px;
    font-weight: 600;
    color: #333;
}

.group-description {
    font-size: 12px;
    color: #999;
}

.task-content-cell {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.task-name {
    font-size: 14px;
    color: #333;
    font-weight: 500;
}


.responsible-cell {
    font-size: 12px;
    color: #666;
}

.header_last {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    color: #2196F3;
}

.header_last_box {
    display: flex;
    cursor: pointer;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}

:deep(.el-radio-group) {
    display: flex;
    gap: 16px;
}

:deep(.ant-form-inline .ant-form-item) {
    margin-right: 16px;
    margin-bottom: 0;
}

// 树形表格样式
:deep(.ant-table-tbody > tr.ant-table-expanded-row > td) {
    background-color: #fafafa;
}

:deep(.ant-table-tbody > tr.ant-table-row-level-1) {
    background-color: #f9f9f9;
}
</style>