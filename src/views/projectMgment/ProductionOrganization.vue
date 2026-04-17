<template>
  <div class="project-detail-page">
    <div class="project-header">
      <div class="project-title">{{ '项目信息' }}</div>
      <div class="action-buttons" v-if="Editable">
        <el-button v-if="!isEdit" type="primary" @click="handleEdit">
          编辑
        </el-button>
        <template v-else>
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </template>
      </div>
    </div>
    <div class="content-wrapper" v-loading="detailsLoading">
      <a-row :gutter="[24, 24]">
        <!-- 基本信息 -->
        <a-col :span="24">
          <a-card class="info-card">
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <!-- 项目阶段信息 -->
              <a-descriptions-item label="项目阶段">
                <template v-if="isEdit">
                  <el-select v-model="editData.projectStep" placeholder="请选择项目阶段" style="width: 100%"
                    @change="handleProjectStepChange">
                    <!-- ，600-预付期，601-投标，602-规划，603-预可研，604-可研，605-初步设计，606-施工图，607-配合施工，608-开通运营，609-招标图，610-专题专项，611-清概（结算），612-质保期 -->
                    <el-option v-for="step in currentProjectSteps" :key="step.stepCode" :label="step.stepName"
                      :value="step.stepCode"></el-option>
                  </el-select>
                </template>
                <template v-else>
                  {{ result?.projectStepName || '--' }}
                </template>
              </a-descriptions-item>
              <!-- 分管领导信息 -->
              <a-descriptions-item label="集团分管领导">
                <el-input v-if="isEdit" v-model="editData.groupLeader" placeholder="请输入集团分管领导"></el-input>
                <span v-else>{{ result?.groupLeader || '--' }}</span>
              </a-descriptions-item>
              <a-descriptions-item label="分管总 (副总) 工">

                <el-input v-if="isEdit" v-model="editData.deputyLeader" placeholder="请输入分管总 (副总) 工"></el-input>
                <span v-else>{{ result?.deputyLeader || '--' }}</span>
              </a-descriptions-item>
              <a-descriptions-item label="公司总 (副总) 工">

                <el-input v-if="isEdit" v-model="editData.companyLeaders" placeholder="请输入公司总 (副总) 工"></el-input>
                <span v-else>{{ result?.companyLeaders || '--' }}</span>
              </a-descriptions-item>
              <a-descriptions-item label="经营计划部分管领导">

                <el-input v-if="isEdit" v-model="editData.businessPlanLeader" placeholder="请输入经营计划部分管领导"></el-input>
                <span v-else>{{ result?.businessPlanLeader || '--' }} </span>

              </a-descriptions-item>

              <!-- 总体信息 -->
              <a-descriptions-item label="总体">

                <el-input v-if="isEdit" v-model="editData.overall" placeholder="请输入总体"></el-input>
                <span v-else>{{ result?.overall || '--' }}</span>
              </a-descriptions-item>
              <a-descriptions-item label="常务副总体">
                <el-input v-if="isEdit" v-model="editData.executiveDeputyOverall" placeholder="请输入常务副总体"></el-input>
                <span v-else>{{ result?.executiveDeputyOverall || '--' }}</span>
              </a-descriptions-item>
              <a-descriptions-item label="专业副总体">
                <template v-if="isEdit">
                  <el-select v-model="editData.professionalDeputyOveralls" multiple placeholder="请选择专业副总体"
                    style="width: 100%">
                    <el-option label="user003" value="user003"></el-option>
                    <el-option label="user004" value="user004"></el-option>
                  </el-select>
                </template>
                <template v-else>
                  <div v-if="result.professionalDeputyOveralls && result.professionalDeputyOveralls.length > 0">
                    <span v-for="(item, index) in result.professionalDeputyOveralls" :key="index">
                      {{ item }}
                      <span v-if="index < result.professionalDeputyOveralls.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>

              <!-- 项目部信息 -->
              <a-descriptions-item label="项目部">
                <template v-if="isEdit">
                  <el-select v-model="editData.projectDepartments" multiple placeholder="请选择项目部" style="width: 100%">
                    <el-option label="领导" value="领导"></el-option>
                  </el-select>
                </template>
                <template v-else>
                  <div v-if="result.projectDepartments && result.projectDepartments.length > 0">
                    <span v-for="(item, index) in result.projectDepartments" :key="index">
                      {{ item }}
                      <span v-if="index < result.projectDepartments.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="项目经理">
                <el-input v-if="isEdit" v-model="editData.projectManagers" placeholder="请输入项目经理"></el-input>
                <template v-else>{{ result.projectManagers || '--' }}</template>
              </a-descriptions-item>

              <!-- 主体责任单位 -->
              <a-descriptions-item label="主体责任单位">
                <el-input v-if="isEdit" v-model="editData.mainResponsibilityUnit" placeholder="请输入主体责任单位"></el-input>
                <template v-else>{{ result.mainResponsibilityUnit || '--' }}</template>
              </a-descriptions-item>

            </a-descriptions>
            <!-- 各类任务信息 -->
            <div class="project_mainTitle">站前任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.stationBeaforTasks" :key="index" class="edit-task-row">
                    <el-input v-model="task.unitName" placeholder="单位名称" style="margin-bottom: 8px"></el-input>
                    <el-button type="danger" size="small" @click="removeTask('stationBeaforTasks', index)"
                      v-if="index > 0">删除</el-button>
                  </div>
                  <el-button type="primary" @click="addTask('stationBeaforTasks')">添加</el-button>
                </template>
                <template v-else>
                  <div v-if="result.stationBeaforTasks && result.stationBeaforTasks.length > 0">
                    <span v-for="(task, index) in result.stationBeaforTasks" :key="index">
                      {{ task.unitName }}
                      <span v-if="index < result.stationBeaforTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.stationBeaforTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphStart" placeholder="段落划分开始"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.stationBeaforTasks && result.stationBeaforTasks.length > 0">
                    <span v-for="(task, index) in result.stationBeaforTasks" :key="index">
                      {{ task.paragraphStart }}
                      <span v-if="index < result.stationBeaforTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.stationBeaforTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphEnd" placeholder="段落划分结束"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.stationBeaforTasks && result.stationBeaforTasks.length > 0">
                    <span v-for="(task, index) in result.stationBeaforTasks" :key="index">
                      {{ task.paragraphEnd }}
                      <span v-if="index < result.stationBeaforTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.stationBeaforTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.remark" placeholder="备注"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.stationBeaforTasks && result.stationBeaforTasks.length > 0">
                    <span v-for="(task, index) in result.stationBeaforTasks" :key="index">
                      {{ task.remark }}
                      <span v-if="index < result.stationBeaforTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">经行及投融资任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.economicTasks" :key="index" class="edit-task-row">
                    <el-input v-model="task.unitName" placeholder="单位名称" style="margin-bottom: 8px"></el-input>
                    <el-button type="danger" size="small" @click="removeTask('economicTasks', index)"
                      v-if="index > 0">删除</el-button>
                  </div>
                  <el-button type="primary" @click="addTask('economicTasks')">添加</el-button>
                </template>
                <template v-else>
                  <div v-if="result.economicTasks && result.economicTasks.length > 0">
                    <span v-for="(task, index) in result.economicTasks" :key="index">
                      {{ task.unitName }}
                      <span v-if="index < result.economicTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.economicTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphStart" placeholder="段落划分开始"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.economicTasks && result.economicTasks.length > 0">
                    <span v-for="(task, index) in result.economicTasks" :key="index">
                      {{ task.paragraphStart }}
                      <span v-if="index < result.economicTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.economicTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphEnd" placeholder="段落划分结束"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.economicTasks && result.economicTasks.length > 0">
                    <span v-for="(task, index) in result.economicTasks" :key="index">
                      {{ task.paragraphEnd }}
                      <span v-if="index < result.economicTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.economicTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.remark" placeholder="备注"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.economicTasks && result.economicTasks.length > 0">
                    <span v-for="(task, index) in result.economicTasks" :key="index">
                      {{ task.remark }}
                      <span v-if="index < result.economicTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">站后任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.stationAfterTasks" :key="index" class="edit-task-row">
                    <el-input v-model="task.unitName" placeholder="单位名称" style="margin-bottom: 8px"></el-input>
                    <el-button type="danger" size="small" @click="removeTask('stationAfterTasks', index)"
                      v-if="index > 0">删除</el-button>
                  </div>
                  <el-button type="primary" @click="addTask('stationAfterTasks')">添加</el-button>
                </template>
                <template v-else>
                  <div v-if="result.stationAfterTasks && result.stationAfterTasks.length > 0">
                    <span v-for="(task, index) in result.stationAfterTasks" :key="index">
                      {{ task.unitName }}
                      <span v-if="index < result.stationAfterTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.stationAfterTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphStart" placeholder="段落划分开始"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.stationAfterTasks && result.stationAfterTasks.length > 0">
                    <span v-for="(task, index) in result.stationAfterTasks" :key="index">
                      {{ task.paragraphStart }}
                      <span v-if="index < result.stationAfterTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.stationAfterTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphEnd" placeholder="段落划分结束"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.stationAfterTasks && result.stationAfterTasks.length > 0">
                    <span v-for="(task, index) in result.stationAfterTasks" :key="index">
                      {{ task.paragraphEnd }}
                      <span v-if="index < result.stationAfterTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.stationAfterTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.remark" placeholder="备注"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.stationAfterTasks && result.stationAfterTasks.length > 0">
                    <span v-for="(task, index) in result.stationAfterTasks" :key="index">
                      {{ task.remark }}
                      <span v-if="index < result.stationAfterTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">工程经济任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.engineeringEconomicTasks" :key="index" class="edit-task-row">
                    <el-input v-model="task.unitName" placeholder="单位名称" style="margin-bottom: 8px"></el-input>
                    <el-button type="danger" size="small" @click="removeTask('engineeringEconomicTasks', index)"
                      v-if="index > 0">删除</el-button>
                  </div>
                  <el-button type="primary" @click="addTask('engineeringEconomicTasks')">添加</el-button>
                </template>
                <template v-else>
                  <div v-if="result.engineeringEconomicTasks && result.engineeringEconomicTasks.length > 0">
                    <span v-for="(task, index) in result.engineeringEconomicTasks" :key="index">
                      {{ task.unitName }}
                      <span v-if="index < result.engineeringEconomicTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.engineeringEconomicTasks" :key="index"
                    style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphStart" placeholder="段落划分开始"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.engineeringEconomicTasks && result.engineeringEconomicTasks.length > 0">
                    <span v-for="(task, index) in result.engineeringEconomicTasks" :key="index">
                      {{ task.paragraphStart }}
                      <span v-if="index < result.engineeringEconomicTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.engineeringEconomicTasks" :key="index"
                    style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphEnd" placeholder="段落划分结束"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.engineeringEconomicTasks && result.engineeringEconomicTasks.length > 0">
                    <span v-for="(task, index) in result.engineeringEconomicTasks" :key="index">
                      {{ task.paragraphEnd }}
                      <span v-if="index < result.engineeringEconomicTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.engineeringEconomicTasks" :key="index"
                    style="margin-bottom: 8px">
                    <el-input v-model="task.remark" placeholder="备注"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.engineeringEconomicTasks && result.engineeringEconomicTasks.length > 0">
                    <span v-for="(task, index) in result.engineeringEconomicTasks" :key="index">
                      {{ task.remark }}
                      <span v-if="index < result.engineeringEconomicTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">航飞任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.flightTasks" :key="index" class="edit-task-row">
                    <el-input v-model="task.unitName" placeholder="单位名称" style="margin-bottom: 8px"></el-input>
                    <el-button type="danger" size="small" @click="removeTask('flightTasks', index)"
                      v-if="index > 0">删除</el-button>
                  </div>
                  <el-button type="primary" @click="addTask('flightTasks')">添加</el-button>
                </template>
                <template v-else>
                  <div v-if="result.flightTasks && result.flightTasks.length > 0">
                    <span v-for="(task, index) in result.flightTasks" :key="index">
                      {{ task.unitName }}
                      <span v-if="index < result.flightTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.flightTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphStart" placeholder="段落划分开始"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.flightTasks && result.flightTasks.length > 0">
                    <span v-for="(task, index) in result.flightTasks" :key="index">
                      {{ task.paragraphStart }}
                      <span v-if="index < result.flightTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.flightTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphEnd" placeholder="段落划分结束"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.flightTasks && result.flightTasks.length > 0">
                    <span v-for="(task, index) in result.flightTasks" :key="index">
                      {{ task.paragraphEnd }}
                      <span v-if="index < result.flightTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.flightTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.remark" placeholder="备注"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.flightTasks && result.flightTasks.length > 0">
                    <span v-for="(task, index) in result.flightTasks" :key="index">
                      {{ task.remark }}
                      <span v-if="index < result.flightTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">制图任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.drawingTasks" :key="index" class="edit-task-row">
                    <el-input v-model="task.unitName" placeholder="单位名称" style="margin-bottom: 8px"></el-input>
                    <el-button type="danger" size="small" @click="removeTask('drawingTasks', index)"
                      v-if="index > 0">删除</el-button>
                  </div>
                  <el-button type="primary" @click="addTask('drawingTasks')">添加</el-button>
                </template>
                <template v-else>
                  <div v-if="result.drawingTasks && result.drawingTasks.length > 0">
                    <span v-for="(task, index) in result.drawingTasks" :key="index">
                      {{ task.unitName }}
                      <span v-if="index < result.drawingTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.drawingTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphStart" placeholder="段落划分开始"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.drawingTasks && result.drawingTasks.length > 0">
                    <span v-for="(task, index) in result.drawingTasks" :key="index">
                      {{ task.paragraphStart }}
                      <span v-if="index < result.drawingTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.drawingTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphEnd" placeholder="段落划分结束"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.drawingTasks && result.drawingTasks.length > 0">
                    <span v-for="(task, index) in result.drawingTasks" :key="index">
                      {{ task.paragraphEnd }}
                      <span v-if="index < result.drawingTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.drawingTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.remark" placeholder="备注"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.drawingTasks && result.drawingTasks.length > 0">
                    <span v-for="(task, index) in result.drawingTasks" :key="index">
                      {{ task.remark }}
                      <span v-if="index < result.drawingTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">测量任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.surveyTasks" :key="index" class="edit-task-row">
                    <el-input v-model="task.unitName" placeholder="单位名称" style="margin-bottom: 8px"></el-input>
                    <el-button type="danger" size="small" @click="removeTask('surveyTasks', index)"
                      v-if="index > 0">删除</el-button>
                  </div>
                  <el-button type="primary" @click="addTask('surveyTasks')">添加</el-button>
                </template>
                <template v-else>
                  <div v-if="result.surveyTasks && result.surveyTasks.length > 0">
                    <span v-for="(task, index) in result.surveyTasks" :key="index">
                      {{ task.unitName }}
                      <span v-if="index < result.surveyTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.surveyTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphStart" placeholder="段落划分开始"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.surveyTasks && result.surveyTasks.length > 0">
                    <span v-for="(task, index) in result.surveyTasks" :key="index">
                      {{ task.paragraphStart }}
                      <span v-if="index < result.surveyTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.surveyTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphEnd" placeholder="段落划分结束"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.surveyTasks && result.surveyTasks.length > 0">
                    <span v-for="(task, index) in result.surveyTasks" :key="index">
                      {{ task.paragraphEnd }}
                      <span v-if="index < result.surveyTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.surveyTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.remark" placeholder="备注"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.surveyTasks && result.surveyTasks.length > 0">
                    <span v-for="(task, index) in result.surveyTasks" :key="index">
                      {{ task.remark }}
                      <span v-if="index < result.surveyTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">地勘任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.geologicalTasks" :key="index" class="edit-task-row">
                    <el-input v-model="task.unitName" placeholder="单位名称" style="margin-bottom: 8px"></el-input>
                    <el-button type="danger" size="small" @click="removeTask('geologicalTasks', index)"
                      v-if="index > 0">删除</el-button>
                  </div>
                  <el-button type="primary" @click="addTask('geologicalTasks')">添加</el-button>
                </template>
                <template v-else>
                  <div v-if="result.geologicalTasks && result.geologicalTasks.length > 0">
                    <span v-for="(task, index) in result.geologicalTasks" :key="index">
                      {{ task.unitName }}
                      <span v-if="index < result.geologicalTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.geologicalTasks" :key="index">
                    <div v-for="(paragraph, pIndex) in task.paragraphs" :key="pIndex" class="edit-paragraph-row">
                      <el-row :gutter="10">
                        <el-col :span="8">
                          <el-input v-model="paragraph.start" placeholder="开始里程"></el-input>
                        </el-col>
                        <el-col :span="8">
                          <el-input v-model="paragraph.end" placeholder="结束里程"></el-input>
                        </el-col>
                        <el-col :span="6">
                          <el-input v-model="paragraph.remark" placeholder="备注"></el-input>
                        </el-col>
                        <el-col :span="2">
                          <el-button type="danger" size="small" @click="removeParagraph(index, pIndex)"
                            v-if="pIndex > 0">删除</el-button>
                        </el-col>
                      </el-row>
                    </div>
                    <el-button type="primary" size="small" @click="addParagraph(index)">添加段落</el-button>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.geologicalTasks && result.geologicalTasks.length > 0">
                    <div v-for="(task, index) in result.geologicalTasks" :key="index">
                      <div v-for="(paragraph, pIndex) in task.paragraphs" :key="pIndex">
                        开始里程：{{ paragraph.start }} - 结束里程：{{ paragraph.end }}
                        <span v-if="paragraph.remark"> ({{ paragraph.remark }})</span>
                        <br>
                      </div>
                    </div>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">试验任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.testTasks" :key="index" class="edit-task-row">
                    <el-input v-model="task.unitName" placeholder="单位名称" style="margin-bottom: 8px"></el-input>
                    <el-button type="danger" size="small" @click="removeTask('testTasks', index)"
                      v-if="index > 0">删除</el-button>
                  </div>
                  <el-button type="primary" @click="addTask('testTasks')">添加</el-button>
                </template>
                <template v-else>
                  <div v-if="result.testTasks && result.testTasks.length > 0">
                    <span v-for="(task, index) in result.testTasks" :key="index">
                      {{ task.unitName }}
                      <span v-if="index < result.testTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.testTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphStart" placeholder="段落划分开始"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.testTasks && result.testTasks.length > 0">
                    <span v-for="(task, index) in result.testTasks" :key="index">
                      {{ task.paragraphStart }}
                      <span v-if="index < result.testTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.testTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphEnd" placeholder="段落划分结束"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.testTasks && result.testTasks.length > 0">
                    <span v-for="(task, index) in result.testTasks" :key="index">
                      {{ task.paragraphEnd }}
                      <span v-if="index < result.testTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.testTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.remark" placeholder="备注"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.testTasks && result.testTasks.length > 0">
                    <span v-for="(task, index) in result.testTasks" :key="index">
                      {{ task.remark }}
                      <span v-if="index < result.testTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">综合开发任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.comprehensiveTasks" :key="index" class="edit-task-row">
                    <el-input v-model="task.unitName" placeholder="单位名称" style="margin-bottom: 8px"></el-input>
                    <el-button type="danger" size="small" @click="removeTask('comprehensiveTasks', index)"
                      v-if="index > 0">删除</el-button>
                  </div>
                  <el-button type="primary" @click="addTask('comprehensiveTasks')">添加</el-button>
                </template>
                <template v-else>
                  <div v-if="result.comprehensiveTasks && result.comprehensiveTasks.length > 0">
                    <span v-for="(task, index) in result.comprehensiveTasks" :key="index">
                      {{ task.unitName }}
                      <span v-if="index < result.comprehensiveTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.comprehensiveTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphStart" placeholder="段落划分开始"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.comprehensiveTasks && result.comprehensiveTasks.length > 0">
                    <span v-for="(task, index) in result.comprehensiveTasks" :key="index">
                      {{ task.paragraphStart }}
                      <span v-if="index < result.comprehensiveTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.comprehensiveTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphEnd" placeholder="段落划分结束"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.comprehensiveTasks && result.comprehensiveTasks.length > 0">
                    <span v-for="(task, index) in result.comprehensiveTasks" :key="index">
                      {{ task.paragraphEnd }}
                      <span v-if="index < result.comprehensiveTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.comprehensiveTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.remark" placeholder="备注"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.comprehensiveTasks && result.comprehensiveTasks.length > 0">
                    <span v-for="(task, index) in result.comprehensiveTasks" :key="index">
                      {{ task.remark }}
                      <span v-if="index < result.comprehensiveTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
            </a-descriptions>

            <div class="project_mainTitle">其他任务</div>
            <a-descriptions bordered size="middle" :column="1" :labelStyle="{ width: '180px' }">
              <a-descriptions-item label="单位名称">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.otherTasks" :key="index" class="edit-task-row">
                    <el-input v-model="task.unitName" placeholder="单位名称" style="margin-bottom: 8px"></el-input>
                    <el-button type="danger" size="small" @click="removeTask('otherTasks', index)"
                      v-if="index > 0">删除</el-button>
                  </div>
                  <el-button type="primary" @click="addTask('otherTasks')">添加</el-button>
                </template>
                <template v-else>
                  <div v-if="result.otherTasks && result.otherTasks.length > 0">
                    <span v-for="(task, index) in result.otherTasks" :key="index">
                      {{ task.unitName }}
                      <span v-if="index < result.otherTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分开始">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.otherTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphStart" placeholder="段落划分开始"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.otherTasks && result.otherTasks.length > 0">
                    <span v-for="(task, index) in result.otherTasks" :key="index">
                      {{ task.paragraphStart }}
                      <span v-if="index < result.otherTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="段落划分结束">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.otherTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.paragraphEnd" placeholder="段落划分结束"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.otherTasks && result.otherTasks.length > 0">
                    <span v-for="(task, index) in result.otherTasks" :key="index">
                      {{ task.paragraphEnd }}
                      <span v-if="index < result.otherTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                <template v-if="isEdit">
                  <div v-for="(task, index) in editData.otherTasks" :key="index" style="margin-bottom: 8px">
                    <el-input v-model="task.remark" placeholder="备注"></el-input>
                  </div>
                </template>
                <template v-else>
                  <div v-if="result.otherTasks && result.otherTasks.length > 0">
                    <span v-for="(task, index) in result.otherTasks" :key="index">
                      {{ task.remark }}
                      <span v-if="index < result.otherTasks.length - 1">, </span>
                    </span>
                  </div>
                  <span v-else>--</span>
                </template>
              </a-descriptions-item>
            </a-descriptions>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
 

<script lang="ts" setup>
import { reactive, ref, computed, onMounted, watch } from "vue";
import getDatas from "@/network/index";
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus';
import { useRoute } from "vue-router";
// ... existing code ...

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
  projectStep: number | null | string;
  projectStepName: string;
  groupLeader: string | null;
  deputyLeader: string | null;
  companyLeaders: string | null;
  businessPlanLeader: string | null;
  overall: string;
  executiveDeputyOverall: string;
  professionalDeputyOveralls: string[];
  projectDepartments: string[];
  projectManagers: any;
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
  projectStep: null,
  projectStepName: "",
  groupLeader: null,
  deputyLeader: null,
  companyLeaders: null,
  businessPlanLeader: null,
  overall: "",
  executiveDeputyOverall: "",
  professionalDeputyOveralls: [],
  projectDepartments: ["领导"],
  projectManagers: null,
  mainResponsibilityUnit: "",
  stationBeaforTasks: [
    {
      unitId: "",
      unitName: "",
      majors: null,
      paragraphStart: "",
      paragraphEnd: "",
      remark: ""
    }
  ],
  economicTasks: [
    {
      unitId: "",
      unitName: "",
      majors: null,
      paragraphStart: "",
      paragraphEnd: "",
      remark: ""
    }
  ],
  stationAfterTasks: [
    {
      unitId: "",
      unitName: "",
      majors: null,
      paragraphStart: "",
      paragraphEnd: "",
      remark: ""
    }
  ],
  engineeringEconomicTasks: [
    {
      unitId: "",
      unitName: "",
      majors: null,
      paragraphStart: "",
      paragraphEnd: "",
      remark: ""
    }
  ],
  flightTasks: [
    {
      unitId: "",
      unitName: "",
      majors: null,
      paragraphStart: "",
      paragraphEnd: "",
      remark: ""
    }
  ],
  drawingTasks: [
    {
      unitId: "",
      unitName: "",
      majors: null,
      paragraphStart: "",
      paragraphEnd: "",
      remark: ""
    }
  ],
  surveyTasks: [
    {
      unitId: "",
      unitName: "",
      majors: null,
      paragraphStart: "",
      paragraphEnd: "",
      remark: ""
    }
  ],
  geologicalTasks: [
    {
      unitId: "",
      unitName: "",
      paragraphs: [
        {
          start: "",
          end: "",
          remark: ""
        }
      ]
    }
  ],
  testTasks: [
    {
      unitId: "",
      unitName: "",
      majors: null,
      paragraphStart: "",
      paragraphEnd: "",
      remark: ""
    }
  ],
  comprehensiveTasks: [
    {
      unitId: "",
      unitName: "",
      majors: null,
      paragraphStart: "",
      paragraphEnd: "",
      remark: ""
    }
  ],
  otherTasks: [
    {
      unitId: "",
      unitName: "",
      majors: null,
      paragraphStart: "",
      paragraphEnd: "",
      remark: ""
    }
  ]
});
const ResultData = ref()

// 编辑模式控制
const isEdit = ref(false);

// 编辑数据
const editData = ref<ResultData>({
  projectStep: null,
  projectStepName: "",
  groupLeader: null,
  deputyLeader: null,
  companyLeaders: null,
  businessPlanLeader: null,
  overall: "",
  executiveDeputyOverall: "",
  professionalDeputyOveralls: [],
  projectDepartments: [],
  projectManagers: null,
  mainResponsibilityUnit: "",
  stationBeaforTasks: [],
  economicTasks: [],
  stationAfterTasks: [],
  engineeringEconomicTasks: [],
  flightTasks: [],
  drawingTasks: [],
  surveyTasks: [],
  geologicalTasks: [],
  testTasks: [],
  comprehensiveTasks: [],
  otherTasks: []
});

const router = useRouter();

const detailsLoading = ref(true);
// 获取项目详情
const getProjectDetails = async (projectStepStr: any) => {

  let projectId = router.currentRoute.value.query.projectId;
  let projectStep = router.currentRoute.value.query.projectStep;
  detailsLoading.value = true;
  try {
    const res = await getDatas('project/GetProjectProductionOrg', {
      projectId: projectId,
      projectStep: projectStepStr || projectStep
    });

    // 更新结果数据
    result.value = res.data.result;
    ResultData.value = res.data.result;
    result.value.projectStep = res.data.result.projectStep.toString();
    result.value.projectManagers = result.value.projectManagers ? result.value.projectManagers.join(',') : null;
    editData.value = isEdit.value ? JSON.parse(JSON.stringify(res.data.result)) : {};
  } catch (error) {
    console.error("获取项目详情失败:", error);
  } finally {
    detailsLoading.value = false;
  }
};

// 处理编辑
const handleEdit = () => {
  let ProjectSteps = sessionStorage.getItem("currentProjectSteps");
  if (ProjectSteps) {
    currentProjectSteps.value = JSON.parse(ProjectSteps as string);
  }
  // 深拷贝当前数据到编辑数据
  editData.value = JSON.parse(JSON.stringify(result.value));

  isEdit.value = true;

};

// 处理取消
const handleCancel = () => {
  isEdit.value = false;
  result.value = ResultData.value
}

// 处理保存
const handleSave = async () => {
  detailsLoading.value = true;
  try {
    editData.value.projectManagers = editData.value.projectManagers ? editData.value.projectManagers.split(',') : null;
    editData.value.projectStep = editData.value.projectStep !== null ? parseInt(String(editData.value.projectStep)) : null;

    const res = await getDatas('project/addProductionOrg', {
      projectId: router.currentRoute.value.query.projectId,
      // projectStep: router.currentRoute.value.query.projectStep,
      ...editData.value
    });

    if (res.data.code === 200) {
      ElMessage.success('保存成功');
      result.value = { ...editData.value };
      result.value.projectStep = editData.value.projectStep ? editData.value.projectStep.toString() : null;
      isEdit.value = false;
    } else {
      ElMessage.error(res.data.message || '保存失败');
    }
  } catch (error) {
    ElMessage.error('保存失败');
    console.error("保存失败:", error);
  } finally {
    detailsLoading.value = false;
  }
};

// 添加任务
const addTask = (taskType: keyof ResultData) => {
  console.log(taskType, 'taskType');

  const tasks = editData.value[taskType] as TaskItem[];
  console.log(tasks, 'taskstaskstasks');
  if (tasks) {
    tasks.push({
      unitId: '',
      unitName: '',
      majors: null,
      paragraphStart: '',
      paragraphEnd: '',
      remark: ''
    });
  } else {
    editData.value[taskType] = [{
      unitId: '',
      unitName: '',
      majors: null,
      paragraphStart: '',
      paragraphEnd: '',
      remark: ''
    }] as any;
  }
};

// 删除任务
const removeTask = (taskType: keyof ResultData, index: number) => {
  const tasks = editData.value[taskType] as TaskItem[];
  if (tasks.length > 1) {
    tasks.splice(index, 1);
  } else {
    ElMessage.warning('至少保留一条记录');
  }
};

// 添加段落
const addParagraph = (taskIndex: number) => {
  const task = editData.value.geologicalTasks[taskIndex];
  task.paragraphs.push({
    start: '',
    end: '',
    remark: ''
  });
};

// 删除段落
const removeParagraph = (taskIndex: number, paragraphIndex: number) => {
  const task = editData.value.geologicalTasks[taskIndex];
  if (task.paragraphs.length > 1) {
    task.paragraphs.splice(paragraphIndex, 1);
  } else {
    ElMessage.warning('至少保留一个段落');
  }
};

const handleProjectStepChange = (value: number) => {
  // 如果发生变化将其余所有数据重置为初始值
  // result.value = JSON.parse(JSON.stringify({
  //   projectStep: value,
  //   projectStepName: "", // 需要根据value获取对应的名称
  //   groupLeader: null,
  //   deputyLeader: null,
  //   companyLeaders: null,
  //   businessPlanLeader: null,
  //   overall: "",
  //   executiveDeputyOverall: "",
  //   professionalDeputyOveralls: [],
  //   projectDepartments: [],
  //   projectManagers: null,
  //   mainResponsibilityUnit: "",
  //   stationBeaforTasks: [],
  //   economicTasks: [],
  //   stationAfterTasks: [],
  //   engineeringEconomicTasks: [],
  //   flightTasks: [],
  //   drawingTasks: [],
  //   surveyTasks: [],
  //   geologicalTasks: [],
  //   testTasks: [],
  //   comprehensiveTasks: [],
  //   otherTasks: []
  // }));
  // editData.value = {
  //   projectStep: value,
  //   projectStepName: '',
  //   groupLeader: null,
  //   deputyLeader: null,
  //   companyLeaders: null,
  //   businessPlanLeader: null,
  //   overall: '',
  //   executiveDeputyOverall: '',
  //   professionalDeputyOveralls: [],
  //   projectDepartments: [],
  //   projectManagers: null,
  //   mainResponsibilityUnit: '',
  //   stationBeaforTasks: [
  //     {
  //       unitId: '',
  //       unitName: '',
  //       majors: null,
  //       paragraphStart: '',
  //       paragraphEnd: '',
  //       remark: ''
  //     }
  //   ],
  //   economicTasks: [
  //     {
  //       unitId: '',
  //       unitName: '',
  //       majors: null,
  //       paragraphStart: '',
  //       paragraphEnd: '',
  //       remark: ''
  //     }
  //   ],
  //   stationAfterTasks: [
  //     {
  //       unitId: '',
  //       unitName: '',
  //       majors: null,
  //       paragraphStart: '',
  //       paragraphEnd: '',
  //       remark: ''
  //     }
  //   ],
  //   engineeringEconomicTasks: [
  //     {
  //       unitId: '',
  //       unitName: '',
  //       majors: null,
  //       paragraphStart: '',
  //       paragraphEnd: '',
  //       remark: ''
  //     }
  //   ],
  //   flightTasks: [
  //     {
  //       unitId: '',
  //       unitName: '',
  //       majors: null,
  //       paragraphStart: '',
  //       paragraphEnd: '',
  //       remark: ''
  //     }
  //   ],
  //   drawingTasks: [
  //     {
  //       unitId: '',
  //       unitName: '',
  //       majors: null,
  //       paragraphStart: '',
  //       paragraphEnd: '',
  //       remark: ''
  //     }
  //   ],
  //   surveyTasks: [
  //     {
  //       unitId: '',
  //       unitName: '',
  //       majors: null,
  //       paragraphStart: '',
  //       paragraphEnd: '',
  //       remark: ''
  //     }
  //   ],
  //   geologicalTasks: [
  //     {
  //       unitId: '',
  //       unitName: '',
  //       paragraphs: [
  //         {
  //           start: '',
  //           end: '',
  //           remark: ''
  //         }
  //       ]
  //     }
  //   ],
  //   testTasks: [
  //     {
  //       unitId: '',
  //       unitName: '',
  //       majors: null,
  //       paragraphStart: '',
  //       paragraphEnd: '',
  //       remark: ''
  //     }
  //   ],
  //   comprehensiveTasks: [
  //     {
  //       unitId: '',
  //       unitName: '',
  //       majors: null,
  //       paragraphStart: '',
  //       paragraphEnd: '',
  //       remark: ''
  //     }
  //   ],
  //   otherTasks: [
  //     {
  //       unitId: '',
  //       unitName: '',
  //       majors: null,
  //       paragraphStart: '',
  //       paragraphEnd: '',
  //       remark: ''
  //     }
  //   ]
  // };
  result.value = JSON.parse(JSON.stringify({}))
  ResultData.value = JSON.parse(JSON.stringify({}))
  getProjectDetails(value);

}
const Editable = ref(false);
const route = useRoute();
// <!-- ，600-预付期，601-投标，602-规划，603-预可研，604-可研，605-初步设计，606-施工图，607-配合施工，608-开通运营，609-招标图，610-专题专项，611-清概（结算），612-质保期 -->

const currentProjectSteps = ref([
  {
    stepName: "预付期",
    stepCode: 600
  },
  {
    stepName: "投标",
    stepCode: 601
  },
  {
    stepName: "规划",
    stepCode: 602
  },
  {
    stepName: "预可研",
    stepCode: 603
  },
  {
    stepName: "可研",
    stepCode: 604
  },
  {
    stepName: "初步设计",
    stepCode: 605
  },
  {
    stepName: "施工图",
    stepCode: 606
  },
  {
    stepName: "配合施工",
    stepCode: 607
  },
  {
    stepName: "开通运营",
    stepCode: 608
  },
  {
    stepName: "招标图",
    stepCode: 609
  },
  {
    stepName: "专题专项",
    stepCode: 610
  },
  {
    stepName: "清概（结算）",
    stepCode: 611
  },
  {
    stepName: "质保期",
    stepCode: 612
  }
])
watch(
  () => router.currentRoute.value.query,
  (newQuery) => {

    if (newQuery.projectId && newQuery.projectStep) {
      Editable.value = route.query.Editable === "true";
      getProjectDetails(newQuery.projectStep);
    }
  },
  { immediate: true }
);
watch(
  // 判断页面路径发生变化就重新获取数据
  () => route.query.Editable,
  (newEditable) => {
    if (newEditable) {
      Editable.value = newEditable === "true";
    }
  },
  { deep: true, immediate: true }
);
onMounted(() => {

});
</script>

<style lang="less" scoped>
.project-detail-page {
  padding: 20px;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.project-title {
  font-size: 20px;
  font-weight: 700;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.content-wrapper {
  background: #fff;
  padding: 24px;
}

.info-card {
  margin-bottom: 24px;
}

.project_mainTitle {
  font-size: 20px;
  font-weight: 700;
  margin: 10px 0;
}

.edit-task-row {
  margin-bottom: 10px;
}

.edit-paragraph-row {
  margin-bottom: 10px;
}

:deep(.ant-descriptions-item-label) {
  font-weight: 500;
}

:deep(.el-input),
:deep(.el-select) {
  width: 100%;
}
</style>