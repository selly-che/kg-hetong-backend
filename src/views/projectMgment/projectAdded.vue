<template>
  <div class="bgf br8">
    <div class="project-detail-page">
      <div class="content-wrapper">
        <h2>项目信息录入</h2>
        <a-form ref="fromRef" :model="formData" layout="vertical" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <!-- 项目名称（必填） -->
          <a-form-item
            label="项目名称"
            name="projectFullName"
            :rules="[{ required: true, message: '请输入项目名称', trigger: 'blur' }]"
          >
            <a-input v-model:value="formData.projectFullName" placeholder="请输入项目名称" />
          </a-form-item>

          <!-- 项目类型（必填） -->
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-item
                label="项目类型"
                name="projectType"
                :rules="[{ required: true, message: '请选择项目类型', trigger: 'change' }]"
              >
                <a-select v-model:value="formData.projectType" placeholder="请选择项目类型">
                  <a-select-option value="全部">全部</a-select-option>
                  <a-select-option value="铁路">铁路</a-select-option>
                  <a-select-option value="城轨">城轨</a-select-option>
                  <a-select-option value="公路">公路</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <!-- 项目负责人（必填） -->
              <a-form-item
                label="项目负责人"
                name="projectleader"
                :rules="[{ required: true, message: '请选择项目负责人', trigger: 'change' }]"
              >
                <a-select
                  clearable
                  show-search
                  v-model:value="formData.projectleader"
                  placeholder="请选择项目负责人"
                >
                  <a-select-option
                    v-for="item in ProjectUserList"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.realname }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <!-- 项目阶段（必填） -->
              <a-form-item
                label="项目阶段"
                name="projectStep"
                :rules="[{ required: true, message: '请选择项目阶段', trigger: 'change' }]"
              >
                <a-select v-model:value="formData.projectStep" placeholder="请选择项目阶段">
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
              <a-form-item label="项目状态">
                <a-select v-model:value="formData.projectStatus">
                  <a-select-option value="0">暂停</a-select-option>
                  <a-select-option value="1">进行中</a-select-option>
                  <a-select-option value="2">已完成</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 线路长度 & 速度目标值 -->
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-item label="线路长度">
                <a-input
                  v-model:value="formData.projectLength"
                  type="number"
                  clearable
                  placeholder="如：200"
                >
                  <template #addonAfter>km</template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="速度目标值">
                <a-input
                  v-model:value="formData.projectSpeed"
                  clearable
                  placeholder="如：200"
                >
                  <template #addonAfter>km/h</template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 铁路等级 & 运营组织模式 -->
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-item label="铁路等级">
                <a-select v-model:value="formData.saixuantLx2" placeholder="请选择等级">
                  <a-select-option :value="1">等級一</a-select-option>
                  <a-select-option :value="2">等級二</a-select-option>
                  <a-select-option :value="3">等級三</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="运营组织模式">
                <a-input v-model:value="formData.operationMode" placeholder="如：--" />
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 车辆选型与编组 & 重点工程 -->
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-item label="车辆选型与编组">
                <a-input v-model:value="formData.vehicleType" placeholder="如：--" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="重点工程">
                <a-radio-group v-model:value="formData.projectIsEmphasis">
                  <a-radio value="0">否</a-radio>
                  <a-radio value="1">是</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 项目说明 -->
          <a-form-item label="项目说明">
            <a-input
              type="textarea"
              :auto-size="{ minRows: 2, maxRows: 4 }"
              v-model:value="formData.projectDescription"
              placeholder="请输入项目说明"
            />
          </a-form-item>

          <!-- 合同时间 & 开工时间 -->
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-item label="合同时间">
                <a-date-picker
                  v-model:value="formData.projectContractTime"
                  show-time
                  value-format="YYYY-MM-DD HH:mm:ss"
                  placeholder="请选择合同时间"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="开工时间">
                <a-date-picker
                  v-model:value="formData.projectStartTime"
                  show-time
                  value-format="YYYY-MM-DD HH:mm:ss"
                  placeholder="请选择开工时间"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 计划通车时间 & 项目投资 -->
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-item label="计划通车时间">
                <a-date-picker
                  v-model:value="formData.projectFinishTime"
                  show-time
                  value-format="YYYY-MM-DD HH:mm:ss"
                  placeholder="请选择计划通车时间"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="项目投资">
                <a-input
                  v-model:value="formData.projectInvestAmount"
                  type="number"
                  clearable
                  placeholder="如：200"
                >
                  <template #addonAfter>万元</template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 合同金额 -->
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-item label="合同金额">
                <a-input
                  v-model:value="formData.projectAmount"
                  type="number"
                  clearable
                  placeholder="如：200"
                >
                  <template #addonAfter>万元</template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 保存按钮 -->
          <a-form-item>
            <a-button type="primary" @click="saveProject">保存</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import getDatas from "@/network/index";
import { message } from 'ant-design-vue';
import { useRouter, useRoute } from "vue-router";

const fromRef = ref();
const router = useRouter();
const route = useRoute();

// 初始化表单数据
const formData = ref({
  projectFullName: '',
  projectType: '',
  projectStep: '',
  projectLength: null,
  projectSpeed: '',
  operationMode: '',
  vehicleType: '',
  projectIsEmphasis: '0',
  projectDescription: '',
  projectContractTime: new Date('2023-12-01'),
  projectStatus: '1',
  projectFinishTime: null,
  projectInvestAmount: null,
  projectStartTime: new Date('2024-01-15'),
  projectAmount: null,
  saixuantLx2: null,
  projectleader: ''
});

const ProjectUserList = ref([]);

// 保存逻辑
const saveProject = async () => {
  const valid = await fromRef.value.validate();
  if (!valid) return;

  try {
    const res = await getDatas('project/AddProject', formData.value);
    if (res.data.code === 200) {
      message.success('保存成功');
      router.push('/projectMgment/projectHome').finally(() => {
        sessionStorage.setItem('openedTabs', [])
        window.location.reload();
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    formData.value = {};
  }
};

// 获取用户列表
const getUserList = async () => {
  try {
    const res = await getDatas('system/GetUserinfo', { pageNo: 1, pageSize: 20 });
    ProjectUserList.value = res.data.result.records;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getUserList();
});
</script>

<style lang="less" scoped>
.bgf {
  background-color: #fff;
  padding: 20px;
}

.project-detail-page {
  max-width: 1200px;
  margin: 0 auto;
}

.content-wrapper {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>