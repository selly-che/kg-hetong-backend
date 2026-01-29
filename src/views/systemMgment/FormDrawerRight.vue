<template>
  <a-drawer
    :width="720"
    :title="title"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="用户账号" name="username">
            <a-input v-model:value="form.username" placeholder="请输入用户账号" :disabled="isDetail"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="用户姓名" name="realname">
            <a-input v-model:value="form.realname" placeholder="请输入用户姓名" :disabled="isDetail"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="头像" name="avatar">
            <a-input v-model:value="form.avatar" placeholder="请输入头像地址" :disabled="isDetail"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="性别" name="sex">
            <a-input v-model:value="form.sex" placeholder="请输入性别" :disabled="isDetail"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="生日" name="birthday">
            <a-date-picker
              v-model:value="form.birthday"
              style="width: 100%"
              placeholder="请选择生日"
              :get-popup-container="(trigger) => trigger.parentElement"
              :disabled="isDetail"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="手机号码" name="phone">
            <a-input v-model:value="form.phone" placeholder="请输入手机号码" :disabled="isDetail"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="部门" name="orgCodeTxt">
            <a-input v-model:value="form.orgCodeTxt" placeholder="请输入部门" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="负责部门" name="departIds">
            <a-input v-model:value="form.departIds" placeholder="请输入负责部门" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <!-- <slot name="form-content">暂无内容</slot> -->
    <a-button @click="onClose" style="margin-right: 10px" v-if="isDetail">退出</a-button>
    <template v-else>
      <a-button @click="onClose" style="margin-right: 10px">取消</a-button>
      <a-button type="primary" @click="submitForm">提交</a-button>
    </template>
  </a-drawer>
</template>

<script setup>
import { reactive, ref } from "vue";
import {defineExpose} from "vue"

const isDetail = ref(false);
const form = reactive({
  username: "",
  realname: "",
  avatar: "",
  sex: "",
  birthday: null,
  phone: "",
  orgCodeTxt: "",
  departIds: "",
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
};

const visible = ref(false);
// 展开抽屉
const showDrawer = (record, detail) => {
  isDetail.value = detail;
  if (record) {
    Object.assign(form, {
      username: record.username || "",
      realname: record.realname || "",
      avatar: record.avatar || "",
      sex: record.sex || "",
      birthday: record.birthday || null,
      phone: record.phone || "",
      orgCodeTxt: record.orgCodeTxt || "",
      departIds: record.departIds || "",
    });
  } else {
    Object.assign(form, {
      username: "",
      realname: "",
      avatar: "",
      sex: "",
      birthday: null,
      phone: "",
      orgCodeTxt: "",
      departIds: "",
    });
  }
  visible.value = true;
};

const onClose = () => {
  visible.value = false;
};
const submitForm = () => {};

defineExpose({
  showDrawer,
});
</script>
