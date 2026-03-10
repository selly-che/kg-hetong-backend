<template>
  <div>
    <a-tabs v-model:activeKey="activeKey" @change="handleTabChange">
      <a-tab-pane key="1" tab="基本信息">
        <div
          style="
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            margin-top: 10px;
          "
        >
          <div
            style="
              width: 4px;
              height: 18px;
              background-color: #1890ff;
              margin-right: 8px;
            "
          ></div>
          <p style="margin: 0">基本信息</p>
        </div>
        <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }">
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item label="主合同">
                <a-input v-model:value="formData.mainContract"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="所属项目">
                <a-input v-model:value="formData.project"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="外协类型">
                <a-input v-model:value="formData.outsourcingType"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item label="合同名称">
                <a-input v-model:value="formData.name"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="合同编号">
                <a-input v-model:value="formData.code"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="合同识别号">
                <a-input v-model:value="formData.number"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item label="合同唯一ID">
                <a-input v-model:value="formData.uniqueNumber"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="主合同编号">
                <a-input v-model:value="formData.mainContractNumber"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="主合同承揽类型">
                <a-input v-model:value="formData.contractType"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item label="主合同金额">
                <a-input-number
                  style="width: 100%"
                  v-model:value="formData.amount"
                ></a-input-number>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="主合同累计收款">
                <a-input-number
                  style="width: 100%"
                  v-model:value="formData.mainContractReceivedAmount"
                ></a-input-number>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="主合同板块">
                <a-input v-model:value="formData.section"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item label="外协单位">
                <a-input v-model:value="formData.outsourcingUnit"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="主合同类型一">
                <a-input v-model:value="formData.typeOne"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="其他开票单位">
                <a-input v-model:value="formData.invoiceEntity"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item label="外协主责单位">
                <a-input v-model:value="formData.ownershipUnit"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="生产主责单位">
                <a-input v-model:value="formData.mainUnit"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="性质">
                <a-input v-model:value="formData.properties"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item label="经办人">
                <a-input v-model:value="formData.charge"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="外协合同金额">
                <a-input-number
                  style="width: 100%"
                  v-model:value="formData.outsourcingContractAmount"
                ></a-input-number>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="合同价格类型">
                <a-input v-model:value="formData.priceType"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item label="同意付款比例">
                <a-input-number
                  style="width: 100%"
                  :min="0"
                  :max="100"
                  v-model:value="formData.paymentRatio"
                ></a-input-number>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="归属年份">
                <a-date-picker
                  style="width: 100%"
                  picker="year"
                  value-format="YYYY"
                  v-model:value="formData.year"
                ></a-date-picker>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="约定付款周期">
                <a-input v-model:value="formData.paymentCycle"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item label="签订日期">
                <a-date-picker
                  style="width: 100%"
                  v-model:value="formData.signTime"
                  value-format="YYYY-MM-DD HH:mm:ss"
                ></a-date-picker>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="业务范围">
                <a-input v-model:value="formData.businessScope"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="计划开工日期">
                <a-date-picker
                  style="width: 100%"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  v-model:value="formData.plannedCommencementDate"
                ></a-date-picker>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item label="计划竣工日期">
                <a-date-picker
                  style="width: 100%"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  v-model:value="formData.plannedCompletionDate"
                ></a-date-picker>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="合同总工期">
                <a-input-number
                  style="width: 100%"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  v-model:value="formData.totalDuration"
                ></a-input-number>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="实际开工日期">
                <a-date-picker
                  style="width: 100%"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  v-model:value="formData.actualCommencementDate"
                ></a-date-picker>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item label="实际竣工日期">
                <a-date-picker
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                  v-model:value="formData.actualCompletionDate"
                ></a-date-picker>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="是否框架合同">
                <a-select v-model:value="formData.isFramework">
                  <a-select-option :value="1">是</a-select-option>
                  <a-select-option :value="0">否</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="项目部">
                <a-input v-model:value="formData.projectDept"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item label="省份">
                <a-input v-model:value="formData.province"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="备注">
                <a-input v-model:value="formData.remarks"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="登记日期">
                <a-date-picker
                  style="width: 100%"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  v-model:value="formData.registerTime"
                ></a-date-picker>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item label="主合同相应阶段完成天数">
                <a-input-number
                  style="width: 100%"
                  v-model:value="formData.mainContractStageDays"
                ></a-input-number>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="基本信息是否已治理">
                <a-select v-model:value="formData.basicInfoManaged">
                  <a-select-option :value="1">是</a-select-option>
                  <a-select-option :value="0">否</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="是否推送司库">
                <a-select v-model:value="formData.ifPush">
                  <a-select-option :value="1">是</a-select-option>
                  <a-select-option :value="0">否</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item label="合同状态">
                <a-select v-model:value="formData.contractState">
                  <a-select-option value="已签订">已签订</a-select-option>
                  <a-select-option value="已完成">已完成</a-select-option>
                  <a-select-option value="履行中">履行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="是否封存">
                <a-select v-model:value="formData.isArchived">
                  <a-select-option :value="1">是</a-select-option>
                  <a-select-option :value="0">否</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div
          style="
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            margin-top: 10px;
          "
        >
          <div
            style="
              width: 4px;
              height: 18px;
              background-color: #1890ff;
              margin-right: 8px;
            "
          ></div>
          <p style="margin: 0">支付申请</p>
        </div>
        <a-table :columns="columns1" :data-source="data1"></a-table>
        <div
          style="
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            margin-top: 10px;
          "
        >
          <div
            style="
              width: 4px;
              height: 18px;
              background-color: #1890ff;
              margin-right: 8px;
            "
          ></div>
          <p style="margin: 0">上传附件</p>
        </div>
        <a-table :columns="columns2" :data-source="data2"></a-table>
        <div
          style="
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            margin-top: 10px;
          "
        >
          <div
            style="
              width: 4px;
              height: 18px;
              background-color: #1890ff;
              margin-right: 8px;
            "
          ></div>
          <p style="margin: 0">审核意见</p>
        </div>
        <div class="timeline">
          <a-timeline>
            <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
            <a-timeline-item
              >Solve initial network problems 2015-09-01</a-timeline-item
            >
            <a-timeline-item color="red">
              <template #dot
                ><clock-circle-outlined style="font-size: 16px"
              /></template>
              Technical testing 2015-09-01
            </a-timeline-item>
            <a-timeline-item
              >Network problems being solved 2015-09-01</a-timeline-item
            >
          </a-timeline>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="付款信息" force-render>
        <span>累计付款金额：{{ 1000 }}</span>
        <span>剩余付款金额：{{ 1000 }}</span>
        <a-table :columns="columns3" :data-source="data3"></a-table>
      </a-tab-pane>
      <a-tab-pane key="3" tab="变更信息">
        <span>变更信息</span>
        <a-table :columns="columns4" :data-source="data4"></a-table>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ClockCircleOutlined } from "@ant-design/icons-vue";
import getData from "@/network";
import dayjs from "dayjs";
import { useRoute } from "vue-router";

const activeKey = ref("1"); //tab切换
const route = useRoute();
const contractId = ref(route.params.id);
const formData = ref({
  mainContract: "",
  project: "",
  outsourcingType: "",
  name: "",
  code: "",
  number: "",
  uniqueNumber: "",
  mainContractNumber: "",
  contractType: "",
  amount: undefined,
  mainContractReceivedAmount: undefined,
  section: "",
  outsourcingUnit: "",
  typeOne: "",
  invoiceEntity: "",
  ownershipUnit: "",
  mainUnit: "",
  properties: "",
  charge: "",
  outsourcingContractAmount: undefined,
  priceType: "",
  paymentRatio: undefined,
  year: undefined as string | undefined,
  paymentCycle: "",
  signTime: undefined as string | undefined,
  businessScope: "",
  plannedCommencementDate: undefined as string | undefined,
  plannedCompletionDate: undefined as string | undefined,
  totalDuration: undefined,
  actualCommencementDate: undefined as string | undefined,
  actualCompletionDate: undefined as string | undefined,
  isFramework: 0,
  projectDept: "",
  province: "",
  remarks: "",
  registerTime: undefined as string | undefined,
  mainContractStageDays: undefined,
  basicInfoManaged: 0,
  ifPush: 0,
  contractState: "",
  isArchived: 0,
});

const handleTabChange = (key: string) => {
  console.log(key, "tab切换");

  activeKey.value = key;
};

//申请日期，经办人，申请金额，备注
const columns1 = ref([
  {
    title: "申请日期",
    dataIndex: "applyDate",
    key: "applyDate",
  },
  {
    title: "经办人",
    dataIndex: "agent",
    key: "agent",
  },
  {
    title: "申请金额",
    dataIndex: "applyAmount",
    key: "applyAmount",
  },
  {
    title: "备注",
    dataIndex: "remark",
    key: "remark",
  },
]);
const data1 = ref([]);
//附件类型，附件名称，下载，查看
const columns2 = ref([
  {
    title: "附件类型",
    dataIndex: "attachmentType",
    key: "attachmentType",
  },
  {
    title: "附件名称",
    dataIndex: "attachmentName",
    key: "attachmentName",
  },
  {
    title: "下载",
    dataIndex: "download",
    key: "download",
  },
  {
    title: "查看",
    dataIndex: "view",
    key: "view",
  },
]);
const data2 = ref([]);
//序号，付款日期，付款金额（万元）
const columns3 = ref([
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "付款日期",
    dataIndex: "paymentDate",
    key: "paymentDate",
  },
  {
    title: "付款金额（万元）",
    dataIndex: "paymentAmount",
    key: "paymentAmount",
  },
]);
const data3 = ref([
  {
    index: 1,
    paymentDate: "2023-01-01",
    paymentAmount: 1000,
  },
]);
//变更日期，变更人，变更项，变跟前金额（万），变更后金额（万），变跟前，变更后
const columns4 = ref([
  {
    title: "变更日期",
    dataIndex: "changeDate",
    key: "changeDate",
  },
  {
    title: "变更人",
    dataIndex: "changer",
    key: "changer",
  },
  {
    title: "变更项",
    dataIndex: "changeItem",
    key: "changeItem",
  },
  {
    title: "变跟前金额（万）",
    dataIndex: "beforeChangeAmount",
    key: "beforeChangeAmount",
  },
  {
    title: "变更后金额（万）",
    dataIndex: "afterChangeAmount",
    key: "afterChangeAmount",
  },
  {
    title: "变跟前",
    dataIndex: "beforeChange",
    key: "beforeChange",
  },
  {
    title: "变更后",
    dataIndex: "afterChange",
    key: "afterChange",
  },
]);
const data4 = ref([
  {
    changeDate: "2023-01-01",
    changer: "张三",
    changeItem: "付款金额",
    beforeChangeAmount: 1000,
    afterChangeAmount: 2000,
    beforeChange: "1000",
    afterChange: "2000",
  },
]);

const loadContractData = async () => {
  const res = await getData("contract/GetContractDetailsById", {
    contractId: String(contractId.value),
  });
  const data = res.data.result.contractDetails;
  const data1 = res.data.result.contractInfo;
  console.log(data, data1, "合同详情数据");
  formData.value = {
    ...data,
    ...data1,
  };
  formData.value.year = dayjs(String(formData.value.year)).format("YYYY");
  formData.value.signTime = dayjs(String(formData.value.signTime)).format(
    "YYYY-MM-DD HH:mm:ss",
  );
  formData.value.plannedCommencementDate = dayjs(
    String(formData.value.plannedCommencementDate),
  ).format("YYYY-MM-DD HH:mm:ss");
  formData.value.plannedCompletionDate = dayjs(
    String(formData.value.plannedCompletionDate),
  ).format("YYYY-MM-DD HH:mm:ss");
  formData.value.actualCommencementDate = dayjs(
    String(formData.value.actualCommencementDate),
  ).format("YYYY-MM-DD HH:mm:ss");
  formData.value.actualCompletionDate = dayjs(
    String(formData.value.actualCompletionDate),
  ).format("YYYY-MM-DD HH:mm:ss");
  formData.value.registerTime = dayjs(
    String(formData.value.registerTime),
  ).format("YYYY-MM-DD HH:mm:ss");
  console.log(formData.value, "formDataformData");
};

onMounted(async () => {
  loadContractData();
});

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      contractId.value = newId;
      loadContractData();
    }
  },
);
</script>

<style lang="less" scoped>
:deep(.ant-table) {
  background-color: #ffffff;
}

:deep(.ant-table-container) {
  background-color: #ffffff;
}

:deep(.ant-table-tbody) {
  background-color: #ffffff;
}

:deep(.ant-table-thead > tr > th) {
  background-color: #ffffff;
}

:deep(.ant-table-tbody > tr > td) {
  background-color: #ffffff;
}

:deep(.ant-table-tbody > tr:hover > td) {
  background-color: #ffffff;
}

.timeline {
  padding: 12px;
  background-color: #ffffff;
}
</style>
