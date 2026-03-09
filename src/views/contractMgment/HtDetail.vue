<template>
  <div>
    <div>
      <a-tabs v-model:activeKey="activeKey">
        <!-- 基本信息 开票申请信息 收款信息 外协合同 补充合同 变更信息 中标审批表 -->
        <a-tab-pane key="1" tab="基本信息">
          <div style="display: flex; align-items: center; margin-bottom: 10px">
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
            <a-row>
              <a-col :span="8">
                <a-form-item label="是否补充合同">
                  <a-select v-model:value="formData.isSupplementary">
                    <a-select-option :value="1">是</a-select-option>
                    <a-select-option :value="0">否</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="签订单位">
                  <a-input v-model:value="formData.mainUnit" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="所属项目">
                  <a-input v-model:value="formData.projectId" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="中标时间">
                  <a-date-picker
                    v-model:value="formData.winBidTime"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="中标金额">
                  <a-input v-model:value="formData.amountCollected" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="合同名称">
                  <a-input v-model:value="formData.name" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="合同编号">
                  <a-input v-model:value="formData.code" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="合同识别号">
                  <a-input v-model:value="formData.number" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="合同唯一ID">
                  <a-input v-model:value="formData.id" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="板块">
                  <!-- 计算属性 -->
                  <a-input v-model:value="typeText" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="类型一">
                  <a-input v-model:value="formData.typeOne" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="类型二">
                  <a-input v-model:value="formData.typeTwo" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="类型三">
                  <a-input v-model:value="formData.typeThree" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="承揽类型">
                  <a-input v-model:value="formData.contractType" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="业主单位">
                  <a-input v-model:value="formData.ownershipUnit" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="是否为联合体">
                  <a-select v-model:value="formData.isCombo">
                    <a-select-option :value="1">是</a-select-option>
                    <a-select-option :value="0">否</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="审定金额">
                  <a-input v-model:value="formData.auditAmount" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="生产主责单位">
                  <a-input v-model:value="formData.mainUnit" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="合同金额">
                  <a-input v-model:value="formData.amount" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="投资金额">
                  <a-input v-model:value="formData.investment" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="自主合同金额">
                  <a-input v-model:value="formData.autonomyAmount" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="合同价格类型">
                  <a-input v-model:value="formData.priceType" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="同意付款比例">
                  <a-input v-model:value="formData.paymentRatio" />
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
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="约定付款周期">
                  <a-input v-model:value="formData.paymentCycle" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="项目所在地">
                  <a-input v-model:value="formData.country" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否国外">
                  <a-select v-model:value="formData.isOverseas">
                    <a-select-option :value="1">是</a-select-option>
                    <a-select-option :value="0">否</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="签订日期">
                  <a-date-picker
                    v-model:value="formData.signTime"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="合同归属年份">
                  <a-date-picker
                    v-model:value="formData.year"
                    picker="year"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="经办人">
                  <a-input v-model:value="formData.charge" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="使用资质">
                  <a-input v-model:value="formData.qualification" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否内部合同">
                  <a-select v-model:value="formData.isInside">
                    <a-select-option :value="1">是</a-select-option>
                    <a-select-option :value="0">否</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="备注">
                  <a-input v-model:value="formData.remarks" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="是否军融">
                  <a-select v-model:value="formData.isJr">
                    <a-select-option :value="1">是</a-select-option>
                    <a-select-option :value="0">否</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="备用金">
                  <a-input v-model:value="formData.pettyCash" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="质保金">
                  <a-input v-model:value="formData.deposit" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="计划开工日期">
                  <a-date-picker
                    v-model:value="formData.plannedCommencementDate"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="计划竣工日期">
                  <a-date-picker
                    v-model:value="formData.plannedCompletionDate"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="合同总工期">
                  <a-input v-model:value="formData.totalDuration" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="实际开工日期">
                  <a-date-picker
                    v-model:value="formData.actualCommencementDate"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="实际竣工日期">
                  <a-date-picker
                    v-model:value="formData.actualCompletionDate"
                    style="width: 100%"
                  />
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
            <a-row>
              <a-col :span="8">
                <a-form-item label="是否含增值税">
                  <a-input
                    :value="formData.isSd === 0 ? '否' : '是'"
                    disabled
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="税率">
                  <a-input v-model:value="formData.taxRate" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="不含税金额">
                  <a-input v-model:value="formData.afterTaxAmount" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="登记日期">
                  <a-input
                    disabled
                    v-model:value="formData.registerTime"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="合同状态">
                  <a-input v-model:value="formData.contractState" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="进营销系统">
                  <a-select v-model:value="formData.isReport">
                    <a-select-option :value="1">是</a-select-option>
                    <a-select-option :value="0">否</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="基本信息是否已治理">
                  <a-select v-model:value="formData.basicInfoManaged">
                    <a-select-option :value="1">是</a-select-option>
                    <a-select-option :value="0">否</a-select-option>
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
              <a-col :span="8">
                <a-form-item label="上报营销系统时间">
                  <a-input
                    v-model:value="formData.auditTime"
                    disabled
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="付款方是否与业主单位一致">
                  <a-select v-model:value="formData.isEqually">
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
            <p style="margin: 0">新签合同指标分配（如无分配请忽略）</p>
          </div>
          <a-table :dataSource="dataSource1" :columns="columns1" />
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
            <p style="margin: 0">合同金额变更</p>
          </div>
          <a-table :dataSource="dataSource2" :columns="columns2" />
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
          <a-table :dataSource="dataSource3" :columns="columns3">
            <template #bodyCell="{ column }">
              <template v-if="column.dataIndex === 'attachmentType'">
                <a-select style="width: 100%">
                  <a-select-option value="合同">合同</a-select-option>
                  <a-select-option value="发票">发票</a-select-option>
                  <a-select-option value="收据">收据</a-select-option>
                  <a-select-option value="其他">其他</a-select-option>
                </a-select>
              </template>
              <template v-if="column.dataIndex === 'download'">
                <a>
                  <DownloadOutlined />
                </a>
              </template>
              <template v-if="column.dataIndex === 'view'">
                <a>
                  <EyeOutlined />
                </a>
              </template>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="开票申请信息">
          <p style="font-size: 15px; font-weight: bold">
            合计金额：{{ totalAmount }}万
          </p>
          <a-table :dataSource="dataSource4" :columns="columns4" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="收款信息">
          <p style="font-size: 15px; font-weight: bold">
            合计金额：{{ totalAmount }}万
          </p>
          <a-table :dataSource="dataSource5" :columns="columns5" />
        </a-tab-pane>
        <a-tab-pane key="4" tab="外协合同">
          <a-table :dataSource="dataSource6" :columns="columns6" />
        </a-tab-pane>
        <a-tab-pane key="5" tab="补充合同">
          <a-table :dataSource="dataSource7" :columns="columns7" />
        </a-tab-pane>
        <a-tab-pane key="6" tab="变更信息">
          <a-table :dataSource="dataSource8" :columns="columns8" />
        </a-tab-pane>
        <a-tab-pane key="7" tab="中标审批表">
          <a-button type="primary"> 导出pdf </a-button>
          <p>预览</p>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons-vue";
import getData from "@/network";
import dayjs from "dayjs";

const activeKey = ref("1");
const dataSource1 = ref([]);
const dataSource2 = ref([]);
const dataSource8 = ref([]);
const route = useRoute();
const contractId = ref(route.params.id);
const contractName = ref(route.params.name);
const totalAmount = 100;

const formData = ref({
  isSupplementary: 0,
  mainUnit: "",
  projectId: "",
  bidTime: null,
  bidAmount: "",
  name: "",
  code: "",
  number: "",
  uniqueNumber: "",
  id: "",
  type: "",
  typeOne: "",
  typeTwo: "",
  typeThree: "",
  contractType: "",
  ownershipUnit: "",
  productionMainUnit: "",
  isEqually: 1,
  isConsortium: 0,
  amount: "",
  investmentAmount: "",
  autonomousContractAmount: "",
  priceType: "",
  paymentRatio: "",
  isFramework: 0,
  paymentCycle: "",
  country: "",
  isOverseas: 0,
  signTime: null,
  year: null,
  charge: "",
  qualification: "",
  isInside: 0,
  remark: "",
  isJr: 0,
  reserveFund: "",
  warrantyFund: "",
  plannedCommencementDate: null,
  plannedCompletionDate: null,
  totalDuration: "",
  actualCommencementDate: null,
  actualCompletionDate: null,
  ifPush: 0,
  isIncludeVat: 1,
  taxRate: "",
  amountWithoutTax: "",
  registrationDate: null,
  status: 1,
  isReport: 0,
  basicInfoManaged: 0,
  isArchived: 0,
  reportMarketingSystemTime: null,
  auditAmount: "",
});
const typeMap = {
  0: "国内",
  1: "外协",
  2: "海外",
  4: "其他经营类收款",
  5: "其他经营类付款",
};
const typeText = computed(() => {
  return typeMap[formData.value.type] || "未知类型";
});
// 类型,承担单位,年份,新签合同指标额,合同收款指标额
const columns1 = [
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "承担单位",
    dataIndex: "unit",
    key: "unit",
  },
  {
    title: "年份",
    dataIndex: "year",
    key: "year",
  },
  {
    title: "新签合同指标额",
    dataIndex: "newSignAmount",
    key: "newSignAmount",
  },
  {
    title: "合同收款指标额",
    dataIndex: "collectionAmount",
    key: "collectionAmount",
  },
];
// 变更依据，备案审查表，变更金额(万)，日期，操作人
const columns2 = [
  {
    title: "变更依据",
    dataIndex: "changeBasis",
    key: "changeBasis",
  },
  {
    title: "备案审查表",
    dataIndex: "recordReviewTable",
    key: "recordReviewTable",
  },
  {
    title: "变更金额(万)",
    dataIndex: "changeAmount",
    key: "changeAmount",
  },
  {
    title: "日期",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "操作人",
    dataIndex: "operator",
    key: "operator",
  },
];
//附件类型，附件名称，下载，查看

const columns3 = [
  {
    title: "附件类型",
    dataIndex: "attachmentType",
    key: "attachmentType",
    width: 220,
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
    width: 120,
  },
  {
    title: "查看",
    dataIndex: "view",
    key: "view",
    width: 120,
  },
];
const dataSource3 = [
  {
    attachmentType: "合同",
    attachmentName: "合同.pdf",
    download: "下载",
    view: "查看",
  },
];
//申请单号,申请日期,申请人,付款单位,申请金额(万元)
const columns4 = [
  {
    title: "申请单号",
    dataIndex: "applyNo",
    key: "applyNo",
  },
  {
    title: "申请日期",
    dataIndex: "applyTime",
    key: "applyTime",
  },
  {
    title: "申请人",
    dataIndex: "applicant",
    key: "applicant",
  },
  {
    title: "付款单位",
    dataIndex: "buyerDepartmentId",
    key: "buyerDepartmentId",
  },
  {
    title: "申请金额(万元)",
    dataIndex: "totalApplyAmount",
    key: "totalApplyAmount",
  },
];
const dataSource4 = ref([]);
//认领单编号 到款日期 认领金额(万元) 认领单位 经办人 认领状态 付款单位 摘要
const columns5 = [
  {
    title: "认领单编号",
    dataIndex: "billNo",
    key: "billNo",
  },
  {
    title: "到款日期",
    dataIndex: "claimTime",
    key: "claimTime",
  },
  {
    title: "认领金额(万元)",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "认领单位",
    dataIndex: "claimerDepartment",
    key: "claimerDepartment",
  },
  {
    title: "经办人",
    dataIndex: "claimer",
    key: "claimer",
  },
  {
    title: "认领状态",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "付款单位",
    dataIndex: "buyerDepartment",
    key: "buyerDepartment",
  },
  {
    title: "摘要",
    dataIndex: "remark",
    key: "remark",
  },
];
const dataSource5 = ref([]);
//外协合同编号，外协合同名称，合同金额（万元），累计支付金额（万元），外协单位
const columns6 = [
  {
    title: "外协合同编号",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "外协合同名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "合同金额（万元）",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "累计支付金额（万元）",
    dataIndex: "auditAmount",
    key: "auditAmount",
  },
  {
    title: "外协单位",
    dataIndex: "customer",
    key: "customer",
  },
];
const dataSource6 = ref([]);
//补充合同编号，补充合同名称，合同金额（万元）
const columns7 = [
  {
    title: "补充合同编号",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "补充合同名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "合同金额（万元）",
    dataIndex: "amount",
    key: "amount",
  },
];
const dataSource7 = ref([]);
//变更日期，变更人，变更项，变更前金额（万），变更后金额（万），变更前，变更后
const columns8 = [
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
    title: "变更前金额（万）",
    dataIndex: "changeBeforeAmount",
    key: "changeBeforeAmount",
  },
  {
    title: "变更后金额（万）",
    dataIndex: "changeAfterAmount",
    key: "changeAfterAmount",
  },
  {
    title: "变更前",
    dataIndex: "changeBefore",
    key: "changeBefore",
  },
  {
    title: "变更后",
    dataIndex: "changeAfter",
    key: "changeAfter",
  },
];
onMounted(() => {
  contractinfo();
});
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      contractId.value = newId;
      contractinfo();
    }
  },
);
const contractinfo = async () => {
  const res = await getData("contract/GetContractDetailsById", {
    contractId: String(contractId.value),
  });
  //合同基础信息+
  const data = res.data.result.contractDetails;
  const data1 = res.data.result.contractInfo;
  //开票
  const data2 = res.data.result.invoiceApplyList;
  //收款信息
  const data3 = res.data.result.billInfoList;
  //外协合同
  const data4 = res.data.result.outsourcingContractInfoList;
  //补充合同
  const data5 = res.data.result.supplementContractInfoList;
  // 转换日期字段为 dayjs 对象
  if (data1) {
    if (data1.signTime) data1.signTime = dayjs(data1.signTime);
    if (data1.plannedCommencementDate)
      data1.plannedCommencementDate = dayjs(data1.plannedCommencementDate);
    if (data1.plannedCompletionDate)
      data1.plannedCompletionDate = dayjs(data1.plannedCompletionDate);
    if (data1.actualCommencementDate)
      data1.actualCommencementDate = dayjs(data1.actualCommencementDate);
    if (data1.actualCompletionDate)
      data1.actualCompletionDate = dayjs(data1.actualCompletionDate);
    if (data1.registrationDate)
      data1.registrationDate = dayjs(data1.registrationDate);
    if (data1.reportMarketingSystemTime)
      data1.reportMarketingSystemTime = dayjs(data1.reportMarketingSystemTime);
    if (data1.year) data1.year = dayjs(String(data1.year));
  }

  formData.value = {
    ...data1,
    ...data,
    winBidTime: data?.winBidTime ? dayjs(data.winBidTime) : null,
    // auditTime: data?.auditTime ? dayjs(data.auditTime) : null,
  };
  dataSource4.value = data2;
  dataSource5.value = data3;
  dataSource6.value = data4;
  dataSource7.value = data5;
  // console.log(JSON.stringify(dataSource4.value));

  console.log("合同数据", data, data1);
};
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
</style>
