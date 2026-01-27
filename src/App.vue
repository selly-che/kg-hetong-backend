<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive :include="/(for)$/">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>
<script setup>
import { ConfigProvider } from 'ant-design-vue';
// 配置全局的弹出层行为
const modalConfig = {
  getContainer: () => document.body,
  focusTrap: true,
  autoFocus: true,
  destroyOnClose: true,
};
</script>

<style lang="less"></style>
