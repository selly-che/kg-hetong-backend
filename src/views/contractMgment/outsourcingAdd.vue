<template>
  <div>
    <!-- 按钮修改成文字，取消、确认按钮 -->
    <a-modal v-model:visible="visible" :title="title" @ok="handleOk" width="1200px" :confirm-loading="loading"
      ok-text="确认" cancel-text="取消">
      <div class="outsoure_tit">
        <b></b>
        <span>基本信息</span>
      </div>
      <a-form :model="form" :rules="rules" ref="formRef">
        <!-- 第一行：主合同、所属项目、外协类型、合同名称 -->
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="主合同" name="mainContract">
              <a-input v-model:value="form.mainContract" placeholder="请输入主合同名称" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="所属项目" name="projectName">
              <a-input v-model:value="form.projectName" placeholder="请输入所属项目名称" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="外协类型" name="outsourcingType">
              <a-select v-model:value="form.outsourcingType" placeholder="请选择外协类型">
                <a-select-option value="road">路内外包</a-select-option>
                <a-select-option value="road">路外外包</a-select-option>
                <a-select-option value="road">代院外包</a-select-option>
                <a-select-option value="road">自揽外包</a-select-option>
                <a-select-option value="road">分包合同</a-select-option>
                <a-select-option value="road">产品产业化设备采购</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 第二行：合同编号、合同识别号、合同唯一ID -->
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="合同编号" name="code">
              <a-input v-model:value="form.code" placeholder="系统自动生成" disabled />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="合同识别号" name="number">
              <a-input v-model:value="form.number" placeholder="系统自动生成" disabled />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="合同唯一ID" name="id">
              <a-input v-model:value="form.id" placeholder="系统自动生成" disabled />
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 第三行：主合同编号、主合同承揽类型、主合同金额 -->
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="主合同编号" name="mainContractNo">
              <a-select v-model:value="form.mainContractNo" placeholder="请选择主合同" disabled>
                <a-select-option value="pending">待选择</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="主合同承揽类型" name="mainContractType">
              <a-select v-model:value="form.mainContractType" placeholder="请选择主合同" disabled>
                <a-select-option value="pending">待选择</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="主合同金额" name="mainContractAmount">
              <a-input v-model:value="form.mainContractAmount" placeholder="请选择主合同 (万元)" disabled />
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 第四行：主合同累计收款、主合同板块、外协单位 -->
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="主合同累计收款" name="mainContractReceivedAmount">
              <a-input v-model:value="form.mainContractReceivedAmount" placeholder="请选择主合同 (万元)" disabled />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="主合同板块" name="mainContractSector">
              <a-select v-model:value="form.mainContractSector" placeholder="请选择主合同" disabled>
                <a-select-option value="pending">待选择</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="外协单位" name="outsourcingUnit">
              <a-auto-complete v-model:value="form.outsourcingUnit" placeholder="请搜索" :options="[]">
              </a-auto-complete>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 第五行：主合同类型一、其他开票单位、外协主责单位 -->
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="主合同类型一" name="mainContractTypeOne">
              <a-select v-model:value="form.mainContractTypeOne" placeholder="请选择主合同" disabled>
                <a-select-option value="pending">待选择</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="其他开票单位" name="otherBillingUnit">
              <a-auto-complete v-model:value="form.otherBillingUnit" placeholder="请搜索" :options="[]">
              </a-auto-complete>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="外协主责单位" name="outsourcingResponsibleUnit">
              <a-select v-model:value="form.outsourcingResponsibleUnit" placeholder="请选择外协主责单位" disabled>
                <a-select-option value="kuanggu">1</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 第六行：生产主责单位、性质、经办人 -->
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="生产主责单位" name="productionResponsibleUnit">
              <a-select v-model:value="form.productionResponsibleUnit" placeholder="请选择生产主责单位" disabled>
                <a-select-option value="kuanggu">1</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="性质" name="nature">
              <a-select v-model:value="form.nature" placeholder="请选择性质">
                <a-select-option value="highway">铁路</a-select-option>
                <a-select-option value="highway">公路</a-select-option>
                <a-select-option value="highway">地铁</a-select-option>
                <a-select-option value="highway">市政</a-select-option>
                <a-select-option value="highway">建筑</a-select-option>
                <a-select-option value="highway">通信</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="经办人" name="handler">
              <a-input v-model:value="form.handler" placeholder="填写经办人" />
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 第七行：外协合同金额、合同价格类型、同意付款比例 -->
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="外协合同金额(万元)" name="outsourcingContractAmount">
              <a-input v-model:value="form.outsourcingContractAmount" placeholder="待填写具体金额 (万元)" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="合同价格类型" name="priceType">
              <a-select v-model:value="form.priceType" placeholder="请选择合同价格类型">
                <a-select-option value="1">固定价</a-select-option>
                <a-select-option value="2">浮动价</a-select-option>
                <a-select-option value="3">成本价</a-select-option>
                <a-select-option value="4">报价竞争</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="同意付款比例" name="paymentRatio">
              <a-input v-model:value="form.paymentRatio" placeholder="100%" />
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 第八行：归属年份、签订日期、约定付款周期 -->
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="归属年份" name="belongYear">
              <a-select v-model:value="form.belongYear" placeholder="请选择归属年份">
                <a-select-option value="2020">2020</a-select-option>
                <a-select-option value="2021">2021</a-select-option>
                <a-select-option value="2022">2022</a-select-option>
                <a-select-option value="2023">2023</a-select-option>
                <a-select-option value="2024">2024</a-select-option>
                <a-select-option value="2025">2025</a-select-option>
                <a-select-option value="2026">2026</a-select-option>
                <a-select-option value="2027">2027</a-select-option>
                <a-select-option value="2028">2028</a-select-option>
                <a-select-option value="2029">2029</a-select-option>
                <a-select-option value="2030">2030</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="签订日期" name="signDate">
              <a-date-picker v-model:value="form.signDate" value-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择签订日期"
                style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="约定付款周期" name="paymentCycle">
              <a-input v-model:value="form.paymentCycle" placeholder="约定付款周期(最大输入100字符)" :maxlength="100" />
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 第九行：业务范围、计划开工日期、计划竣工日期 -->
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="业务范围" name="projectDepartment">
              <a-select v-model:value="form.projectDepartment" placeholder="请选择业务范围">
                <a-select-option value="pending">测量</a-select-option>
                <a-select-option value="pending">地勘</a-select-option>
                <a-select-option value="pending">试验</a-select-option>
                <a-select-option value="pending">设计</a-select-option>
                <a-select-option value="pending">前期咨询</a-select-option>
                <a-select-option value="pending">技术咨询</a-select-option>
                <a-select-option value="pending">施工图审核</a-select-option>
                <a-select-option value="pending">检测及评估</a-select-option>
                <a-select-option value="pending">专题报告</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="计划开工日期" name="plannedStartDate">
              <a-date-picker value-format="YYYY-MM-DD HH:mm:ss" v-model:value="form.plannedStartDate"
                placeholder="请选择日期" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="计划竣工日期" name="plannedCompletionDate">
              <a-date-picker value-format="YYYY-MM-DD HH:mm:ss" v-model:value="form.plannedCompletionDate"
                placeholder="请选择日期" style="width: 100%" />
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 第十行：实际开工日期、实际竣工日期、合同总工期 -->
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="实际开工日期" name="actualStartDate">
              <a-date-picker value-format="YYYY-MM-DD HH:mm:ss" v-model:value="form.actualStartDate" placeholder="请选择日期"
                style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="实际竣工日期" name="actualCompletionDate">
              <a-date-picker value-format="YYYY-MM-DD HH:mm:ss" v-model:value="form.actualCompletionDate"
                placeholder="请选择日期" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="合同总工期" name="totalDuration">
              <a-input v-model:value="form.totalDuration" placeholder="合同总工期" />
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 第十一行：是否框架合同、项目部、省份 -->
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="是否框架合同" name="isFramework">
              <a-select v-model:value="form.isFramework" placeholder="是否框架合同">
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="项目部" name="commandPost">
              <a-select v-model:value="form.commandPost" placeholder="项目部">
                <a-select-option value="pending">待选择</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="省份" name="province">
              <a-select v-model:value="form.province" placeholder="省份">
                <a-select-option value="pending">待选择</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 第十二行：登记日期、主合同相应阶段完成天数、合同状态 -->
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="登记日期" name="registrationDate">
              <a-date-picker value-format="YYYY-MM-DD HH:mm:ss" v-model:value="form.registrationDate"
                placeholder="请选择登记日期" style="width: 100%" disabled />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="主合同相应阶段完成天数" name="mainContractPhaseDays">
              <a-input v-model:value="form.mainContractPhaseDays" placeholder="主合同相应阶段完成天数" disabled />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="合同状态" name="status">
              <a-select v-model:value="form.status" placeholder="合同状态">
                <a-select-option value="pending">待选择</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 第十三行：基本信息是否已治理、是否封存、是否推送司库 -->
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="基本信息是否已治理" name="basicInfoManaged">
              <a-select v-model:value="form.basicInfoManaged" placeholder="基本信息是否已治理" disabled>
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="是否封存" name="isArchived">
              <a-select v-model:value="form.isArchived" placeholder="是否封存" disabled>
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="是否推送司库" name="ifPush">
              <a-select v-model:value="form.ifPush" placeholder="是否推送司库" disabled>
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 备注 -->
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="备注" name="remark">
              <a-textarea v-model:value="form.remark" :rows="3" placeholder="请输入备注信息" />
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 支付申请表格 -->
        <div class="outsoure_tit">
          <b></b>
          <span>交付申请</span>
        </div>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="" name="paymentApplication">
              <div class="payment-application-container">
                <div class="header">
                  <div class="total-amount">累计申请金额: {{ totalAmount }}万</div>
                  <a-button type="primary" size="small" @click="addPaymentApplication">
                    <plus-outlined /> 添加
                  </a-button>
                </div>
                <a-table :columns="paymentColumns" :data-source="paymentData" :pagination="false" bordered>
                  <template #bodyCell="{ column, record, index }">
                    <template v-if="column.key === 'applicationDate'">
                      <a-date-picker value-format="YYYY-MM-DD HH:mm:ss" v-model:value="record.applicationDate"
                        placeholder="请选择日期" style="width: 100%" />
                    </template>
                    <template v-else-if="column.key === 'handler'">
                      <a-input v-model:value="record.handler" placeholder="请输入经办人" />
                    </template>
                    <template v-else-if="column.key === 'applicationAmount'">
                      <a-input-number v-model:value="record.applicationAmount" :min="0" placeholder="请输入申请金额"
                        style="width: 100%" />
                    </template>
                    <template v-else-if="column.key === 'remark'">
                      <a-input v-model:value="record.remark" placeholder="请输入备注" />
                    </template>
                    <template v-else-if="column.key === 'operation'">
                      <a-button type="link" size="small" @click="removePaymentApplication(index)">
                        删除
                      </a-button>
                    </template>
                  </template>
                </a-table>
              </div>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 上传附件 -->
        <div class="outsoure_tit">
          <b></b>
          <span>上传附件</span>
        </div>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="" name="attachments">
              <div class="attachment-container">
                <div class="upload-section">
                  <a-upload v-model:file-list="form.attachments" :before-upload="beforeUpload" :remove="handleRemove">
                    <a-button>
                      <upload-outlined></upload-outlined>
                      添加附件
                    </a-button>
                  </a-upload>
                </div>
                <a-table :columns="attachmentColumns" :data-source="form.attachments" :pagination="false" bordered>
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'type'">
                      {{ record.type }}
                    </template>
                    <template v-else-if="column.key === 'name'">
                      {{ record.name }}
                    </template>
                    <template v-else-if="column.key === 'download'">
                      <a-button type="link" size="small" @click="downloadFile(record)">
                        下载
                      </a-button>
                    </template>
                    <template v-else-if="column.key === 'view'">
                      <a-button type="link" size="small" @click="viewFile(record)">
                        查看
                      </a-button>
                    </template>
                    <template v-else-if="column.key === 'operation'">
                      <a-button type="link" size="small" @click="removeAttachment(record)">
                        删除
                      </a-button>
                    </template>
                  </template>
                </a-table>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import type { UploadProps } from "ant-design-vue";
import getDates from "@/network/index";

export default defineComponent({
  // 收到父组件的参数
  props: {
    title: {
      type: String,
      default: "新增外协合同",
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    UploadOutlined,
    PlusOutlined,
  },
  setup(props, { emit }) {
    const visible = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const formRef = ref();

    // 初始化表单数据
    const form = reactive({
      mainContract: "",
      projectName: "",
      outsourcingType: undefined,
      code: "",
      number: "",
      id: "",
      mainContractNo: undefined,
      mainContractType: undefined,
      mainContractAmount: "",
      mainContractReceivedAmount: "",
      mainContractSector: undefined,
      outsourcingUnit: "",
      mainContractTypeOne: undefined,
      otherBillingUnit: "",
      outsourcingResponsibleUnit: undefined,
      productionResponsibleUnit: undefined,
      nature: undefined,
      handler: "",
      outsourcingContractAmount: "",
      priceType: undefined as string | undefined,
      paymentRatio: "",
      belongYear: undefined,
      signDate: undefined as Date | undefined | string,
      paymentCycle: "",
      projectDepartment: undefined,
      plannedStartDate: undefined as Date | undefined | string,
      plannedCompletionDate: undefined,
      actualStartDate: undefined,
      actualCompletionDate: undefined,
      totalDuration: "",
      isFramework: undefined as string | undefined,
      commandPost: undefined,
      province: undefined,
      registrationDate: undefined as Date | undefined,
      mainContractPhaseDays: "",
      status: undefined,
      basicInfoManaged: undefined as string | undefined,
      isArchived: undefined as string | undefined,
      ifPush: undefined as string | undefined,
      remark: "",
      attachments: [] as any[],
      contractName: "",
      customerName: "",
      invoiceEntity: "",
      ownershipUnit: "",
    });

    // 支付申请相关
    const paymentData = ref([
      {
        key: '1',
        applicationDate: undefined as Date | undefined | string,
        handler: '',
        applicationAmount: 0,
        remark: '',
      },
    ]);

    const paymentColumns = [
      { title: '申请日期', dataIndex: 'applicationDate', key: 'applicationDate', width: 150 },
      { title: '经办人', dataIndex: 'handler', key: 'handler', width: 120 },
      { title: '申请金额(万元)', dataIndex: 'applicationAmount', key: 'applicationAmount', width: 150 },
      { title: '备注', dataIndex: 'remark', key: 'remark' },
      { title: '操作', dataIndex: 'operation', key: 'operation', width: 80 },
    ];

    // 附件相关
    const attachmentColumns = [
      { title: '附件类型', dataIndex: 'type', key: 'type', width: 120 },
      { title: '附件名称', dataIndex: 'name', key: 'name', width: 200 },
      { title: '下载', dataIndex: 'download', key: 'download', width: 80 },
      { title: '查看', dataIndex: 'view', key: 'view', width: 80 },
      { title: '操作', dataIndex: 'operation', key: 'operation', width: 80 },
    ];

    // 计算累计申请金额
    const totalAmount = computed(() => {
      return paymentData.value.reduce((sum, item) => sum + (item.applicationAmount || 0), 0);
    });

    // 添加支付申请
    const addPaymentApplication = () => {
      const newRecord = {
        key: Date.now().toString(),
        applicationDate: undefined as Date | undefined | string,
        handler: '',
        applicationAmount: 0,
        remark: '',
      };
      paymentData.value.push(newRecord);
    };

    // 删除支付申请
    const removePaymentApplication = (index: number) => {
      paymentData.value.splice(index, 1);
    };

    // 删除附件
    const removeAttachment = (record: any) => {
      const index = form.attachments.indexOf(record);
      if (index > -1) {
        form.attachments.splice(index, 1);
      }
    };

    // 下载文件
    const downloadFile = (record: any) => {
      // 实现文件下载逻辑
      message.info('文件下载功能待实现');
    };

    // 查看文件
    const viewFile = (record: any) => {
      // 实现文件查看逻辑
      message.info('文件查看功能待实现');
    };

    // 填充表单数据的方法
    const fillFormData = (data: any) => {
      if (!data || Object.keys(data).length === 0) return;

      Object.assign(form, data);

      // 特殊字段处理
      if (data.totalReceivedAmount) {
        form.mainContractReceivedAmount = data.totalReceivedAmount.toString();
      }
      if (data.year) {
        form.belongYear = data.year.toString();
      }
      if (data.paymentRatio) {
        form.paymentRatio = data.paymentRatio.toString()
      }
      if (data.amount) {
        form.outsourcingContractAmount = data.amount.toString();
      }
      if (data.name) {
        form.mainContract = data.name;
      }
      if (data.customer) {
        form.projectName = data.customer;
      }
      if (data.invoiceEntity) {
        form.outsourcingUnit = data.invoiceEntity;
      }
      if (data.ownershipUnit) {
        form.otherBillingUnit = data.ownershipUnit;
      }
      if (data.signTime) {
        form.signDate = data.signTime;
      }
      if (data.createTime) {
        form.registrationDate = data.createTime;
      }
      if (data.code) {
        form.code = data.code;
      }
      if (data.number) {
        form.number = data.number;
      }
      if (data.id) {
        form.id = data.id;
      }
      if (data.paymentCycle) {
        form.paymentCycle = data.paymentCycle;
      }
      if (data.plannedCommencementDate) {
        form.plannedStartDate = data.plannedCommencementDate;
      }
      if (data.plannedCompletionDate) {
        form.plannedCompletionDate = data.plannedCompletionDate;
      }
      if (data.actualCommencementDate) {
        form.actualStartDate = data.actualCommencementDate;
      }
      if (data.actualCompletionDate) {
        form.actualCompletionDate = data.actualCompletionDate;
      }
      if (data.totalDuration) {
        form.totalDuration = data.totalDuration.toString();
      }
      if (data.isFramework !== null && data.isFramework !== undefined) {
        form.isFramework = data.isFramework === 1 ? '1' : '0';
      }
      if (data.province) {
        form.province = data.province;
      }
      if (data.commandPost) {
        form.commandPost = data.commandPost;
      }
      if (data.status !== null && data.status !== undefined) {
        form.status = data.status.toString();
      }
      if (data.basicInfoManaged !== null && data.basicInfoManaged !== undefined) {
        form.basicInfoManaged = data.basicInfoManaged === 1 ? '1' : '0';
      }
      if (data.isArchived !== null && data.isArchived !== undefined) {
        form.isArchived = data.isArchived === 1 ? '1' : '0';
      }
      if (data.ifPush !== null && data.ifPush !== undefined) {
        form.ifPush = data.ifPush === 1 ? '1' : '0';
      }
      if (data.charge) {
        form.handler = data.charge;
      }
      if (data.priceType !== null && data.priceType !== undefined) {
        form.priceType = data.priceType.toString();
      }
      if (data.outsourcingType) {
        form.outsourcingType = data.outsourcingType;
      }
    };

    // 如果有传入 data，则使用传入的数据填充表单
    fillFormData(props.data);

    // 监听 props.data 的变化，当数据变化时重新填充表单
    watch(() => props.data, (newData) => {
      console.log(newData, "监听到 props.data 变化");

      if (newData && Object.keys(newData).length > 0) {
        fillFormData(newData);
      } else {
        resetForm();
      }
    }, { deep: true });

    const rules = {};

    const showModal = () => {
      resetForm();
      visible.value = true;
    };

    const handleOk = async () => {
      try {
        const fromData = JSON.parse(JSON.stringify(form));
        fromData.year = Number(fromData.year || 0);
        fromData.type = Number(fromData.type || 0);
        fromData.totalDuration = Number(fromData.totalDuration || 0);
        fromData.status = Number(fromData.status || 0);
        fromData.qualification = Number(fromData.qualification || 0);
        fromData.priceType = Number(fromData.priceType || 0);
        fromData.paymentInfoManaged = Number(fromData.paymentInfoManaged || 0);
        fromData.paymentAuditStatus = Number(fromData.paymentAuditStatus || 0);
        fromData.pageSize = Number(fromData.pageSize || 0);
        fromData.pageNo = Number(fromData.pageNo || 0);
        fromData.outsourcingType = Number(fromData.outsourcingType || 0);
        fromData.isSupplementary = Number(fromData.isSupplementary || 0);
        fromData.isReport = Number(fromData.isReport || 0);
        fromData.isPay = Number(fromData.isPay || 0);
        fromData.isOverseas = Number(fromData.isOverseas || 0);
        fromData.isJr = Number(fromData.isJr || 0);
        fromData.isInside = Number(fromData.isInside || 0);
        fromData.isFramework = Number(fromData.isFramework || 0);
        fromData.isEqually = Number(fromData.isEqually || 0);
        fromData.isDeleted = Number(fromData.isDeleted || 0);
        fromData.isBusiness = Number(fromData.isBusiness || 0);
        fromData.isBorrow = Number(fromData.isBorrow || 0);
        fromData.isArchived = Number(fromData.isArchived || 0);
        fromData.ifcount = Number(fromData.ifcount || 0);
        fromData.ifPush = Number(fromData.ifPush || 0);
        fromData.contractType = Number(fromData.contractType || 0);
        fromData.contractState = Number(fromData.contractState || 0);
        fromData.basicInfoManaged = Number(fromData.basicInfoManaged || 0);
        fromData.addSource = Number(fromData.addSource || 0);

        const resp = await getDates("outsourcing/setContract", {
          contractInfo: fromData,
          // paymentApplications: paymentData.value,
        });
        console.log(resp);
        
        if (resp.data.code === 200) {
          message.success(props.data.id ? "合同更新成功" : "合同添加成功");
          visible.value = false;
          emit('refreshList')
        } else {
          message.error(resp.data.message || "操作失败");
        }
      } catch (error: any) {
        message.error(error.message);
      }
    };

    const resetForm = () => {
      Object.assign(form, {
        mainContract: "",
        projectName: "",
        outsourcingType: undefined,
        contractNo: "",
        number: "",
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
        productionResponsibleUnit: undefined,
        nature: undefined,
        handler: "",
        outsourcingContractAmount: "",
        contractPriceType: undefined,
        paymentRatio: "",
        belongYear: undefined,
        signDate: undefined,
        paymentCycle: "",
        projectDepartment: undefined,
        plannedStartDate: undefined,
        plannedCompletionDate: undefined,
        actualStartDate: undefined as Date | undefined | string,
        actualCompletionDate: undefined as Date | undefined | string,
        totalDuration: "",
        isFramework: undefined,
        commandPost: undefined,
        province: undefined,
        registrationDate: undefined as Date | undefined | string,
        mainContractPhaseDays: "",
        status: undefined,
        basicInfoManaged: undefined,
        isArchived: undefined,
        ifPush: undefined,
        remark: "",
        attachments: [],
        contractName: "",
        customerName: "",
        invoiceEntity: "",
        ownershipUnit: "",
      });
      formRef.value?.resetFields();
      // 重置支付申请数据
      paymentData.value = [{
        key: '1',
        applicationDate: undefined as Date | undefined | string,
        handler: '',
        applicationAmount: 0,
        remark: '',
      }];
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
      paymentData,
      attachmentColumns,
      totalAmount,
      addPaymentApplication,
      removePaymentApplication,
      removeAttachment,
      downloadFile,
      viewFile,
    };
  },
});
</script>

<style scoped lang="less">
.outsoure_tit {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  margin-bottom: 10px;
  height: 40px;
  line-height: 40px;

  b {
    background-color: #007eff;
    width: 4px;
    height: 14px;
    display: inline-block;
  }
}

.payment-application-container {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.total-amount {
  font-weight: bold;
  color: #1890ff;
}

.attachment-container {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 16px;
}

.upload-section {
  margin-bottom: 16px;
}
</style>