<template>
  <div class="bgf br8">
    <div class="project-title">{{ projects.Project_FullName }}</div>
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="基本信息">
        <div class="project-detail-page">
          <!-- 编辑、保存 -->
          <div class="edit-wrapper" v-if="Editable">
            <a-button v-if="!isEditMode" type="primary" @click="handleEdit">编辑</a-button>
            <template v-else>
              <a-button @click="handleCancel">取消</a-button>
              <a-button type="primary" :loading="saving" @click="handleSave">保存</a-button>
            </template>
          </div>
          <div class="content-wrapper">
            <a-row :gutter="[24, 24]">
              <!-- 基本信息 -->
              <a-col :span="24">
                <a-card class="info-card">
                  <!-- 查看模式 -->
                  <a-descriptions v-if="!isEditMode" bordered size="middle" :column="2"
                    :labelStyle="{ width: '150px' }">
                    <a-descriptions-item label="当前阶段">
                      {{ getStepText(projects.Project_Step) }}
                    </a-descriptions-item>
                    <a-descriptions-item label="铁路等级">
                      {{ projects.TS_RaiywayLevel || "--" }}
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

                  <!-- 编辑模式 -->
                  <a-form v-else :model="editForm" layout="vertical">
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="当前阶段">
                          <a-select mode="multiple" allowClear v-model:value="editForm.projectStep"
                            placeholder="请选择项目阶段" disabled>
                            <a-select-option value="600">预付期</a-select-option>
                            <a-select-option value="601">投标</a-select-option>
                            <a-select-option value="602">规划</a-select-option>
                            <a-select-option value="603">预可研</a-select-option>
                            <a-select-option value="604">可研</a-select-option>
                            <a-select-option value="605">初步设计</a-select-option>
                            <a-select-option value="606">施工图</a-select-option>
                            <a-select-option value="607">配合施工</a-select-option>
                            <a-select-option value="608">开通运营</a-select-option>
                            <a-select-option value="609">招标图</a-select-option>
                            <a-select-option value="610">专题专项</a-select-option>
                            <a-select-option value="611">清概（结算）</a-select-option>
                            <a-select-option value="612">质保期</a-select-option>
                          </a-select>
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="铁路等级">
                          <a-input v-model:value="editForm.tsRaiywayLevel" placeholder="请输入铁路等级" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="线路长度(km)">
                          <a-input-number v-model:value="editForm.projectLength" :min="0" :precision="2"
                            style="width: 100%" placeholder="请输入线路长度" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="速度目标值(km/h)">
                          <a-input-number v-model:value="editForm.speedTarget" :min="0" style="width: 100%"
                            placeholder="请输入速度目标值" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="车辆选型与编组">
                          <a-input v-model:value="editForm.tsVehicleSelection" placeholder="请输入车辆选型与编组" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="运营组织模式">
                          <a-input v-model:value="editForm.tsOperationalOrganization" placeholder="请输入运营组织模式" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-form>

                  <a-descriptions v-if="!isEditMode" bordered size="middle" :column="1"
                    :labelStyle="{ width: '150px' }">
                    <a-descriptions-item label="重点工程 ">
                      {{ projects.Project_IsEmphasis || "--" }}
                    </a-descriptions-item>
                    <a-descriptions-item label="项目说明 ">
                      {{ projects.Project_Description || "--" }}
                    </a-descriptions-item>
                  </a-descriptions>

                  <a-form v-else :model="editForm" layout="vertical">
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="重点工程">
                          <a-radio-group v-model:value="editForm.isEmphasis">
                            <a-radio value="是">是</a-radio>
                            <a-radio value="否">否</a-radio>
                          </a-radio-group>
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-form-item label="项目说明">
                      <a-textarea v-model:value="editForm.description" :rows="4" placeholder="请输入项目说明" />
                    </a-form-item>
                  </a-form>

                  <a-descriptions v-if="!isEditMode" bordered size="middle" :column="2"
                    :labelStyle="{ width: '150px' }">
                    <a-descriptions-item label="合同时间 ">
                      {{ projects.Project_ContractTime || "--" }}
                    </a-descriptions-item>
                    <a-descriptions-item label="项目状态 ">
                      {{ getStatusText(projects.Project_Status) }}
                    </a-descriptions-item>
                    <a-descriptions-item label="计划通车时间 ">
                      {{ projects.Project_EndTime || "--" }}
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

                  <a-form v-else :model="editForm" layout="vertical">
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="合同时间">
                          <a-date-picker v-model:value="editForm.contractTime" show-time format="YYYY-MM-DD HH:mm:ss"
                            value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" placeholder="请选择合同时间" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="项目状态">
                          <a-select v-model:value="editForm.projectStatus" placeholder="请选择项目状态">
                            <a-select-option :value="0">进行中</a-select-option>
                            <a-select-option :value="1">暂停</a-select-option>
                            <a-select-option :value="3">已运营</a-select-option>
                          </a-select>
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row :gutter="16">

                      <a-col :span="12">
                        <a-form-item label="计划通车时间">
                          <a-date-picker v-model:value="editForm.projectEndTime" show-time format="YYYY-MM-DD HH:mm:ss"
                            value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" placeholder="请选择计划通车时间" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="项目投资(万元)">
                          <a-input-number v-model:value="editForm.investAmount" :min="0" :precision="2"
                            style="width: 100%" placeholder="请输入项目投资" />
                        </a-form-item>
                      </a-col>


                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="开工时间">
                          <a-date-picker v-model:value="editForm.startTime" show-time format="YYYY-MM-DD HH:mm:ss"
                            value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" placeholder="请选择开工时间" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="合同金额(万元)">
                          <a-input-number v-model:value="editForm.amount" :min="0" :precision="2" style="width: 100%"
                            placeholder="请输入合同金额" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-form>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="主要技术标准" force-render>
        <div class="project-detail-page">
          <!-- 编辑、保存 -->
          <div class="edit-wrapper" v-if="Editable">
            <a-button v-if="!isTechEditMode" type="primary" @click="handleTechEdit">编辑</a-button>
            <template v-else>
              <a-button @click="handleTechCancel">取消</a-button>
              <a-button type="primary" :loading="techSaving" @click="handleTechSave">保存</a-button>
            </template>
          </div>
          <div class="content-wrapper">
            <a-row :gutter="[24, 24]">
              <!-- 基本信息 -->
              <a-col :span="24">
                <a-card class="info-card">
                  <!-- 查看模式 -->
                  <a-descriptions v-if="!isTechEditMode" bordered size="middle" :column="2"
                    :labelStyle="{ width: '150px' }">
                    <a-descriptions-item label="速度目标值">
                      {{ technologyObj.tsSpeedTarget || "--" }} km/h
                    </a-descriptions-item>

                    <a-descriptions-item label="地铁类型">
                      {{ technologyObj.tsOperationalOrganization || "--" }}
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

                  <!-- 编辑模式 -->
                  <a-form v-else :model="techEditForm" layout="vertical">
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="速度目标值(km/h)">
                          <a-input-number v-model:value="techEditForm.tsSpeedTarget" :min="0" style="width: 100%"
                            placeholder="请输入速度目标值" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="地铁类型">
                          <!-- 输入框 -->
                          <a-input v-model:value="techEditForm.tsOperationalOrganization" placeholder="请输入地铁类型" />
                          <!-- <a-select v-model:value="techEditForm.tsOperationalOrganization" mode="multiple" placeholder="请选择地铁类型">
                            <a-select-option v-for="type in projects.datamaps" :key="type.Id" :value="type.DM_Name">
                              {{ type.DM_Name }}
                            </a-select-option>
                          </a-select> -->
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="闭塞类型">
                          <a-input v-model:value="techEditForm.tsOcclusionType" placeholder="请输入闭塞类型" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="机车类型">
                          <a-input v-model:value="techEditForm.tsLocomotiveType" placeholder="请输入机车类型" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="牵引种类">
                          <a-input v-model:value="techEditForm.tsTowType" placeholder="请输入牵引种类" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="正线数目">
                          <a-input v-model:value="techEditForm.tsMainLineCount" placeholder="请输入正线数目" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="最小曲率半径">
                          <a-input v-model:value="techEditForm.tsMinCurRadius" placeholder="请输入最小曲率半径" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="牵引质量">
                          <a-input-number v-model:value="techEditForm.tsTowMass" :min="0" style="width: 100%"
                            placeholder="请输入牵引质量" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="到发线有效长度">
                          <a-input-number v-model:value="techEditForm.tsArrivalDeparture" :min="0" style="width: 100%"
                            placeholder="请输入到发线有效长度" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="限制坡度">
                          <a-input v-model:value="techEditForm.tsLimitSlope" placeholder="请输入限制坡度" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-form>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="3" tab="客商信息">
        <a-descriptions bordered size="middle" :column="2" :labelStyle="{ width: '150px' }">
          <a-descriptions-item label="客商名称">{{ "四川千崇建设有限公司" }}</a-descriptions-item>
          <a-descriptions-item label="客商编号">{{ "91511903MA65FR0G9R" }}</a-descriptions-item>
        </a-descriptions>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch,onActivated } from "vue";
import getDates from "@/network/index";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import dayjs from "dayjs";

const activeKey = ref("1");
const route = useRoute();
const isEditMode = ref(false);
const saving = ref(false);
const isTechEditMode = ref(false);
const techSaving = ref(false);

interface DataMapItem {
  Id: string | number;
  DM_Name: string;
}

const projects = ref({
  Id: "",
  Project_FullName: "",
  Project_Length: 0,
  Project_Step: [] as string[],
  Project_InvestAmount: 0,
  Project_EndTime: "",
  Project_SDCost: 0,
  Project_IsEmphasis: "",
  Project_StartTime: "",
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

// 编辑表单数据
const editForm = ref({
  projectStep: [] as string[],
  projectLength: 0,
  speedTarget: 0,
  tsOperationalOrganization: "",
  isEmphasis: "否",
  description: "",
  contractTime: undefined as any,
  projectStatus: 0,
  investAmount: 0,
  startTime: undefined as any,
  amount: 0,
  projectStartTime: undefined as any,
  tsRaiywayLevel: "",
  tsVehicleSelection: "",
  projectEndTime: undefined as any,
});

// 技术标准编辑表单
const techEditForm = ref({
  tsSpeedTarget: 0,
  tsVehicleSelection: "",
  tsOcclusionType: "",
  tsLocomotiveType: "",
  tsTowType: "",
  tsMainLineCount: "",
  tsMinCurRadius: "",
  tsTowMass: 0,
  tsArrivalDeparture: 0,
  tsLimitSlope: "",
  tsOperationalOrganization: "",
});

const Editable = ref(false);


onMounted(() => {
  getprojectsdetails();
});

watch(
  () => route.query.projectId,
  (newProjectid) => {
    if (newProjectid) {
      getprojectsdetails();
      Editable.value = route.query.Editable === "true";
    }
  },
);
watch(
  // 判断页面路径发生变化就重新获取数据
  () => route.query.Editable,
  (newEditable) => {
    if (newEditable) {
      Editable.value = newEditable === "true";
      console.log(Editable.value, "EditableEditable");
    }
  },
  { deep: true, immediate: true }

);

const getprojectsdetails = async () => {
  try {
    const res = await getDates("project/GetProjectDetails", {
      projectId: route.query.projectId || 1,
    });
    const projectbaseInfo = res.data.result.projectInfo;
    const techStandards = res.data.result.techStandards[0];
    technologyObj.value = techStandards || {};

    projects.value = {
      Id: projectbaseInfo.id || "",
      Project_FullName: projectbaseInfo.projectFullName || "",
      Project_Length: projectbaseInfo.projectLength || 0,
      Project_Step: projectbaseInfo.projectStep ? projectbaseInfo.projectStep.split(",") : [],
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
      TS_OperationalOrganization: techStandards?.tsOperationalOrganization || "",
      TS_VehicleSelection: techStandards?.tsVehicleSelection || "",
      TS_RaiywayLevel: techStandards?.tsRaiywayLevel || "",
      TS_ArrivalDeparture: techStandards?.tsArrivalDeparture || 0,
      TS_SpeedTarget: parseInt(projectbaseInfo.projectSpeed) || 0,
      TS_BrigeTunnel: techStandards?.tsBrigeTunnel || 0,
      TS_TowMass: techStandards?.tsTowMass || 0,
      datamaps: projectbaseInfo.datamaps || [],
      ProjectStatusConfig: [
        { Name: "进行中", Value: 0 },
        { Name: "暂停", Value: 1 },
        { Name: "已运营", Value: 3 },
      ],
      ProjectStepConfig: [
        { Name: "预付期", Value: "600" },
        { Name: "投标", Value: "601" },
        { Name: "规划", Value: "602" },
        { Name: "预可研", Value: "603" },
        { Name: "可研", Value: "604" },
        { Name: "初步设计", Value: "605" },
        { Name: "施工图", Value: "606" },
        { Name: "配合施工", Value: "607" },
        { Name: "开通运营", Value: "608" },
        { Name: "招标图", Value: "609" },
        { Name: "专题专项", Value: "610" },
        { Name: "清概（结算）", Value: "611" },
        { Name: "质保期", Value: "612" },
      ],
      isCG: true,
    };
  } catch (error) {
    console.error("获取项目详情失败:", error);
    message.error("获取项目详情失败");
  }
};

const formatNumber = (num: number | null) => {
  if (num === null || num === undefined) return "--";
  return num.toLocaleString("zh-CN");
};

const getStatusText = (status: number) => {
  const config = projects.value.ProjectStatusConfig.find(
    (c) => c.Value === status,
  );
  return config ? config.Name : "未知状态";
};

const getStepText = (step: Array<string> | string) => {
  if (!Array.isArray(step)) {
    return step;
  } else {
    const stepNames = projects.value.ProjectStepConfig.filter((config) =>
      step.includes(config.Value),
    ).map((config) => config.Name);
    return stepNames.join(", ");
  }

};


// 进入编辑模式
const handleEdit = () => {
  // 初始化编辑表单
  editForm.value = {
    projectStep: projects.value.Project_Step,
    projectLength: projects.value.Project_Length,
    speedTarget: projects.value.TS_SpeedTarget,
    tsVehicleSelection: projects.value.TS_VehicleSelection,
    tsOperationalOrganization: projects.value.TS_OperationalOrganization,
    isEmphasis: projects.value.Project_IsEmphasis,
    description: projects.value.Project_Description,
    contractTime: projects.value.Project_ContractTime ? dayjs(projects.value.Project_ContractTime) : undefined,
    projectStatus: projects.value.Project_Status,
    investAmount: projects.value.Project_InvestAmount,
    startTime: projects.value.Project_StartTime ? dayjs(projects.value.Project_StartTime) : undefined,
    amount: projects.value.Project_Amount,
    projectStartTime: projects.value.Project_NationalTestTime ? dayjs(projects.value.Project_NationalTestTime) : undefined,
    tsRaiywayLevel: technologyObj.value.tsRaiywayLevel || "",
    projectEndTime: projects.value.Project_EndTime ? dayjs(projects.value.Project_EndTime) : undefined,
  };

  isEditMode.value = true;
};

// 取消编辑
const handleCancel = () => {
  isEditMode.value = false;
};

// 保存数据
const handleSave = async () => {
  try {
    saving.value = true;

    // 构建保存数据
    const saveData = {
      id: projects.value.Id,
      projectFullName: projects.value.Project_FullName,
      projectStep: editForm.value.projectStep.join(","),
      projectLength: editForm.value.projectLength,
      projectSpeed: editForm.value.speedTarget.toString(),
      projectIsEmphasis: editForm.value.isEmphasis === "是" ? 1 : 0,
      projectDescription: editForm.value.description,
      projectContractTime: editForm.value.contractTime ? dayjs(editForm.value.contractTime).format("YYYY-MM-DD HH:mm:ss") : "",
      projectStatus: editForm.value.projectStatus,
      projectInvestAmount: editForm.value.investAmount,
      projectStartTime: editForm.value.startTime ? dayjs(editForm.value.startTime).format("YYYY-MM-DD HH:mm:ss") : "",
      projectAmount: editForm.value.amount,
      projectEndTime: editForm.value.projectEndTime ? dayjs(editForm.value.projectEndTime).format("YYYY-MM-DD HH:mm:ss") : "",
      // 技术标准数据
      techStandards: {
        tsRaiywayLevel: editForm.value.tsRaiywayLevel,
        tsVehicleSelection: editForm.value.tsVehicleSelection,
        tsOperationalOrganization: editForm.value.tsOperationalOrganization,
        pmProjectId: projects.value.Id,
        tsSpeedTarget: techEditForm.value.tsSpeedTarget,
        tsOcclusionType: techEditForm.value.tsOcclusionType,
        tsLocomotiveType: techEditForm.value.tsLocomotiveType,
        tsTowType: techEditForm.value.tsTowType,
        tsMainLineCount: techEditForm.value.tsMainLineCount,
        tsMinCurRadius: techEditForm.value.tsMinCurRadius,
        tsTowMass: techEditForm.value.tsTowMass,
        tsArrivalDeparture: techEditForm.value.tsArrivalDeparture,
        tsLimitSlope: techEditForm.value.tsLimitSlope,
      },
    };
    const res = await getDates("project/AddProject", saveData);

    if (res.data.code === 200 || res.data.code === 0) {
      message.success("保存成功");
      isEditMode.value = false;
      // 重新加载数据
      await getprojectsdetails();
    } else {
      message.error(res.data.message || "保存失败");
    }
  } catch (error) {
    console.error("保存失败:", error);
    message.error("保存失败，请稍后重试");
  } finally {
    saving.value = false;
  }
};

// 进入技术标准编辑模式
const handleTechEdit = () => {
  // 初始化技术标准编辑表单
  techEditForm.value = {
    tsSpeedTarget: technologyObj.value.tsSpeedTarget,
    tsVehicleSelection: technologyObj.value.tsVehicleSelection || "",
    tsOcclusionType: technologyObj.value.tsOcclusionType || "",
    tsLocomotiveType: technologyObj.value.tsLocomotiveType || "",
    tsTowType: technologyObj.value.tsTowType || "",
    tsMainLineCount: technologyObj.value.tsMainLineCount || "",
    tsMinCurRadius: technologyObj.value.tsMinCurRadius || "",
    tsTowMass: technologyObj.value.tsTowMass,
    tsArrivalDeparture: technologyObj.value.tsArrivalDeparture,
    tsLimitSlope: technologyObj.value.tsLimitSlope || "",
    tsOperationalOrganization: technologyObj.value.tsOperationalOrganization || "",
  };

  isTechEditMode.value = true;
};

// 取消技术标准编辑
const handleTechCancel = () => {
  isTechEditMode.value = false;
};

// 保存技术标准数据
const handleTechSave = async () => {
  try {
    techSaving.value = true;

    // 构建保存数据
    const saveData = {
      id: projects.value.Id,
      projectFullName: projects.value.Project_FullName,
      projectStep: Array.isArray(projects.value.Project_Step)
        ? projects.value.Project_Step.join(",")
        : projects.value.Project_Step,
      projectLength: projects.value.Project_Length,
      projectSpeed: projects.value.TS_SpeedTarget.toString(),
      projectIsEmphasis: projects.value.Project_IsEmphasis === "是" ? 1 : 0,
      projectDescription: projects.value.Project_Description,
      projectContractTime: projects.value.Project_ContractTime,
      projectStatus: projects.value.Project_Status,
      projectInvestAmount: projects.value.Project_InvestAmount,
      projectStartTime: projects.value.Project_StartTime,
      projectAmount: projects.value.Project_Amount,
      // 技术标准数据
      techStandards: {
        pmProjectId: projects.value.Id,
        tsRaiywayLevel: technologyObj.value.tsRaiywayLevel || "",
        tsOperationalOrganization: projects.value.TS_OperationalOrganization,
        tsVehicleSelection: techEditForm.value.tsVehicleSelection,
        tsSpeedTarget: techEditForm.value.tsSpeedTarget,
        tsOcclusionType: techEditForm.value.tsOcclusionType,
        tsLocomotiveType: techEditForm.value.tsLocomotiveType,
        tsTowType: techEditForm.value.tsTowType,
        tsMainLineCount: techEditForm.value.tsMainLineCount,
        tsMinCurRadius: techEditForm.value.tsMinCurRadius,
        tsTowMass: techEditForm.value.tsTowMass,
        tsArrivalDeparture: techEditForm.value.tsArrivalDeparture,
        tsLimitSlope: techEditForm.value.tsLimitSlope,
      },
    };

    const res = await getDates("project/AddProject", saveData);

    if (res.data.code === 200 || res.data.code === 0) {
      message.success("保存成功");
      isTechEditMode.value = false;
      // 重新加载数据
      await getprojectsdetails();
    } else {
      message.error(res.data.message || "保存失败");
    }
  } catch (error) {
    console.error("保存失败:", error);
    message.error("保存失败，请稍后重试");
  } finally {
    techSaving.value = false;
  }
};
</script>

<style scoped>
.edit-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  gap: 10px;
}

.info-card {
  margin-bottom: 16px;
}

:deep(.ant-form-item) {
  margin-bottom: 16px;
}
</style>