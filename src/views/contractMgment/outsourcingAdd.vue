<template>
  <div>
    <a-modal
      v-model:visible="visible"
      title="新增外协合同"
      @ok="handleOk"
      width="1200px"
      :confirm-loading="loading"
    >
      <a-form :model="form" :rules="rules" layout="vertical" ref="formRef">
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="主合同" name="mainContract">
              <a-input
                v-model:value="form.mainContract"
                placeholder="请输入主合同名称"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="所属项目" name="projectName">
              <a-input
                v-model:value="form.projectName"
                placeholder="请输入所属项目名称"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="所属项目" name="projectName">
              <a-input
                v-model:value="form.projectName"
                placeholder="新建C2铁路工程CZSCZQ-5标项目经理部三工区灵宝山隧道结构受力监测技术服务"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="外协类型" name="outsourcingType">
              <a-select
                v-model:value="form.outsourcingType"
                placeholder="请选择外协类型"
              >
                <a-select-option value="road">路外外包</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="外协合同名称" name="outsourcingContractName">
              <a-input
                v-model:value="form.outsourcingContractName"
                placeholder="铁路工程"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="合同编号" name="contractNo">
              <a-input
                v-model:value="form.contractNo"
                placeholder="系统自动生成"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="合同识别号" name="contractRecognitionNo">
              <a-input
                v-model:value="form.contractRecognitionNo"
                placeholder="系统自动生成"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="合同唯一ID" name="contractUniqueId">
              <a-input
                v-model:value="form.contractUniqueId"
                placeholder="系统自动生成"
                disabled
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="主合同编号" name="mainContractNo">
              <a-select
                v-model:value="form.mainContractNo"
                placeholder="请选择主合同"
              >
                <a-select-option value="pending">待选择</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="主合同承揽类型" name="mainContractType">
              <a-select
                v-model:value="form.mainContractType"
                placeholder="请选择主合同"
              >
                <a-select-option value="pending">待选择</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="主合同金额" name="mainContractAmount">
              <a-input
                v-model:value="form.mainContractAmount"
                placeholder="请选择主合同 (万元)"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="主合同累计收款" name="mainContractReceivedAmount">
              <a-input
                v-model:value="form.mainContractReceivedAmount"
                placeholder="请选择主合同 (万元)"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="主合同板块" name="mainContractSector">
              <a-select
                v-model:value="form.mainContractSector"
                placeholder="请选择主合同"
              >
                <a-select-option value="pending">待选择</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="外协单位" name="outsourcingUnit">
              <a-auto-complete
                v-model:value="form.outsourcingUnit"
                placeholder="请搜索"
              >
                <template #options>
                  <a-select-option value="pending">待搜索/填写</a-select-option>
                </template>
              </a-auto-complete>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="主合同类型一" name="mainContractTypeOne">
              <a-select
                v-model:value="form.mainContractTypeOne"
                placeholder="请选择主合同"
              >
                <a-select-option value="pending">待选择</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="其他开票单位" name="otherBillingUnit">
              <a-auto-complete
                v-model:value="form.otherBillingUnit"
                placeholder="请搜索"
              >
                <template #options>
                  <a-select-option value="pending">待搜索/填写</a-select-option>
                </template>
              </a-auto-complete>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="外协主责单位" name="outsourcingResponsibleUnit">
              <a-select
                v-model:value="form.outsourcingResponsibleUnit"
                placeholder="请选择外协主责单位"
              >
                <a-select-option value="kuanggu">1</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="性质" name="nature">
              <a-select
                v-model:value="form.nature"
                placeholder="请选择性质"
              >
                <a-select-option value="highway">公路</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="经办人" name="handler">
              <a-input
                v-model:value="form.handler"
                placeholder="蔡其兴(caiqixing)"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="外协合同金额" name="outsourcingContractAmount">
              <a-input
                v-model:value="form.outsourcingContractAmount"
                placeholder="待填写具体金额 (万元)"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="合同价格类型" name="contractPriceType">
              <a-select
                v-model:value="form.contractPriceType"
                placeholder="请选择合同价格类型"
              >
                <a-select-option value="fixed">固定价</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="同意付款比例" name="paymentRatio">
              <a-input
                v-model:value="form.paymentRatio"
                placeholder="100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="归属年份" name="belongYear">
              <a-select
                v-model:value="form.belongYear"
                placeholder="请选择归属年份"
              >
                <a-select-option value="2025">2025</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="约定付款周期" name="paymentCycle">
              <a-input
                v-model:value="form.paymentCycle"
                placeholder="约定付款周期(最大输入100字符)"
                :maxlength="100"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="计划开工日期" name="plannedStartDate">
              <a-date-picker
                v-model:value="form.plannedStartDate"
                placeholder="请选择日期"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="实际开工日期" name="actualStartDate">
              <a-date-picker
                v-model:value="form.actualStartDate"
                placeholder="请选择日期"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="项目部" name="projectDepartment">
              <a-select
                v-model:value="form.projectDepartment"
                placeholder="请选择项目部"
              >
                <a-select-option value="pending">待选择</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="登记日期" name="registrationDate">
              <a-date-picker
                v-model:value="form.registrationDate"
                placeholder="2025-11-03"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="支付条款" name="paymentTerms">
              <a-table
                :columns="paymentColumns2"
                :data-source="paymentData2"
                :pagination="false"
                bordered
              >
                <template #bodyCell="{ column, record,index }">
                  <template v-if="column.key === 'applicationDate'">
                    <a-date-picker
                      v-model:value="record.applicationDate"
                      placeholder="2025-11-03"
                      style="width: 100%"
                    />
                  </template>
                  <template v-else-if="column.key === 'handler'">
                    <a-input
                      v-model:value="record.handler"
                      placeholder="蔡其兴"
                    />
                  </template>
                  <template v-else-if="column.key === 'applicationAmount'">
                    <a-input
                      v-model:value="record.applicationAmount"
                      placeholder="待填写具体金额 (万元)"
                    />
                  </template>
                  <template v-else-if="column.key === 'remark'">
                    <a-input
                      v-model:value="record.remark"
                      placeholder="请输入待填写"
                    />
                  </template>
                </template>
              </a-table>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="支付申请" name="paymentApplication">
              <a-table
                :columns="paymentColumns"
                :data-source="paymentData"
                :pagination="false"
                bordered
              >
                <template #bodyCell="{ column, record, index }">
                  <template v-if="column.key === 'applicationDate'">
                    <a-date-picker
                      v-model:value="record.applicationDate"
                      placeholder="2025-11-03"
                      style="width: 100%"
                    />
                  </template>
                  <template v-else-if="column.key === 'handler'">
                    <a-input
                      v-model:value="record.handler"
                      placeholder="蔡其兴"
                    />
                  </template>
                  <template v-else-if="column.key === 'applicationAmount'">
                    <a-input
                      v-model:value="record.applicationAmount"
                      placeholder="待填写具体金额 (万元)"
                    />
                  </template>
                  <template v-else-if="column.key === 'remark'">
                    <a-input
                      v-model:value="record.remark"
                      placeholder="请输入待填写"
                    />
                  </template>
                </template>
              </a-table>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="累计申请金额" name="totalApplicationAmount">
              <a-input
                v-model:value="form.totalApplicationAmount"
                placeholder="0万"
                disabled
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="附件" name="attachments">
              <a-upload
                v-model:file-list="form.attachments"
                :before-upload="beforeUpload"
                :remove="handleRemove"
              >
                <a-button>
                  <upload-outlined></upload-outlined>
                  点击上传
                </a-button>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="备注" name="remark">
              <a-textarea
                v-model:value="form.remark"
                :rows="3"
                placeholder="请输入备注信息"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import type { UploadProps } from "ant-design-vue";

export default defineComponent({
  components: {
    UploadOutlined,
  },
  setup() {
    const visible = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const formRef = ref();

    const form = reactive({
      mainContract: "",
      projectName:"",
      outsourcingType: undefined,
      outsourcingContractName: "",
      contractNo: "",
      contractRecognitionNo: "",
      contractUniqueId: "",
      mainContractNo: undefined,
      mainContractType: undefined,
      mainContractAmount: "",
      mainContractReceivedAmount: "",
      mainContractSector: undefined,
      outsourcingUnit: "",
      mainContractTypeOne: undefined,
      otherBillingUnit: "",
      outsourcingResponsibleUnit: undefined,
      nature: undefined,
      handler: "",
      outsourcingContractAmount: "",
      contractPriceType: undefined,
      paymentRatio: "",
      belongYear: undefined,
      paymentCycle: "",
      plannedStartDate: undefined,
      actualStartDate: undefined,
      projectDepartment: undefined,
      registrationDate: undefined,
      paymentTerms: "",
      totalApplicationAmount: "0万",
      contractName: "",
      contractType: undefined,
      contractAmount: undefined,
      partyA: "",
      partyB: "",
      signDate: undefined,
      effectiveDate: undefined,
      expiryDate: undefined,
      paymentMethod: undefined,
      contractContent: "",
      attachments: [] as any[],
      remark: "",
    });

    const rules = {};

    const paymentColumns = [
      { title: '申请日期', dataIndex: 'applicationDate', key: 'applicationDate', width: 150 },
      { title: '经办人', dataIndex: 'handler', key: 'handler', width: 120 },
      { title: '申请金额(万元)', dataIndex: 'applicationAmount', key: 'applicationAmount', width: 150 },
      { title: '备注', dataIndex: 'remark', key: 'remark' },
    ];

     const paymentColumns2 = [
      { title: '序号', dataIndex: 'index', key: 'index', width: 80 },
       { title: '付款批次', dataIndex: 'paymentBatch', key: 'paymentBatch', width: 100 },
       { title: '付款性质', dataIndex: 'paymentNature', key: 'paymentNature', width: 100 }, 
       { title: '付款条件', dataIndex: 'paymentCondition', key: 'paymentCondition', width: 100 },  
       { title: '约定付款比例%', dataIndex: 'agreedPaymentRatio', key: 'agreedPaymentRatio', width: 150 },
       { title: '结算至交付到帐期（天）', dataIndex: 'settlementToDeliveryAccountingPeriod', key: 'settlementToDeliveryAccountingPeriod', width: 200 },
       { title: '备注', dataIndex: 'remark', key: 'remark' },
    ];

    const paymentData = ref([
      {
        key: '1',
        applicationDate: undefined,
        handler: '蔡其兴',
        applicationAmount: '',
        remark: '',
      },
    ]);
    const paymentData2 = ref([
      {
        key: '1',
        index: 1,
        paymentBatch: '',
        paymentNature: '',
        paymentCondition: '',
        agreedPaymentRatio: '',
        settlementToDeliveryAccountingPeriod: '',
        remark: '',
      },
    ]);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = () => {
      console.log("新增功能开发中");
    };

    const resetForm = () => {
      Object.assign(form, {
        contractNo: "",
        contractName: "",
        contractType: undefined,
        contractAmount: undefined,
        partyA: "",
        partyB: "",
        signDate: undefined,
        effectiveDate: undefined,
        expiryDate: undefined,
        paymentMethod: undefined,
        contractContent: "",
        attachments: [],
        remark: "",
      });
      formRef.value?.resetFields();
    };

    const beforeUpload: UploadProps["beforeUpload"] = (file) => {
      return false;
    };

    const handleRemove = (file: any) => {
      const index = form.attachments.indexOf(file);
      if (index > -1) {
        form.attachments.splice(index, 1);
      }
    };

    return {
      visible,
      loading,
      form,
      rules,
      formRef,
      showModal,
      handleOk,
      beforeUpload,
      handleRemove,
      paymentColumns,
      paymentColumns2,
      paymentData,
      paymentData2,
    };
  },
});
</script>
