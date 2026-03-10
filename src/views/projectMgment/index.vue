<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" width="280" style="background-color: rgb(25, 97, 172)">
      <div class="sidebar-container">
        <!-- 查询项目标题 -->
        <a-input-search allow-clear v-model:value="searchText" placeholder="请输入项目名称" enter-button
          style="margin-bottom: 16px; margin-top: 16px" @search="handleSearch" />

        <!-- 责任类型筛选标签 -->
        <div class="filter-tags">
          <a-tag v-for="tag in responsibilityTags" :key="tag.value"
            :color="activeResponsibility === tag.value ? 'blue' : 'default'" class="filter-tag1"
            @click="handleResponsibilityChange(tag.value)">
            {{ tag.label }}
          </a-tag>
        </div>

        <!-- 过滤标签 -->
        <div class="filter-tags">
          <a-tag v-for="tag in filterTags" :key="tag.value" :color="activeFilter === tag.value ? 'blue' : 'default'"
            class="filter-tag" @click="handleFilterChange(tag.value)">
            {{ tag.label }}
          </a-tag>
        </div>

        <!-- 选项卡 -->
        <div class="project-tabs">
          <a-tabs v-model:activeKey="activeTab" @change="TabClickFn">
            <a-tab-pane key="main" tab="主管项目" />
            <a-tab-pane key="assist" tab="协管项目" />
          </a-tabs>
        </div>

        <!-- 项目列表 -->
        <div class="project-list">
          <a-menu v-model:selectedKeys="selectedMenuKeys" v-model:openKeys="openMenuKeys" mode="inline"
            :inline-collapsed="collapsed">
            <!-- 动态渲染项目 -->
            <a-sub-menu v-for="project in filteredProjects" :key="project.Id">
              <template #title>
                <span class="project-title">{{ project.text }}</span>
              </template>

              <!-- 固定的二级菜单项 -->
              <a-menu-item v-for="fixedItem in project.fixedNodes" :key="fixedItem.Id"
                @click="handleMenuItemClick(fixedItem)">
                {{ fixedItem.text }}
              </a-menu-item>

              <!-- 动态的二级菜单项（来自taskArrangements） -->
              <a-sub-menu v-for="taskItem in project.taskNodes" :key="taskItem.Id">
                <template #title>
                  <span>{{ taskItem.text }}</span>
                </template>

                <!-- 固定的三级菜单项 -->
                <a-menu-item v-for="thirdLevelItem in taskItem.children" :key="thirdLevelItem.Id"
                  @click="handleMenuItemClick(thirdLevelItem)">
                  {{ thirdLevelItem.text }}
                </a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
          </a-menu>
        </div>

        <!-- 固定在底部的返回首页按钮 -->
        <div class="sidebar-footer">
          <a-button type="primary" block @click="goHomeFn"> 回到首页 </a-button>
        </div>
      </div>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 16px">
        <div class="header-content">
          <div class="header-title">项目管理系统</div>
        </div>
      </a-layout-header>

      <a-layout-content style="margin: 16px">
        <div :style="{
          background: '#fff',
          minHeight: 'calc(100vh - 132px)',
        }">
          <!-- 页签 -->
          <a-tabs v-model:activeKey="activeTabKey" type="editable-card" hide-add @edit="onTabEdit" class="content-tabs">
            <a-tab-pane v-for="tab in openedTabs" :key="tab.key" :closable="tab.closable">
              <template #tab>
                <span @click="handleTabClick(tab)">{{ tab.title }}</span>
              </template>
            </a-tab-pane>
          </a-tabs>
          <div class="tab-content">
            <keep-alive :include="cachedViews">
              <router-view v-slot="{ Component }">
                <component :is="Component" />
              </router-view>
            </keep-alive>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import getDatas from "@/network/index";
import { ElMessage } from "element-plus";

const router = useRouter();
const searchText = ref<string>("");
const collapsed = ref(false);
const activeFilter = ref("");
const activeResponsibility = ref("company_main");
const activeTab = ref("main");
const selectedMenuKeys = ref<string[]>([]);
const openMenuKeys = ref<string[]>([]);
const activeTabKey = ref("ProjectOverview");
// 缓存的视图组件名称
const cachedViews = ref<string[]>([
  "ProjectOverview",
  "ProductionOrganization",
  "ScheduleManagement",
  "ProjectTeam",
  "WorkArrangementList",
  "WorkArrangement",
]);
const openedTabs = ref<any[]>([]);

// 过滤标签数据
const filterTags = ref([
  { label: "全部", value: "", index: null },
  { label: "铁路", value: "0", index: 1 },
  { label: "城轨", value: "1", index: 2 },
  { label: "公路", value: "2", index: 3 },
]);

// 责任类型筛选标签数据
const responsibilityTags = ref([
  { label: "司控主责", value: "company_main", index: 1 },
  { label: "司控参与", value: "company_assist", index: 2 },
  { label: "自揽主责", value: "self_main", index: 3 },
  { label: "自揽参与", value: "self_assist", index: 4 },
]);

// 项目数据
const projects = ref<any[]>([]);

const goHomeFn = () => {
  // 跳转到首页，打开新页面
  window.open("/", "_blank");
};

const getResponsibilityIndex = (value: string): number => {
  const tag = responsibilityTags.value.find(item => item.value === value);
  return tag ? tag.index : 0;
};
const getFilterIndex = (value: string): number | null => {
  const tag = filterTags.value.find(item => item.value === value);
  return tag ? tag.index : null;
};

const TabClickFn = (key: string) => {
  // 切换标签页时，更新 activeTabKey
  activeTabKey.value = key;
  getProjectList();
};
// 获取项目列表
const getProjectList = async () => {
  projects.value = []; // 清空当前项目列表
  try {
    let saixuantLx1 = getResponsibilityIndex(activeResponsibility.value);
    let saixuantLx2 = getFilterIndex(activeFilter.value);
    const res = await getDatas("project/GetProjectList", {
      projectFullName: searchText.value,
      pageNum: 1,
      pageSize: 10,
      saixuantLx1:saixuantLx1,
      saixuantLx2: saixuantLx2,
      saixuantLx3: activeTab.value === 'main' ? 1 : 2,
    });

    if (res.data.code !== 200) {
      ElMessage.warning("查询失败");
      return;
    }

    const records = res.data.result.records;
    console.log("项目列表信息:", records);
    // 处理项目数据结构
    projects.value = records.map((project: any) => {
      // 生成固定二级菜单项
      const fixedNodes = [
        {
          Id: `${project.id}-overview`,
          text: "项目概况",
          href: `/projectMgment/ProjectOverview?projectId=${project.id}`,
          projectId: project.id,
        },
        {
          Id: `${project.id}-production`,
          text: "生产组织",
          href: `/projectMgment/ProductionOrganization?projectId=${project.id}&projectStep=${project.projectStep}`,
          projectId: project.id
        }
      ];

      // 处理taskArrangements为二级菜单项
      const taskNodes = (project.taskArrangements || []).map(
        (task: any, index: number) => {
          const taskId = `${project.id}-task-${index}`;

          // 为每个task添加固定的三级菜单
          const children = [
            {
              Id: `${taskId}-team-${Date.now()}`,
              text: "组建项目组成员",
              href: `/projectMgment/ProjectTeam?taskArrangementId=${task.id}&projectStep=${task.projectStep}`,
              projectId: project.id,
              projectStep: task.projectStep,
              taskId: task.id,
            },
            {
              Id: `${taskId}-all-work-${Date.now()}`,
              text: "查看全部工作安排",
              href: `/projectMgment/WorkArrangementList?projectId=${project.id}&projectStep=${task.projectStep}`,
              projectId: project.id,
              projectStep: task.projectStep,
              taskId: task.id,
            },
            {
              Id: `${taskId}-work-${Date.now()}`,
              text: "工作安排",
              href: `/projectMgment/WorkArrangement?projectId=${project.id}&projectStep=${task.projectStep}`,
              projectId: project.id,
              projectStep: task.projectStep,
              taskId: task.id,
            },
          ];

          return {
            Id: taskId,
            text: task.projectStepStr || `任务阶段${index + 1}`,
            projectId: project.id,
            children: children,
          };
        },
      );

      return {
        Id: project.id,
        text: project.projectFullName,
        tab: "main",
        type: getProjectType(project.projectTypeDetail),
        responsibility: "company_main",
        fname: project.projectFullName,
        Project_Nature: project.projectNature,
        IsFavorites: false,
        fixedNodes: fixedNodes,
        taskNodes: taskNodes,
      };
    });
    selectedMenuKeys.value = [];
      openMenuKeys.value = [];
  } catch (error) {
    console.error("获取项目列表失败:", error);
    ElMessage.error("获取项目列表失败");
  }
};

// 根据项目类型详情获取类型标识
const getProjectType = (projectTypeDetail: string) => {
  if (projectTypeDetail?.includes("铁路")) return "0";
  if (projectTypeDetail?.includes("城轨")) return "1";
  if (projectTypeDetail?.includes("公路")) return "2";
  return "";
};

// 根据过滤条件和选项卡筛选项目
const filteredProjects = computed(() => {
  return projects.value
  return projects.value.filter((project) => {
    // 类型匹配
    const typeMatch =
      project.type === activeFilter.value || activeFilter.value === "";
    // 选项卡匹配
    const tabMatch = project.tab === activeTab.value || activeTab.value === "";
    // 责任类型匹配
    const responsibilityMatch =
      project.responsibility === activeResponsibility.value ||
      activeResponsibility.value === " ";
    // 搜索匹配
    const searchLower = searchText.value.toLowerCase();
    const textMatch = project.text.toLowerCase().includes(searchLower);
    return typeMatch && tabMatch && responsibilityMatch && textMatch;
  });

});

// 处理菜单项点击
const handleMenuItemClick = (menuItem: any) => {
  console.log("点击菜单项:", menuItem);

  // 更新选中状态
  selectedMenuKeys.value = [menuItem.Id];

  // 处理路由跳转
  if (menuItem.href) {
    const routeName =
      menuItem.href.split("/").pop()?.split("?")[0] || menuItem.href;

    // 检查是否已存在相同路径的标签页
    const existingTab = openedTabs.value.find(
      (tab) => tab.path === menuItem.href,
    );
    if (!existingTab) {
      openedTabs.value.push({
        key: routeName,
        title: menuItem.text,
        closable: true,
        path: menuItem.href,
      });
    }

    // 激活当前标签页并跳转路由
    activeTabKey.value = routeName;
    console.log(`激活标签页: ${routeName}`);

    router.push(menuItem.href);
  }
};

// 处理搜索
const handleSearch = (text: string) => {
  searchText.value = text;
  getProjectList();
};

// 处理过滤标签点击
const handleFilterChange = (filterValue: string) => {
  activeFilter.value = filterValue;
  getProjectList();
};

// 处理责任类型筛选标签点击
const handleResponsibilityChange = (responsibilityValue: string) => {
  console.log(responsibilityValue, '责任类型');

  activeResponsibility.value = responsibilityValue;
  getProjectList();
};

// 处理标签页点击
const handleTabClick = (tab: any) => {
  activeTabKey.value = tab.key;
  router.push(tab.path);
};

// 处理标签页编辑（关闭）
const onTabEdit = (targetKey: any, action: "add" | "remove") => {
  if (action === "remove") {
    const index = openedTabs.value.findIndex((tab) => tab.key === targetKey);
    if (index > -1) {
      openedTabs.value.splice(index, 1);
      if (activeTabKey.value === targetKey && openedTabs.value.length > 0) {
        const lastTab = openedTabs.value[openedTabs.value.length - 1];
        activeTabKey.value = lastTab.key;
        router.push(lastTab.path);
      }
    }
  }
};

onMounted(() => {
  getProjectList();
});
</script>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.sidebar-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0 8px;
}

.sidebar-header {
  padding: 16px 8px 8px;
  color: rgba(255, 255, 255, 0.85);
}

.sidebar-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 8px 16px;
}

.filter-tag {
  cursor: pointer;
  margin: 0 !important;
  flex: 1;
  text-align: center;
  min-width: 45px;
  border-radius: 10px;
  border: 1px solid #000000;
}

.filter-tag1 {
  cursor: pointer;
  margin: 0 !important;
  padding: 0 !important;
  flex: 1;
  text-align: center;
  min-width: 45px;
}

.project-tabs {
  padding: 0 8px 8px;
}

.project-tabs :deep(.ant-tabs-nav) {
  margin: 0;
}

.project-tabs :deep(.ant-tabs-nav-list) {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.project-tabs :deep(.ant-tabs-tab) {
  margin: 0 !important;
  padding: 8px 0 !important;
  flex: 1;
  text-align: center;
  color: rgba(255, 255, 255, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
}

.project-tabs :deep(.ant-tabs-tab-active) {
  color: #1890ff;
}

.project-tabs :deep(.ant-tabs-ink-bar) {
  background: #1890ff;
}

.project-list {
  padding: 0 8px;
  flex: 1;
  overflow-y: auto;
  margin-bottom: 16px;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE 10+ */
}

.project-list :deep(.ant-menu) {
  background: transparent;
  border-right: none;
}

.project-list :deep(.ant-menu-submenu-title),
.project-list :deep(.ant-menu-item) {
  color: rgba(255, 255, 255, 0.65);
  border-radius: 4px;
  margin: 2px 0;
}

.project-list :deep(.ant-menu-item-selected) {
  background-color: #1890ff;
  color: white;
}

.project-list :deep(.ant-menu-item:hover),
.project-list :deep(.ant-menu-submenu-title:hover) {
  color: white;
}

.project-title {
  font-weight: 500;
}

.sidebar-footer {
  margin-top: auto;
  padding: 16px 8px;
  background: rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 100%;
}

.header-title {
  font-size: 18px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}

.content-tabs {
  padding: 8px 24px 0;
}

.content-tabs :deep(.ant-tabs-nav) {
  margin-bottom: 0;
}

.content-tabs :deep(.ant-tabs-tab) {
  padding: 8px 16px;
}

.tab-content {
  padding: 20px;
  overflow-y: auto;
  max-height: calc(100vh - 150px);
}
</style>
