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

          <a-form-item label="签订单位" name="signingUnit" class="compact-item">
            <a-input v-model:value="formState.signingUnit" />
          </a-form-item>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const formRef = ref(null);
const formState = reactive({
  contract: "",
  signingUnit: "",
  project: "",
  bidTime: "",
});
const rules = {
  contract: [
    {
      required: true,
      message: "请输入是否补充合同",
    },
  ],
  signingUnit: [
    {
      required: true,
      message: "请输入签订单位",
    },
  ],
  project: [
    {
      required: true,
      message: "请输入所属项目",
    },
  ],
  bidTime: [
    {
      required: true,
      message: "请选择中标时间",
    },
  ],
};
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
