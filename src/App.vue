<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive :include="/(for)$/">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>

<style lang="less"></style>
