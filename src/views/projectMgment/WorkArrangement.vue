<template>
    <div>
        <div class="work-arrangement-container" ref="containerRef" id="containerRef" v-if="tableDataVisible == 0">
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
                <a-button type="dashed" @click="handleAdd" v-if="Editable">新增</a-button>

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
                <!-- 操作 -->
                <template #operation="{ record }">
                    <a-space>
                        <!-- <el-tooltip class="item" effect="dark" content="添加关注" placement="top-start">
                            根据collect 来判断是否添加operation_star
                            <div class="operation_box " :class="{ 'operation_star': collect }" @click="collect = !collect">
                                <StarOutlined />
                            </div>
                        </el-tooltip> -->

                        <!-- <el-tooltip class="item" effect="dark" content="单位确认情况：规划院" placement="top-start">
                            <div class="operation_box">
                                <SafetyCertificateOutlined />
                            </div>
                        </el-tooltip> -->
                        <el-tooltip class="item" effect="dark" content="完成情况" placement="top-start"
                            v-if="userName == record.taCreator">
                            <div class="operation_box" @click="handleEditFn(record)">
                                <!-- <MenuOutlined /> -->
                                <PicLeftOutlined />
                            </div>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top-start"
                            v-if="userName == record.taCreator">
                            <div class="operation_box">
                                <i class="el-icon-delete"></i>
                                <DeleteOutlined @click="handleDelete(record.id)" style="color: #ed5565;" />
                            </div>
                        </el-tooltip>
                        <!-- <a-button type="link" @click="handleDelete(record)">删除</a-button> -->
                    </a-space>
                </template>
                <!-- 通知名称 -->
                <template #taTaskName="{ record }">
                    <span style="color: #1890ff; cursor: pointer;" @click="showTaskContentModal(record)">
                        {{ record.taTaskName }}
                    </span>
                </template>
            </a-table>
        </div>
        <!-- 新增工作安排 -->
        <div v-if="tableDataVisible == 1">
            <el-form :model="formData" label-width="100px" class="task-form">
                <el-row :gutter="24">
                    <el-col :span="24">
                        <div style="text-align: right;">
                            <el-button type="primary" @click="handleGenerateFn">生成</el-button>
                            <el-button type="info" @click="handleResetFn">重置</el-button>
                        </div>
                    </el-col>
                </el-row>
                <!-- 第一行：工作类型、计划类型、抄送单位 -->
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="工作类型">
                            <el-radio-group v-model="formData.workType">
                                <el-radio :value="0">业务类</el-radio>
                                <el-radio :value="1">事务类</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="计划类型">
                            <el-radio-group v-model="formData.taPlanType" disabled>
                                <el-radio :value="formData.workType == 0 ? 1 : 0">过程计划</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <!-- <el-col :span="6">
                            <el-form-item label="抄送单位">
                                <el-select v-model="formData.taCCUnit" placeholder="请选择">
                                    <el-option label="单位一" value="单位一"></el-option>
                                    <el-option label="单位二" value="单位二"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col> -->

                </el-row>

                <!-- 第二行：工作名称 -->
                <el-form-item label="工作名称">
                    <el-input v-model="formData.taTaskName" placeholder="请输入工作名称"></el-input>
                </el-form-item>

                <!-- 第三行：执行单位提示 -->
                <el-form-item label="执行负责人">
                    <!-- <el-input v-model="formData.executingUnit"
                            placeholder="提示：如未找到相应的执行单位，请和生产院计调确认是否进行了项目组成员的安排"></el-input> -->
                    <!-- userList -->
                    <el-select clearable v-model="formData.executingUnit" placeholder="请选择" style="width: 100%;">
                        <el-option v-for="item in userList" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
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
                                    <el-button size="small" type="primary" @click="toggleGroup(index)">{{ group.expanded
                                        ? '收起'
                                        : '展开' }}</el-button>
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
                                <el-table :data="group.twaTaskContentStatuses" border style="width: 100%"
                                    :show-header="true">
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
                                            <el-date-picker v-model="row.tcLimitDate" type="datetime"
                                                placeholder="选择完成时间"
                                                value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
                                        </template>
                                    </el-table-column>
                                    <!-- <el-table-column label="合同条款关联">
                                        <template #default="{ row }">
                                            <a target="_blank" @click="openContractDialog(row)">关联条款</a>
                                        </template>
                                    </el-table-column> -->

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
                            <!-- <el-button type="success" size="small" @click="generateFromTemplate">模板生成</el-button> -->
                        </div>
                    </div>
                </el-form-item>

                <!-- 附件 -->
                <el-form-item label="附件">
                    <el-upload action="" :auto-upload="false" :on-change="handleFileChange" :file-list="fileList"
                        list-type="picture-card">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-form-item>
                <!-- 底部操作按钮 -->
                <div class="dialog-footer">
                    <el-button @click="handleCancel">取消</el-button>
                    <el-button type="primary" @click="saveForm">保存</el-button>
                </div>
            </el-form>
        </div>
        <!-- 展示pdf弹窗 -->
        <div v-if="tableDataVisible == 2">
            <pdfDetail v-if="tableDataVisible == 2" @closePdf="changeShowTab(0)" :key="detailModalData.id"
                :fromData="detailModalData"></pdfDetail>
        </div>
        <!-- 查看工作安排 -->
        <div v-if="tableDataVisible == 3">
            <taskDetails :type="'work'" v-if="tableDataVisible == 3" @adjust="handleAdjust"
                @CloseTask="changeShowTab(0)" :detailData="detailModalData">
            </taskDetails>
        </div>

        <!-- 设置阶段进度 - 关联合同条款 -->
        <a-modal v-model:visible="dialogTermsVisible" title="设置阶段进度 - 关联合同条款" width="80%" @cancel="handleClose">
            <div class="contract-clause-container">
                <!-- 合同信息 --> 工作详情
                <div class="contract-info">
                    <span>合同: {{ contractName }}</span>
                </div>

                <!-- 表格展示合同条款 -->
                <el-table :data="clauseList" border style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="StpeName" label="执行阶段" />
                    <el-table-column prop="prorately_or_amount" label="按比例/金额支付" />
                    <el-table-column prop="payment_ratio" label="收付款比例(%)" />
                    <el-table-column prop="phase_amount" label="收付款金额(元)" />
                    <el-table-column prop="calendar_or_working" label="日历天/工作天" />
                    <el-table-column prop="settlement_ratio" label="结算至收款账期(天)" />
                    <el-table-column prop="pay_condition_value" label="收付条件" />
                    <el-table-column prop="condition" label="合同支付条款" />
                    <el-table-column prop="remarks" label="备注" />
                    <el-table-column fixed="right" label="关联情况" width="90" align="center">
                        <template #default="{ row, $index }">
                            <a @click.prevent="handleLink(row)">{{ $index + 1 }}</a>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 底部操作按钮 -->
            <template #footer>
                <!-- 文字展示在左侧 -->
                <span style="color:#888;">
                    已选中{{ clauseListSelection.length }} 个条款（多选模式，支持跨合同）
                </span>
                <el-button @click="dialogTermsVisible = false">关闭</el-button>
                <el-button type="primary" @click="saveSettings">保存设置</el-button>
            </template>
        </a-modal>
        <!-- 关门时间 -->
        <a-modal v-model:visible="ClosingTimeVisible" title="关门时间" @ok="handleOk" @cancel="handleCancel">
            <a-form :model="ClosingTimeForm" layout="horizontal">
                <a-form-item label="关门时间">
                    <span>2025-12-16</span>
                </a-form-item>
                <a-form-item label="调整后关门时间">
                    <a-date-picker value-format="YYYY-MM-DD HH:mm:ss" v-model:value="ClosingTimeForm.ClosingReason"
                        style="width: 100%;" />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- 关联 情况详情 -->
        <a-modal v-model:visible="dialogLinkVisible" title="关联情况" width="80%" @cancel="handleClose">
            <el-table :data="CaseDetailsList" border style="width: 100%">
                <el-table-column type="index" width="70" label="序号" />
                <el-table-column prop="TA_TaskName" label="通知名称" />
                <el-table-column prop="TC_Name" label="任务名称" />
            </el-table>
            <template #footer>
                <el-button @click="dialogLinkVisible = false">关闭</el-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts">
export default {
    name: 'WorkArrangement'
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive, onActivated, onDeactivated } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { SettingOutlined, DeleteOutlined, SafetyCertificateOutlined, PicLeftOutlined, MenuOutlined, StarOutlined, SoundOutlined, HistoryOutlined } from '@ant-design/icons-vue';
import getDatas from "@/network/index";
import { ElMessage, ElMessageBox } from 'element-plus';
import dayjs from 'dayjs';

import taskDetails from "./components/taskDetails.vue";

// 引入组件pdfDetail 并展示
import pdfDetail from "./components/pdfDetail.vue";

const dialogVisible = ref(false);
const tableDataVisible = ref(0);


const changeShowTab = (type: number) => {
    tableDataVisible.value = type;
    updateTableDataVisibleInTabs(type);
};

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
    operation: true,
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
            slots: { customRender: 'taTaskName' },
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
const showTaskContentModal = (record: any) => {
    console.log(record, 'record');
    changeShowTab(2)
    detailModalData.value = record
};

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
    changeShowTab(1)
    // 清空填写表单
    formData.value.workType = 0;
    formData.value.taPlanType = 0;
    formData.value.taCCUnit = '';
    formData.value.taTaskName = '';
    formData.value.executingUnit = '';
    formData.value.taPreface = '根据集团公司生产计划安排，现下达《》，请各单位遵照执行。';
    formData.value.taDemand = '';
    formData.value.taskGroups = [
        {
            tgName: '',
            tgDescription: '',
            expanded: true,
            twaTaskContentStatuses: [
                {
                    tcName: '',
                    deptMajor: '',
                    tcLimitDate: '',
                    remark: ''
                }
            ]
        }
    ];
};
console.log('页面加载了多次');

const route = useRoute();




// 表单数据
const formData = ref({
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
                    tcLimitDate: '',
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
    formData.value.taskGroups.push({
        tgName: '',
        tgDescription: '',
        expanded: true,
        twaTaskContentStatuses: [
            {
                tcName: '',
                deptMajor: '',
                tcLimitDate: '',
                remark: ''
            }
        ]
    });
};

// 删除分组
const removeGroup = (index: number) => {
    if (formData.value.taskGroups.length > 1) {
        formData.value.taskGroups.splice(index, 1);
    } else {
        // 如果只有一个分组，清空而不是删除
        formData.value.taskGroups[0].tgName = '';
        formData.value.taskGroups[0].tgDescription = '';
        formData.value.taskGroups[0].twaTaskContentStatuses = [
            {
                tcName: '',
                deptMajor: '',
                tcLimitDate: '',
                remark: ''
            }
        ];
    }
};

// 切换分组展开状态
const toggleGroup = (index: number) => {
    formData.value.taskGroups[index].expanded = !formData.value.taskGroups[index].expanded;
};

// 添加任务
const addTask = (group: any) => {
    group.twaTaskContentStatuses.push({
        tcName: '',
        deptMajor: '',
        tcLimitDate: '',
        remark: ''
    });
};

// 删除任务
const removeTask = (task: any) => {
    const groupIndex = formData.value.taskGroups.findIndex(g => g.twaTaskContentStatuses.includes(task));
    if (groupIndex !== -1) {
        formData.value.taskGroups[groupIndex].twaTaskContentStatuses = formData.value.taskGroups[groupIndex].twaTaskContentStatuses.filter(t => t !== task);
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
    console.log('保存表单:', formData.value);
    if (!formData.value.taTaskName) {
        ElMessage.warning('请输入工作名称');
        return;
    }
    const resp = await getDatas("project/AddWorkArrangement", {
        ...formData.value,
        projectId: route.query.projectId,
        projectStep: route.query.projectStep
    });
    console.log(resp, 'resprespresp');

    if (resp && resp.data.code === 200) {
        ElMessage.success('保存成功');
        changeShowTab(0)
        handleSearch(); // 刷新表格数据

    } else {
        ElMessage.warning(resp.data.message || '保存失败');
    }

};

// 重置表单
const handleResetFn = () => {
    console.log('重置表单');
    formData.value = {
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
                        tcLimitDate: '',
                        remark: ''
                    }
                ]
            }
        ]
    };
}


// 生成表单
const handleGenerateFn = () => {
    console.log('生成表单:', formData.value);
    if (!formData.value.taTaskName) {
        ElMessage.warning('请输入工作名称');
        return;
    }
    ElMessageBox.confirm('同层级,同单位/专业不能有相同的任务,请修改以下任务 1|规划院', '提示', {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    }).then(() => {
        // 您还未添加工作安排
        if (formData.value.taskGroups.length === 0) {
            ElMessage.warning('您还未添加工作安排');
            return;
        }
        detailModalData.value = formData.value
        changeShowTab(2)

        // 点击确定按钮的处理逻辑
        console.log("点击确定按钮");
    }).catch(() => {
        // 点击取消按钮的处理逻辑
        console.log("点击取消按钮");
    })
};

// 取消对话框
const handleCancel = () => {
    changeShowTab(0)
};


// 删除工作安排
const handleDelete = async (id: number) => {
    console.log('点击删除');
    // 添加提示信息
    ElMessageBox.confirm('确定要删除该工作安排吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const resp = await getDatas("project/DeleteWorkArrangement", [id]);
        if (resp && resp.data.code === 200) {
            ElMessage.success('删除成功');
            handleSearch(); // 刷新表格数据
        } else {
            ElMessage.warning(resp.data.message || '删除失败');
        }
    }).catch(() => {
        console.log('点击取消');
    });

}


const detailModalData = ref<any>({});


const handleEditFn = (row: any) => {
    console.log(row, '点击编辑');
    changeShowTab(3)
    detailModalData.value = row;
}


// 关门时间
const ClosingTimeVisible = ref(false);
const handleOk = () => {
    console.log(ClosingTimeForm.value.ClosingReason);

}
const ClosingTimeForm = ref({
    closingTime: '',
    ClosingReason: '',
});

// 工作调整
const handleAdjust = () => {
    dialogVisible.value = true;
    changeShowTab(1)
    //  Object.assign(formData, detailModalData.value);
    formData.value = JSON.parse(JSON.stringify(detailModalData.value));
    console.log(detailModalData.value, 'detailModalDatadetailModalData');
}

// 点击关联条款
const dialogTermsVisible = ref(false);
const contractName = ref('【自揽自签】【国内】土一-自揽-20251216-城轨-国内合同1');
const clauseList = ref<any[]>([]);

// 处理关闭弹窗
const handleClose = () => {
    ElMessageBox.confirm('确定要关闭吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        dialogLinkVisible.value = false;
        dialogTermsVisible.value = false;
    }).catch(() => {
        // 取消关闭
        dialogLinkVisible.value = false;
        dialogTermsVisible.value = false;
    });
};

// 处理关联点击
const dialogLinkVisible = ref(false);
const CaseDetailsList = ref<any[]>([]);
const handleLink = (row: any) => {
    dialogLinkVisible.value = true;
    console.log('关联:', row);
    // 这里可以添加关联逻辑
    CaseDetailsList.value = row.detail
};

// 保存设置
const saveSettings = () => {
    const selectedRows = clauseList.value.filter(row => row.isCheck);
    if (selectedRows.length === 0) {
        ElMessage.warning('请至少选择一条记录');
        return;
    }
    ElMessage.success('保存成功');
    dialogTermsVisible.value = false;
};
// 选中事件
const clauseListSelection = ref<any[]>([]);
const handleSelectionChange = (selection: any[]) => {

    clauseListSelection.value = selection;
};

// 根据传入的数据初始化弹窗
const openContractDialog = (data: any) => {
    console.log(data, 'openContractDialog');
    dialogTermsVisible.value = true;
};

const userName = ref<string | null>(null);

// 获取执行负责人数据
const userList = ref<any[]>([]);
const getUserList = async () => {
    const res = await getDatas('project/majorByProIdAndStep', {
        projectId: route.query.projectId, // 使用从地址栏获取的projectId
        step: route.query.projectStep, // 使用从地址栏获取的projectStep
    });
    console.log(res, 'getUserList');
    if (res.data.code === 200) {
        userList.value = res.data.result;
        // 将数组改为{
        //   value: 'Beijing',
        //   label: '北京'
        // }的格式
        if (userList.value && userList.value.length > 0) {
            userList.value = userList.value.map(item => ({
                value: item,
                label: item,
            }));
        }
    }
};

const isEmptyObject = (obj: any) => {
    // 先判断是不是真正的对象，且不是 null
    if (typeof obj !== 'object' || obj === null) return false;
    // 再判断是否为空
    return Object.keys(obj).length === 0;
}
// 根据打开标签的页面改变 同步tableDataVisible的值
const syncTableDataVisibleFromTabs = () => {
    const savedTabs = sessionStorage.getItem("openedTabs");
    if (savedTabs) {
        try {
            const tabs = JSON.parse(savedTabs);
            const currentPath = route.fullPath;
            const currentTab = tabs.find((tab: any) => tab.path === currentPath);
            if (currentTab) {
                tableDataVisible.value = currentTab.tableDataVisible ? currentTab.tableDataVisible : 0;
                detailModalData.value = isEmptyObject(currentTab.Details) ? '{}' : JSON.parse(currentTab.Details);
                if (currentTab.tableDataVisible) {
                    changeShowTab(0)
                    detailModalData.value = currentTab.Details ? JSON.parse(currentTab.Details) : {};
                    changeShowTab(currentTab.tableDataVisible)
                } else {
                    changeShowTab(0)
                }
            }
        } catch (e) {
            console.error("解析保存的标签页失败:", e);
        }
    }
}
// 更新 openedTabs 中当前路由对应的 tableDataVisible 值
const updateTableDataVisibleInTabs = (value: number) => {
    const savedTabs = sessionStorage.getItem("openedTabs");
    if (savedTabs) {
        try {
            const tabs = JSON.parse(savedTabs);
            console.log(tabs, 'tabstabstabstabs');

            const currentPath = route.fullPath;
            const currentTabIndex = tabs.findIndex((tab: any) => tab.path == currentPath);
            if (currentTabIndex > -1) {
                tabs[currentTabIndex].tableDataVisible = value;
                tabs[currentTabIndex].Details = JSON.stringify(detailModalData.value); // 保存详情数据
                sessionStorage.setItem("openedTabs", JSON.stringify(tabs));
            }
        } catch (e) {
            console.error("更新标签页失败:", e);
        }
    }
};


// 判断url中的projectId和projectStep是否变化，如果变化则重新查询数据
watch(() => [route.query.projectId, route.query.projectStep], () => {
    handleSearch();
    syncTableDataVisibleFromTabs()
});


onMounted(() => {
    handleSearch();
    getUserList();
    userName.value = localStorage.getItem("userName");

})
const Editable = ref(false);
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

// 监听 tableDataVisible 变化，同步到 openedTabs
watch(tableDataVisible, (newValue) => {
    updateTableDataVisibleInTabs(newValue);
});

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
    background-color: #ddd;
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

.operation_box {
    color: #337ab7;
    cursor: pointer;
    transition: all 0.3s;
    padding: 2px;

    &:hover {
        border-radius: 4px;
        background-color: #337ab7;
        color: #fff !important;
    }
}

.operation_star {
    color: red;
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
</style>