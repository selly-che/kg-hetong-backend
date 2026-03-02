<template>
    <div class="project-progress-container">
        <!-- 进度卡片区域 -->
        <a-row :gutter="[16, 16]" class="progress-cards">
            <a-col :span="6">
                <a-card size="small" title="12312">
                    <div class="progress-number">
                        <span class="progress-value">{{ progressData.ProgressSummary.TotalProgress }}%</span>
                    </div>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card size="small" title="当前项目施工进度">
                    <div class="progress-number">
                        <span class="progress-value">{{ progressData.ProgressSummary.ProgressOfWorkInspection || '-'
                            }}</span>
                    </div>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card size="small" title="当前合同履约进度">
                    <div class="progress-number">
                        <span class="progress-value">{{ progressData.ProgressSummary.ProjectPerformanceProgress || '-'
                            }}</span>
                    </div>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card size="small" title="当前项目收款比例">
                    <div class="progress-number">
                        <span class="progress-value">{{ progressData.ProgressSummary.CollectionProportion || '0%'
                            }}</span>
                    </div>
                </a-card>
            </a-col>
        </a-row>
        <!-- 各阶段进度标题 -->
        <div class="mb-20 mt-20">
            <h3>各阶段进度：</h3>
        </div>
        <!-- 阶段进度表格 -->
        <a-table :dataSource="progressData.allContractClauses" :columns="phaseProgressColumns" :pagination="false"
            size="small" bordered class="phase-progress-table">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'actualProgress'">
                    <a-input-number v-model:value="record.PhaseProgress" :min="0" :max="100" :step="1" size="small"
                        addon-after="%" />
                </template>
                <template v-if="column.key === 'contractPerformance'">
                    <a-select v-model:value="record.contractPerformance" placeholder="--全部合同条款--" size="small"
                        style="width: 100%">
                        <a-select-option value="">--全部合同条款--</a-select-option>
                    </a-select>
                </template>
            </template>
        </a-table>
        <!-- 合同收款拆分条款 -->
        <div class="flexTWO mb-20 mt-20">
            <div class="flexTWO">
                <div class="fwb">合同收款拆分条款（进度）：</div>
                <a-button type="primary" size="small" @click="showEditPhaseModal">
                    <FormOutlined /> 设置阶段进度
                </a-button>
            </div>
            <a-select placeholder="--全部合同条款--" style="width: 200px; margin-bottom: 16px" size="small">
                <a-select-option value="">--全部合同条款--</a-select-option>
            </a-select>
        </div>
        <!--     合同收款拆分条款 -->
        <a-descriptions bordered layout="vertical" size="middle" :column="7" :labelStyle="{ width: '180px' }">
            <a-descriptions-item label="预可研">
                {{ progressData.allPhaseProgress[0].PhaseProgress || '--' }}%
            </a-descriptions-item>
            <a-descriptions-item label="可研">
                {{ progressData.allPhaseProgress[1].PhaseProgress || '--' }}%
            </a-descriptions-item>
            <a-descriptions-item label="初步设计">
                {{ progressData.allPhaseProgress[2].PhaseProgress || '--' }}%
            </a-descriptions-item>
            <a-descriptions-item label="施工图">
                {{ progressData.allPhaseProgress[3].PhaseProgress || '--' }}%
            </a-descriptions-item>
            <a-descriptions-item label="配合施工">
                {{ progressData.allPhaseProgress[4].PhaseProgress || '--' }}%
            </a-descriptions-item>
            <a-descriptions-item label="清概（结算）">
                {{ progressData.allPhaseProgress[5].PhaseProgress || '--' }}%
            </a-descriptions-item>
            <a-descriptions-item label="质保期">
                {{ progressData.allPhaseProgress[6].PhaseProgress || '--' }}%
            </a-descriptions-item>
        </a-descriptions>
        <!-- 执行阶段 -->
        <div class="mb-20 mt-20">
            <!-- 执行阶段表格 -->
            <a-table :dataSource="progressData.stepList" :columns="executionPhaseColumns" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { FormOutlined } from "@ant-design/icons-vue";
const progressData = ref({
    "stepList": [],
    "contractList": [],
    "allContractClauses": [],
    "allPhaseProgress": [
        {
            "Step": 603,
            "StpeName": "预可研",
            "PhaseProgress": 2
        },
        {
            "Step": 604,
            "StpeName": "可研",
            "PhaseProgress": 10
        },
        {
            "Step": 605,
            "StpeName": "初步设计",
            "PhaseProgress": 25
        },
        {
            "Step": 606,
            "StpeName": "施工图",
            "PhaseProgress": 35
        },
        {
            "Step": 607,
            "StpeName": "配合施工",
            "PhaseProgress": 20
        },
        {
            "Step": 611,
            "StpeName": "清概（结算）",
            "PhaseProgress": 5
        },
        {
            "Step": 612,
            "StpeName": "质保期",
            "PhaseProgress": 3
        }
    ],
    "ProgressSummary": {
        "TotalProgress": 0,
        "ProjectPerformanceProgress": 0,
        "AmountOfWorkInspection": "",
        "ProgressOfWorkInspection": "",
        "AmountCollected": "",
        "CollectionProportion": ""
    }
});
// 执行阶段表格列定义
const executionPhaseColumns = [
    {
        title: '执行阶段',
        key: 'stage',
        width: 120,
        align: 'center'
    },
    {
        title: '专项工作内容',
        dataIndex: 'specialWorkContent',
        key: 'specialWorkContent',
        width: 150,
        align: 'center'
    },
    {
        title: '费用类型',
        dataIndex: 'costType',
        key: 'costType',
        width: 120,
        align: 'center'
    },
    {
        title: '合同支付条款',
        key: 'contractPaymentClause',
        width: 150,
        align: 'center'
    },
    {
        title: '验工情况',
        dataIndex: 'acceptanceCondition',
        key: 'acceptanceCondition',
        width: 120,
        align: 'center'
    },
    {
        title: '收付条件',
        dataIndex: 'paymentCondition',
        key: 'paymentCondition',
        width: 120,
        align: 'center'
    },
    {
        title: '是否已关联任务',
        key: 'isTaskLinked',
        width: 120,
        align: 'center'
    },
    {
        title: '完成情况',
        key: 'completionStatus',
        width: 120,
        align: 'center'
    }
];
const phaseProgressColumns = ref([{
    title: '序号',
    dataIndex: 'Step',
    key: 'step',
    width: 80,
    align: 'center'
},
{
    title: '阶段或事项',
    dataIndex: 'StpeName',
    key: 'stageName',
    width: 150
},
{
    title: '实际生产进度 (%)',
    key: 'actualProgress',
    width: 200,
    align: 'center'
},
{
    title: '合同履约进度 (%)',
    key: 'contractPerformance',
    width: 200,
    align: 'center'
}])

// 点击设置阶段进度
const showEditPhaseModal = () => {
    console.log(123);

};

</script>