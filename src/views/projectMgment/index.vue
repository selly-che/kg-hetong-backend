<template>
  <div class="br8">
    <FirstYe
      @tab-change="handleTabChange"
      @category-change="handleCategoryChange"
      @search="handleSearch"
    />
    <div class="content">
      <ul>
        <li class="new-project">+新建项目</li>
        <li v-for="project in filteredProjects" :key="project.id">
          <Side1Cards :project="project" />
        </li>
      </ul>
    </div>
    <div class="footr">
      <PaginationYe />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ProjectMgment",
};
</script>

<script setup lang="ts">
import { ref, computed } from "vue";
import Side1Cards from "@/components/Side1Cards.vue";
import FirstYe from "./FirstYe.vue";
import PaginationYe from "./PaginationYe.vue";

import {categoryType} from "./interface/index"

const activeKey = ref("1");
const activeCategory = ref("all");
const searchText = ref("");
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

// 根据activeKey、activeCategory和searchText过滤项目
const filteredProjects = computed(() => {
  // 先根据状态过滤
  let filteredByStatus = projects;
  if (activeKey.value === "2") {
    // 进行中
    filteredByStatus = projects.filter(
      (project) => project.status === "进行中"
    );
  } else if (activeKey.value === "3") {
    // 已暂停
    filteredByStatus = projects.filter(
      (project) => project.status === "已暂停"
    );
  } else if (activeKey.value === "4") {
    // 已结束
    filteredByStatus = projects.filter(
      (project) => project.status === "已结束"
    );
  }
  // 再根据类目过滤
  if (activeCategory.value !== "all") {
    // 将英文类目转换为中文类型名称
    // const categoryMap = {
    //   railway: "铁路",
    //   tunnel: "隧道",
    //   bridge: "桥梁",
    //   road: "公路",
    // };
    const categoryMap: categoryType = {
      railway: "铁路",
      tunnel: "隧道",
      bridge: "桥梁",
      road: "公路",
    }
    const typeName = categoryMap[activeCategory.value] || activeCategory.value;
    filteredByStatus = filteredByStatus.filter(
      (project) => project.type === typeName
    );
  }
  // 最后根据搜索文本过滤项目名称
  if (searchText.value.trim()) {
    const searchLower = searchText.value.toLowerCase().trim();
    filteredByStatus = filteredByStatus.filter((project) =>
      project.name.toLowerCase().includes(searchLower)
    );
  }
  return filteredByStatus;
});

const handleTabChange = (key: string) => {
  activeKey.value = key;
};

const handleCategoryChange = (category: string) => {
  activeCategory.value = category;
};

const handleSearch = (searchTextValue: string) => {
  searchText.value = searchTextValue;
};
</script>
<style scoped lang="less">
.header {
  width: 100%;
  height: 210px;
  background-color: rgb(255, 255, 255);
  .title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
  }
}
.content {
  width: 100%;
  // height: calc(100% - 200px);
  height: 600px;
  background-color: #ffffff;
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
    .new-project {
      width: 100%;
      height: 100%;
      padding: 12px;
      font-size: 20px;
      font-weight: 600;
      color: #333;
      background-color: #fff;
      border-radius: 8px;
      border: 0.2px solid #bebebe;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      &:hover {
        background-color: #f5f5f5;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
      }
    }
  }
}
.footr {
  display: flex;
  justify-content: flex-end;
}
</style>
