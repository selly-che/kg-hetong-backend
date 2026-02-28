<template>
  <div class="bgf br8">
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
                      <!-- {{ projects.Project_Step || "--" }} -->
                      {{ getStepText(projects.Project_Step) }}
                    </a-descriptions-item>
                    <a-descriptions-item label="地铁类型">
                      <a-select mode="multiple" style="width: 100%">
                        <a-select-option
                          v-for="type in projects.datamaps"
                          :key="type.Id"
                          :value="type.DM_Name"
                        >
                          {{ type.DM_Name }}
                        </a-select-option>
                      </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item label="线路长度">
                      {{ projects.Project_Length }} km
                    </a-descriptions-item>
                    <a-descriptions-item label="速度目标值">
                      {{ projects.TS_SpeedTarget || "--" }} km/h
                    </a-descriptions-item>
                    <a-descriptions-item label="车辆选型与编组">
                      {{ projects.TS_VehicleSelection || "--" }}
                    </a-descriptions-item>
                    <a-descriptions-item label="运营组织模式 ">
                      {{ projects.TS_OperationalOrganization || "--" }}
                    </a-descriptions-item>
                  </a-descriptions>
                  <a-descriptions
                    bordered
                    size="middle"
                    :column="1"
                    :labelStyle="{ width: '150px' }"
                  >
                    <a-descriptions-item label="重点工程 ">
                      {{ projects.Project_IsEmphasis || "--" }}
                    </a-descriptions-item>
                    <a-descriptions-item label="项目说明 ">
                      {{ projects.Project_Description || "--" }}
                    </a-descriptions-item>
                    <a-descriptions-item label="途经省份及长度 ">
                      <!-- {{ projects.Project_ProvinceAndLength || '--' }} -->
                    </a-descriptions-item>
                  </a-descriptions>
                  <a-descriptions bordered size="middle" :column="2">
                    <a-descriptions-item label="合同时间 ">
                      {{ projects.Project_ContractTime || "--" }}
                    </a-descriptions-item>
                    <a-descriptions-item label="项目状态 ">
                      {{ getStatusText(projects.Project_Status) }}
                    </a-descriptions-item>
                    <a-descriptions-item label="计划通车时间 ">
                      {{ "--" }}
                    </a-descriptions-item>
                    <a-descriptions-item label="项目投资 ">
                      {{ formatNumber(projects.Project_InvestAmount) }} 万元
                    </a-descriptions-item>
                    <a-descriptions-item label="开工时间 ">
                      {{ projects.Project_StartTime || "--" }}
                    </a-descriptions-item>
                    <a-descriptions-item label="合同金额 ">
                      {{ formatNumber(projects.Project_Amount) }} 万元
                    </a-descriptions-item>
                  </a-descriptions>
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
                    {{ technologyObj.tsSpeedTarget || "--" }} km/h
                  </a-descriptions-item>

                  <a-descriptions-item label="地铁类型">
                    <a-select mode="multiple" style="width: 100%">
                      <a-select-option
                        v-for="type in projects.datamaps"
                        :key="type.Id"
                        :value="type.DM_Name"
                      >
                        {{ type.DM_Name }}
                      </a-select-option>
                    </a-select>
                  </a-descriptions-item>
                  <a-descriptions-item label="闭塞类型">
                    {{ technologyObj.tsOcclusionType || "--" }}
                  </a-descriptions-item>
                  <a-descriptions-item label="机车类型">
                    {{ technologyObj.tsLocomotiveType || "--" }}
                  </a-descriptions-item>
                  <a-descriptions-item label="牵引种类">
                    {{ technologyObj.tsTowType || "--" }}
                  </a-descriptions-item>
                  <a-descriptions-item label="正线数目">
                    {{ technologyObj.tsMainLineCount || "--" }}
                  </a-descriptions-item>
                  <a-descriptions-item label="最小曲率半径">
                    {{ technologyObj.tsMinCurRadius || "--" }}
                  </a-descriptions-item>
                  <a-descriptions-item label="牵引质量">
                    {{ technologyObj.tsTowMass || "--" }}
                  </a-descriptions-item>
                  <a-descriptions-item label="到发线有效长度">
                    {{ technologyObj.tsArrivalDeparture || "--" }}
                  </a-descriptions-item>
                  <a-descriptions-item label="限制坡度 ">
                    {{ technologyObj.tsLimitSlope || "--" }}
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
import { ref, onMounted, watch } from "vue";
import getDates from "@/network/index";
import { useRoute } from "vue-router";

const activeKey = ref("1");
const route = useRoute();
interface DataMapItem {
  Id: string | number;
  DM_Name: string;
}
const projects = ref({
  Id: "",
  Project_FullName: "",
  Project_Length: 0,
  Project_Step: "",
  Project_InvestAmount: 0,
  Project_SDCost: 0,
  Project_IsEmphasis: "",
  Project_StartTime: "",
  Project_EndTime: "",
  Project_Province: "",
  Project_Description: "",
  Project_ReciveAmount: 0,
  Project_ContractTime: "",
  Project_Amount: 0,
  Project_Status: 0,
  Project_NationalTestTime: "",
  TS_OperationalOrganization: "",
  TS_VehicleSelection: "",
  TS_RaiywayLevel: "",
  TS_ArrivalDeparture: 0,
  TS_SpeedTarget: 0,
  TS_BrigeTunnel: 0,
  TS_TowMass: 0,
  datamaps: [] as DataMapItem[],
  ProjectStatusConfig: [
    {
      Name: "进行中",
      Value: 0,
    },
    {
      Name: "暂停",
      Value: 1,
    },
    {
      Name: "已运营",
      Value: 3,
    },
  ],
  ProjectStepConfig: [
    {
      Name: "预付期",
      Value: "600",
    },
    {
      Name: "投标",
      Value: "601",
    },
    {
      Name: "可研",
      Value: "602",
    },
  ],
  isCG: true,
});
const technologyObj = ref({
  id: "--",
  pmProjectId: "--",
  tsArrivalDeparture: 0,
  tsBrigeTunnel: 0,
  tsLimitSlope: "",
  tsLocomotiveType: "--",
  tsMainLineCount: "--",
  tsMinCurRadius: "--",
  tsOcclusionType: "--",
  tsOperationalOrganization: "--",
  tsRaiywayLevel: "--",
  tsSpeedTarget: 0,
  tsTowMass: 0,
  tsTowType: "--",
  tsVehicleSelection: "--",
});

onMounted(() => {
  getprojectsdetails();
});
//监听路由参数变化
watch(
  () => route.query.projectId,
  (newProjectid) => {
    if (newProjectid) {
      getprojectsdetails();
    }
  },
);

const getprojectsdetails = async () => {
  const res = await getDates("project/GetProjectDetails", {
    projectId: route.query.projectId || 1,
  });
  const projectbaseInfo = res.data.result.projectInfo;
  const techStandards = res.data.result.techStandards[0];
  technologyObj.value = techStandards;
  // console.log("项目基本信息", projectbaseInfo.projectStep);

  projects.value = {
    Id: projectbaseInfo.id || "",
    Project_FullName: projectbaseInfo.projectFullName || "",
    Project_Length: projectbaseInfo.projectLength || 0,
    Project_Step: projectbaseInfo.projectStep || "",
    Project_InvestAmount: projectbaseInfo.projectInvestAmount || 0,
    Project_SDCost: projectbaseInfo.projectSDCost || 0,
    Project_IsEmphasis: projectbaseInfo.projectIsEmphasis === 1 ? "是" : "否",
    Project_StartTime: projectbaseInfo.projectStartTime || "",
    Project_EndTime: projectbaseInfo.projectEndTime || "",
    Project_Province: projectbaseInfo.projectProvince || "",
    Project_Description: projectbaseInfo.projectDescription || "",
    Project_ReciveAmount: projectbaseInfo.projectReciveAmount || 0,
    Project_ContractTime: projectbaseInfo.projectContractTime || "",
    Project_Amount: projectbaseInfo.projectAmount || 0,
    Project_Status: projectbaseInfo.projectStatus || 0,
    Project_NationalTestTime: projectbaseInfo.projectNationalTestTime || "",
    TS_OperationalOrganization: "",
    TS_VehicleSelection: "",
    TS_RaiywayLevel: "",
    TS_ArrivalDeparture: 0,
    TS_SpeedTarget: parseInt(projectbaseInfo.projectSpeed) || 0,
    TS_BrigeTunnel: 0,
    TS_TowMass: 0,
    datamaps: projectbaseInfo.datamaps || [],
    ProjectStatusConfig: [
      {
        Name: "进行中",
        Value: 0,
      },
      {
        Name: "暂停",
        Value: 1,
      },
      {
        Name: "已运营",
        Value: 3,
      },
    ],
    ProjectStepConfig: [
      {
        Name: "预付期",
        Value: "600",
      },
      {
        Name: "投标",
        Value: "601",
      },
      {
        Name: "可研",
        Value: "602",
      },
    ],
    isCG: true,
  };
};

const formatNumber = (num: number | null) => {
  if (num === null || num === undefined) return "--";
  return num.toLocaleString("zh-CN");
};
// 方法
const getStatusText = (status: number) => {
  const config = projects.value.ProjectStatusConfig.find(
    (c) => c.Value === status,
  );
  return config ? config.Name : "未知状态";
};
const getStepText = (step: string) => {
  const config = projects.value.ProjectStepConfig.find((c) => c.Value === step);
  return config ? config.Name : "--";
};
</script>
