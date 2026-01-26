<template>
  <div class="container">
    <div class="header">
      <HeaderYe />
    </div>
    <div class="side  pd20">
      <div class="side1 " >
        <div class="side1-header">
          <span class="side1-title">进行中的项目</span>
          <a class="side1-more">全部</a>
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

const projects = [
  {
    id: 1,
    name: "项目A",
    type: "隧道",
    status: "进行中",
    groupContractCount: 24,
    outsourcingContractCount: 5,
  },
  {
    id: 2,
    name: "项目B",
    type: "铁路",
    status: "进行中",
    groupContractCount: 18,
    outsourcingContractCount: 3,
  },
  {
    id: 3,
    name: "项目C",
    type: "桥梁",
    status: "已暂停",
    groupContractCount: 12,
    outsourcingContractCount: 2,
  },
  {
    id: 4,
    name: "项目D",
    type: "公路",
    status: "已结束",
    groupContractCount: 30,
    outsourcingContractCount: 8,
  },
  {
    id: 5,
    name: "项目E",
    type: "隧道",
    status: "已结束",
    groupContractCount: 22,
    outsourcingContractCount: 4,
  },
];
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
