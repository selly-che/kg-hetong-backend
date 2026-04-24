<template>
    <div class="job-details-container">
        <div style="text-align: right;margin-bottom: 10px;">
            <a-button type="dashed" @click="CloseTaskFn">关闭</a-button>
        </div>
        <!-- 头部信息 -->
        <div class="detail-header">

            <div class="header-left">
                <!-- <el-image :src="Imgurl" :fit="fit" alt="图片" class="detail-image" />    -->
                 <a-image :src="Imgurl" :preview="false" :fit="fit" alt="图片" class="detail-image" />
                <div class="header-info">
                    <div class="info-title">{{ detailData.taTaskName }}
                        <span> {{ detailData.projectStep ? ` [${getLabelByValue(detailData.projectStep)}]` : ''
                        }}</span>
                    </div>
                    <div class="info-subtitle">
                        {{ detailData.tcName || '' }}
                    </div>
                    <!-- 筛选区域 -->
                    <!-- <div class="detail-filter">
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
                    </div> -->
                </div>
            </div>
            <div class="header-right">
                <a-space>
                    <a-button type="primary" @click="handleSearch">查询</a-button>
                    <a-button @click="handleReset">重置</a-button>
                    <a-button @click="toggleFullScreen">全屏</a-button>
                </a-space>
            </div>
            <div class="header_last" v-if="type == 'work' && Editable">
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
            <div class="header_last" v-if="type == 'home' && props.detailData.taStatus != 2">
                <div class="header_last_box" @click="handlefillInFn" width="60%">
                    <HistoryOutlined style="font-size: 30px;" /><span>填报</span>
                </div>
            </div>
        </div>

        <!-- 任务表格 -->
        <div class="task-table-container">
            <a-table :columns="columns" :loading="searchLoading" :data-source="tableData" :pagination="paginationConfig"
                :bordered="true" size="middle" :row-key="(record: any) => record.id" :scroll="{ x: 1200 }" :expandable="{
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
                            <div v-if="record.tcName">{{ record.tcName }}</div>
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
        <!-- 填报弹窗 -->
        <a-modal v-model:visible="fillInVisible" :title="fillInTitle" width="80%">
            <!-- 展示表格，任务、要求完成时间、实际完成时间、备注 -->
            <a-table :columns="fillInColumns" :data-source="fillInData" :pagination="false" :bordered="true"
                size="middle" :row-key="(record: any) => record.id" :scroll="{ x: 1200 }">
                <template #euCompleteDate="{ record }">
                    <span v-show="setFillIntype" style="cursor: pointer;color: #337ab7;"
                        @click="setFillInFn">设为完成</span>
                    <div v-show="!setFillIntype">
                        <span>{{ FillInTime }}</span>
                        <a-button type="primary" shape="circle" size="small" style="margin: 0 10px;"
                            @click="confirmFillInFn(record)">
                            <template #icon>
                                <CheckOutlined />
                            </template>
                        </a-button>
                        <a-button type="primary" shape="circle" size="small" @click="cancelFillInFn">
                            <template #icon>
                                <CloseOutlined />
                            </template>
                        </a-button>
                    </div>
                </template>
            </a-table>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from 'vue';
import { SettingOutlined, SoundOutlined, HistoryOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import getDatas from "@/network/index";
import { useRoute } from 'vue-router';

// 图片引入
const Imgurl = require("@/static/image/e93263af-ce49-4278-b619-6d6b4ef6f015.png");
const fit = ref('contain');

// Props
interface Props {
    detailData: any;
    type: string;
}

const CloseTaskFn = () => {
    emit('CloseTask');
}



const props = defineProps<Props>();
console.log(props.detailData, "detailData");

// Emits
const emit = defineEmits<{
    (e: 'adjust'): void;
    (e: 'search', data: any): void;
    (e: 'reset'): void;
    (e: 'CloseTask'): void;
    (e: 'closeHome'): void;
}>();

// 筛选表单
const filterForm = reactive({
    status: '',
    unit: '',
});

// 单位选项
const unitOptions = ref<{ value: string | number; label: string }[]>([]);

// 表格数据
const tableData = ref<any[]>([]);

// 所有数据
const allTableData = ref<any[]>([]);

// 展开的行keys
const expandedRowKeys = ref<string[]>([]);

// 初始化数据
onMounted(() => {
    if (props.detailData && props.detailData.taskGroups) {
        const processedData = processTaskGroups(props.detailData.taskGroups);
        allTableData.value = processedData;
        console.log(processedData, "processedData");
        paginationConfig.current = 1;
        updateTableData();
    }
});

const Editable = ref(false);
const route = useRoute();
watch(
    // 判断页面路径发生变化就重新获取数据
    () => route.query.Editable,
    (newEditable) => {
        if (newEditable) {
            Editable.value = newEditable === "true";
            console.log(Editable.value, "EditableEditable111");
        }
    },
    { deep: true, immediate: true }
);

// 监听detailData变化
watch(() => props.detailData, (newVal) => {
    if (newVal && newVal.taskGroups) {
        const processedData = processTaskGroups(newVal.taskGroups);
        allTableData.value = processedData;
        paginationConfig.current = 1;
        updateTableData();
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
                    isGroup: false,
                });
            });
        }

        // 返回分组节点，包含children
        return {
            id: group.id || `group-${groupIndex}`,
            type: 'group',
            euCompleteDate: group.tgUpdateTime,
            tgName: group.tgName,
            tgDescription: group.tgDescription,
            isGroup: true,
            children: children.length > 0 ? children : undefined,

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

// 分页配置
const paginationConfig = reactive({
    current: 1,
    pageSize: 20,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条`,
    onChange: (page: number, pageSize: number) => {

        paginationConfig.current = page;
        paginationConfig.pageSize = pageSize;
        updateTableData();
    }
});

// 更新表格数据显示
const updateTableData = () => {
    const start = (paginationConfig.current - 1) * paginationConfig.pageSize;
    const end = start + paginationConfig.pageSize;
    tableData.value = allTableData.value.slice(start, end);
    paginationConfig.total = allTableData.value.length;
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
const searchLoading = ref(false);
const handleSearch = async () => {
    console.log('查询:', filterForm);
    searchLoading.value = true;
    const res = await getDatas("project/GetWorkArrangement", {
        id: props.detailData.id,
    });
    if (res.data.code === 200) {
        const processedData = processTaskGroups(res.data.result.records[0].taskGroups);
        allTableData.value = processedData;
        paginationConfig.current = 1;
        updateTableData();
        searchLoading.value = false;
    } else {
        ElMessage.error(res.message);
        searchLoading.value = false;
    }
    console.log(res, 'handleSearchhandleSearch');
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
}

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

// 填报
const fillInVisible = ref(false);
const fillInTitle = ref('');
const fillInColumns = ref([
    {
        title: '任务名称',
        key: 'taskName',
        dataIndex: 'tcName',
        width: 200
    },
    {
        title: '要求完成时间',
        key: 'deptMajor',
        dataIndex: 'deptMajor',
        width: 150
    },
    {
        title: '实际完成时间',
        key: 'actualDate',
        dataIndex: 'euCompleteDate',
        width: 150,
        slots: { customRender: 'euCompleteDate' },
    },
    {
        title: '备注',
        key: 'remark',
        dataIndex: 'tcRemark',
        width: 200
    },
])

const fillInData: any = ref([])
const projectStepList = [
    { value: '600', label: '预付期' },
    { value: '601', label: '投标' },
    { value: '602', label: '规划' },
    { value: '603', label: '预可研' },
    { value: '604', label: '可研' },
    { value: '605', label: '初步设计' },
    { value: '606', label: '施工图' },
    { value: '607', label: '配合施工' },
    { value: '608', label: '开通运营' },
    { value: '609', label: '招标图' },
    { value: '610', label: '专题专项' },
    { value: '611', label: '清概（结算）' },
    { value: '612', label: '质保期' },
]

// 获取一个值，遍历数组返回label
const getLabelByValue = (value: any) => {
    const item = projectStepList.find((item: any) => item.value == value);
    console.log(item, 'itemitem');

    return item ? item.label : '';
}

const handlefillInFn = () => {
    // <!-- ，600-预付期，601-投标，602-规划，603-预可研，604-可研，605-初步设计，606-施工图，607-配合施工，608-开通运营，609-招标图，610-专题专项，611-清概（结算），612-质保期 -->
    // 根据值 取对应的文字
    console.log(props.detailData, '填报 projectStep的值为600，返回文字预付期');

    const projectStepText = projectStepList.find(item => item.value == props.detailData.projectStep)?.label;
    fillInTitle.value = props.detailData.taTaskName + `[${projectStepText}]`;
    fillInVisible.value = true;
    const processedData = processTaskGroups(props.detailData.taskGroups);
    console.log(fillInTitle.value, 'processedDataprocessedData');

    fillInData.value = collectAllChildren(processedData);
    console.log(fillInData.value, 'fillInDatafillInData');

}

const collectAllChildren = (arr: any) => {
    let result: any = [];
    arr.forEach((item: any) => {
        // 如果当前项有 children，就加入结果
        if (item.children && item.children.length) {
            result.push(...item.children);
            // 递归：children 内部还有 children 继续提取
            result.push(...collectAllChildren(item.children));
        }
    });
    return result;
}
const handleClosingTimeOk = () => {
    console.log('关门时间:', closingTimeForm.value.ClosingReason);
    closingTimeVisible.value = false;
};

const handleClosingTimeCancel = () => {
    closingTimeVisible.value = false;
};

const setFillIntype = ref(true)
const FillInTime = ref()
const setFillInFn = () => {
    setFillIntype.value = false
    // 获取当前的时间 年月日
    FillInTime.value = new Date().toLocaleDateString().replace(/\//g, '-')
}
const cancelFillInFn = () => {
    setFillIntype.value = true
}

const confirmFillInFn = (item: any) => {
    ElMessageBox.confirm('是否确认完成？', '提示', {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
    }).then(async () => {
        console.log(item, 'itemitemitem');

        const resp = await getDatas("home/PostTaskComplete", {
            taskContentStatusId: item.id,
            completeTime: FillInTime.value
        })
        console.log(resp, 'respresp');

        if (resp.data.code == 200) {
            ElMessage.success('完成成功!');
            fillInVisible.value = false;
            emit('closeHome');
        } else {
            ElMessage.error(resp.data.message || '完成失败!');
        }

    }).catch(() => {
        ElMessage.info('取消完成');
    })
}

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