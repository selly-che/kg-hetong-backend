<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive :include="/(for)$/">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

export default defineComponent({
  name: 'App',
  components: {
    AConfigProvider: ConfigProvider,
  },
  setup() {
    return {
      zhCN,
    };
  }
});
</script>

<style lang="less"></style>
