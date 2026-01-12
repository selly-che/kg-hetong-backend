<!-- 生成一个查看选择数量的组件、   已选择0项   清空  使用vue3 -->
<template>
    <div class="select-number">
        <div>
            <span>已选择</span>
            <span class="c18 fwb num">{{ num }}</span>
            <span>项</span>
        </div>
        <div>
            <a-button @click="clearSelect" type="link" >清空</a-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
    num: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits(['clearSelect'])
// 点击清空 触发父组件事件
const clearSelect = () => {
    console.log('13213');
    emit('clearSelect', 0); // 传递单个值
}

</script>

<style scoped lang="less">
.select-number {
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
    display: flex;
    align-items: center;
    padding: 2px 40px;
    border-radius: 8px;
    margin: 16px 0;

    .num {
        padding: 0 4px;
    }
}
</style>