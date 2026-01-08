<template>
    <div class="peijianSort">
       投标管理
    </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';

onMounted(() => {
    console.log('组件挂载完成');
    adc(1);
});

const adc = (item :any) => {
    console.log("item",JSON.parse(JSON.stringify(item)));
}
</script>

<style lang="less" scoped> 
.peijianSort {
    padding: 1rem;
    // border: 1px solid #ebeef5;
    background-color: white;
    // margin-top: 1rem;
    margin: 1rem;

}
</style>