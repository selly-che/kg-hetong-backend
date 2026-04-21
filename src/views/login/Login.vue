<template>
  <div class="login">
    <div class="from">
      <div class="title">合同管理系统</div>
      <div>主账号：admin</div>
      <div>主管账号-陈叔清：csq </div>
      <div style="margin-bottom: 20px;">协管账号-卢静静：ljj</div>
      <el-input v-model="input" size="large" style="width: 400px" placeholder="请输入您的账号" prefix-icon="User" />
      <div class="password">
        <el-input v-model="password" @keyup.enter="login" size="large" type="password" style="width: 400px"
          placeholder="请输入您的密码" show-password prefix-icon="Lock" />
      </div>
      <!-- 添加回车 -->
      <div class="login-btn" @click="login"  @keydown.enter="login">登录</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import getDatas from "@/network/index";
import { ElMessage } from "element-plus";
import { setUserPermissions } from '@/directives/permission'
import { useStore } from 'vuex';

const input = ref("csq");
const password = ref("123456");
const router = useRouter();

const store = useStore();
const login = async () => {
  console.log("登录", input.value, password.value);

  //正常登录流程
  const res = await getDatas("common/PostLogin", {
    username: input.value,
    password: password.value,
  });

  // 存储用户的姓名
  localStorage.setItem("userName", input.value);
  // 存储用户名
  store.dispatch('common/setUserName', input.value);
  const userName = store.getters['common/userName'];
  console.log(userName, 'userNameuserNameuserName');

  // 存储用户的职位
  if (res.data.code == 200) {
    // console.log(menus, 'menusmenus');
    localStorage.setItem("accesstoken", res.data.result.token); //本地存储
    localStorage.setItem("userInfo", JSON.stringify(res.data.result.userInfo));
    const resp = await getDatas("common/getUserPermission"); // 获取角色菜单
    console.log(resp, "respresp");
    // 存储权限标识列表
    if (resp.data.code == 200 && resp.data.result.auth) {
      localStorage.setItem(
        "userPermissions",
        JSON.stringify(resp.data.result.auth),
      );
    }
    //  获取菜单数据
    if (resp.data.code == 200) {
      const auths = resp.data.result.auth || [];
      const userMenus = resp.data.result.menu || [];
      const wuyemenusJSON = JSON.stringify(userMenus);
      localStorage.setItem("wuyemenusJSON", wuyemenusJSON); // 存储用户菜单
      localStorage.setItem("auths", JSON.stringify(auths)); // 存储按钮权限
      router.push("/home");
      // 保存菜单和权限信息
      if (auths && Array.isArray(auths)) {
        setUserPermissions(auths)
      }
    }
  } else {
    ElMessage({ message: res.data.message, type: "error" });
  }
};

//添加监听
onBeforeMount(() => {
  console.log("组件首次挂载之前");
});

onMounted(() => {
  console.log("组件首次挂载完成");
});
</script>
<style lang="less" scoped>
.login {
  background-color: #f2f3f5;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  .from {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 10px;
    padding: 2rem;
    // box-shadow: ;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    .title {
      color: black;
      font-size: 18px;
      font-weight: bold;
      background-color: white;
      text-align: center;
      margin-bottom: 2rem;
    }

    .password {
      margin-top: 1rem;
    }

    .login-btn {
      margin-top: 1.5rem;
      color: white;
      text-align: center;
      padding: 8px 0;
      border-radius: 5px;
      background-color: #409eff;
      cursor: pointer;
      font-size: 14px;
    }
  }
}
</style>
