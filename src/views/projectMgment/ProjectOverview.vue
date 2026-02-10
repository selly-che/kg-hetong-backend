<template>
    <div class=" bgf br8">
        <div class="project-title">{{ projects.Project_FullName }}</div>
        <a-tabs v-model:activeKey="activeKey" type="card">
            <a-tab-pane key="1" tab="基本信息">
                <div class="project-detail-page">
                    <div class="content-wrapper">
                        <a-row :gutter="[24, 24]">
                            <!-- 基本信息 -->
                            <a-col :span="24">
                                <a-card class="info-card">
                                    <a-descriptions bordered size="middle" :column="2">
                                        <a-descriptions-item label="当前阶段">
                                            {{ projects.Project_Step || '--' }}
                                        </a-descriptions-item>
                                        <a-descriptions-item label="地铁类型">
                                            <a-select mode="multiple" style="width: 100%;">
                                                <a-select-option v-for="type in projects.datamaps" :key="type.Id"
                                                    :value="type.DM_Name">
                                                    {{ type.DM_Name }}
                                                </a-select-option>
                                            </a-select>
                                        </a-descriptions-item>
                                        <a-descriptions-item label="线路长度">
                                            {{ projects.Project_Length }} km
                                        </a-descriptions-item>
                                        <a-descriptions-item label="速度目标值">
                                            {{ projects.TS_SpeedTarget || '--' }} km/h
                                        </a-descriptions-item>
                                        <a-descriptions-item label="车辆选型与编组">
                                            {{ projects.TS_VehicleSelection || '--' }}
                                        </a-descriptions-item>
                                        <a-descriptions-item label="运营组织模式 ">
                                            {{ projects.TS_OperationalOrganization || '--' }}
                                        </a-descriptions-item>
                                    </a-descriptions>
                                    <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '150px' }">
                                        <a-descriptions-item label="重点工程 ">
                                            {{ projects.Project_IsEmphasis || '--' }}
                                        </a-descriptions-item>
                                        <a-descriptions-item label="项目说明 ">
                                            {{ projects.Project_Description || '--' }}
                                        </a-descriptions-item>
                                        <a-descriptions-item label="途经省份及长度 ">
                                            <!-- {{ projects.Project_ProvinceAndLength || '--' }} -->
                                        </a-descriptions-item>
                                    </a-descriptions>
                                    <a-descriptions bordered size="middle" :column="2">
                                        <a-descriptions-item label="合同时间 ">
                                            {{ projects.Project_ContractTime || '--' }}
                                        </a-descriptions-item>
                                        <a-descriptions-item label="项目状态 ">
                                            {{ getStatusText(projects.Project_Status) }}
                                        </a-descriptions-item>
                                        <a-descriptions-item label="计划通车时间 ">
                                            {{ '--' }}
                                        </a-descriptions-item>
                                        <a-descriptions-item label="项目投资 ">
                                            {{ formatNumber(projects.Project_InvestAmount) }} 万元
                                        </a-descriptions-item>
                                        <a-descriptions-item label="开工时间 ">
                                            {{ projects.Project_StartTime || '--' }}
                                        </a-descriptions-item>
                                        <a-descriptions-item label="合同金额 ">
                                            {{ formatNumber(projects.Project_Amount) }} 万元
                                        </a-descriptions-item>
                                        < </a-descriptions>
                                </a-card>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="主要技术标准" force-render>
                <div class="content-wrapper">
                    <a-row :gutter="[24, 24]">
                        <!-- 基本信息 -->
                        <a-col :span="24">
                            <a-card class="info-card">
                                <a-descriptions bordered size="middle" :column="2">
                                    <a-descriptions-item label="速度目标值">
                                        {{ technologyObj.TS_SpeedTarget || '--' }} km/h
                                    </a-descriptions-item>

                                    <a-descriptions-item label="地铁类型">
                                        <a-select mode="multiple" style="width: 100%;">
                                            <a-select-option v-for="type in projects.datamaps" :key="type.Id"
                                                :value="type.DM_Name">
                                                {{ type.DM_Name }}
                                            </a-select-option>
                                        </a-select>
                                    </a-descriptions-item>
                                    <a-descriptions-item label="闭塞类型">
                                        {{ technologyObj.TS_OcclusionType || '--' }}
                                    </a-descriptions-item>
                                    <a-descriptions-item label="机车类型">
                                        {{ '--' }}
                                    </a-descriptions-item>
                                    <a-descriptions-item label="牵引种类">
                                        {{ '--' }}
                                    </a-descriptions-item>
                                    <a-descriptions-item label="正线数目">
                                        {{ '--' }}
                                    </a-descriptions-item>
                                    <a-descriptions-item label="最小曲率半径">
                                        {{ '--' }}
                                    </a-descriptions-item>
                                    <a-descriptions-item label="牵引质量">
                                        {{ '--' }}
                                    </a-descriptions-item>
                                    <a-descriptions-item label="到发线有效长度">
                                        {{ '--' }}
                                    </a-descriptions-item>
                                    <a-descriptions-item label="限制坡度 ">
                                        {{ '--' }}
                                    </a-descriptions-item>

                                </a-descriptions>
                            </a-card>
                        </a-col>
                    </a-row>
                </div>

            </a-tab-pane>
            <a-tab-pane key="3" tab="客商信息">客商信息</a-tab-pane>
        </a-tabs>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const activeKey = ref("1");
const projects = ref({
    "Id": "e4a66a5d-dd41-44b4-836d-37f6e3c495cc",
    "Project_FullName": "成都市新都氢能源有轨电车示范线",
    "Project_Length": 16,
    "Project_Step": "预可研",
    "Project_InvestAmount": 282940,
    "Project_SDCost": null,
    "Project_IsEmphasis": "区间穿越宝成铁路、货运大大，车辆基地选址",
    "Project_StartTime": null,
    "Project_EndTime": null,
    "Project_Province": null,
    "Project_Description": "线路主线起于5号线华桂路站，向东沿兴城大道至于沸腾小镇站，支线由蜀龙大道站引出，沿蜀龙大道-学院路至于新都东站。线路全长约16km（主线12.1km，支线3.9km），共设站14座（主线11座，支线3座），平均站间距主线1.08km，支线1.2km；车辆基地1座，位于华桂路站西侧；控制中心及加氢站位于车辆基地内部。",
    "Project_ReciveAmount": null,
    "Project_ContractTime": null,
    "Project_Amount": null,
    "Project_Status": 0,
    "Project_NationalTestTime": null,
    "TS_OperationalOrganization": null,
    "TS_VehicleSelection": null,
    "TS_RaiywayLevel": "",
    "TS_ArrivalDeparture": 0,
    "TS_SpeedTarget": 70,
    "TS_BrigeTunnel": 0,
    "TS_TowMass": 0,
    "datamaps": [
        {
            "DM_Name": "请选择",
        },
        {
            "DM_FlowUnit": null,
            "DM_IsEnable": true,
            "DM_Module": "MetroType",
            "DM_Name": "地铁",
            "DM_Remark": "地铁分类",
            "DM_Sort": 310,
            "DM_SystemPart": null,
            "DM_Text": null,
            "DM_UseCase": null,
            "Id": "502ece27-6052-43dc-b3b9-8788a3f2a1aa"
        },
        {
            "DM_FlowUnit": null,
            "DM_IsEnable": true,
            "DM_Module": "MetroType",
            "DM_Name": "轻轨",
            "DM_Remark": "地铁分类",
            "DM_Sort": 320,
            "DM_SystemPart": null,
            "DM_Text": null,
            "DM_UseCase": null,
            "Id": "34ed4d69-2574-4cda-bb0f-51d0e6a1a842"
        },
        {
            "DM_FlowUnit": null,
            "DM_IsEnable": true,
            "DM_Module": "MetroType",
            "DM_Name": "市郊铁路",
            "DM_Remark": "地铁分类",
            "DM_Sort": 330,
            "DM_SystemPart": null,
            "DM_Text": null,
            "DM_UseCase": null,
            "Id": "d94e2342-c9ef-4d89-a1b3-c6e7f8360404"
        },
        {
            "DM_FlowUnit": null,
            "DM_IsEnable": true,
            "DM_Module": "MetroType",
            "DM_Name": "单轨",
            "DM_Remark": "地铁分类",
            "DM_Sort": 340,
            "DM_SystemPart": null,
            "DM_Text": null,
            "DM_UseCase": null,
            "Id": "3a06fad4-ad3a-43e1-8c75-7f12f5df6d8f"
        },
        {
            "DM_FlowUnit": null,
            "DM_IsEnable": true,
            "DM_Module": "MetroType",
            "DM_Name": "有轨电车",
            "DM_Remark": "地铁分类",
            "DM_Sort": 350,
            "DM_SystemPart": null,
            "DM_Text": null,
            "DM_UseCase": null,
            "Id": "854fa164-2987-4d53-a6e5-67be5ff269d0"
        },
        {
            "DM_FlowUnit": null,
            "DM_IsEnable": true,
            "DM_Module": "MetroType",
            "DM_Name": "磁浮",
            "DM_Remark": "地铁分类",
            "DM_Sort": 360,
            "DM_SystemPart": null,
            "DM_Text": null,
            "DM_UseCase": null,
            "Id": "45dcf9b0-0c3a-494b-bfb8-785c67fefdee"
        },
        {
            "DM_FlowUnit": null,
            "DM_IsEnable": true,
            "DM_Module": "MetroType",
            "DM_Name": "中低速磁浮",
            "DM_Remark": "地铁分类",
            "DM_Sort": 370,
            "DM_SystemPart": null,
            "DM_Text": null,
            "DM_UseCase": null,
            "Id": "7341ff96-8fd4-4e23-9143-179fbb75f5a8"
        }
    ],
    "ProjectStatusConfig": [
        {
            "Name": "进行中",
            "Value": 0
        },
        {
            "Name": "暂停",
            "Value": 1
        },
        {
            "Name": "已运营",
            "Value": 3
        }
    ],
    "isCG": true
})
const technologyObj = ref({
    "Id": "3fa2b765-b476-478c-8f2d-b039d67cf353",
    "TS_ArrivalDeparture": 0,
    "TS_BrigeTunnel": 0,
    "TS_LimitSlope": null,
    "TS_LocomotiveType": null,
    "TS_MainLineCount": null,
    "TS_MinCurRadius": null,
    "TS_OcclusionType": null,
    "TS_RaiywayLevel": "",
    "TS_SpeedTarget": 70,
    "TS_TowMass": 0,
    "TS_TowType": null,
    "Project_FullName": "成都市新都氢能源有轨电车示范线"
})

const formatNumber = (num: number | null) => {
    if (num === null || num === undefined) return '--';
    return num.toLocaleString('zh-CN');
};
// 方法
const getStatusText = (status: number) => {
    const config = projects.value.ProjectStatusConfig.find(c => c.Value === status);
    return config ? config.Name : '未知状态';
};
</script>