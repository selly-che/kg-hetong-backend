<template>
  <a-drawer :width="720" :title="title" :visible="visible" :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }" @close="onClose" :maskClosable="false">
    <a-form :model="form" :rules="rules" layout="vertical">
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
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="工号：" name="workNo" required>
            <a-input v-model:value="form.workNo" placeholder="请输入工号" :disabled="isDetail" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="租户分配：" name="relTenantIds">
            <a-input v-model:value="form.relTenantIds" placeholder="请选择租户" :disabled="isDetail" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="角色分配：" name="selectedroles">
            <a-input v-model:value="form.selectedroles" placeholder="请选择角色" :disabled="isDetail" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="部门分配：" name="orgCodeTxt">
            <a-input v-model:value="form.orgCodeTxt" placeholder="请选择部门" suffixIcon="close" :disabled="isDetail" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="职务：" name="post">
            <a-input-group compact>
              <div class="flex_c">
                <a-input v-model:value="form.post" placeholder="请选择职务" style="width: 300px" :disabled="isDetail" />
                <a-button type="primary" @click="selectPost" :disabled="isDetail">选择</a-button>
              </div>
            </a-input-group>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item label="身份：" name="userIdentity">
            <a-radio-group v-model:value="form.userIdentity" :disabled="isDetail">
              <a-radio value="1">普通用户</a-radio>
              <a-radio value="2">上级</a-radio>
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
              <a-select-option value="1">男</a-select-option>
              <a-select-option value="2">女</a-select-option>
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
          <a-form-item label="* 手机号码：" name="phone" required>
            <a-input v-model:value="form.phone" placeholder="请输入手机号码" :disabled="isDetail" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="身份证号：" name="clientId">
            <a-input v-model:value="form.clientId" placeholder="请输入座机" :disabled="isDetail" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="工作流引擎：" name="activitiSync">
            <a-radio-group v-model:value="form.activitiSync" :disabled="isDetail">
              <a-radio value="1">同步</a-radio>
              <a-radio value="0">不同步</a-radio>
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
import { reactive, ref } from "vue";
import { defineExpose } from "vue"
import { ElMessage } from "element-plus";
import getDatas from "@/network/index";

const props = defineProps({
  title: {
    type: String,
    default: '默认标题'
  }
});

const isDetail = ref(false);
const form = reactive({
  username: "",
  realname: "",
  workNo: "",
  post: "",
  selectedroles: "",
  orgCodeTxt: "",
  relTenantIds: "",
  userIdentity: 1,
  birthday: null,
  sex: "",
  email: "",
  phone: "",
  clientId: "",
  activitiSync: 1,
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
  workNo: [
    {
      required: true,
      message: "请输入工号",
    },
  ],
  phone: [
    {
      required: true,
      message: "请输入手机号码",
    },
  ],
};

const visible = ref(false);

// 展开抽屉
const showDrawer = (record, detail) => {
  isDetail.value = detail;
  console.log(record, 'recordrecord');

  if (record) {
    Object.assign(form, {
      username: record.username || "",
      realname: record.realname || "",
      workNo: record.workNo || "",
      post: record.post || "",
      selectedroles: record.selectedroles || "",
      orgCodeTxt: record.orgCodeTxt || "",
      relTenantIds: record.relTenantIds || "",
      userIdentity: record.userIdentity || 1,
      birthday: record.birthday || null,
      sex: record.sex || "",
      email: record.email || "",
      phone: record.phone || "",
      clientId: record.clientId || "",
      activitiSync: record.activitiSync || 1,
    });
  } else {
    Object.assign(form, {
      username: "",
      realname: "",
      workNo: "",
      post: "",
      selectedroles: "",
      orgCodeTxt: "",
      relTenantIds: "",
      userIdentity: 1,
      birthday: null,
      sex: "",
      email: "",
      phone: "",
      clientId: "",
      activitiSync: 1,
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

const submitForm = async () => {
  try {
    // 根据title判断是添加还是编辑
    if (props.title == "添加用户") {
      try {
        const resp = await getDatas("system/AddUserinfo", form);
        if (resp && resp.data.code === 200) {
          ElMessage.success('用户添加成功');
          onClose();
        } else {
          ElMessage.error(resp.data.message || '用户添加失败');
        }
      } catch (error) {
        ElMessage.error('用户添加失败');
      }
    } else if (props.title === "编辑用户") {
      try {
        const resp = await getDatas("system/EditUserinfo", form);
        if (resp && resp.data.code === 200) {
          ElMessage.success('用户编辑成功');
          onClose();
        } else {
          ElMessage.error(resp.data.message || '用户编辑失败');
        }
      } catch (error) {
        ElMessage.error('用户编辑失败');
      }
    }
  } catch (error) {
    console.error('表单验证错误:', error);
  }
};

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