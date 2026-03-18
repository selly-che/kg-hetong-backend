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
          <div class="formback">
            <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }">
              <a-row>
                <a-col :span="8">
                  <a-form-item label="是否补充合同">
                    <a-select v-model:value="formData.isSupplementary" disabled>
                      <a-select-option :value="1">是</a-select-option>
                      <a-select-option :value="0">否</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="签订单位">
                    <a-input v-model:value="formData.mainUnit" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="所属项目">
                    <a-input v-model:value="formData.projectId" disabled />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <a-form-item label="中标时间">
                    <a-date-picker
                      placeholder="请选择中标时间"
                      v-model:value="formData.winBidTime"
                      style="width: 100%"
                      disabled
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="中标金额">
                    <a-input
                      v-model:value="formData.amountCollected"
                      disabled
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="合同名称">
                    <a-input v-model:value="formData.name" disabled />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <a-form-item label="合同编号">
                    <a-input v-model:value="formData.code" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="合同识别号">
                    <a-input v-model:value="formData.number" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="合同唯一ID">
                    <a-input v-model:value="formData.id" disabled />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <a-form-item label="板块">
                    <!-- 计算属性 -->
                    <a-input v-model:value="typeText" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="类型一">
                    <a-input v-model:value="formData.typeOne" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="类型二">
                    <a-input v-model:value="formData.typeTwo" disabled />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <a-form-item label="类型三">
                    <a-input v-model:value="formData.typeThree" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="承揽类型">
                    <a-input v-model:value="formData.contractType" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="业主单位">
                    <a-input v-model:value="formData.ownershipUnit" disabled />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <a-form-item label="是否为联合体">
                    <a-select v-model:value="formData.isCombo" disabled>
                      <a-select-option :value="1">是</a-select-option>
                      <a-select-option :value="0">否</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="审定金额">
                    <a-input v-model:value="formData.auditAmount" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="生产主责单位">
                    <a-input v-model:value="formData.mainUnit" disabled />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <a-form-item label="合同金额">
                    <a-input v-model:value="formData.amount" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="投资金额">
                    <a-input v-model:value="formData.investment" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="自主合同金额">
                    <a-input v-model:value="formData.autonomyAmount" disabled />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <a-form-item label="合同价格类型">
                    <a-input v-model:value="formData.priceType" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="同意付款比例">
                    <a-input v-model:value="formData.paymentRatio" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="是否框架合同">
                    <a-select v-model:value="formData.isFramework" disabled>
                      <a-select-option :value="1">是</a-select-option>
                      <a-select-option :value="0">否</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <a-form-item label="约定付款周期">
                    <a-input v-model:value="formData.paymentCycle" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="项目所在地">
                    <a-input v-model:value="formData.country" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="是否国外">
                    <a-select v-model:value="formData.isOverseas" disabled>
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
                      placeholder="请选择签订日期"
                      v-model:value="formData.signTime"
                      style="width: 100%"
                      disabled
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="合同归属年份">
                    <a-date-picker
                      placeholder="请选择合同归属年份"
                      v-model:value="formData.year"
                      picker="year"
                      style="width: 100%"
                      disabled
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="经办人">
                    <a-input v-model:value="formData.charge" disabled />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <a-form-item label="使用资质">
                    <a-input v-model:value="formData.qualification" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="是否内部合同">
                    <a-select v-model:value="formData.isInside" disabled>
                      <a-select-option :value="1">是</a-select-option>
                      <a-select-option :value="0">否</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="备注">
                    <a-input v-model:value="formData.remarks" disabled />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <a-form-item label="是否军融">
                    <a-select v-model:value="formData.isJr" disabled>
                      <a-select-option :value="1">是</a-select-option>
                      <a-select-option :value="0">否</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="备用金">
                    <a-input v-model:value="formData.pettyCash" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="质保金">
                    <a-input v-model:value="formData.deposit" disabled />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <a-form-item label="计划开工日期">
                    <a-date-picker
                      v-model:value="formData.plannedCommencementDate"
                      style="width: 100%"
                      disabled
                      placeholder="请选择计划开工日期"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="计划竣工日期">
                    <a-date-picker
                      v-model:value="formData.plannedCompletionDate"
                      style="width: 100%"
                      placeholder="请选择计划竣工日期"
                      disabled
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="合同总工期">
                    <a-input v-model:value="formData.totalDuration" disabled />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <a-form-item label="实际开工日期">
                    <a-date-picker
                      v-model:value="formData.actualCommencementDate"
                      style="width: 100%"
                      disabled
                      placeholder="请选择实际开工日期"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="实际竣工日期">
                    <a-date-picker
                      v-model:value="formData.actualCompletionDate"
                      style="width: 100%"
                      placeholder="请选择实际竣工日期"
                      disabled
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="是否推送司库">
                    <a-select v-model:value="formData.ifPush" disabled>
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
                    <a-input v-model:value="formData.taxRate" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="不含税金额">
                    <a-input v-model:value="formData.afterTaxAmount" disabled />
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
                    <a-input v-model:value="formData.contractState" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="进营销系统">
                    <a-select v-model:value="formData.isReport" disabled>
                      <a-select-option :value="1">是</a-select-option>
                      <a-select-option :value="0">否</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <a-form-item label="基本信息是否已治理">
                    <a-select
                      v-model:value="formData.basicInfoManaged"
                      disabled
                    >
                      <a-select-option :value="1">是</a-select-option>
                      <a-select-option :value="0">否</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="是否封存">
                    <a-select v-model:value="formData.isArchived" disabled>
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
                    <a-select v-model:value="formData.isEqually" disabled>
                      <a-select-option :value="1">是</a-select-option>
                      <a-select-option :value="0">否</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </div>
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
          <div style="display: flex">
            <p style="font-size: 15px; font-weight: bold; padding-top: 5px">
              合计金额：{{ totalAmount }}万
            </p>
            <a-button
              type="primary"
              style="margin-left: auto"
              @click="showModal"
            >
              新增
            </a-button>
            <a-modal
              v-model:visible="visible"
              title="新增收款数据"
              ok-text="确认"
              cancel-text="取消"
              @ok="handleOk"
            >
              <a-form
                :label-col="{ style: { width: '100px' } }"
                :wrapper-col="{ style: { flex: 1 } }"
              >
                <!-- 认领单编号	到款日期	认领金额(万元)	认领单位	经办人	认领状态	付款单位	摘要 -->
                <a-form-item label="认领单编号">
                  <a-input v-model:value="billList.billNo" />
                </a-form-item>
                <a-form-item label="到款日期">
                  <a-date-picker
                    v-model:value="billList.claimTime"
                    style="width: 100%"
                  />
                </a-form-item>
                <a-form-item label="认领金额(万元)">
                  <a-input v-model:value="billList.amount" />
                </a-form-item>
                <a-form-item label="认领单位">
                  <a-input v-model:value="billList.claimerDepartment" />
                </a-form-item>
                <a-form-item label="经办人">
                  <a-input v-model:value="billList.claimer" />
                </a-form-item>
                <a-form-item label="认领状态">
                  <a-select
                    v-model:value="billList.approvalStatus"
                    style="width: 100%"
                  >
                    <a-select-option value="0">待认领</a-select-option>
                    <a-select-option value="1">已认领</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="付款单位">
                  <a-input v-model:value="billList.buyerDepartment" />
                </a-form-item>
                <a-form-item label="摘要">
                  <a-input v-model:value="billList.remark" />
                </a-form-item>
              </a-form>
            </a-modal>
            <a-modal
              v-model:visible="visible2"
              title="新增收款数据"
              ok-text="确认"
              cancel-text="取消"
              @ok="handleOk2"
            >
              <a-form
                :label-col="{ style: { width: '100px' } }"
                :wrapper-col="{ style: { flex: 1 } }"
              >
                <a-form-item label="认领单编号">
                  <a-input v-model:value="billList.billNo" />
                </a-form-item>
                <a-form-item label="到款日期">
                  <a-date-picker
                    v-model:value="billList.claimTime"
                    style="width: 100%"
                  />
                </a-form-item>
                <a-form-item label="认领金额(万元)">
                  <a-input v-model:value="billList.amount" />
                </a-form-item>
                <a-form-item label="认领单位">
                  <a-input v-model:value="billList.claimerDepartment" />
                </a-form-item>
                <a-form-item label="经办人">
                  <a-input v-model:value="billList.claimer" />
                </a-form-item>
                <a-form-item label="认领状态">
                  <a-select
                    v-model:value="billList.approvalStatus"
                    style="width: 100%"
                  >
                    <a-select-option value="0">待认领</a-select-option>
                    <a-select-option value="1">已认领</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="付款单位">
                  <a-input v-model:value="billList.buyerDepartment" />
                </a-form-item>
                <a-form-item label="摘要">
                  <a-input v-model:value="billList.remark" />
                </a-form-item>
              </a-form>
            </a-modal>
          </div>
          <a-table :dataSource="dataSource5" :columns="columns5">
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'operation'">
                <div style="display: flex; gap: 8px">
                  <a-button
                    type="primary"
                    @click="editBill(record)"
                    v-show="record.source === 2"
                    >编辑</a-button
                  >
                  <a-popconfirm
                    title="确认删除吗？"
                    ok-text="是"
                    cancel-text="否"
                    @confirm="deleteBill(record.id)"
                  >
                    <a-button type="danger" v-show="record.source === 2"
                      >删除</a-button
                    >
                  </a-popconfirm>
                </div>
              </template>
            </template>
          </a-table>
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
import { ElMessage } from "element-plus";

const activeKey = ref("1");
const dataSource1 = ref([]);
const dataSource2 = ref([]);
const dataSource8 = ref([]);
const route = useRoute();
const contractId = ref(route.params.id);
const contractName = ref(route.params.name);
const totalAmount = 100;
const visible = ref(false);
const visible2 = ref(false);

const showModal = () => {
  visible.value = true;
  billList.value = {
    accumulatedInvoicingAmount: 0,
    amount: 0,
    approvalStatus: 0,
    approvalWorkflowNode: 0,
    bankAccount: "",
    billNo: "",
    billType: 0,
    bizType: 0,
    buyerDepartment: "",
    buyerDepartmentId: "",
    claimTime: "",
    claimWithoutInvoicing: 0,
    claimer: "",
    claimerAccount: "",
    claimerDepartment: "",
    claimerDepartmentId: 0,
    contractId: "",
    createTime: "",
    createUserId: "",
    createUserName: "",
    documentNumber: "",
    id: "",
    isDeleted: 0, //
    isSend: 0, //
    isZbj: 0,
    modifyTime: "",
    modifyUserId: "",
    modifyUserName: "",
    nextReviewer: "",
    payId: "",
    payTime: "",
    payType: 0,
    paymentReceiptNumber: "",
    remark: "",
    status: 0,
    version: 0,
    year: 0,
  };
};
const xzform = async (newBillList) => {
  const res = await getData("zhangdan/Save", newBillList);
  if (res.data.code === 200) {
    ElMessage.success("成功");
    getBillList();
  } else {
    ElMessage.error(res.msg || "失败");
  }
  console.log("新增res:", res);
};
//新增账单
const handleOk = (e) => {
  visible.value = false;
  const newBillList = {
    ...billList.value,
    claimTime: billList.value.claimTime
      ? billList.value.claimTime.format("YYYY-MM-DD HH:mm:ss")
      : "",
  };
  console.log("新增数据", newBillList);
  xzform(newBillList);
  //刷新数据
  contractinfo();
};
//编辑账单
const handleOk2 = () => {
  visible2.value = false;
  const newBillList = {
    ...billList.value,
    claimTime: billList.value.claimTime
      ? billList.value.claimTime.format("YYYY-MM-DD HH:mm:ss")
      : null,
  };
  console.log("编辑数据", newBillList);
  xzform(newBillList);
  //刷新数据
  contractinfo();
};
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
const billList = ref({
  accumulatedInvoicingAmount: 0,
  amount: 0,
  approvalStatus: 0,
  approvalWorkflowNode: 0,
  bankAccount: "",
  billNo: "",
  billType: 0,
  bizType: 0,
  buyerDepartment: "",
  buyerDepartmentId: "",
  claimTime: "",
  claimWithoutInvoicing: 0,
  claimer: "",
  claimerAccount: "",
  claimerDepartment: "",
  claimerDepartmentId: 0,
  contractId: "",
  createTime: "",
  createUserId: "",
  createUserName: "",
  documentNumber: "",
  id: "",
  isDeleted: 0, //
  isSend: 0, //
  isZbj: 0,
  modifyTime: "",
  modifyUserId: "",
  modifyUserName: "",
  nextReviewer: "",
  payId: "",
  payTime: "",
  payType: 0,
  paymentReceiptNumber: "",
  remark: "",
  status: 0,
  version: 0,
  year: 0,
});
const getBillList = async () => {
  const res = await getData("zhangdan/QueryBillList");
  const billarr = res.data.result.records;
  dataSource5.value = billarr;
  console.log("账单信息", billarr);
};
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
    title: "账单编号",
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
    dataIndex: "approvalStatus",
    key: "approvalStatus",
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
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
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
  getBillList();
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
  // const data3 = res.data.result.billInfoList;
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
  // dataSource5.value = data3;
  dataSource6.value = data4;
  dataSource7.value = data5;
  console.log("合同数据", "contractDetails:", data, "contractInfo:", data1);
};
//bill操作
//编辑账单
const editBill = (bill) => {
  console.log("编辑账单", Object.assign({}, bill));
  visible2.value = true;
  billList.value = {
    ...bill,
    claimTime: bill.claimTime ? dayjs(bill.claimTime) : null,
  };
};
//删除账单
const deleteBill = async (bill) => {
  const res = await getData("zhangdan/Delete", {
    id: String(bill),
  });
  if (res.data.code === 200) {
    ElMessage.success("删除成功");
    getBillList();
  } else {
    ElMessage.error(res.data.msg || "删除失败");
  }
  console.log("删除账单", bill);
};
</script>

<style lang="less" scoped>
:deep(.ant-table-thead > tr > th) {
  background-color: #f5f9ff !important;
}
:deep(.ant-input-disabled) {
  color: #000;
}

:deep(.ant-select-disabled .ant-select-selector) {
  color: #000 !important;
}
:deep(.ant-picker-disabled .ant-picker-input > input) {
  color: #000 !important;
}
.formback {
  background-color: #fff;
  padding: 20px;
}
</style>
