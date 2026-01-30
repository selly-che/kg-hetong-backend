<template>
    <a-drawer v-model:visible="visible" title="新增用户" width="700" placement="right" @close="handleClose">
        <a-form ref="formRef" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }" :model="formState" :rules="rules"
            layout="horizontal">
            <!-- 第一行：用户账号 -->
            <a-form-item label="用户账号" name="username" :rules="[{ required: true, message: '请输入用户账号!' }]">
                <a-input v-model:value="formState.username" placeholder="请输入用户账号" allow-clear />
            </a-form-item>
            <a-form-item label="用户姓名" name="realname" :rules="[{ required: true, message: '请输入用户姓名' }]">
                <a-input v-model:value="formState.realname" placeholder="请输入用户姓名" allow-clear />
            </a-form-item>

            <!-- 第二行：登录密码 -->
            <a-form-item label="登录密码" name="password" :rules="[{ required: true, message: '请输入登录密码' }]">
                <a-input-password v-model:value="formState.password" placeholder="请输入登录密码" allow-clear />
            </a-form-item>
            <a-form-item label="确认密码" name="confirmPassword" :rules="[
                { required: true, message: '请重新输入登录密码' },
                { validator: validatePassword }
            ]">
                <a-input-password v-model:value="formState.confirmPassword" placeholder="请重新输入登录密码" allow-clear />
            </a-form-item>

            <!-- 第三行：工号和职务 -->
            <a-form-item label="工号" name="workNo">
                <a-input v-model:value="formState.workNo" placeholder="请输入工号" allow-clear />
            </a-form-item>
            <a-form-item label="职务" name="post">
                <a-select v-model:value="formState.post" placeholder="请选择职务" allow-clear>
                    <a-select-option value="manager">经理</a-select-option>
                    <a-select-option value="director">总监</a-select-option>
                    <a-select-option value="employee">员工</a-select-option>
                </a-select>
            </a-form-item>

            <!-- 第四行：部门分配和租户分配 -->
            <a-form-item label="部门分配" name="departIds">
                <a-button type="primary" ghost @click="showDeptSelect = true">
                    {{ formState.departIds_dictText || '请点击选择部门' }}
                </a-button>
            </a-form-item>
            <a-form-item label="租户分配" name="relTenantIds">
                <a-select v-model:value="formState.relTenantIds" placeholder="请选择租户" allow-clear>
                    <a-select-option value="tenant1">租户1</a-select-option>
                    <a-select-option value="tenant2">租户2</a-select-option>
                </a-select>
            </a-form-item>

            <!-- 第五行：身份和生日 -->
            <a-form-item label="身份" name="userIdentity">
                <a-radio-group v-model:value="formState.userIdentity">
                    <a-radio :value="0">普通用户</a-radio>
                    <a-radio :value="1">上级</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="生日" name="birthday">
                <a-date-picker v-model:value="formState.birthday" placeholder="请选择生日" style="width: 100%" />
            </a-form-item>

            <!-- 第六行：性别和邮箱 -->
            <a-form-item label="性别" name="sex">
                <a-select v-model:value="formState.sex" placeholder="请选择性别" allow-clear>
                    <a-select-option :value="1">男</a-select-option>
                    <a-select-option :value="2">女</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="邮箱" name="email" :rules="[{ type: 'email', message: '请输入有效的邮箱地址' }]">
                <a-input v-model:value="formState.email" placeholder="请输入邮箱" allow-clear />
            </a-form-item>

            <!-- 第七行：手机号码和身份证号 -->
            <a-form-item label="手机号码" name="phone" :rules="[
                { required: true, message: '请输入手机号!' },
                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' }
            ]">
                <a-input v-model:value="formState.phone" placeholder="请输入手机号码" allow-clear />
            </a-form-item>
            <a-form-item label="身份证号" name="telephone">
                <a-input v-model:value="formState.telephone" placeholder="请输入身份证号" allow-clear />
            </a-form-item>

            <!-- 第八行：工作流引擎 -->
            <a-form-item label="工作流引擎" name="activitiSync">
                <a-radio-group v-model:value="formState.activitiSync">
                    <a-radio :value="1">同步</a-radio>
                    <a-radio :value="0">不同步</a-radio>
                </a-radio-group>
            </a-form-item>
        </a-form>

        <!-- 部门选择模态框 -->
        <a-modal v-model:visible="showDeptSelect" title="选择部门" @ok="handleDeptSelectOk"
            @cancel="showDeptSelect = false">
            <!-- 这里可以放部门树形选择组件 -->
            <p>部门选择组件实现...</p>
        </a-modal>

        <!-- 底部按钮 -->
        <template #footer>
            <a-space>
                <a-button @click="handleClose">取消</a-button>
                <a-button type="primary" @click="handleSubmit">提交</a-button>
            </a-space>
        </template>
    </a-drawer>
</template>

<script setup>
import { ref, reactive, defineExpose, defineEmits } from 'vue';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

const emit = defineEmits(['submit-success', 'cancel']);

// 抽屉显示控制
const visible = ref(false);
const showDeptSelect = ref(false);

// 表单引用
const formRef = ref();

// 表单初始状态
const initialFormState = {
    birthday: null,
    relTenantIds: null,
    activitiSync: 1, // 默认同步
    userIdentity: 0, // 默认普通用户
    status_dictText: "",
    delFlag: 0,
    workNo: null,
    post: null,
    updateBy: "",
    orgCode: "",
    id: "",
    email: null,
    clientId: null,
    sex: null,
    departIds_dictText: "",
    telephone: "",
    updateTime: "",
    departIds: "",
    avatar: null,
    realname: "",
    createBy: "",
    phone: "",
    createTime: null,
    totalPoints: null,
    orgCodeTxt: null,
    username: "",
    status: 1,
    // 临时字段
    password: "",
    confirmPassword: ""
};

// 表单状态
const formState = reactive({ ...initialFormState });

// 自定义验证规则
const validatePassword = async (_rule, value) => {
    if (value !== formState.password) {
        return Promise.reject('两次输入的密码不一致');
    }
    return Promise.resolve();
};

// 表单验证规则
const rules = {};

// 打开抽屉
const openDrawer = () => {
    visible.value = true;
    // 重置表单
    Object.assign(formState, initialFormState);
    if (formRef.value) {
        formRef.value.resetFields();
    }
};

// 关闭抽屉
const handleClose = () => {
    visible.value = false;
    emit('cancel');
};

// 部门选择确定
const handleDeptSelectOk = () => {
    // 这里处理部门选择逻辑
    formState.departIds_dictText = "已选部门"; // 示例
    showDeptSelect.value = false;
};

// 提交表单
const handleSubmit = () => {
    formRef.value.validate().then(() => {
        // 处理表单数据
        const submitData = { ...formState };

        // 移除临时字段
        delete submitData.password;
        delete submitData.confirmPassword;

        // 处理日期格式
        if (submitData.birthday) {
            submitData.birthday = dayjs(submitData.birthday).format('YYYY-MM-DD');
        }

        // 处理创建时间
        submitData.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

        console.log('提交数据:', submitData);

        // 这里可以调用API提交数据
        // await api.addUser(submitData);

        message.success('新增用户成功');
        visible.value = false;
        emit('submit-success', submitData);
    }).catch(error => {
        console.log('表单验证失败:', error);
    });
};

// 暴露方法给父组件
defineExpose({
    openDrawer
});
</script>

<style scoped>
/* 可以添加一些自定义样式 */
:deep(.ant-form-item-label) {
    font-weight: 500;
}
</style>