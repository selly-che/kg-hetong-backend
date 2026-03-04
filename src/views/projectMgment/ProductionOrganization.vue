<template>
  <div class="project-detail-page">
    <div class="project-title">{{ '项目信息' }}</div>
    <div class="content-wrapper">
      <a-row :gutter="[24, 24]">
        <!-- 基本信息 -->
        <a-col :span="24">
          <a-card class="info-card">
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <!-- 项目阶段信息 -->
              <a-descriptions-item label="项目阶段">
                {{ result.projectStepName || '--' }}
              </a-descriptions-item>

              <!-- 分管领导信息 -->
              <a-descriptions-item label="集团分管领导">
                {{ result.groupLeader || '--' }}
              </a-descriptions-item>
              <a-descriptions-item label="分管总(副总)工">
                {{ result.deputyLeader || '--' }}
              </a-descriptions-item>
              <a-descriptions-item label="公司总(副总)工">
                {{ result.companyLeaders || '--' }}
              </a-descriptions-item>
              <a-descriptions-item label="经营计划部分管领导">
                {{ result.businessPlanLeader || '--' }}
              </a-descriptions-item>

              <!-- 总体信息 -->
              <a-descriptions-item label="总体">
                {{ result.overall || '--' }}
              </a-descriptions-item>
              <a-descriptions-item label="常务副总体">
                {{ result.executiveDeputyOverall || '--' }}
              </a-descriptions-item>
              <a-descriptions-item label="专业副总体">
                <div v-if="result.professionalDeputyOveralls && result.professionalDeputyOveralls.length > 0">
                  <span v-for="(item, index) in result.professionalDeputyOveralls" :key="index">
                    {{ item }}
                    <span v-if="index < result.professionalDeputyOveralls.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>

              <!-- 项目部信息 -->
              <a-descriptions-item label="项目部">
                <div v-if="result.projectDepartments && result.projectDepartments.length > 0">
                  <span v-for="(item, index) in result.projectDepartments" :key="index">
                    {{ item }}
                    <span v-if="index < result.projectDepartments.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="项目经理">
                {{ result.projectManagers || '--' }}
              </a-descriptions-item>

              <!-- 主体责任单位 -->
              <a-descriptions-item label="主体责任单位">
                {{ result.mainResponsibilityUnit || '--' }}
              </a-descriptions-item>

            </a-descriptions>
            <!-- 各类任务信息 -->
            <div class="project_mainTitle">站前任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <div v-if="result.stationBeaforTasks && result.stationBeaforTasks.length > 0">
                  <span v-for="(task, index) in result.stationBeaforTasks" :key="index">
                    {{ task.unitName }}
                    <span v-if="index < result.stationBeaforTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <div v-if="result.stationBeaforTasks && result.stationBeaforTasks.length > 0">
                  <span v-for="(task, index) in result.stationBeaforTasks" :key="index">
                    {{ task.paragraphStart }}
                    <span v-if="index < result.stationBeaforTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <div v-if="result.stationBeaforTasks && result.stationBeaforTasks.length > 0">
                  <span v-for="(task, index) in result.stationBeaforTasks" :key="index">
                    {{ task.paragraphEnd }}
                    <span v-if="index < result.stationBeaforTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <div v-if="result.stationBeaforTasks && result.stationBeaforTasks.length > 0">
                  <span v-for="(task, index) in result.stationBeaforTasks" :key="index">
                    {{ task.remark }}
                    <span v-if="index < result.stationBeaforTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">经行及投融资任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <div v-if="result.economicTasks && result.economicTasks.length > 0">
                  <span v-for="(task, index) in result.economicTasks" :key="index">
                    {{ task.unitName }}
                    <span v-if="index < result.economicTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <div v-if="result.economicTasks && result.economicTasks.length > 0">
                  <span v-for="(task, index) in result.economicTasks" :key="index">
                    {{ task.paragraphStart }}
                    <span v-if="index < result.economicTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <div v-if="result.economicTasks && result.economicTasks.length > 0">
                  <span v-for="(task, index) in result.economicTasks" :key="index">
                    {{ task.paragraphEnd }}
                    <span v-if="index < result.economicTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <div v-if="result.economicTasks && result.economicTasks.length > 0">
                  <span v-for="(task, index) in result.economicTasks" :key="index">
                    {{ task.remark }}
                    <span v-if="index < result.economicTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">站后任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <div v-if="result.stationAfterTasks && result.stationAfterTasks.length > 0">
                  <span v-for="(task, index) in result.stationAfterTasks" :key="index">
                    {{ task.unitName }}
                    <span v-if="index < result.stationAfterTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <div v-if="result.stationAfterTasks && result.stationAfterTasks.length > 0">
                  <span v-for="(task, index) in result.stationAfterTasks" :key="index">
                    {{ task.paragraphStart }}
                    <span v-if="index < result.stationAfterTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <div v-if="result.stationAfterTasks && result.stationAfterTasks.length > 0">
                  <span v-for="(task, index) in result.stationAfterTasks" :key="index">
                    {{ task.paragraphEnd }}
                    <span v-if="index < result.stationAfterTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <div v-if="result.stationAfterTasks && result.stationAfterTasks.length > 0">
                  <span v-for="(task, index) in result.stationAfterTasks" :key="index">
                    {{ task.remark }}
                    <span v-if="index < result.stationAfterTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">工程经济任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <div v-if="result.engineeringEconomicTasks && result.engineeringEconomicTasks.length > 0">
                  <span v-for="(task, index) in result.engineeringEconomicTasks" :key="index">
                    {{ task.unitName }}
                    <span v-if="index < result.engineeringEconomicTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <div v-if="result.engineeringEconomicTasks && result.engineeringEconomicTasks.length > 0">
                  <span v-for="(task, index) in result.engineeringEconomicTasks" :key="index">
                    {{ task.paragraphStart }}
                    <span v-if="index < result.engineeringEconomicTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <div v-if="result.engineeringEconomicTasks && result.engineeringEconomicTasks.length > 0">
                  <span v-for="(task, index) in result.engineeringEconomicTasks" :key="index">
                    {{ task.paragraphEnd }}
                    <span v-if="index < result.engineeringEconomicTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <div v-if="result.engineeringEconomicTasks && result.engineeringEconomicTasks.length > 0">
                  <span v-for="(task, index) in result.engineeringEconomicTasks" :key="index">
                    {{ task.remark }}
                    <span v-if="index < result.engineeringEconomicTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">航飞任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <div v-if="result.flightTasks && result.flightTasks.length > 0">
                  <span v-for="(task, index) in result.flightTasks" :key="index">
                    {{ task.unitName }}
                    <span v-if="index < result.flightTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <div v-if="result.flightTasks && result.flightTasks.length > 0">
                  <span v-for="(task, index) in result.flightTasks" :key="index">
                    {{ task.paragraphStart }}
                    <span v-if="index < result.flightTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <div v-if="result.flightTasks && result.flightTasks.length > 0">
                  <span v-for="(task, index) in result.flightTasks" :key="index">
                    {{ task.paragraphEnd }}
                    <span v-if="index < result.flightTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <div v-if="result.flightTasks && result.flightTasks.length > 0">
                  <span v-for="(task, index) in result.flightTasks" :key="index">
                    {{ task.remark }}
                    <span v-if="index < result.flightTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">制图任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <div v-if="result.drawingTasks && result.drawingTasks.length > 0">
                  <span v-for="(task, index) in result.drawingTasks" :key="index">
                    {{ task.unitName }}
                    <span v-if="index < result.drawingTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <div v-if="result.drawingTasks && result.drawingTasks.length > 0">
                  <span v-for="(task, index) in result.drawingTasks" :key="index">
                    {{ task.paragraphStart }}
                    <span v-if="index < result.drawingTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <div v-if="result.drawingTasks && result.drawingTasks.length > 0">
                  <span v-for="(task, index) in result.drawingTasks" :key="index">
                    {{ task.paragraphEnd }}
                    <span v-if="index < result.drawingTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <div v-if="result.drawingTasks && result.drawingTasks.length > 0">
                  <span v-for="(task, index) in result.drawingTasks" :key="index">
                    {{ task.remark }}
                    <span v-if="index < result.drawingTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">测量任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <div v-if="result.surveyTasks && result.surveyTasks.length > 0">
                  <span v-for="(task, index) in result.surveyTasks" :key="index">
                    {{ task.unitName }}
                    <span v-if="index < result.surveyTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <div v-if="result.surveyTasks && result.surveyTasks.length > 0">
                  <span v-for="(task, index) in result.surveyTasks" :key="index">
                    {{ task.paragraphStart }}
                    <span v-if="index < result.surveyTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <div v-if="result.surveyTasks && result.surveyTasks.length > 0">
                  <span v-for="(task, index) in result.surveyTasks" :key="index">
                    {{ task.paragraphEnd }}
                    <span v-if="index < result.surveyTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <div v-if="result.surveyTasks && result.surveyTasks.length > 0">
                  <span v-for="(task, index) in result.surveyTasks" :key="index">
                    {{ task.remark }}
                    <span v-if="index < result.surveyTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">地勘任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <div v-if="result.geologicalTasks && result.geologicalTasks.length > 0">
                  <span v-for="(task, index) in result.geologicalTasks" :key="index">
                    {{ task.unitName }}
                    <span v-if="index < result.geologicalTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分">
                <div v-if="result.geologicalTasks && result.geologicalTasks.length > 0">
                  <div v-for="(task, index) in result.geologicalTasks" :key="index">
                    <div v-for="(paragraph, pIndex) in task.paragraphs" :key="pIndex">
                      开始里程: {{ paragraph.start }} - 结束里程: {{ paragraph.end }}
                      <span v-if="paragraph.remark"> ({{ paragraph.remark }})</span>
                      <br>
                    </div>
                  </div>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">试验任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <div v-if="result.testTasks && result.testTasks.length > 0">
                  <span v-for="(task, index) in result.testTasks" :key="index">
                    {{ task.unitName }}
                    <span v-if="index < result.testTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <div v-if="result.testTasks && result.testTasks.length > 0">
                  <span v-for="(task, index) in result.testTasks" :key="index">
                    {{ task.paragraphStart }}
                    <span v-if="index < result.testTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <div v-if="result.testTasks && result.testTasks.length > 0">
                  <span v-for="(task, index) in result.testTasks" :key="index">
                    {{ task.paragraphEnd }}
                    <span v-if="index < result.testTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <div v-if="result.testTasks && result.testTasks.length > 0">
                  <span v-for="(task, index) in result.testTasks" :key="index">
                    {{ task.remark }}
                    <span v-if="index < result.testTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">综合开发任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <div v-if="result.comprehensiveTasks && result.comprehensiveTasks.length > 0">
                  <span v-for="(task, index) in result.comprehensiveTasks" :key="index">
                    {{ task.unitName }}
                    <span v-if="index < result.comprehensiveTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <div v-if="result.comprehensiveTasks && result.comprehensiveTasks.length > 0">
                  <span v-for="(task, index) in result.comprehensiveTasks" :key="index">
                    {{ task.paragraphStart }}
                    <span v-if="index < result.comprehensiveTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <div v-if="result.comprehensiveTasks && result.comprehensiveTasks.length > 0">
                  <span v-for="(task, index) in result.comprehensiveTasks" :key="index">
                    {{ task.paragraphEnd }}
                    <span v-if="index < result.comprehensiveTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <div v-if="result.comprehensiveTasks && result.comprehensiveTasks.length > 0">
                  <span v-for="(task, index) in result.comprehensiveTasks" :key="index">
                    {{ task.remark }}
                    <span v-if="index < result.comprehensiveTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">其他任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <div v-if="result.otherTasks && result.otherTasks.length > 0">
                  <span v-for="(task, index) in result.otherTasks" :key="index">
                    {{ task.unitName }}
                    <span v-if="index < result.otherTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <div v-if="result.otherTasks && result.otherTasks.length > 0">
                  <span v-for="(task, index) in result.otherTasks" :key="index">
                    {{ task.paragraphStart }}
                    <span v-if="index < result.otherTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <div v-if="result.otherTasks && result.otherTasks.length > 0">
                  <span v-for="(task, index) in result.otherTasks" :key="index">
                    {{ task.paragraphEnd }}
                    <span v-if="index < result.otherTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <div v-if="result.otherTasks && result.otherTasks.length > 0">
                  <span v-for="(task, index) in result.otherTasks" :key="index">
                    {{ task.remark }}
                    <span v-if="index < result.otherTasks.length - 1">, </span>
                  </span>
                </div>
                <span v-else>--</span>
              </a-descriptions-item>
            </a-descriptions>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted ,watch} from "vue";
import getDatas from "@/network/index";
import { useRouter } from "vue-router";

// 定义结果数据类型
interface TaskItem {
  unitId: string;
  unitName: string;
  majors?: string | null;
  paragraphStart?: string | null;
  paragraphEnd?: string | null;
  remark?: string | null;
}

interface GeologicalTask extends TaskItem {
  paragraphs: {
    start: string;
    end: string;
    remark?: string;
  }[];
}

interface ResultData {
  projectStep: number;
  projectStepName: string;
  groupLeader: string | null;
  deputyLeader: string | null;
  companyLeaders: string | null;
  businessPlanLeader: string | null;
  overall: string;
  executiveDeputyOverall: string;
  professionalDeputyOveralls: string[];
  projectDepartments: string[];
  projectManagers: string | null;
  mainResponsibilityUnit: string;
  stationBeaforTasks: TaskItem[];
  economicTasks: TaskItem[];
  stationAfterTasks: TaskItem[];
  engineeringEconomicTasks: TaskItem[];
  flightTasks: TaskItem[];
  drawingTasks: TaskItem[];
  surveyTasks: TaskItem[];
  geologicalTasks: GeologicalTask[];
  testTasks: TaskItem[];
  comprehensiveTasks: TaskItem[];
  otherTasks: TaskItem[];
}

const result = ref<ResultData>({
  projectStep: 600,
  projectStepName: "预付期",
  groupLeader: null,
  deputyLeader: null,
  companyLeaders: null,
  businessPlanLeader: null,
  overall: "user001",
  executiveDeputyOverall: "user002",
  professionalDeputyOveralls: ["user003", "user004"],
  projectDepartments: ["领导"],
  projectManagers: null,
  mainResponsibilityUnit: "秘书科",
  stationBeaforTasks: [
    {
      unitId: "领导",
      unitName: "领导",
      majors: null,
      paragraphStart: "0.0",
      paragraphEnd: "100.0",
      remark: "站前工程"
    }
  ],
  economicTasks: [
    {
      unitId: "领导",
      unitName: "领导",
      majors: null,
      paragraphStart: "",
      paragraphEnd: "",
      remark: "经行及投融资"
    }
  ],
  stationAfterTasks: [
    {
      unitId: "综合科（信访办）",
      unitName: "综合科（信访办）",
      majors: null,
      paragraphStart: "",
      paragraphEnd: "",
      remark: "站后工程"
    }
  ],
  engineeringEconomicTasks: [
    {
      unitId: "领导",
      unitName: "领导",
      majors: null,
      paragraphStart: "",
      paragraphEnd: "",
      remark: "工程经济"
    }
  ],
  flightTasks: [
    {
      unitId: "办公室主任",
      unitName: "办公室主任",
      majors: null,
      paragraphStart: "",
      paragraphEnd: "",
      remark: "航飞测量"
    }
  ],
  drawingTasks: [
    {
      unitId: "100005",
      unitName: "100005",
      majors: null,
      paragraphStart: "",
      paragraphEnd: "",
      remark: "工程制图"
    }
  ],
  surveyTasks: [
    {
      unitId: "办公室副主任",
      unitName: "办公室副主任",
      majors: null,
      paragraphStart: "0.0",
      paragraphEnd: "200.0",
      remark: "工程测量"
    }
  ],
  geologicalTasks: [
    {
      unitId: "领导",
      unitName: "领导",
      paragraphs: [
        {
          start: "0.0",
          end: "150.0",
          remark: "地质勘察"
        }
      ]
    }
  ],
  testTasks: [
    {
      unitId: "dept011",
      unitName: "dept011",
      majors: null,
      paragraphStart: "",
      paragraphEnd: "",
      remark: "工程试验"
    }
  ],
  comprehensiveTasks: [
    {
      unitId: "dept012",
      unitName: "dept012",
      majors: null,
      paragraphStart: "",
      paragraphEnd: "",
      remark: "综合开发"
    }
  ],
  otherTasks: [
    {
      unitId: "dept013",
      unitName: "dept013",
      majors: null,
      paragraphStart: "",
      paragraphEnd: "",
      remark: "其他任务"
    }
  ]
});

const router = useRouter();

// 获取项目详情
const getProjectDetails = async () => {
  let projectId = router.currentRoute.value.query.projectId;
  let projectStep = router.currentRoute.value.query.projectStep;

  try {
    const res = await getDatas('project/GetProjectProductionOrg', {
      projectId: projectId,
      projectStep: projectStep
    });

    // 更新结果数据
    result.value = res.data.result;
  } catch (error) {
    console.error("获取项目详情失败:", error);
  }
};

watch(
  () => router.currentRoute.value.query,
  (newQuery) => {
    if (newQuery.projectId && newQuery.projectStep) {
      getProjectDetails();
    }
  },
  { immediate: true }
);

onMounted(() => {
  // getProjectDetails();
});
</script>

<style lang="less" scoped>
.project_mainTitle {
  font-size: 20px;
  font-weight: 700;
  margin: 10px 0;
}
</style>