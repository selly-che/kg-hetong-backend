<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter="searchQuery" class="search-form">
        <a-row :gutter="24">
          <a-col :md="6" :sm="12">
            <a-form-item label="账号">
              <a-input
                placeholder="输入账号模糊查询"
                v-model="queryParam.username"
              ></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="性别">
              <a-select v-model="queryParam.sex" placeholder="请选择性别">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">男</a-select-option>
                <a-select-option value="2">女</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="真实名字">
              <a-input
                placeholder="请输入真实名字"
                v-model="queryParam.realname"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8" v-if="toggleSearchStatus">
            <a-form-item label="部门">
              <a-select v-model="queryParam.orgCode" placeholder="请选择部门">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">部门1</a-select-option>
                <a-select-option value="2">部门2</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8" v-if="toggleSearchStatus">
            <a-form-item label="手机号码">
              <a-input
                placeholder="请输入手机号码查询"
                v-model="queryParam.phone"
              ></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8" v-if="toggleSearchStatus">
            <a-form-item label="用户状态">
              <a-select v-model="queryParam.status" placeholder="请选择">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">正常</a-select-option>
                <a-select-option value="2">冻结</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                style="margin-left: 8px"
                >重置</a-button
              >
              <a
                @click="handleToggleSearch"
                style="margin-left: 8px; color: #1890ff; cursor: pointer"
              >
                {{ toggleSearchStatus ? "收起" : "展开" }}
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary">
        <template #icon>
          <PlusOutlined />
        </template>
        添加用户
      </a-button>
      <a-button type="primary" @click="handleExportXls('用户信息')">
        <template #icon>
          <DownloadOutlined />
        </template>
        导出
      </a-button>
      <a-upload
        name="file"
        :showUploadList="false"
        :multiple="false"
        :headers="tokenHeader"
        :action="importExcelUrl"
        @change="handleImportExcel"
      >
        <a-button type="primary">
          <template #icon>
            <UploadOutlined />
          </template>
          导入
        </a-button>
      </a-upload>

      <a-button type="primary" @click="recycleBinVisible = true">
        <template #icon>
          <DatabaseOutlined />
        </template>
        回收站
      </a-button>
      <a-button type="primary" @click="handleSuperQuery">
        <template #icon>
          <FilterOutlined />
        </template>
        高级查询
      </a-button>
      <a-third-app-button
        biz-type="user"
        :selected-row-keys="selectedRowKeys"
        syncToApp
        syncToLocal
        @sync-finally="onSyncFinally"
      />
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a
          style="font-weight: 600"
          >{{ selectedRowKeys.length }}</a
        >项&nbsp;&nbsp;
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
        @change="handleTableChange"
      >
        <template #avatarslot="{ record }">
          <div class="anty-img-wrap">
            <a-avatar
              shape="square"
              :src="getAvatarView(record.avatar)"
              icon="user"
            />
          </div>
        </template>

        <template #action="{ record }">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;" @click="handleDetail(record)">详情</a>
                </a-menu-item>

                <a-menu-item>
                  <a
                    href="javascript:;"
                    @click="handleChangePassword(record.username)"
                    >密码</a
                  >
                </a-menu-item>

                <a-menu-item>
                  <a-popconfirm
                    title="确定删除吗?"
                    @confirm="() => handleDelete(record.id)"
                  >
                    <a>删除</a>
                  </a-popconfirm>
                </a-menu-item>

                <a-menu-item v-if="record.status == 1">
                  <a-popconfirm
                    title="确定冻结吗?"
                    @confirm="() => handleFrozen(record.id, 2, record.username)"
                  >
                    <a>冻结</a>
                  </a-popconfirm>
                </a-menu-item>

                <a-menu-item v-if="record.status == 2">
                  <a-popconfirm
                    title="确定解冻吗?"
                    @confirm="() => handleFrozen(record.id, 1, record.username)"
                  >
                    <a>解冻</a>
                  </a-popconfirm>
                </a-menu-item>

                <a-menu-item>
                  <a
                    href="javascript:;"
                    @click="handleAgentSettings(record.username)"
                    >代理人</a
                  >
                </a-menu-item>
              </a-menu>
            </template>
            <a> 更多 <DownOutlined /> </a>
          </a-dropdown>
        </template>
      </a-table>
    </div>
    <!-- table区域-end -->

    <user-modal ref="modalForm" @ok="modalFormOk"></user-modal>

    <password-modal ref="passwordmodal" @ok="passwordModalOk"></password-modal>

    <sys-user-agent-modal ref="sysUserAgentModal"></sys-user-agent-modal>

    <!-- 用户回收站 -->
    <user-recycle-bin-modal
      v-model:visible="recycleBinVisible"
      @ok="modalFormOk"
    />
  </a-card>
  <!-- 编辑抽屉 -->
  <form-drawer-right ref="modalFormDawer" @ok="modalFormOk" :title="title">
  </form-drawer-right>
  <!-- 高级查询抽屉 -->
  <modal ref="superQueryModal" @ok="superQueryModalOk" :title="title2"> </modal>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { message } from "ant-design-vue";
import FormDrawerRight from "./FormDrawerRight.vue";
import Modal from "./Modal.vue";
import {
  PlusOutlined,
  DownloadOutlined,
  UploadOutlined,
  DatabaseOutlined,
  DownOutlined,
  FilterOutlined,
} from "@ant-design/icons-vue";

const title = ref("");
const title2 = ref("");
const queryParam = reactive({});
const recycleBinVisible = ref(false);
const toggleSearchStatus = ref(true);
const selectedRowKeys = ref([]);
const dataSource = ref([]);
const ipagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "30", "40"],
});
const loading = ref(false);
const table = ref(null);
const modalForm = ref(null);
const superQueryModal = ref(null);
const modalFormDawer = ref(null);
const passwordmodal = ref(null);
const sysUserAgentModal = ref(null);
const tokenHeader = ref({});
const importExcelUrl = ref("");
const columns = [
  {
    title: "用户账号",
    align: "center",
    dataIndex: "username",
    width: 120,
    sorter: true,
  },
  {
    title: "用户姓名",
    align: "center",
    width: 100,
    dataIndex: "realname",
  },
  {
    title: "头像",
    align: "center",
    width: 120,
    dataIndex: "avatar",
    slots: { customRender: "avatarslot" },
  },
  {
    title: "性别",
    align: "center",
    width: 80,
    dataIndex: "sex_dictText",
    sorter: true,
  },
  {
    title: "生日",
    align: "center",
    width: 100,
    dataIndex: "birthday",
  },
  {
    title: "手机号码",
    align: "center",
    width: 100,
    dataIndex: "phone",
  },
  {
    title: "部门",
    align: "center",
    width: 180,
    dataIndex: "orgCodeTxt",
  },
  {
    title: "负责部门",
    align: "center",
    width: 180,
    dataIndex: "departIds_dictText",
  },
  {
    title: "状态",
    align: "center",
    width: 80,
    dataIndex: "status_dictText",
  },
  {
    title: "操作",
    dataIndex: "action",
    slots: { customRender: "action" },
    align: "center",
    width: 170,
  },
];
const superQueryFieldList = [
  { type: "input", value: "username", text: "用户账号" },
  { type: "input", value: "realname", text: "用户姓名" },
  {
    type: "select",
    value: "sex",
    dbType: "int",
    text: "性别",
    dictCode: "sex",
  },
];

// 初始化数据
onMounted(() => {
  searchQuery();
});

// 查询
const searchQuery = () => {
  loading.value = true;
  // 调用API
  setTimeout(() => {
    // dataSource.value = [];
    // ipagination.value.total = 0;
    //test
    dataSource.value = [
      {
        id: 1,
        username: "admin",
        realname: "管理员",
        avatar: "",
        sex_dictText: "男",
        birthday: "1990-01-01",
        phone: "13800138000",
        orgCodeTxt: "技术部",
        departIds_dictText: "研发组,测试组",
        status: 1,
        status_dictText: "正常",
      },
      {
        id: 2,
        username: "user001",
        realname: "张三",
        avatar: "",
        sex_dictText: "女",
        birthday: "1995-05-15",
        phone: "13900139000",
        orgCodeTxt: "市场部",
        departIds_dictText: "市场一组",
        status: 1,
        status_dictText: "正常",
      },
    ];
    ipagination.value.total = 2;
    //test end
    loading.value = false;
  }, 500);
};

// 重置
const searchReset = () => {
  Object.assign(queryParam, {});
  searchQuery();
};

// 展开/收起搜索
const handleToggleSearch = () => {
  toggleSearchStatus.value = !toggleSearchStatus.value;
};

// 添加用户
const handleAdd = () => {
  title.value = "添加用户";
  modalFormDawer.value.showDrawer();
};

// 导出Excel
const handleExportXls = (fileName) => {
  message.info("导出功能开发中");
};

// 导入Excel
const handleImportExcel = (info) => {
  message.info("导入功能开发中");
};

// 批量删除
const batchDel = () => {
  message.info("批量删除功能开发中");
};

// 批量冻结/解冻
const batchFrozen = (status) => {
  message.info("批量操作功能开发中");
};

// 菜单点击
const handleMenuClick = (e) => {
  // 菜单点击处理
};

// 高级查询
const handleSuperQuery = (params) => {
  superQueryModal.value.showModal();
};

// 清空选择
const onClearSelected = () => {
  selectedRowKeys.value = [];
};

// 选择变更
const onSelectChange = (newSelectedRowKeys) => {
  selectedRowKeys.value = newSelectedRowKeys;
};

// 表格变更
const handleTableChange = (pagination, filters, sorter) => {
  ipagination.value = pagination;
  searchQuery();
};

// 获取头像
const getAvatarView = (avatar) => {
  return avatar || "";
};

// 编辑用户
const handleEdit = (record) => {
  title.value = "编辑用户";
  modalFormDawer.value.showDrawer(record);
};

// 查看详情
const handleDetail = (record) => {
  //   message.info("详情功能开发中");
  modalFormDawer.value.showDrawer(record);
};

// 修改密码
const handleChangePassword = (username) => {
  title2.value = "修改密码";
  superQueryModal.value.showModal();
};

// 删除用户
const handleDelete = (id) => {
  message.info("删除功能开发中");
};

// 冻结/解冻用户
const handleFrozen = (id, status, username) => {
  message.info("冻结/解冻功能开发中");
};

// 代理人设置
const handleAgentSettings = (username) => {
  title2.value = "代理人设置";
  superQueryModal.value.showModal();
};

// 模态框确认
const modalFormOk = () => {
  searchQuery();
};

// 密码模态框确认
const passwordModalOk = () => {
  message.success("密码修改成功");
};

// 同步完成
const onSyncFinally = () => {
  searchQuery();
};
</script>

<style lang="less" scoped>
.table-page-search-wrapper {
  margin-bottom: 20px;

  :deep(.ant-form-item) {
    margin-bottom: 16px;

    .ant-form-item-label {
      padding-right: 8px;

      > label {
        font-weight: normal;
        margin-bottom: 0;
      }
    }

    .ant-form-item-control-input {
      min-height: 32px;
    }

    .ant-input,
    .ant-select-selector {
      border-radius: 4px;
      height: 32px;
    }

    .ant-input {
      padding: 4px 11px;
    }
  }

  .table-page-search-submitButtons {
    display: flex;
    align-items: center;
    margin-top: 2px;

    .ant-btn {
      height: 32px;
      padding: 4px 15px;
      font-size: 14px;
    }

    a {
      color: #1890ff;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.table-operator {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  //   padding: 12px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 16px;

  > * {
    display: flex;
    align-items: center;
    margin-right: 8px;
    margin-bottom: 8px;
  }

  .ant-btn {
    height: 32px;
    padding: 4px 15px;
    font-size: 14px;
    border-radius: 4px;
  }

  .ant-dropdown-button {
    .ant-btn {
      margin-right: 0;
    }
  }
}
</style>
