<template>
  <div>
    <div class="header">
      <span
        @click="$router.push({ name: 'projectMgment' })"
        style="cursor: pointer"
        >项目管理</span
      >
      <span>/新建项目</span>
    </div>
    <div class="supplementary-form">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        class="supplementary-form-container"
      >
        <div class="form-row">
          <a-form-item label="项目名称" name="project" class="compact-item">
            <a-input v-model:value="formState.project" />
          </a-form-item>
        </div>
        <div class="form-row">
          <a-form-item
            label="国内国外"
            name="domesticForeign"
            class="compact-item"
          >
            <a-input v-model:value="formState.domesticForeign" />
          </a-form-item>
          <a-form-item
            label="承揽类型"
            name="contractType"
            class="compact-item"
          >
            <a-input v-model:value="formState.contractType" />
          </a-form-item>
          <a-form-item label="板块" name="sector" class="compact-item">
            <a-input v-model:value="formState.sector" />
          </a-form-item>
        </div>
        <div class="form-row">
          <a-form-item label="类型一" name="typeOne" class="compact-item">
            <a-input v-model:value="formState.typeOne" />
          </a-form-item>
          <a-form-item
            label="类型一(细分)"
            name="typeOneDetail"
            class="compact-item"
          >
            <a-input v-model:value="formState.typeOneDetail" />
          </a-form-item>
          <a-form-item label="类型二" name="typeTwo" class="compact-item">
            <a-input v-model:value="formState.typeTwo" />
          </a-form-item>
          <a-form-item label="类型三" name="typeThree" class="compact-item">
            <a-input v-model:value="formState.typeThree" />
          </a-form-item>
        </div>
        <div class="form-row">
           <a-form-item
            label="是否军融"
            name="isMilitaryFusion"
            class="compact-item"
          >
            <a-select
              v-model:value="formState.isMilitaryFusion"
              placeholder="请选择"
            >
              <a-select-option value="0">是</a-select-option>
              <a-select-option value="1">否</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="项目编号"
            name="projectNumber"
            class="compact-item"
          >
            <a-input v-model:value="formState.projectNumber" />
          </a-form-item>
          <a-form-item
            label="投资金额"
            name="investmentAmount"
            class="compact-item"
          >
            <a-input v-model:value="formState.investmentAmount" />
          </a-form-item>
          <a-form-item label="中标时间" name="bidTime" class="compact-item">
            <a-date-picker
              v-model:value="formState.bidTime"
              style="width: 100%"
              placeholder="请选择"
            />
          </a-form-item>
        </div>
        <div class="form-row">
          <a-form-item label="中标金额" name="bidAmount" class="compact-item">
            <a-input v-model:value="formState.bidAmount" />
          </a-form-item>
          <a-form-item
            label="是否补充项目"
            name="isSupplementaryProject"
            class="compact-item"
          >
            <a-input v-model:value="formState.isSupplementaryProject" />
          </a-form-item>
          <a-form-item label="业主单位" name="ownerUnit" class="compact-item">
            <a-input v-model:value="formState.ownerUnit" />
          </a-form-item>
        </div>
        <div class="form-row">
          <a-form-item
            label="主体承担单位"
            name="mainResponsibleUnit"
            class="compact-item"
          >
            <a-input v-model:value="formState.mainResponsibleUnit" />
          </a-form-item>
          <a-form-item
            label="生产管理主责单位"
            name="productionManagementUnit"
            class="compact-item"
          >
            <a-input v-model:value="formState.productionManagementUnit" />
          </a-form-item>
          <a-form-item
            label="项目状态"
            name="projectStatus"
            class="compact-item"
          >
            <a-input v-model:value="formState.projectStatus" />
          </a-form-item>
        </div>
        <div class="form-row">
          <a-form-item
            label="合同总工期"
            name="contractDuration"
            class="compact-item"
          >
            <a-input v-model:value="formState.contractDuration" />
          </a-form-item>
          <a-form-item
            label="计划开工日期"
            name="plannedStartDate"
            class="compact-item"
          >
            <a-date-picker
              v-model:value="formState.plannedStartDate"
              style="width: 100%"
              placeholder="请选择"
            />
          </a-form-item>
          <a-form-item
            label="实际开工日期"
            name="actualStartDate"
            class="compact-item"
          >
            <a-date-picker
              v-model:value="formState.actualStartDate"
              style="width: 100%"
              placeholder="请选择"
            />
          </a-form-item>
        </div>
      </a-form>
      <a-divider />
      <a-form
        ref="formRef2"
        :model="formState"
        :rules="rules"
        class="supplementary-form-container"
      >
        <div class="form-row">
          <a-form-item
            label="主体承担单位"
            name="mainResponsibleUnit"
            class="compact-item"
          >
            <a-input v-model:value="formState.mainResponsibleUnit" />
          </a-form-item>
          <a-form-item
            label="生产管理主责单位"
            name="productionManagementUnit"
            class="compact-item"
          >
            <a-input v-model:value="formState.productionManagementUnit" />
          </a-form-item>
        </div>
        <div class="form-row">
          <a-form-item
            label="项目状态"
            name="projectStatus"
            class="compact-item"
          >
            <a-input v-model:value="formState.projectStatus" />
          </a-form-item>
          <a-form-item
            label="合同总工期"
            name="contractDuration"
            class="compact-item"
          >
            <a-input v-model:value="formState.contractDuration" />
          </a-form-item>
        </div>
        <div class="form-row">
          <a-form-item
            label="计划开工日期"
            name="plannedStartDate"
            class="compact-item"
          >
            <a-date-picker
              v-model:value="formState.plannedStartDate"
              style="width: 100%"
              placeholder="请选择"
            />
          </a-form-item>
          <a-form-item
            label="实际开工日期"
            name="actualStartDate"
            class="compact-item"
          >
            <a-date-picker
              v-model:value="formState.actualStartDate"
              style="width: 100%"
              placeholder="请选择"
            />
          </a-form-item>
        </div>
        <div class="form-row">
          <a-form-item
            label="计划竣工日期"
            name="plannedEndDate"
            class="compact-item"
          >
            <a-date-picker
              v-model:value="formState.plannedEndDate"
              style="width: 100%"
              placeholder="请选择"
            />
          </a-form-item>
          <a-form-item
            label="实际竣工日期"
            name="actualEndDate"
            class="compact-item"
          >
            <a-date-picker
              v-model:value="formState.actualEndDate"
              style="width: 100%"
              placeholder="请选择"
            />
          </a-form-item>
          <!-- 项目所在地 -->
           
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const formRef = ref(null);
const formState = reactive({
  project: "",
  domesticForeign: "",
  contractType: "",
  sector: "",
  typeOne: "",
  typeOneDetail: "",
  typeTwo: "",
  typeThree: "",
  isMilitaryFusion: "",
  projectNumber: "",
  investmentAmount: "",
  bidTime: null,
  bidAmount: "",
  isSupplementaryProject: "",
  ownerUnit: "",
  mainResponsibleUnit: "",
  productionManagementUnit: "",
  projectStatus: "",
  contractDuration: "",
  plannedStartDate: null,
  actualStartDate: null,
  plannedEndDate: null,
  actualEndDate: null,
});
const rules = {};
</script>

<style scoped lang="less">
.supplementary-form {
  margin-top: 30px;
  border-top: 2px solid #f0f0f0;
  padding-top: 20px;
}

.supplementary-form-container {
  .form-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 16px;
  }

  .compact-item {
    flex: 1;
    min-width: 200px;
    margin-bottom: 0;

    :deep(.ant-form-item-label) {
      padding-bottom: 4px;

      label {
        font-size: 13px;
        font-weight: bold;
        color: #333;
      }
    }

    :deep(.ant-form-item-control) {
      .ant-input,
      .ant-select-selector,
      .ant-picker {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        background: #fff;

        &:hover {
          border-color: #40a9ff;
        }

        &:focus {
          border-color: #40a9ff;
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        }
      }
    }
  }
}

.header {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
}
</style>
