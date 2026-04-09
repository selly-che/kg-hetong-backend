<template>
  <a-drawer :width="720" :title="title" :visible="visible" :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }" @close="onClose" :maskClosable="false">
    <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="用户账号：" name="username" required>
            <a-input v-model:value="form.username" placeholder="请输入用户账号" :disabled="isDetail" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="用户姓名：" name="realname" required>
            <a-input v-model:value="form.realname" placeholder="请输入用户姓名" :disabled="isDetail" />
          </a-form-item>
        </a-col>
        <!-- type为user时，密码和确认密码不填 -->
        <a-col :span="12" v-if="!form.id && props.type === 'role'">
          <a-form-item label="登录密码" name="password" required>
            <a-input v-model:value="form.password" placeholder="请输入登录密码" :disabled="isDetail" />
          </a-form-item>
        </a-col>
        <a-col :span="12" v-if="!form.id && props.type === 'role'">
          <a-form-item label="确认密码" name="confirmPassword" required>
            <a-input v-model:value="form.confirmPassword" placeholder="请输入确认密码" :disabled="isDetail" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="工号：" name="workNo" required>
            <a-input v-model:value="form.workNo" placeholder="请输入工号" :disabled="isDetail" />
          </a-form-item>
        </a-col>
        <!-- <a-col :span="12">
          <a-form-item label="租户分配：" name="relTenantIds">
            <a-input v-model:value="form.relTenantIds" placeholder="请输入工号" :disabled="isDetail" />
          </a-form-item>
        </a-col> -->
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="角色分配：" name="selectedroles">
            <!-- 使用下来选择器，可以搜索,可以多选 -->
            <a-select v-model:value="form.selectedroles" mode="multiple" placeholder="请选择角色" :disabled="isDetail"
              show-search>
              <a-select-option v-for="role in roleList" :key="role.id" :value="role.id">
                {{ role.roleName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="部门分配：" name="selecteddeparts">
            <a-input v-model:value="form.selecteddeparts" placeholder="请选择部门" suffixIcon="close" :disabled="isDetail" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="职务：" name="post">
            <a-input-group compact>
              <div class="flex_c">
                <a-input v-model:value="form.post" placeholder="请选择职务" style="width: 300px" :disabled="isDetail" />
              </div>
            </a-input-group>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item label="身份：" name="userIdentity">
            <a-radio-group v-model:value="form.userIdentity" :disabled="isDetail">
              <a-radio :value="1">普通用户</a-radio>
              <a-radio :value="2">上级</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="生日：" name="birthday">
            <a-date-picker v-model:value="form.birthday" placeholder="请选择生日" style="width: 300px" format="YYYY-MM-DD"
              :disabled="isDetail" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="性别：" name="sex">
            <a-select v-model:value="form.sex" placeholder="请选择性别" style="width: 300px" :disabled="isDetail">
              <a-select-option :value="1">男</a-select-option>
              <a-select-option :value="2">女</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="邮箱：" name="email">
            <a-input v-model:value="form.email" placeholder="请输入邮箱" :disabled="isDetail" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="手机号码：" name="phone" required>
            <a-input v-model:value="form.phone" placeholder="请输入手机号码" :disabled="isDetail" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="身份证号：" name="telephone">
            <a-input v-model:value="form.telephone" placeholder="请输入座机" :disabled="isDetail" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="工作流引擎：" name="activitiSync">
            <a-radio-group v-model:value="form.activitiSync" :disabled="isDetail">
              <a-radio :value="1">同步</a-radio>
              <a-radio :value="0">不同步</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <!-- 操作按钮 -->
    <a-button @click="onClose" style="margin-right: 10px" v-if="isDetail">退出</a-button>
    <template v-else>
      <a-button @click="onClose" style="margin-right: 10px">取消</a-button>
      <a-button type="primary" @click="submitForm">提交</a-button>
    </template>
  </a-drawer>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { defineExpose } from "vue"
import { ElMessage } from "element-plus";
import getDatas from "@/network/index";
import dayjs from 'dayjs';
import {  defineEmits } from "vue";

const emit = defineEmits(['refreshList']);

const props = defineProps({
  title: {
    type: String,
    default: '默认标题'
  },
  type: {
    type: String,
    default: 'role' // 'role' 或 'user'
  },
  selectedroles: {
    type: Array,
    default: []
  }
});

const isDetail = ref(false);
const form = reactive({
  selectedroles: [],
  selecteddeparts: "",
  birthday: null,
  relTenantIds: "",
  activitiSync: 1,
  userIdentity: 1,
  status_dictText: "",
  workNo: "",
  post: "",
  updateBy: "",
  orgCode: "",
  id: "",
  email: "",
  clientId: "",
  sex: "",
  telephone: "",
  departIds: "",
  avatar: "",
  realname: "",
  createBy: "",
  phone: "",
  totalPoints: "",
  orgCodeTxt: "",
  username: "",
  index: "",
});
const rules = {
  username: [
    {
      required: true,
      message: "请输入用户账号",
    },
  ],
  realname: [
    {
      required: true,
      message: "请输入用户姓名",
    },
  ],
  phone: [
    {
      required: true,
      message: "请输入手机号码",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入登录密码",
    },
    {
      pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      message: "密码必须包含 8 位以上，且同时包含数字、大写字母、小写字母和特殊符号",
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: "请再次输入密码以确认",
    },
    {
      validator: (rule, value) => {
        if (!value) return Promise.resolve();
        if (value !== form.password) {
          return Promise.reject("两次输入的密码不一致");
        }
        return Promise.resolve();
      },
    },
  ],
};

// 角色的数据列表
const roleList = ref([]);
// 获取角色列表
const GetRoleList = async () => {
  try {
    const resp = await getDatas("system/GetUserRole");
    console.log(resp, 'respresp');

    if (resp && resp.data.code === 0) {
      roleList.value = resp.data.result.records;
    }
  } catch (error) {
    console.error("获取角色列表失败:", error);
  }
};

const visible = ref(false);

// 展开抽屉
const showDrawer = (record, detail) => {
  isDetail.value = detail;
  console.log(record, 'recordrecord');

  if (record) {
    Object.assign(form, {
      // 字符串转数组
      selectedroles: record.selectedroles ? record.selectedroles.split(",") : [],
      selecteddeparts: record.selecteddeparts || null,
      birthday: record.birthday ? dayjs(record.birthday) : null,
      relTenantIds: record.relTenantIds || null,
      activitiSync: record.activitiSync !== undefined ? record.activitiSync : 1,
      userIdentity: record.userIdentity !== undefined ? record.userIdentity : 1,
      status_dictText: record.status_dictText || '正常',
      workNo: record.workNo || null,
      post: record.post || null,
      updateBy: record.updateBy || null,
      orgCode: record.orgCode || null,
      id: record.id || null,
      email: record.email || null,
      clientId: record.clientId || null,
      sex: Number(record.sex) || 1,
      telephone: record.telephone || null,
      departIds: record.departIds || null,
      avatar: record.avatar || null,
      realname: record.realname || null,
      createBy: record.createBy || null,
      phone: record.phone || null,
      totalPoints: record.totalPoints || null,
      orgCodeTxt: record.orgCodeTxt || null,
      username: record.username || null,
      index: record.index || null,
      status: record.status || 1,
    });
  } else {
    Object.assign(form, {
      selectedroles: [],
      selecteddeparts: null,
      birthday: null,
      relTenantIds: null,
      activitiSync: 1,
      userIdentity: 1,
      status_dictText: null,
      workNo: null,
      post: null,
      updateBy: null,
      orgCode: null,
      id: null,
      email: null,
      clientId: null,
      sex: null,
      telephone: null,
      departIds: null,
      avatar: null,
      realname: null,
      createBy: null,
      phone: null,
      totalPoints: null,
      orgCodeTxt: null,
      username: null,
      index: null,
      status: 1,
    });
  }

  visible.value = true;
};

const onClose = () => {
  visible.value = false;
};

const selectPost = () => {
  console.log('打开职务选择弹窗');
  // 这里可以打开选择弹窗
};
const formRef = ref(null);
const submitForm = async () => {
  try {
    // await formRef.value?.validate();
    let formData = Object.assign({}, form);
    formData.selectedroles = form.selectedroles.join(","); // 将数组转换为逗号分隔的字符串
    console.log(formData, 'formData');

    // 根据title判断是添加还是编辑
    if (props.title == "添加用户") {
      try {
        const resp = await getDatas("system/AddUserinfo", formData);
        if (resp && resp.data.code === 200) {
          ElMessage.success('用户添加成功');
          onClose();
          emit('refreshList');
        } else {
          ElMessage.error(resp.data.message || '用户添加失败');
        }
      } catch (error) {
        ElMessage.error('用户添加失败');
      }
    } else if (props.title === "编辑用户") {
      try {
        const resp = await getDatas("system/EditUserinfo", formData);
          console.log(resp, '编辑用户resp');
        if (resp && resp.data.code == 200) {
          ElMessage.success('用户编辑成功');
          onClose();
          // 这里可以触发父组件的刷新方法，例如通过 emit 事件
          
          emit('refreshList');
        } else {
          ElMessage.error(resp.data.message || '用户编辑失败');
        }
      } catch (error) {
        //   console.log(798798119999);
        // ElMessage.error('用户编辑失败');
      }
    }
  } catch (error) {
    console.error('表单验证错误:', error);
  }
};

onMounted(() => {
  GetRoleList();
});

defineExpose({
  showDrawer,
});
</script>

<style scoped>
/* 添加一些样式 */
.ant-form-item-label {
  font-weight: 500;
}

.ant-form-item-required::before {
  content: '*';
  color: red;
  margin-right: 4px;
}

.flex_c {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>