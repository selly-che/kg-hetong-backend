<template>
  <div>
    <!-- <a-breadcrumb>
      <a-breadcrumb-item
        ><a href="/contractMgment/internal">内部合同</a></a-breadcrumb-item
      >
      <a-breadcrumb-item><a href="">合同详情</a></a-breadcrumb-item>
    </a-breadcrumb> -->
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
                  <a-select>
                    <a-select-option value="是">是</a-select-option>
                    <a-select-option value="否">否</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="签订单位">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="所属项目">
                  <a-input />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="中标时间">
                  <a-date-picker style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="中标金额">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="合同名称">
                  <a-input />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="合同编号">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="合同识别号">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="合同唯一ID">
                  <a-input />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="板块">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="类型一">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="类型二">
                  <a-input />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="类型三">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="承揽类型">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="业主单位">
                  <a-input />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="生产主责单位">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="付款方是否与业主单位一致">
                  <a-select>
                    <a-select-option value="是">是</a-select-option>
                    <a-select-option value="否">否</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否为联合体">
                  <a-select>
                    <a-select-option value="是">是</a-select-option>
                    <a-select-option value="否">否</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="合同金额">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="投资金额">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="自主合同金额">
                  <a-input />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="合同价格类型">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="同意付款比例">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否框架合同">
                  <a-select>
                    <a-select-option value="是">是</a-select-option>
                    <a-select-option value="否">否</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="约定付款周期">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="项目所在地">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否国外">
                  <a-select>
                    <a-select-option value="是">是</a-select-option>
                    <a-select-option value="否">否</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="签订日期">
                  <a-date-picker style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="合同归属年份">
                  <a-date-picker picker="year" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="经办人">
                  <a-input />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="使用资质">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否内部合同">
                  <a-select>
                    <a-select-option value="是">是</a-select-option>
                    <a-select-option value="否">否</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="备注">
                  <a-input />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="是否军融">
                  <a-select>
                    <a-select-option value="是">是</a-select-option>
                    <a-select-option value="否">否</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="备用金">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="质保金">
                  <a-input />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="计划开工日期">
                  <a-date-picker style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="计划竣工日期">
                  <a-date-picker style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="合同总工期">
                  <a-input />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="实际开工日期">
                  <a-date-picker style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="实际竣工日期">
                  <a-date-picker style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否推送司库">
                  <a-select>
                    <a-select-option value="是">是</a-select-option>
                    <a-select-option value="否">否</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="是否含增值税">
                  <a-select>
                    <a-select-option value="是">是</a-select-option>
                    <a-select-option value="否">否</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="税率">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="不含税金额">
                  <a-input />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="登记日期">
                  <a-date-picker style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="合同状态">
                  <a-select>
                    <a-select-option value="草稿">草稿</a-select-option>
                    <a-select-option value="审批中">审批中</a-select-option>
                    <a-select-option value="已生效">已生效</a-select-option>
                    <a-select-option value="已终止">已终止</a-select-option>
                    <a-select-option value="已完成">已完成</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="进营销系统">
                  <a-input />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="基本信息是否已治理">
                  <a-select>
                    <a-select-option value="是">是</a-select-option>
                    <a-select-option value="否">否</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否封存">
                  <a-select>
                    <a-select-option value="是">是</a-select-option>
                    <a-select-option value="否">否</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="上报营销系统时间">
                  <a-date-picker show-time style="width: 100%" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-item label="审定金额">
                  <a-input />
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons-vue";

const route = useRoute();
const contractId = ref(route.params.id);
const contractName = ref(route.params.name);
const totalAmount = 100;
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
    dataIndex: "applicationNumber",
    key: "applicationNumber",
  },
  {
    title: "申请日期",
    dataIndex: "applicationDate",
    key: "applicationDate",
  },
  {
    title: "申请人",
    dataIndex: "applicant",
    key: "applicant",
  },
  {
    title: "付款单位",
    dataIndex: "paymentUnit",
    key: "paymentUnit",
  },
  {
    title: "申请金额(万元)",
    dataIndex: "applicationAmount",
    key: "applicationAmount",
  },
];
//认领单编号 到款日期 认领金额(万元) 认领单位 经办人 认领状态 付款单位 摘要
const columns5 = [
  {
    title: "认领单编号",
    dataIndex: "claimNumber",
    key: "claimNumber",
  },
  {
    title: "到款日期",
    dataIndex: "paymentDate",
    key: "paymentDate",
  },
  {
    title: "认领金额(万元)",
    dataIndex: "claimAmount",
    key: "claimAmount",
  },
  {
    title: "认领单位",
    dataIndex: "claimUnit",
    key: "claimUnit",
  },
  {
    title: "经办人",
    dataIndex: "agent",
    key: "agent",
  },
  {
    title: "认领状态",
    dataIndex: "claimStatus",
    key: "claimStatus",
  },
  {
    title: "付款单位",
    dataIndex: "paymentUnit",
    key: "paymentUnit",
  },
  {
    title: "摘要",
    dataIndex: "abstract",
    key: "abstract",
  },
];
//外协合同编号，外协合同名称，合同金额（万元），累计支付金额（万元），外协单位
const columns6 = [
  {
    title: "外协合同编号",
    dataIndex: "outsourcingContractNumber",
    key: "outsourcingContractNumber",
  },
  {
    title: "外协合同名称",
    dataIndex: "outsourcingContractName",
    key: "outsourcingContractName",
  },
  {
    title: "合同金额（万元）",
    dataIndex: "contractAmount",
    key: "contractAmount",
  },
  {
    title: "累计支付金额（万元）",
    dataIndex: "cumulativePaymentAmount",
    key: "cumulativePaymentAmount",
  },
  {
    title: "外协单位",
    dataIndex: "outsourcingUnit",
    key: "outsourcingUnit",
  },
];
//补充合同编号，补充合同名称，合同金额（万元）
const columns7 = [
  {
    title: "补充合同编号",
    dataIndex: "supplementContractNumber",
    key: "supplementContractNumber",
  },
  {
    title: "补充合同名称",
    dataIndex: "supplementContractName",
    key: "supplementContractName",
  },
  {
    title: "合同金额（万元）",
    dataIndex: "contractAmount",
  },
];
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
  console.log(contractId.value);
  console.log(contractName.value);
});
</script>

<style lang="less" scoped></style>
