<template>
  <div class="  br8 role flex">
    <div class="role_l bgf pd20 br8">
      <!-- 搜索区域 -->
      <div class="search" style="display: flex; margin-top: 10px; font-size: 18px">
        <a-form-item label="账号" style="width: 400px; margin-right: 10px">
          <a-input placeholder="请输入角色名" allow-clear v-model:value="roleName"></a-input>
        </a-form-item>
        <a-button type="primary" @click="handleSearch" style="margin-right: 10px">
          <template #icon>
            <SearchOutlined />
          </template>
          查询</a-button>
        <a-button type="primary" @click="handleReset">
          <template #icon>
            <RedoOutlined />
          </template>
          重置</a-button>
      </div>
      <!-- 按钮区 -->
      <div style="display: flex">
        <div class="button" style="margin-right: 10px">
          <a-button type="primary" @click="handleAdd">
            <template #icon>
              <PlusOutlined />
            </template>
            新增</a-button>
        </div>
        <div class="button" style="margin-right: 10px">
          <a-button type="primary" @click="handleAdd">
            <template #icon>
              <LoginOutlined />
            </template>
            导入</a-button>
        </div>
        <div class="button" style="margin-right: 10px">
          <a-button type="primary" @click="handleExportXls('角色管理')">
            <template #icon>
              <VerticalAlignBottomOutlined />
            </template>
            导出
          </a-button>
        </div>
      </div>
      <!-- 已选择项 -->
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px; margin-top: 10px">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>
        已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>
      <!-- table展示列表 -->
      <div class="table-container">
        <div class="table-wrapperzhu">
          <a-table :row-selection="{
            selectedRowKeys: selectedRowKeys.value,
            onChange: onSelectChange,
            type: 'radio',
          }" :columns="columns" row-key="id" :loading="loading" :pagination="pagination" :data-source="data"
            class="components-table-demo-nested">
            <template #action="{ record }">
              <div>
                <a href=""> 用户</a>
                <a-divider type="vertical" />

                <a-dropdown placement="bottomRight">
                  <a class="ant-dropdown-link">
                    更多
                    <DownOutlined />
                  </a>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item>
                        <a @click="handlePerssion(record.id)">授权</a>
                      </a-menu-item>
                      <a-menu-item>
                        <a @click="handleEdit(record)">编辑</a>
                      </a-menu-item>
                      <a-menu-item>
                        <a-popconfirm title="确定删除吗?" ok-text="确定" cancel-text="取消"
                          @confirm="() => handleDelete(record.id)">
                          <a>删除</a>
                        </a-popconfirm>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <div class="role_r  bgf pd20 br8">
      <!-- 角色对应的用户信息 -->
      <div class="user-management mt-10">
        <!-- 搜索区域 -->
        <div class="search-area mb-24">
          <a-form ref="searchFormRef" :model="searchForm" layout="inline">
            <a-form-item label="用户账号">
              <a-input v-model:value="searchForm.username" placeholder="请输入用户账号" allow-clear />
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button type="primary" @click="handleUserSearch">
                  <template #icon>
                    <SearchOutlined />
                  </template>
                  查询
                </a-button>
                <a-button @click="handleUserReset">
                  <template #icon>
                    <RedoOutlined />
                  </template>
                  重置
                </a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </div>

        <!-- 操作区域 -->
        <div class="action-area">
          <a-space>
            <a-button type="primary" @click="handleAddUser">
              <template #icon>
                <PlusOutlined />
              </template>
              新增用户
            </a-button>
            <a-button type="primary" @click="handleImportUser">
              <template #icon>
                <PlusOutlined />
              </template>
              已有用户
            </a-button>
            <a-button @click="handleUserBatchDelete" :disabled="selectedUserRowKeys.length === 0">
              <template #icon>
                <!-- <UserAddOutlined /> -->
              </template>
              批量删除
            </a-button>

          </a-space>
        </div>
        <!-- 批量操作区域 -->
        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px; margin-top: 10px">
          <i class="anticon anticon-info-circle ant-alert-icon"></i>
          已选择&nbsp;<a style="font-weight: 600">{{ selectedUserRowKeys.length }}</a>项&nbsp;&nbsp;
          <a style="margin-left: 24px" @click="handleBatchDelete">清空</a>
        </div>

        <!-- 表格区域 -->
        <div class="table-area mt-10">
          <a-table :row-selection="{
            selectedRowKeys: selectedUserRowKeys.value,
            onChange: onSelectUserChange,
          }" :columns="UserColumns" :data-source="tableData" :pagination="UserPagination" row-key="id"
            :loading="Userloading" @change="handleTableChange">
            <!-- 状态列自定义渲染 -->
            <template #status="{ text, record }">
              <a-tag :color="record.status === 1 ? 'green' : 'red'">
                {{ record.status_dictText || (record.status === 1 ? '正常' : '禁用') }}
              </a-tag>
            </template>

            <!-- 操作列 -->
            <template #action="{ record }">
              <a-space>
                <a-button type="link" size="small" @click="handleUserEdit(record)">
                  编辑
                </a-button>
                <a-popconfirm title="确定要删除该用户吗？" ok-text="确定" cancel-text="取消" @confirm="handleUserDelete(record)">
                  <a-button type="link" size="small" danger>
                    删除
                  </a-button>
                </a-popconfirm>
              </a-space>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
  <div>
    <!-- 新增角色弹窗 -->
    <a-modal :width="800" :cancel-text="'取消'" :ok-text="'确定'" style="top:5%;height: 85%;overflow-y: hidden"
      v-model:visible="modalVisible" :title="IsCreate ? '新增角色' : '编辑角色'" :mask-closable="false" :keyboard="false"
      @cancel="handleCancel" @ok="handleOk" :ok-button-props="{ disabled: !formState.roleCode || !formState.roleName }">
      <a-form ref="formRef" :model="formState" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :rules="rules">
        <!-- 角色编码 如果是编辑 此输入框禁用 -->
        <a-form-item label="角色编码：" name="roleCode" :rules="[{ required: true, message: '请输入角色编码' }]">
          <a-input :disabled="!IsCreate" v-model:value="formState.roleCode" placeholder="请输入角色编码" :maxlength="50"
            allow-clear />
        </a-form-item>

        <!-- 角色名称 -->
        <a-form-item label="角色名称：" name="roleName" :rules="[{ required: true, message: '请输入角色名称' }]">
          <a-input v-model:value="formState.roleName" placeholder="请输入角色名称" :maxlength="20" allow-clear />
        </a-form-item>

        <!-- 描述 -->
        <a-form-item label="描述：" name="description">
          <a-textarea v-model:value="formState.description" placeholder="请输入角色描述" :rows="4" :maxlength="200" show-count
            allow-clear />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 授权 -->
    <PermissionConfigDrawer v-model:visible="drawerVisible" :role-id="selectedRoleId"
      :fetch-tree-api="fetchPermissionTree" :fetch-checked-api="fetchCheckedPermissions" :save-api="saveRolePermissions"
      @save-success="handleSave" @close="handleClose">
    </PermissionConfigDrawer>
    <!-- 角色对应用户管理 -->
      <UserAddDrawer ref="userAddDrawerRef" @submit-success="handleSubmitSuccess" />
    <!-- 添加已有客户 -->
    <AddExistingUserModal ref="addUserModalRef" @confirm="handleUserSelected" @cancel="handleModalCancel" />
  </div>

</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import getDatas from "@/network/index";
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  PlusOutlined,
  VerticalAlignBottomOutlined,
  LoginOutlined,
  DownOutlined,
  SearchOutlined,
  RedoOutlined
} from "@ant-design/icons-vue";
import PermissionConfigDrawer from "@/components/PermissionConfigDrawer.vue";
import AddExistingUserModal from '@/components/AddExistingUserModal.vue';
import UserAddDrawer from '@/components/UserAddDrawer.vue';
import { Modal } from 'ant-design-vue';
/*  表格数据及其内容配置 */
const roleName = ref("");
const pagination = reactive({
  current: 1,     // 当前页码
  pageSize: 10,   // 每页显示条数
  total: 0,      // 总数据条数
  showSizeChanger: true,      // 显示分页大小切换器
  showQuickJumper: true,      // 显示快速跳转
  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条 / 共 ${total} 条`, // 显示总数
  pageSizeOptions: ['10', '20', '50', '100'], // 可选分页大小
});
let loading = ref(false);
let data = ref([]);
const selectedRowKeys = ref([]);
const columns = ref([
  {
    title: '角色编码',
    align: 'center',
    dataIndex: 'roleCode'
  },
  {
    title: '角色名称',
    align: 'center',
    dataIndex: 'roleName'
  },
  {
    title: '角色描述',
    align: 'center',
    dataIndex: 'description'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: "center",
    customRender: ({ text }) => {
      // 判断空值：null、undefined、空字符串
      return text || '-';
    },
  },
  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    key: "action",
    slots: { customRender: "action" },
  },
]);


/*  新增角色内容及配置 */
const modalVisible = ref(false);
// 判断是编辑还是新增
const IsCreate = ref(true);
const formRef = ref(null);
const formState = reactive({
  roleCode: "",
  roleName: "",
  description: "",
});
const rules = {
  roleCode: [
    { required: true, message: "请输入角色编码", trigger: "blur" },
    { min: 1, max: 50, message: "角色编码长度在1到50个字符之间", trigger: "blur" },
  ],
  roleName: [
    { required: true, message: "请输入角色名称", trigger: "blur" },
    { min: 2, max: 6, message: "角色名称长度在2到6个字符之间", trigger: "blur" },
  ],
  description: [
    { max: 200, message: "描述长度不能超过200个字符", trigger: "blur" },
  ],
};
const handleAdd = () => {
  modalVisible.value = true;
  IsCreate.value = true;
  // 清空表单数据
  Object.assign(formState, {
    roleCode: '',
    roleName: '',
    description: '',
  });
  // 重置表单验证状态
  if (formRef.value) {
    formRef.value.clearValidate();
  }
};
const handleCancel = () => {
  // 可以添加确认提示
  if (formState.roleCode || formState.roleName || formState.description) {
    Modal.confirm({
      title: '提示',
      content: '您有未保存的内容，确定要关闭吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        modalVisible.value = false;
      },
      onCancel() {
        modalVisible.value = false;
        // 什么都不做，保持弹窗打开
      },
    });
  } else {
    modalVisible.value = false;
  }
};
// 提交修改角色
const handleOk = () => {
  formRef.value
    .validate()
    .then(async () => {
      // 提交逻辑
      const res = await getDatas(IsCreate.value ? "system/AddUserRole" : "system/EditUserRole", {
        roleCode: formState.roleCode,
        roleName: formState.roleName,
        description: formState.description
      });
      console.log("提交角色信息", res);
      if (res.data.code === 200) {
        ElMessage.success(IsCreate.value ? '角色新增成功' : '角色修改成功');
        handleSearch();
      } else {
        ElMessage.error(res.data.message);
      }
      modalVisible.value = false;

      // 触发父组件刷新等操作
      // emit('success');
    })
    .catch((error) => {
      console.log('验证失败:', error);
    });
}
// 编辑角色
const handleEdit = (record) => {
  modalVisible.value = true;
  IsCreate.value = false;
  // 填充表单数据
  Object.assign(formState, {
    roleCode: record.roleCode,
    roleName: record.roleName,
    description: record.description,
  });
  // 重置表单验证状态
  if (formRef.value) {
    formRef.value.clearValidate();
  }
};
// 删除
const handleDelete = async (id) => {
  let resp = await getDatas("system/DeleteUserRole", {
    id: id
  });
  console.log(resp, '778899');

  if (resp.data.code == 200) {
    ElMessage.success('角色删除成功');
    handleSearch();
  } else {
    ElMessage.error(resp.data.message);
  }
};


// 清空选择
const onClearSelected = () => {
  selectedRowKeys.value = [];
};

// 选择变更
const onSelectChange = (newSelectedRowKeys) => {
  console.log(newSelectedRowKeys);

  selectedRowKeys.value = newSelectedRowKeys;
  searchForm.username = '';
  searchForm.roleId = newSelectedRowKeys[0] || '';

  handleUserSearch();
};

// 授权
const drawerVisible = ref(false);
const selectedRoleId = ref(null);
const handleSave = (values) => {
  console.log("保存授权待实现", selectedRoleId.value, values);
};
const handleClose = () => {
  drawerVisible.value = false;
};
const handlePerssion = (id) => {
  console.log("授权功能待实现123", id);
  drawerVisible.value = true;
  selectedRoleId.value = id
};
// 角色树结构
const fetchPermissionTree = async () => {
  try {
    const response = await getDatas('system/GetRoleListTree');
    console.log("获取权限树响应:", response);

    return response.data.result.treeList
  } catch (error) {
    console.error('获取权限树失败:', error)
    return []
  }
}
// 角色已选权限
const fetchCheckedPermissions = async (roleId) => {
  try {
    const response = await getDatas('system/GetRoleListTreeById', { roleId });

    return response.data.result
  } catch (error) {
    console.error('获取已选权限失败:', error)
    return []
  }
}
// 保存角色权限
const saveRolePermissions = async (saveData) => {
  try {
    console.log("保存权限参数:", saveData);
    const response = await getDatas('system/SaveRolePermission', saveData);
    console.log(response, '132132');
    if (response.data.code === 200) {
      ElMessage.success('保存成功');
      fetchPermissionTree();
      fetchCheckedPermissions(selectedRoleId.value);

    }
  } catch (error) {
    console.error('保存权限失败:', error)
    throw error
  }
}


// 查询
const handleSearch = async () => {
  loading.value = true;
  console.log("查询功能待实现", roleName.value);
  const res = await getDatas("system/GetUserRole", {
    pageNo: pagination.current,
    roleName: roleName.value,
    pageSize: pagination.pageSize
  });
  console.log("获取用户角色管理信息", res);
  if (res.data.code === 0) {
    data.value = res.data.result.records;
    pagination.total = Number(res.data.result.total || 0);
    loading.value = false;
  }
};


// 重置
const handleReset = () => {
  roleName.value = "";
  handleSearch();
};

const handleExportXls = (fileName) => {
  if (!fileName || typeof fileName != "string") {
    fileName = "导出文件"
  }
  let param = this.getQueryParams();
  if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
    param['selections'] = this.selectedRowKeys.join(",")
  }
  console.log("导出参数", param)
  downFile(this.url.exportXlsUrl, param).then((data) => {
    if (!data) {
      this.$message.warning("文件下载失败")
      return
    }
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      window.navigator.msSaveBlob(new Blob([data], { type: 'application/vnd.ms-excel' }), fileName + '.xls')
    } else {
      let url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' }))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', fileName + '.xls')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link); //下载完成移除元素
      window.URL.revokeObjectURL(url); //释放掉blob对象
    }
  })
}


// 角色对应的客户端用户管理
// 搜索表单
const searchForm = reactive({
  username: '',
  roleId: ''
})

const searchFormRef = ref()
const selectedUserRowKeys = ref([])
const UserColumns = [
  {
    title: '用户账号',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '用户名称',
    dataIndex: 'realname',
    key: 'realname',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    slots: { customRender: 'status' }
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' }
  }
]

const tableData = ref([])
const Userloading = ref(false)
// 分页配置
const UserPagination = reactive({
  current: 1,
  pageSize: 10,
  total: 102,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total, range) => `${range[0]}-${range[1]} 共 ${total} 条`,
  pageSizeOptions: ['10', '20', '50', '100']
})

const handleUserSearch = async () => {
  Userloading.value = true;
  let res = await getDatas("system/GetRoleListInfo", {
    roleId: searchForm.roleId,
    username: searchForm.username,
    pageNo: UserPagination.current,
    pageSize: UserPagination.pageSize
  });
  if (res.data.code === 0) {
    tableData.value = res.data.result.records || [];
    UserPagination.total = Number(res.data.result.total || 0);
  }
  Userloading.value = false;
}

const handleUserReset = () => {
  searchForm.username = '';
  searchFormRef.value?.resetFields();
}
const handleTableChange = (pagination, filters, sorter) => {
  console.log('表格分页或排序变更:', pagination, filters, sorter);
  UserPagination.current = pagination.current;
  UserPagination.pageSize = pagination.pageSize;
  handleUserSearch(); // 重新请求表格数据

}
const handleUserEdit = (record) => {
  console.log('编辑用户:', record);
}
// 单个删除
const handleUserDelete = async (record) => {
  console.log('删除用户:', record);
  let resp = await getDatas("system/DeleteUserinfo", {
    userId: record.id,
    roleId: searchForm.roleId
  });
  if (resp.data.code == 200) {
    ElMessage.success('用户删除成功');
    handleUserSearch();
  } else {
    ElMessage.error(resp.data.message);
  }
}
// 批量删除
const handleUserBatchDelete = async () => {
  // 提示
  ElMessageBox.confirm(
    `是否确认删除选中的 ${selectedUserRowKeys.value.length} 个用户？`,
    '批量删除用户',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    console.log('批量删除用户:', selectedUserRowKeys.value);
    let resp = await getDatas("system/DeleteUserinfoBatch", {
      userIds: selectedUserRowKeys.value.join(','),
      roleId: searchForm.roleId
    });
    if (resp.data.code == 200) {
      ElMessage.success('用户批量删除成功');
      handleUserSearch();
      handleClearUserSelection();
    } else {
      ElMessage.error(resp.data.message);
    }
  }).catch(() => { });
  // 确认删除


}


const handleClearUserSelection = () => {
  selectedUserRowKeys.value = [];
};

const handleBatchDelete = () => {
  console.log('批量删除用户:', selectedUserRowKeys.value);
};

const onSelectUserChange = (newSelectedRowKeys) => {
  selectedUserRowKeys.value = newSelectedRowKeys;
};


/* 添加已有用户弹窗相关 ---------------------*/ 

const addUserModalRef = ref();
const handleImportUser = () => {
  console.log('已有用户');
  addUserModalRef.value.openModal();
}

const handleUserSelected =  async (selectedUsers) => {
  console.log('选择的用户:123123', selectedUsers);
  // 这里可以处理选择的用户，比如添加到当前角色或组织中
  const resp = await getDatas("system/AddSysUserRole", {
    roleId: searchForm.roleId,
    userIds: selectedUsers.map(item => item).join(',')
  });
  if (resp.data.code == 200) {
    ElMessage.success('用户添加成功');
    handleUserSearch();
  } else {
    ElMessage.error(resp.data.message);
  }
};

const handleModalCancel = () => {
  console.log('弹框已取消');
};
/* 添加用户弹窗相关 ---------------------*/ 
const userAddDrawerRef = ref();
const handleAddUser = () => {
  console.log('新增用户');
  userAddDrawerRef.value.openDrawer();
}
const handleSubmitSuccess = (userData) => {
  console.log('新增的用户数据:', userData);
  // 这里可以刷新列表或进行其他操作
};
onMounted(() => {
  handleSearch();
})

</script>
<style lang="less" scoped>
button {
  border-radius: 5px;
}

.role {
  gap: 20px;
}

.role_l {
  width: 48%;
}

.role_r {

  flex: 1;
}
</style>
