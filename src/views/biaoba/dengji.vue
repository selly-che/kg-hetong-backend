<template>
    <div class="page-content">
        <div class="iframe-container">
            后端管理模板
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';

onMounted(() => {
    console.log('组件挂载完成');
});


</script>

<style lang="less" scoped>
.page-content {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
}


</style>