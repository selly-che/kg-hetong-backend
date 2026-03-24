<template>
  <div class="app">
      <a-config-provider :locale="zhCN">

   
    <router-view v-slot="{ Component }">
      <keep-alive :include="/(for)$/">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
       </a-config-provider>
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
