<template>
  <div class="contract-form-container">
    <div class="tag">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="基本信息"></a-tab-pane>
        <a-tab-pane key="2" tab="开票申请信息" force-render></a-tab-pane>
        <a-tab-pane key="3" tab="收款信息"></a-tab-pane>
        <a-tab-pane key="4" tab="外协合同"></a-tab-pane>
        <a-tab-pane key="5" tab="补充合同"></a-tab-pane>
        <a-tab-pane key="6" tab="变更信息"></a-tab-pane>
        <a-tab-pane key="7" tab="中标信息"></a-tab-pane>
      </a-tabs>
    </div>
    <div class="supplementary-form">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        class="supplementary-form-container"
      >
        <div class="form-row">
          <a-form-item
            label="是否补充合同"
            name="contract"
            class="compact-item"
          >
            <a-input v-model:value="formState.contract" />
          </a-form-item>

          <a-form-item label="签订单位" name="signingUnit" class="compact-item">
            <a-input v-model:value="formState.signingUnit" />
          </a-form-item>
        </div>

        <div class="form-row">
          <a-form-item label="所属项目" name="project" class="compact-item">
            <a-input v-model:value="formState.project" />
          </a-form-item>

          <a-form-item label="中标时间" name="bidTime" class="compact-item">
            <a-date-picker
              v-model:value="formState.bidTime"
              style="width: 100%"
            />
          </a-form-item>
        </div>

        <div class="form-row">
          <a-form-item label="中标金额" name="bidAmount" class="compact-item">
            <a-input v-model:value="formState.bidAmount">
              <template #suffix>
                <span class="unit-suffix">万元</span>
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            label="合同名称"
            name="contractName"
            class="compact-item"
          >
            <a-input v-model:value="formState.contractName" />
          </a-form-item>

          <a-form-item
            label="合同编号"
            name="contractNumber"
            class="compact-item"
          >
            <a-input v-model:value="formState.contractNumber" />
          </a-form-item>

          <a-form-item
            label="合同唯一ID"
            name="contractUniqueId"
            class="compact-item"
          >
            <a-input v-model:value="formState.contractUniqueId" />
          </a-form-item>
        </div>

        <div class="form-row">
          <a-form-item label="板块" name="plate" class="compact-item">
            <a-select v-model:value="formState.plate">
              <a-select-option value="设备（产品）代销及系统集成"
                >设备（产品）代销及系统集成</a-select-option
              >
              <a-select-option value="基建">基建</a-select-option>
              <a-select-option value="房建">房建</a-select-option>
              <a-select-option value="市政">市政</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="类型一" name="typeOne" class="compact-item">
            <a-select v-model:value="formState.typeOne">
              <a-select-option value="系统集成">系统集成</a-select-option>
              <a-select-option value="施工">施工</a-select-option>
              <a-select-option value="设计">设计</a-select-option>
              <a-select-option value="采购">采购</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="类型二" name="typeTwo" class="compact-item">
            <a-select v-model:value="formState.typeTwo">
              <a-select-option value="总承包">总承包</a-select-option>
              <a-select-option value="专业分包">专业分包</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="类型三" name="typeThree" class="compact-item">
            <a-select v-model:value="formState.typeThree">
              <a-select-option value="公开招标">公开招标</a-select-option>
              <a-select-option value="邀请招标">邀请招标</a-select-option>
            </a-select>
          </a-form-item>
        </div>

        <div class="form-row">
          <a-form-item
            label="承揽类型"
            name="undertakingType"
            class="compact-item"
          >
            <a-select v-model:value="formState.undertakingType">
              <a-select-option value="自主承揽">自主承揽</a-select-option>
              <a-select-option value="合作承揽">合作承揽</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="业主单位" name="ownerUnit" class="compact-item">
            <a-input v-model:value="formState.ownerUnit" />
          </a-form-item>

          <a-form-item
            label="付款方是否与业主单位一致"
            name="isPayerSameAsOwner"
            class="compact-item"
          >
            <a-radio-group v-model:value="formState.isPayerSameAsOwner">
              <a-radio :value="true">是</a-radio>
              <a-radio :value="false">否</a-radio>
            </a-radio-group>
          </a-form-item>
        </div>

        <div class="form-row">
          <a-form-item
            label="是否为联合体"
            name="isConsortium"
            class="compact-item"
          >
            <a-radio-group v-model:value="formState.isConsortium">
              <a-radio :value="true">是</a-radio>
              <a-radio :value="false">否</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item
            label="合同金额"
            name="contractAmount"
            class="compact-item"
          >
            <a-input-number
              v-model:value="formState.contractAmount"
              style="width: 100%"
            />
          </a-form-item>

          <a-form-item
            label="投资金额"
            name="investmentAmount"
            class="compact-item"
          >
            <a-input-number
              v-model:value="formState.investmentAmount"
              style="width: 100%"
            >
              <template #suffix>
                <span class="unit-suffix">万元</span>
              </template>
            </a-input-number>
          </a-form-item>

          <a-form-item
            label="合同价格类型"
            name="contractPriceType"
            class="compact-item"
          >
            <a-select v-model:value="formState.contractPriceType">
              <a-select-option value="固定总价">固定总价</a-select-option>
              <a-select-option value="固定单价">固定单价</a-select-option>
              <a-select-option value="可调价格">可调价格</a-select-option>
            </a-select>
          </a-form-item>
        </div>

        <div class="form-row">
          <a-form-item
            label="同意付款比例"
            name="agreedPaymentRatio"
            class="compact-item"
          >
            <a-input-number
              v-model:value="formState.agreedPaymentRatio"
              style="width: 100%"
              :min="0"
              :max="100"
              :formatter="(value) => `${value}%`"
              :parser="(value) => value.replace('%', '')"
            />
          </a-form-item>

          <a-form-item
            label="是否框架合同"
            name="isFrameworkContract"
            class="compact-item"
          >
            <a-radio-group v-model:value="formState.isFrameworkContract">
              <a-radio :value="true">是</a-radio>
              <a-radio :value="false">否</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item
            label="合同识别号"
            name="contractIdentificationNumber"
            class="compact-item"
          >
            <a-input v-model:value="formState.contractIdentificationNumber" />
          </a-form-item>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import dayjs from "dayjs";

const activeKey = ref("1");

// 表单状态
const formState = reactive({
  contract: "",
  signingUnit: "旷谷公司",
  project: "重庆市永川至璧山高速公路弱电系统销售",
  bidTime: dayjs(),
  bidAmount: "3,020",
  contractName: "",
  contractNumber: "",
  contractUniqueId: "",
  plate: "设备（产品）代销及系统集成",
  typeOne: "系统集成",
  typeTwo: "",
  typeThree: "",
  undertakingType: "",
  ownerUnit: "",
  isPayerSameAsOwner: true,
  isConsortium: false,
  contractAmount: 0,
  investmentAmount: 5000,
  contractPriceType: "",
  agreedPaymentRatio: 100,
  isFrameworkContract: false,
  contractIdentificationNumber: "",
});

// 验证规则
const rules = {
  contract: [
    {
      required: true,
      message: "请输入是否补充合同",
      trigger: "blur",
    },
  ],
  signingUnit: [
    {
      required: true,
      message: "请输入签订单位",
      trigger: "blur",
    },
  ],
};
</script>

<style scoped lang="less">
.contract-form-container {
  font-family: "Microsoft YaHei", Arial, sans-serif;
  background: #fff;
  padding: 20px;
}

.form-content {
  margin-top: 20px;
}

.section {
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-right: 8px;
}

.section-title-large {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0 0 16px 0;
}

.section-title-medium {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 0 12px 0;
}

.section-value {
  font-size: 16px;
  color: #333;
}

.bold {
  font-weight: bold;
}

.sub-title {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-top: 4px;
}

.amount-row {
  display: flex;
  align-items: baseline;
  margin-bottom: 8px;
}

.label {
  font-size: 16px;
  color: #333;
  margin-right: 8px;
}

.value {
  font-size: 20px;
  color: #333;
  margin-right: 4px;
}

.highlight {
  color: #1890ff;
  font-weight: bold;
}

.unit {
  font-size: 16px;
  color: #333;
}

.unit-small {
  font-size: 14px;
  color: #666;
  margin-left: 4px;
}

.description {
  font-size: 14px;
  color: #666;
}

.divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #d9d9d9, transparent);
  margin: 24px 0;
}

.two-column-layout {
  display: flex;
  gap: 60px;
}

.column {
  flex: 1;
}

.field-group {
  margin-bottom: 16px;
}

.field-label {
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-bottom: 6px;
}

.field-value {
  font-size: 14px;
  color: #333;
}

.type-item {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.type-indicator {
  color: #1890ff;
  margin-right: 6px;
}

.type-detail {
  margin-left: 20px;
  color: #666;
}

.company-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.company-name {
  font-size: 14px;
  color: #333;
  font-weight: bold;
}

.company-id {
  font-size: 14px;
  color: #666;
}

.amount-group {
  .amount-label {
    font-size: 12px;
    color: #999;
    margin-bottom: 4px;
  }
}

.framework-section {
  margin-top: 16px;
}

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

.unit-suffix {
  color: #999;
  font-size: 12px;
}

:deep(.ant-radio-wrapper) {
  font-size: 14px;
  color: #333;
}

:deep(.ant-tabs-nav) {
  margin-bottom: 0;
}

:deep(.ant-tabs-tab) {
  padding: 12px 16px;
  font-size: 14px;
  font-weight: bold;
}
</style>
