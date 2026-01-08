<template>
  <div class="input-com">
    <label for="">{{ props.label }}</label>
    <input :type="props.type" :placeholder="props.placeholder" v-model="inputValue">
  </div>
</template>

<script lang="ts" setup>
//定义自定义属性
import { defineProps, defineEmits, ref, watchEffect } from "vue";
const props = defineProps({
  label: {
    type: String,
    default: "标题"
  },
  type: {
    type: String,
    default: "text"
  },
  placeholder: {
    type: String,
    default: "请输入文本内容"
  },
  rule: {
    type: String,
    default: ""
  },
  value: {
    type: String,
    default: ""
  }
});
// defineEmits用来定义自定义事件的触发对象，接收数组作为参数，可以同时触发多个不同的自定义事件
const emit = defineEmits(["getValue"]);
const inputValue = ref(props.value);
//监听value属性值的变化，变化时将数据同步给外界
watchEffect(() => {
  //校验数据的合法性
  const re = new RegExp(props.rule);
  let value = inputValue.value;
  if (!re.test(value)) {
    value = "";
  }
  //将数据同步给父级组件
  emit("getValue", value);
}); 
</script>

<style lang="less" scoped>
.input-com {
  display: flex;
  justify-content: space-between;
  align-items: center;

  label {
    width: 30%;
    display: block;
    text-align: right;
  }

  input {
    width: 68%;
    padding: 7px 15px;
    box-sizing: border-box;
    border: 1px solid #999;
    border-radius: 5px;
    outline: none;

    &:focus {
      border: 1px solid #aaff;
    }
  }
}
</style>