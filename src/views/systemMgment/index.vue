<template>
  <div class="container">
    <div class="title">系统管理</div>
    <span>用户管理和角色权限配置</span>
    <a-popover placement="rightTop">
      <template v-slot:content>
        <div
          class="content"
          style="
            width: 300px;
            height: 300px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: flex-start;
          "
        >
          <div>
            <p>系统管理员:</p>
            <p>所有权限<br />用户管理<br />系统设置<br />数据备份</p>
          </div>
          <div>
            <p>分管领导：</p>
            <p>合同审批<br />项目查看<br />统计查询<br />下属管理</p>
          </div>
          <div>
            <p>部门主管：</p>
            <p>部门管理<br />合同查看<br />项目查看<br />统计查询</p>
          </div>
          <div>
            <p>一般使用人员：</p>
            <p>合同查看<br />项目查看<br />基础查询</p>
          </div>
          <div>
            <p>合同管理员：</p>
            <p>合同管理<br />合同录入<br />台账管理<br />统计查询</p>
          </div>
        </div>
      </template>
      <QuestionCircleTwoTone />
    </a-popover>
    <div class="context">
      <Context />
    </div>
  </div>
</template>
<script setup>
import Context from "./Context.vue";
import { QuestionCircleTwoTone } from "@ant-design/icons-vue";
</script>

<style lang="less" scoped>
.title {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}
.context {
  width: 100%;
  height: 600px;
  background-color: #ffffff;
}
</style>
