<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    首页
    <div >
      测试icon
      <MenuFoldOutlined />
    </div>
    <div>
      测试icon
      <MenuUnfoldOutlined />
    </div>
    <a-button type="primary" @click="TestclickFn">测试点击</a-button>
    <a-button>Default Button</a-button>
    <a-button type="dashed">Dashed Button</a-button>
    <a-button type="text">Text Button</a-button>
    <a-button type="link">Link Button</a-button>
    <!-- <inputCom label="用户名"  v-model="inputValue"></inputCom> -->
  </div>
</template>



<script lang="ts" setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
// import { inputCom } from '@/components/input-com.vue'
import { ref } from "vue";

import getDatas from "@/network/index";

const TestclickFn = async () => {
  // 调用home接口
  const res = await getDatas("home/GetIndex", {
    phone: 11,
    password: 22,
  });
  console.log(res, "798798");
};
</script>

<style lang="less" scoped>
.home {
  padding: 1rem;
  // background-color: white;
  // margin-top: 1rem;
}
</style>
