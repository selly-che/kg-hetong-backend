<template>
  <div>
    <div class="pd20 bgf br8">
      <div>台账管理123</div>
      <a-tabs v-model:activeKey="activeKey">

        <a-tab-pane key="1" tab="基本信息">
          <div class="project-detail-page">

            <div class="project-title">{{ projects.Project_FullName }}</div>

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
                          <a-select-option v-for="type in projects.datamaps" :key="type.Id" :value="type.DM_Name">
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
                        <a-select-option v-for="type in projects.datamaps" :key="type.Id" :value="type.DM_Name">
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

        <a-tab-pane key="4" tab="生产组织">
          <div class="project-detail-page">

            <div class="project-title">{{ ProductionObj.Project_ShortName }}</div>

            <div class="content-wrapper">
              <a-row :gutter="[24, 24]">
                <!-- 基本信息 -->
                <a-col :span="24">
                  <a-card class="info-card">
                    <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
                      <a-descriptions-item label="查看其他阶段">
                        <a-select style="width: 100%;" v-model:value="projectStepValue">
                          <!-- 默认第一条 -->
                          <a-select-option v-for="type in ProductionObj.projectStep" :key="type.Num" :value="type.Text">
                            {{ type.Text }}
                          </a-select-option>
                        </a-select>
                      </a-descriptions-item>
                    </a-descriptions>
                    <div class="project_mainTitle">分管领导</div>
                    <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
                      <a-descriptions-item label="集团分管领导">
                        <a-select style="width: 100%;">
                          <a-select-option v-for="type in allChargeEntity['分管副总经理']" :key="type.Id" :value="type.Name">
                            {{ type.Name }}
                          </a-select-option>
                        </a-select>
                      </a-descriptions-item>
                      <a-descriptions-item label="分管总(副总)工">
                        <a-select style="width: 100%;">
                          <a-select-option v-for="type in allChargeEntity['分管副总工']" :key="type.Id" :value="type.Name">
                            {{ type.Name }}
                          </a-select-option>
                        </a-select>
                      </a-descriptions-item>
                      <a-descriptions-item label="公司总(副总)工">
                        <div>
                          <a-checkbox style="width: 90px;margin: 0;" v-for="value in allChargeEntity['专业副总工']"
                            :key="value.Id">{{ value.Name }}</a-checkbox>
                        </div>
                      </a-descriptions-item>
                      <a-descriptions-item label="经营计划部分管领导">
                        <a-select style="width: 100%;">
                          <a-select-option v-for="type in allChargeEntity['计经部分管领导']" :key="type.Id" :value="type.Name">
                            {{ type.Name }}
                          </a-select-option>
                        </a-select>
                      </a-descriptions-item>
                    </a-descriptions>
                    <a-descriptions bordered size="middle" :column="2" :labelStyle="{ width: '180px' }">
                      <a-descriptions-item label="主管计调">
                        {{ ProductionObj.Manager_ChargeName || '--' }}
                      </a-descriptions-item>
                      <a-descriptions-item label="协管计调">
                        {{ ProductionObj.Manager_AssistName || '--' }}
                      </a-descriptions-item>
                    </a-descriptions>
                    <div class="project_mainTitle">总体</div>
                    <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
                      <a-descriptions-item label="总体">
                        <a-select style="width: 100%;">
                          <a-select-option v-for="type in ProductionObj.popuDic" :key="type.value" :value="type.text">
                            {{ type.text }}
                          </a-select-option>
                        </a-select>
                      </a-descriptions-item>
                      <a-descriptions-item label="常务副总体">
                        <a-select style="width: 100%;">
                          <a-select-option v-for="type in ProductionObj.popuCWDic" :key="type.value" :value="type.text">
                            {{ type.text }}
                          </a-select-option>
                        </a-select>
                      </a-descriptions-item>
                      <a-descriptions-item label="专业副总体">
                        <a-select style="width: 100%;">
                          <a-select-option v-for="type in ProductionObj.popuZYDic" :key="type.value" :value="type.text">
                            {{ type.text }}
                          </a-select-option>
                        </a-select>
                      </a-descriptions-item>
                    </a-descriptions>
                    <div class="project_mainTitle">项目部</div>
                    <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
                      <a-descriptions-item label="项目部">
                        <a-select style="width: 100%;">
                          <a-select-option v-for="type in ProductionObj.XMBEntity" :key="type.value" :value="type.text">
                            {{ type.text }}
                          </a-select-option>
                        </a-select>
                      </a-descriptions-item>
                      <a-descriptions-item label="项目部经理(计调)">
                        <a-select style="width: 100%;">
                          <a-select-option v-for="type in ProductionObj.xmbUDic" :key="type.value" :value="type.text">
                            {{ type.text }}
                          </a-select-option>
                        </a-select>
                      </a-descriptions-item>
                    </a-descriptions>

                    <div class="project_mainTitle">主体责任单位</div>
                    <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
                      <a-descriptions-item label="单位">
                        <a-select style="width: 100%;">
                          <a-select-option v-for="type in ProductionObj.ZhuTiZeRenEntity" :key="type.value"
                            :value="type.text">
                            {{ type.text }}
                          </a-select-option>
                        </a-select>
                      </a-descriptions-item>
                    </a-descriptions>
                    <div class="project_mainTitle">参与单位</div>
                    <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
                      <a-descriptions-item label="单位">
                        <a-select style="width: 100%;">
                          <a-select-option v-for="type in ProductionObj.QiTaCanYuEntity" :key="type.value"
                            :value="type.text">
                            {{ type.text }}
                          </a-select-option>
                        </a-select>
                      </a-descriptions-item>
                      <a-descriptions-item label="备注">
                        <a-textarea :rows="4" placeholder="" :maxlength="6" />
                      </a-descriptions-item>
                    </a-descriptions>
                  </a-card>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="5" tab="进度管理">
          <div class="project-progress-container">
            <!-- 进度卡片区域 -->
            <a-row :gutter="[16, 16]" class="progress-cards">
              <a-col :span="6">
                <a-card size="small" title="当前项目生产进度">
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
                    <span class="progress-value">{{ progressData.ProgressSummary.CollectionProportion || '0%' }}</span>
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
        </a-tab-pane>

      </a-tabs>

    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LedgerManagement",
};
</script>

<script lang="ts" setup>
import { ref } from "vue";
import { onMounted, computed } from "vue";
import { FormOutlined } from "@ant-design/icons-vue";
// 项目概况 =》 基本信息  ----------------------------------------------
const activeKey = ref("5");
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
const formatNumber = (num: number | null) => {
  if (num === null || num === undefined) return '--';
  return num.toLocaleString('zh-CN');
};
// 方法
const getStatusText = (status: number) => {
  const config = projects.value.ProjectStatusConfig.find(c => c.Value === status);
  return config ? config.Name : '未知状态';
};

// 项目概况 =》 主要技术流  ----------------------------------------------
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

//  生产组织 ----------------------------------------------
const projectStepValue = ref(['预可研（当前阶段）']);
const ProductionObj = ref({
  "yesorno": true,
  "popuDic": [
    {
      "text": "刘向远(贵阳公司)",
      "value": "d003301b-d2d2-431a-811e-02593553d5c5"
    }
  ],
  "popuCWDic": [
    {
      "text": "刘宏骑(生环院)",
      "value": "f3680c18-e098-4933-a332-052fc2a77329"
    }
  ],
  "popuZYDic": [
    {
      "text": "刘用攀(民航院)",
      "value": "756a3642-9f83-4895-ba61-05cd938b3777"
    }
  ],
  "productEntity": {
    "Is_Assess": 0,
    "Is_Counted": 0,
    "PO_CreateTime": "/Date(1729154853000)/",
    "PO_Desc": "",
    "PO_ProjectID": "e4a66a5d-dd41-44b4-836d-37f6e3c495cc",
    "PO_Step": 603,
    "T_SYS_DepartmentId": "4e36de3e-ddcb-41ef-9467-726ef768205b",
    "T_SYS_User_Id": "dd7cbc7f-045b-4a39-bcb2-01a285f50e26、73117819-5f34-46d6-8cde-01ea7d0d8f04",
    "PS_ProductionOrgBearUnit": null,
    "Id": "2d9b57c8-0243-4288-aec9-17476d785c76"
  },
  "XMBEntity": [
    {
      "text": "成都地铁项目部",
      "value": "4e36de3e-ddcb-41ef-9467-726ef768205b"
    }
  ],
  "xmbUDic": [
    {
      "text": "陈美伶(昆明公司)",
      "value": "dd7cbc7f-045b-4a39-bcb2-01a285f50e26"
    },
    {
      "text": "陈先武(地勘院)",
      "value": "73117819-5f34-46d6-8cde-01ea7d0d8f04"
    }
  ],
  "chargeEntity": [
    {
      "Id": "caeecd07-3c4b-4ed3-8d5b-9319ce12d074",
      "Name": "陈明华",
      "Type": "计经部分管领导"
    },
    {
      "Id": "bc29d165-496e-429d-9ffa-b2bc15081bbd",
      "Name": "罗世培",
      "Type": "分管副总工"
    },
    {
      "Id": "7469c846-a89a-4880-bbe2-ba2f4cf316b1",
      "Name": "唐冰冰",
      "Type": "分管副总经理"
    }
  ],
  "allChargeEntity": [
    {
      "Id": "b19782a9-7141-458e-91f1-08dcbeaf8353",
      "Name": "罗庆",
      "Type": "专业副总工",
      "Order": 22
    },
    {
      "Id": "b19782a9-7141-458e-91f1-08dcbeaf8353",
      "Name": "罗庆",
      "Type": "分管副总工",
      "Order": 22
    },
    {
      "Id": "91ab1080-cf8b-4ffe-91a8-11b3c5466bd1",
      "Name": "周勇",
      "Type": "专业副总工",
      "Order": 18
    },
    {
      "Id": "91ab1080-cf8b-4ffe-91a8-11b3c5466bd1",
      "Name": "周勇",
      "Type": "分管副总工",
      "Order": 18
    },
    {
      "Id": "df5e2b24-8c4f-4ff1-89ba-1429e14e5e09",
      "Name": "蒋良文",
      "Type": "专业副总工",
      "Order": 5
    },
    {
      "Id": "df5e2b24-8c4f-4ff1-89ba-1429e14e5e09",
      "Name": "蒋良文",
      "Type": "分管副总工",
      "Order": 5
    },
    {
      "Id": "ec62b3dc-5101-43ca-9431-1a4bade0be02",
      "Name": "王应良",
      "Type": "分管副总工",
      "Order": 100
    },
    {
      "Id": "ec62b3dc-5101-43ca-9431-1a4bade0be02",
      "Name": "王应良",
      "Type": "分管副总经理",
      "Order": 100
    },
    {
      "Id": "ec62b3dc-5101-43ca-9431-1a4bade0be02",
      "Name": "王应良",
      "Type": "专业副总工",
      "Order": 100
    },
    {
      "Id": "fb306f72-cdb2-4607-a372-1f213da1112b",
      "Name": "张雄",
      "Type": "分管副总工",
      "Order": 28
    },
    {
      "Id": "fb306f72-cdb2-4607-a372-1f213da1112b",
      "Name": "张雄",
      "Type": "专业副总工",
      "Order": 28
    },
    {
      "Id": "2297ce46-712f-49b3-9add-1fa48615ef9d",
      "Name": "张海波",
      "Type": "专业副总工",
      "Order": 10
    },
    {
      "Id": "2297ce46-712f-49b3-9add-1fa48615ef9d",
      "Name": "张海波",
      "Type": "分管副总工",
      "Order": 10
    },
    {
      "Id": "72c93160-8a43-48d9-b9b2-20c1f92d83b8",
      "Name": "王秋林",
      "Type": "分管副总经理",
      "Order": 100
    },
    {
      "Id": "925609a5-38a0-4407-b7c5-2a00ec0dcc8b",
      "Name": "王毅",
      "Type": "分管副总工",
      "Order": 2
    },
    {
      "Id": "925609a5-38a0-4407-b7c5-2a00ec0dcc8b",
      "Name": "王毅",
      "Type": "专业副总工",
      "Order": 2
    },
    {
      "Id": "9d41d240-3f57-435e-8431-352cc54b5010",
      "Name": "谢毅",
      "Type": "分管副总工",
      "Order": 100
    },
    {
      "Id": "9d41d240-3f57-435e-8431-352cc54b5010",
      "Name": "谢毅",
      "Type": "分管副总经理",
      "Order": 100
    },
    {
      "Id": "79f39c0c-7c15-42ad-9ad0-378a611512fc",
      "Name": "李伟",
      "Type": "专业副总工",
      "Order": 100
    },
    {
      "Id": "79f39c0c-7c15-42ad-9ad0-378a611512fc",
      "Name": "李伟",
      "Type": "分管副总工",
      "Order": 100
    },
    {
      "Id": "d74356b9-b0dd-4f77-8eb4-38421ec8a88f",
      "Name": "周覃龙",
      "Type": "分管副总工",
      "Order": 100
    },
    {
      "Id": "d74356b9-b0dd-4f77-8eb4-38421ec8a88f",
      "Name": "周覃龙",
      "Type": "专业副总工",
      "Order": 100
    },
    {
      "Id": "695376ae-a5a8-4fbc-bc55-4520264098ac",
      "Name": "王茂靖",
      "Type": "专业副总工",
      "Order": 26
    },
    {
      "Id": "695376ae-a5a8-4fbc-bc55-4520264098ac",
      "Name": "王茂靖",
      "Type": "分管副总工",
      "Order": 26
    },
    {
      "Id": "5fd27bd6-e28c-4ebc-a149-4614aea91c6f",
      "Name": "林宗良",
      "Type": "专业副总工",
      "Order": 16
    },
    {
      "Id": "5fd27bd6-e28c-4ebc-a149-4614aea91c6f",
      "Name": "林宗良",
      "Type": "分管副总工",
      "Order": 16
    },
    {
      "Id": "92a9de11-aabf-430b-ac81-496cb24da340",
      "Name": "徐正宣",
      "Type": "专业副总工",
      "Order": 100
    },
    {
      "Id": "7eebe18c-b03e-4396-bfb9-544f508e4866",
      "Name": "胡京涛",
      "Type": "分管副总经理",
      "Order": 100
    },
    {
      "Id": "14bdfa04-097c-4712-8a07-5d934ff948b6",
      "Name": "王晓刚",
      "Type": "专业副总工",
      "Order": 100
    },
    {
      "Id": "53da6286-6bb2-465b-af23-5ea443815136",
      "Name": "杨昌宇",
      "Type": "专业副总工",
      "Order": 18
    },
    {
      "Id": "53da6286-6bb2-465b-af23-5ea443815136",
      "Name": "杨昌宇",
      "Type": "分管副总工",
      "Order": 18
    },
    {
      "Id": "412991a7-e67e-4325-a137-5ec865ebe97c",
      "Name": "孙雪松",
      "Type": "分管副总经理",
      "Order": 100
    },
    {
      "Id": "a49735ce-e495-4298-b2c6-675471477912",
      "Name": "陈克坚",
      "Type": "分管副总工",
      "Order": 9
    },
    {
      "Id": "a49735ce-e495-4298-b2c6-675471477912",
      "Name": "陈克坚",
      "Type": "专业副总工",
      "Order": 9
    },
    {
      "Id": "6c733dab-29cf-4492-b5ad-72b5c6fcb13d",
      "Name": "张可军",
      "Type": "专业副总工",
      "Order": 14
    },
    {
      "Id": "6c733dab-29cf-4492-b5ad-72b5c6fcb13d",
      "Name": "张可军",
      "Type": "分管副总工",
      "Order": 14
    },
    {
      "Id": "443fa02b-7a0e-47cb-b346-7397d3d3b337",
      "Name": "金旭炜",
      "Type": "专业副总工",
      "Order": 21
    },
    {
      "Id": "443fa02b-7a0e-47cb-b346-7397d3d3b337",
      "Name": "金旭炜",
      "Type": "分管副总工",
      "Order": 21
    },
    {
      "Id": "a11c1cc8-346a-405b-8664-77700900f5b4",
      "Name": "周海辉",
      "Type": "分管副总经理",
      "Order": null
    },
    {
      "Id": "2b84fbaa-2cd5-48a2-9b5e-7890f379b4f1",
      "Name": "周明亮",
      "Type": "专业副总工",
      "Order": 100
    },
    {
      "Id": "2b84fbaa-2cd5-48a2-9b5e-7890f379b4f1",
      "Name": "周明亮",
      "Type": "分管副总工",
      "Order": 100
    },
    {
      "Id": "9702aaac-3228-4914-a057-7dba63cbeeaa",
      "Name": "林建平",
      "Type": "分管副总经理",
      "Order": 101
    },
    {
      "Id": "1a4273c3-9e22-4e9f-b66f-80d14c8861b7",
      "Name": "梁春祥",
      "Type": "分管副总经理",
      "Order": null
    },
    {
      "Id": "9fac3143-dca9-44e1-b2db-95ff28b49772",
      "Name": "尹志斌",
      "Type": "专业副总工",
      "Order": 100
    },
    {
      "Id": "c2f22871-d411-47d1-b81a-97f6da24861c",
      "Name": "邓军桥",
      "Type": "专业副总工",
      "Order": 32
    },
    {
      "Id": "c2f22871-d411-47d1-b81a-97f6da24861c",
      "Name": "邓军桥",
      "Type": "分管副总工",
      "Order": 32
    },
    {
      "Id": "34db9f2b-6845-41d0-bdbf-98fedaf01848",
      "Name": "何娘者",
      "Type": "专业副总工",
      "Order": 102
    },
    {
      "Id": "34db9f2b-6845-41d0-bdbf-98fedaf01848",
      "Name": "何娘者",
      "Type": "分管副总工",
      "Order": 100
    },
    {
      "Id": "5a74382d-f303-426a-a52f-9b16818a4706",
      "Name": "张雪才",
      "Type": "分管副总经理",
      "Order": 5
    },
    {
      "Id": "104fa72a-7da9-42d3-aed5-9cf9a6cf34f8",
      "Name": "李伟东",
      "Type": "分管副总经理",
      "Order": 100
    },
    {
      "Id": "d7a81582-4bec-493f-a270-a7b337b7cd15",
      "Name": "陈华军",
      "Type": "分管副总工",
      "Order": 20
    },
    {
      "Id": "d7a81582-4bec-493f-a270-a7b337b7cd15",
      "Name": "陈华军",
      "Type": "专业副总工",
      "Order": 20
    },
    {
      "Id": "a82d8dd6-068a-48f8-865a-b19a66e78e40",
      "Name": "曾庆华",
      "Type": "分管副总工",
      "Order": 33
    },
    {
      "Id": "a82d8dd6-068a-48f8-865a-b19a66e78e40",
      "Name": "曾庆华",
      "Type": "专业副总工",
      "Order": 33
    },
    {
      "Id": "bc29d165-496e-429d-9ffa-b2bc15081bbd",
      "Name": "罗世培",
      "Type": "专业副总工",
      "Order": 30
    },
    {
      "Id": "bc29d165-496e-429d-9ffa-b2bc15081bbd",
      "Name": "罗世培",
      "Type": "分管副总工",
      "Order": 30
    },
    {
      "Id": "7469c846-a89a-4880-bbe2-ba2f4cf316b1",
      "Name": "唐冰冰",
      "Type": "分管副总经理",
      "Order": null
    },
    {
      "Id": "38ce4b0f-3029-455f-8adb-bdb294f5e92a",
      "Name": "郑天池",
      "Type": "专业副总工",
      "Order": 23
    },
    {
      "Id": "38ce4b0f-3029-455f-8adb-bdb294f5e92a",
      "Name": "郑天池",
      "Type": "分管副总工",
      "Order": 23
    },
    {
      "Id": "23997d48-f1fb-44f6-b3e3-c082f6a4fa3d",
      "Name": "吴国强",
      "Type": "分管副总经理",
      "Order": null
    },
    {
      "Id": "6a298a60-a786-4232-9aa5-c167b1f4f9a7",
      "Name": "陶伟明",
      "Type": "分管副总工",
      "Order": 15
    },
    {
      "Id": "6a298a60-a786-4232-9aa5-c167b1f4f9a7",
      "Name": "陶伟明",
      "Type": "专业副总工",
      "Order": 15
    },
    {
      "Id": "1ebdc378-e4b7-43f0-8e5b-c443165bb5a8",
      "Name": "王科",
      "Type": "专业副总工",
      "Order": 13
    },
    {
      "Id": "1ebdc378-e4b7-43f0-8e5b-c443165bb5a8",
      "Name": "王科",
      "Type": "分管副总工",
      "Order": 13
    },
    {
      "Id": "6a48f876-69e5-4628-aba1-c4f833540403",
      "Name": "赖见国",
      "Type": "分管副总经理",
      "Order": 100
    },
    {
      "Id": "bfea6712-3993-4f91-ba87-cbac09bea92b",
      "Name": "冯涛",
      "Type": "分管副总工",
      "Order": 103
    },
    {
      "Id": "bfea6712-3993-4f91-ba87-cbac09bea92b",
      "Name": "冯涛",
      "Type": "专业副总工",
      "Order": 103
    },
    {
      "Id": "a65e3a0a-9ef3-4614-831e-cdcf092ac7e6",
      "Name": "柴家远",
      "Type": "分管副总工",
      "Order": 101
    },
    {
      "Id": "a65e3a0a-9ef3-4614-831e-cdcf092ac7e6",
      "Name": "柴家远",
      "Type": "专业副总工",
      "Order": 101
    },
    {
      "Id": "593354e1-d0fb-47a7-a316-d23cd90c25f1",
      "Name": "杨岗",
      "Type": "分管副总工",
      "Order": 17
    },
    {
      "Id": "593354e1-d0fb-47a7-a316-d23cd90c25f1",
      "Name": "杨岗",
      "Type": "专业副总工",
      "Order": 17
    },
    {
      "Id": "bd86d0b2-1230-4aa9-8640-d6f24289f22a",
      "Name": "秦小林",
      "Type": "分管副总经理",
      "Order": 4
    },
    {
      "Id": "27a32ba9-911e-45fb-aa35-d992e8010687",
      "Name": "李安洪",
      "Type": "分管副总工",
      "Order": 6
    },
    {
      "Id": "27a32ba9-911e-45fb-aa35-d992e8010687",
      "Name": "李安洪",
      "Type": "专业副总工",
      "Order": 6
    },
    {
      "Id": "b167bb4d-f6e2-41fa-b78a-e4ec36053e9a",
      "Name": "刘伟",
      "Type": "分管副总工",
      "Order": 100
    },
    {
      "Id": "b167bb4d-f6e2-41fa-b78a-e4ec36053e9a",
      "Name": "刘伟",
      "Type": "专业副总工",
      "Order": 100
    },
    {
      "Id": "9834991c-99cb-42da-b721-ee1c6ba2fe2a",
      "Name": "曾榜荣",
      "Type": "专业副总工",
      "Order": 100
    },
    {
      "Id": "9834991c-99cb-42da-b721-ee1c6ba2fe2a",
      "Name": "曾榜荣",
      "Type": "专业副总工",
      "Order": 100
    },
    {
      "Id": "0bb03fb6-3698-4188-a7b2-f2eb5bdc8623",
      "Name": "徐银光",
      "Type": "专业副总工",
      "Order": 15
    },
    {
      "Id": "0bb03fb6-3698-4188-a7b2-f2eb5bdc8623",
      "Name": "徐银光",
      "Type": "分管副总工",
      "Order": 15
    },
    {
      "Id": "ce765a58-8775-4890-886c-f6363396f024",
      "Name": "喻渝",
      "Type": "专业副总工",
      "Order": 12
    },
    {
      "Id": "ce765a58-8775-4890-886c-f6363396f024",
      "Name": "喻渝",
      "Type": "分管副总工",
      "Order": 12
    },
    {
      "Id": "86872fe3-aa8f-451c-bd85-fcf53fd4cd23",
      "Name": "魏永幸",
      "Type": "分管副总工",
      "Order": 100
    },
    {
      "Id": "86872fe3-aa8f-451c-bd85-fcf53fd4cd23",
      "Name": "魏永幸",
      "Type": "专业副总工",
      "Order": 100
    },
    {
      "Id": "1cbbebb7-9eb5-42cc-b9d0-b3635c2132ee",
      "Name": "胡晓伟",
      "Type": "计经部分管领导",
      "Order": 100
    },
    {
      "Id": "524e5576-97f8-4c3b-8903-ba3f245bcc9f",
      "Name": "苏航",
      "Type": "计经部分管领导",
      "Order": 100
    },
    {
      "Id": "528786c0-970f-4ea8-b3e6-a65947132824",
      "Name": "叶世斌",
      "Type": "计经部分管领导",
      "Order": 100
    },
    {
      "Id": "caeecd07-3c4b-4ed3-8d5b-9319ce12d074",
      "Name": "陈明华",
      "Type": "计经部分管领导",
      "Order": 100
    },
    {
      "Id": "5d4962ef-2820-4e3c-b2c7-e59dab0e9684",
      "Name": "黎志国",
      "Type": "计经部分管领导",
      "Order": 100
    },
    {
      "Id": "48a09efb-44ec-4a80-965a-6c0f2f0df9bc",
      "Name": "赵恒",
      "Type": "计经部分管领导",
      "Order": 100
    },
    {
      "Id": "ece659fb-2d1f-4f34-9d3f-1bba4bbf1e68",
      "Name": "王忠会",
      "Type": "计经部分管领导",
      "Order": 100
    },
    {
      "Id": "37c2fcbb-5864-45ba-9f35-b6d2e9d13997",
      "Name": "廖方勇",
      "Type": "计经部分管领导",
      "Order": 100
    }
  ],
  "projectStep": [
    {
      "Num": 603,
      "Text": "预可研（当前阶段）"
    },
    {
      "Num": 604,
      "Text": "可研"
    }
  ],
  "ZhanQiandepAll": [],
  "JingHangdepAll": [],
  "ZhanHoudepAll": [],
  "HangFeidepAll": [],
  "ZhiTudepAll": [],
  "CeLiangdepAll": [],
  "DiZhidepAll": [],
  "ZuanTandepAll": [],
  "ShiYandepAll": [],
  "ZongHedepAll": [],
  "GongChengAll": [],
  "ZhanQiandepEntity": {},
  "JingHangdepEntity": {},
  "ZhanHoudepEntity": {},
  "HangFeidepEntity": {},
  "ZhiTudepEntity": {},
  "CeLiangdepEntity": {},
  "DiZhidepEntity": {},
  "ZuanTandepEntity": {},
  "ShiYandepEntity": {},
  "ZongHedepEntity": {},
  "GongChengEntity": {},
  "QiTaCanYuEntity": [
    {
      "text": "南宁院",
      "value": "91aa8ac0-5160-4b7e-b5bb-4491d1ff1a1f"
    },
    {
      "text": "生环院",
      "value": "659d3d00-0f97-49fc-8b22-9b745968cdbc"
    }
  ],
  "ZhuTiZeRenEntity": [
    {
      "text": "土建一院",
      "value": "715e073d-3623-4635-93f1-b070e39d279e"
    }
  ],
  "Project_ShortName": "新都氢能源有轨电车",
  "isEdit": false,
  "Manager_ChargeName": "唐冰冰",
  "Manager_AssistName": "蒋明洁"
})

// 将ProductionObj.allChargeEntity 内的数组根据 Type 分类,返回成新的数组

const allChargeEntity = computed(() => {
  const result: any = {};
  ProductionObj.value.allChargeEntity.forEach((item) => {
    if (!result[item.Type]) {
      result[item.Type] = [];
    }
    result[item.Type].push(item);
  });
  return result;
});

// 进度管理
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

onMounted(() => {
  console.log("组件挂载完成");
  console.log(allChargeEntity.value);
});
</script>

<style lang="less" scoped>
.peijianSort {
  padding: 1rem;
  // border: 1px solid #ebeef5;
  background-color: white;
  // margin-top: 1rem;
  margin: 1rem;
}

.custom-label-width {
  --label-width: 150px !important;
}

.project_mainTitle {
  font-size: 20px;
  font-weight: 700;
  margin: 10px 0;
}
</style>
