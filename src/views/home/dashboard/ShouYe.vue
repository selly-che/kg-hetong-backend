<template>
  <div class="container">
    <div class="header">
      <HeaderYe />
    </div>
    <div class="side  pd20">
      <div class="side1 " >
        <div class="side1-header">
          <span class="side1-title">进行中的项目</span>
          <a class="side1-more" @click="$router.push('/projectMgment')">全部</a>
        </div>
        <ul>
          <li v-for="project in projects" :key="project.id">
            <Side1Cards :project="project" />
          </li>
        </ul>
      </div>
      <div class="side2">
        <EacherPie />
      </div>
    </div>
    <div class="footer">
      <EacherBar />
    </div>
  </div>
</template>

<script setup>
import HeaderYe from "./HeaderYe.vue";
import Side1Cards from "@/components/Side1Cards.vue";
import EacherPie from "./EacherPie.vue";
import EacherBar from "./EacherBar.vue";
import getDatas from "@/network/index";
import { onMounted, ref } from "vue";

const projects = ref([]);
onMounted(() => {
  getProjectList();
});
  const getProjectList = async () => {
  const res = await getDatas("project/GetProjectList", {
    pageNum: 1,
    pageSize: 10,
  });
    console.log("项目列表信息:", res.data.result.records);
    projects.value = res.data.result.records;
};

</script>

<style scoped lang="less">
.header {
  margin-bottom: 10px;
}
.side {
  display: flex;
  justify-content: space-between;
  height: 480px;
  .side1 {
    width: 60%;
    background-color: #ffffff;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
    .side1-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 10px;
      flex-shrink: 0;
      .side1-title {
        font-size: 14px;
        font-weight: 600;
        color: #333;
      }
      .side1-more {
        font-size: 12px;
        cursor: pointer;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      flex: 1;
      padding: 5px;
      margin: 0;
      list-style: none;
      box-sizing: border-box;
      overflow: hidden;
      li {
        width: 33.33%;
        height: 50%;
        box-sizing: border-box;
        padding: 5px;
        display: flex;
        align-items: stretch;
        justify-content: center;
      }
      @media (max-width: 1200px) {
        li {
          width: 33.33%;
        }
      }

      @media (max-width: 992px) {
        li {
          width: 50%;
        }
      }

      @media (max-width: 768px) {
        li {
          width: 100%;
        }
      }
    }
  }
  .side2 {
    width: 40%;
  }
}
.footer {
  background-color: rgb(255, 255, 255);
  margin-top: 10px;
}
</style>
