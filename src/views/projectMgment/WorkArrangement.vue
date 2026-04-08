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
        <!-- 新增工作安排 -->
        <el-dialog v-model="dialogVisible" title="工作安排" width="80%" destroy-on-close @close="handleDialogClose"
            :before-close="handleBeforeClose">
            <!-- 表单主体 -->
            <el-form :model="formData" label-width="100px" class="task-form">
                <!-- 第一行：工作类型、计划类型、抄送单位 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="工作类型">
                            <el-radio-group v-model="formData.workType">
                                <el-radio :value="0">业务类</el-radio>
                                <el-radio :value="1">事务类</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="计划类型">
                            <el-radio-group v-model="formData.taPlanType" disabled>
                                <el-radio :value="formData.workType == 0 ? 1 : 0">过程计划</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="抄送单位">
                            <el-select v-model="formData.taCCUnit" placeholder="请选择">
                                <el-option label="单位一" value="单位一"></el-option>
                                <el-option label="单位二" value="单位二"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 第二行：工作名称 -->
                <el-form-item label="工作名称">
                    <el-input v-model="formData.taTaskName" placeholder="请输入工作名称"></el-input>
                </el-form-item>

                <!-- 第三行：执行单位提示 -->
                <el-form-item label="执行单位">
                    <el-input v-model="formData.executingUnit"
                        placeholder="提示：如未找到相应的执行单位，请和生产院计调确认是否进行了项目组成员的安排"></el-input>
                </el-form-item>

                <!-- 第四行：前言 -->
                <el-form-item label="前言">
                    <el-input v-model="formData.taPreface" type="textarea" :rows="4"
                        placeholder="根据集团公司生产计划安排，现下达《》，请各单位遵照执行。"></el-input>
                </el-form-item>

                <!-- 第五行：要求 -->
                <el-form-item label="要求">
                    <el-input v-model="formData.taDemand" type="textarea" :rows="4" placeholder="请输入工作要求"></el-input>
                </el-form-item>

                <!-- 节点工期计划 -->
                <el-form-item label="节点工期计划">
                    <div class="node-schedule-container">
                        <!-- 分组列表 -->
                        <div v-for="(group, index) in formData.taskGroups" :key="index" class="group-item">
                            <!-- 分组头部 -->
                            <div class="group-header">
                                <el-input v-model="group.tgName" placeholder="请在此填写分组名称"
                                    style="width: 100%; padding: 8px;"></el-input>
                                <div class="group-actions">
                                    <el-button size="small" type="danger" @click="removeGroup(index)">删除</el-button>
                                    <el-button size="small" @click="toggleGroup(index)">折叠</el-button>
                                </div>
                            </div>

                            <!-- 分组内容（可折叠） -->
                            <div v-show="group.expanded" class="group-content">
                                <!-- 任务说明 -->
                                <div class="task-description">
                                    <el-input v-model="group.tgDescription" type="textarea" :rows="2"
                                        placeholder="请在这里输入任务说明"></el-input>
                                </div>

                                <!-- 任务表格 -->
                                <el-table :data="group.twaTaskContentStatuses" border style="width: 100%" :show-header="true">
                                    <el-table-column label="任务内容">
                                        <template #default="{ row }">
                                            <el-input v-model="row.tcName" placeholder="请输入任务内容"></el-input>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="完成单位">
                                        <template #default="{ row }">
                                            <el-select v-model="row.deptMajor" placeholder="请选择">
                                                <el-option label="单位一" value="unit1"></el-option>
                                                <el-option label="单位二" value="unit2"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="完成时间">
                                        <template #default="{ row }">
                                            <el-date-picker v-model="row.euCompleteDate" type="datetime"
                                                placeholder="选择完成时间"
                                                value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="备注">
                                        <template #default="{ row }">
                                            <el-input v-model="row.remark" placeholder="请输入备注"></el-input>
                                        </template>
                                    </el-table-column>

                                    <el-table-column width="100" label="操作">
                                        <template #default="{ row }">
                                            <el-button size="small" @click="removeTask(row)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>

                                <!-- 操作按钮 -->
                                <div class="operation-buttons">
                                    <el-button type="primary" size="small" @click="addTask(group)">添加任务</el-button>
                                </div>
                            </div>
                        </div>

                        <!-- 添加新分组按钮 -->
                        <div class="add-group-btn">
                            <el-button type="primary" size="small" @click="addGroup">手动添加 +</el-button>
                            <el-button type="success" size="small" @click="generateFromTemplate">模板生成</el-button>
                        </div>
                    </div>
                </el-form-item>

                <!-- 附件 -->
                <el-form-item label="附件">
                    <el-upload action="" :auto-upload="false" :on-change="handleFileChange" :file-list="fileList"
                        list-type="picture-card">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>

                <!-- 底部操作按钮 -->
                <div class="dialog-footer">
                    <el-button @click="handleCancel">取消</el-button>
                    <el-button type="primary" @click="saveForm">保存</el-button>
                    <!-- <el-button type="success" @click="generateForm">生成</el-button> -->
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { SettingOutlined } from '@ant-design/icons-vue';
import getDatas from "@/network/index";
import { ElMessage } from 'element-plus';
const dialogVisible = ref(false);
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
            taTaskName: searchText.value,
            projectId: projectId,
            projectStep: projectStep, // 全部
            // taPlanType: statusFilters.value.join(','),
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
    dialogVisible.value = true;
    // 清空填写表单
    formData.workType = 0;
    formData.taPlanType = 0;
    formData.taCCUnit = '';
    formData.taTaskName = '';
    formData.executingUnit = '';
    formData.taPreface = '根据集团公司生产计划安排，现下达《》，请各单位遵照执行。';
    formData.taDemand = '';
    formData.taskGroups = [
        {
            tgName: '',
            tgDescription: '',
            expanded: true,
            twaTaskContentStatuses: [
                {
                    tcName: '',
                    deptMajor: '',
                    euCompleteDate: '',
                    remark: ''
                }
            ]
        }
    ];
};
console.log('页面加载了多次');

const route = useRoute();


// 新增工作安排
const handleDialogClose = () => {
    console.log('新增工作安排对话框关闭');
    // 这里可以添加一些清理逻辑，比如重置表单等
};


// 表单数据
const formData = reactive({
    workType: 0,
    taPlanType: 0,
    taCCUnit: '',
    taTaskName: '',
    executingUnit: '',
    taPreface: '根据集团公司生产计划安排，现下达《》，请各单位遵照执行。',
    taDemand: '',
    taskGroups: [
        {
            tgName: '',
            tgDescription: '',
            expanded: true,
            twaTaskContentStatuses: [
                {
                    tcName: '',
                    deptMajor: '',
                    euCompleteDate: '',
                    remark: ''
                }
            ]
        }
    ]
});

// 文件列表
const fileList = ref([]);

// 添加分组
const addGroup = () => {
    formData.taskGroups.push({
        tgName: '',
        tgDescription: '',
        expanded: true,
        twaTaskContentStatuses: [
            {
                tcName: '',
                deptMajor: '',
                euCompleteDate: '',
                remark: ''
            }
        ]
    });
};

// 删除分组
const removeGroup = (index: number) => {
    if (formData.taskGroups.length > 1) {
        formData.taskGroups.splice(index, 1);
    } else {
        // 如果只有一个分组，清空而不是删除
        formData.taskGroups[0].tgName = '';
        formData.taskGroups[0].tgDescription = '';
        formData.taskGroups[0].twaTaskContentStatuses = [
            {
                tcName: '',
                deptMajor: '',
                euCompleteDate: '',
                remark: ''
            }
        ];
    }
};

// 切换分组展开状态
const toggleGroup = (index: number) => {
    formData.taskGroups[index].expanded = !formData.taskGroups[index].expanded;
};

// 添加任务
const addTask = (group: any) => {
    group.twaTaskContentStatuses.push({
        tcName: '',
        deptMajor: '',
        euCompleteDate: '',
        remark: ''
    });
};

// 删除任务
const removeTask = (task: any) => {
    const groupIndex = formData.taskGroups.findIndex(g => g.twaTaskContentStatuses.includes(task));
    if (groupIndex !== -1) {
        formData.taskGroups[groupIndex].twaTaskContentStatuses = formData.taskGroups[groupIndex].twaTaskContentStatuses.filter(t => t !== task);
    }
};

// 模板生成
const generateFromTemplate = () => {
    // 这里可以实现模板生成逻辑
    console.log('模板生成');
};

// 文件改变处理
const handleFileChange = (file: any) => {
    console.log('文件改变:', file);
};

// 保存表单
const saveForm = async () => {
    console.log('保存表单:', formData);
    const resp = await getDatas("project/AddWorkArrangement", {
        ...formData,
        projectId: route.query.projectId,
        // projectStep: route.query.projectStep
    });
    if (resp && resp.data.code === 200) {
        ElMessage.success('保存成功');
        dialogVisible.value = false;
        handleSearch(); // 刷新表格数据
        
    } else {
        ElMessage.warning(resp.data.message || '保存失败');
    }

};

// 生成表单
const generateForm = () => {
    console.log('生成表单:', formData);
};

// 取消对话框
const handleCancel = () => {
    dialogVisible.value = false;
};

// 关闭对话框前的处理
const handleBeforeClose = (done: Function) => {
    // 这里可以添加确认逻辑
    done();
};


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

:deep(.ant-table-thead > tr > th) {
    background-color: #f5f9ff !important;
}

.production-task-form {
    padding: 20px;
    background: #fff;
}

.task-form {
    margin-top: 20px;
}

.node-schedule-container {
    flex: 1;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 20px;
}

.group-item {
    margin-bottom: 15px;
}

.group-header {
    background-color: #409eff;
    color: white;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.group-actions {
    display: flex;
    gap: 8px;
}

.group-content {
    padding: 10px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
}

.task-description {
    margin-bottom: 15px;
}

.operation-buttons {
    margin-top: 15px;
    display: flex;
    gap: 10px;
}

.add-group-btn {
    margin-top: 15px;
    display: flex;
    gap: 10px;
}

.dialog-footer {
    text-align: right;
}
</style>