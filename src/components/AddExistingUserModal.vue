<template>
  <a-modal
    v-model:visible="visible"
    title="添加已有用户"
    :width="1000"
    :footer="null"
    @cancel="handleCancel"
  >
    <!-- 搜索区域 -->
    <div class="search-area">
      <a-form
        ref="searchFormRef"
        :model="searchForm"
        layout="inline"
      >
        <a-form-item label="角色名称">
          <a-input
            v-model:value="searchForm.realname"
            placeholder="请输入角色名称"
            style="width: 150px"
          />
        </a-form-item>
        <a-form-item label="用户账号">
          <a-input
            v-model:value="searchForm.username"
            placeholder="请输入用户账号"
            style="width: 150px"
          />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="handleSearch">
              <template #icon><SearchOutlined /></template>
              查询
            </a-button>
            <a-button @click="handleReset">
              <template #icon><RedoOutlined /></template>
              重置
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>

    <!-- 用户列表 -->
    <div class="user-list">
      <a-table
        :columns="columns"
        :data-source="userList"
        :row-key="record => record.id"
        :pagination="false"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          getCheckboxProps: (record) => ({
            disabled: record.disabled || false
          })
        }"
      >
        <template #bodyCell="{ column, record }">
          <!-- 用户账号 -->
          <template v-if="column.dataIndex === 'username'">
            <div class="user-info">
              <a-avatar 
                v-if="record.avatar" 
                :src="record.avatar"
                size="small"
              />
              <a-avatar v-else size="small">
                {{ record.realname?.charAt(0) || record.username?.charAt(0) }}
              </a-avatar>
              <span class="username">{{ record.username }}</span>
            </div>
          </template>

          <!-- 性别 -->
          <template v-else-if="column.dataIndex === 'sex'">
            <span>{{ formatSex(record.sex) }}</span>
          </template>

          <!-- 部门 -->
          <template v-else-if="column.dataIndex === 'depart'">
            <span>{{ record.departIds_dictText || record.departName }}</span>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 分页 -->
    <div class="pagination-area">
      <div class="selected-info">
        已选择 {{ selectedRowKeys.length }} 个用户
      </div>
      <div class="pagination">
        <a-pagination
          v-model:current="pagination.current"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :show-total="total => `共 ${total} 条`"
          show-size-changer
          show-quick-jumper
          :page-size-options="['10', '20', '50', '100']"
          @change="handlePageChange"
          @showSizeChange="handleSizeChange"
        />
      </div>
    </div>

    <!-- 底部操作按钮 -->
    <div class="modal-footer">
      <a-space>
        <a-button @click="handleCancel">关闭</a-button>
        <a-button 
          type="primary" 
          @click="handleConfirm"
          :disabled="selectedRowKeys.length === 0"
        >
          确定
        </a-button>
      </a-space>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import getDatas from "@/network/index";

// 弹框显示控制
const visible = ref(false);

// 搜索表单
const searchForm = reactive({
  realname: '',
  username: ''
});

// 表格列定义
const columns = [
  {
    title: '#',
    width: 60,
    customRender: ({ index }) => index + 1
  },
  {
    title: '用户账号',
    dataIndex: 'username',
    width: 150
  },
  {
    title: '用户名称',
    dataIndex: 'realname',
    width: 120
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 80
  },
  {
    title: '电话',
    dataIndex: 'phone',
    width: 130
  },
  {
    title: '部门',
    dataIndex: 'orgCodeTxt',
    width: 150,
    
  },
];

// 用户数据
const userList = ref([
  
]);

// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 8313
});

// 选中用户
const selectedRowKeys = ref([]);
const selectedRows = ref([]);

// 性别格式化
const formatSex = (sex) => {
  const map = { 1: '男', 2: '女' };
  return map[sex] || '-';
};

// 搜索
const handleSearch = () => {
  pagination.current = 1;
  loadUserList();
};

// 重置
const handleReset = () => {
  searchForm.realname = '';
  searchForm.username = '';
  pagination.current = 1;
  loadUserList();
};

// 加载用户列表
const loadUserList = async () => {
  try {
    // 这里调用API获取用户列表
    const response = await getDatas('system/GetUserinfo', {
      ...searchForm,
      pageNo: pagination.current,
      pageSize: pagination.pageSize
    });
    
    userList.value = response.data.result.records;
    pagination.total = response.data.result.total;
    
    message.success('数据加载成功');
  } catch (error) {
    message.error('数据加载失败');
  }
};

// 分页变化
const handlePageChange = (page, pageSize) => {
  pagination.current = page;
  pagination.pageSize = pageSize;
  loadUserList();
};

// 页面大小变化
const handleSizeChange = (current, size) => {
  pagination.pageSize = size;
  loadUserList();
};

// 选择变化
const onSelectChange = (selectedKeys, selectedRows) => {
  console.log(selectedKeys,'selectedKeys');
  console.log(selectedRows,'selectedRows');
  
  selectedRowKeys.value = selectedKeys;
  selectedRows.value = selectedRows;
};

// 打开弹框
const openModal = () => {
  visible.value = true;
  // 重置选中状态
  selectedRowKeys.value = [];
  selectedRows.value = [];
  // 加载数据
  loadUserList();
};

// 关闭弹框
const handleCancel = () => {
  visible.value = false;
};

// 确认选择
const handleConfirm = () => {
    
  
  if (selectedRowKeys.value.length > 0) {
    // const selectedUsers = selectedRows.value.map(user => ({
    //   id: user.id,
    //   username: user.username,
    //   realname: user.realname,
    //   phone: user.phone,
    //   departName: user.departName,
    //   roles: user.roles
    // }));
    // 触发事件，传递选择的用户数据
    emit('confirm', selectedRowKeys.value);
    
    message.success(`成功选择 ${selectedRowKeys.value.length} 个用户`);
    visible.value = false;
  }
};

// 暴露方法
defineExpose({
  openModal
});

// 定义事件
const emit = defineEmits(['confirm', 'cancel']);

onMounted(() => {
  loadUserList();
});
</script>

<style scoped>
.search-area {
  margin-bottom: 16px;
  padding: 16px;
  background-color: #fafafa;
  border-radius: 4px;
}

.user-list {
  margin-bottom: 16px;
  max-height: 400px;
  overflow-y: auto;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.username {
  font-weight: 500;
}

.pagination-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;
}

.selected-info {
  color: #1890ff;
  font-weight: 500;
}

.pagination {
  display: flex;
  justify-content: flex-end;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

/* 表格样式优化 */
:deep(.ant-table-thead > tr > th) {
  background-color: #fafafa;
  font-weight: 600;
}

:deep(.ant-table-tbody > tr:hover) {
  background-color: #f5f5f5;
}
</style>