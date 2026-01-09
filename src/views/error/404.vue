<template>
    <div class="peijianSort">
       抱歉，你访问的页面不存在或无权访问
       <div> <a-button type="primary" @click="gohome">返回首页</a-button></div>
    </div>

</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
const Router = useRouter();

onMounted(() => {
    console.log('组件挂载完成');
    adc(1);
});

const adc = (item :any) => {
    console.log("item",JSON.parse(JSON.stringify(item)));
}
const gohome = () => {
    Router.push({ path: '/' });
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