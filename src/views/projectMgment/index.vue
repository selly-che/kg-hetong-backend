<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      v-model:collapsed="collapsed"
      width="280"
      style="background-color: rgb(25, 97, 172)"
    >
      <div class="sidebar-container">
        <!-- 查询项目标题 -->
        <a-input-search
          v-model:value="searchText"
          placeholder="请输入项目名称"
          enter-button
          style="margin-bottom: 16px; margin-top: 16px"
          @search="handleSearch"
        />
        <!-- 责任类型筛选标签 --><!-- 筛选类型： 司控主责,司控参与,自揽主责,自揽参与-->
        <div class="filter-tags">
          <a-tag
            v-for="tag in responsibilityTags"
            :key="tag.value"
            :color="activeResponsibility === tag.value ? 'blue' : 'default'"
            class="filter-tag1"
            @click="handleResponsibilityChange(tag.value)"
          >
            {{ tag.label }}
          </a-tag>
        </div>
        <!-- 过滤标签--四个方的 -->
        <div class="filter-tags">
          <a-tag
            v-for="tag in filterTags"
            :key="tag.value"
            :color="activeFilter === tag.value ? 'blue' : 'default'"
            class="filter-tag"
            @click="handleFilterChange(tag.value)"
          >
            {{ tag.label }}
          </a-tag>
        </div>

        <!-- 选项卡 -->
        <div class="project-tabs">
          <a-tabs v-model:activeKey="activeTab">
            <a-tab-pane key="main" tab="主管项目" />
            <a-tab-pane key="assist" tab="协管项目" />
          </a-tabs>
        </div>

        <!-- 项目列表 -->
        <div class="project-list">
          <a-menu
            v-model:selectedKeys="selectedMenuKeys"
            v-model:openKeys="openMenuKeys"
            mode="inline"
            :inline-collapsed="collapsed"
          >
            <!-- 动态渲染项目 -->
            <a-sub-menu v-for="project in filteredProjects" :key="project.Id">
              <template #title>
                <span class="project-title">{{ project.text }}</span>
              </template>
              <template v-for="node in project.nodes" :key="node.Id">
                <a-sub-menu v-if="node.nodes && node.nodes.length">
                  <template #title>
                    <span>{{ node.text }}</span>
                  </template>
                  <a-menu-item
                    v-for="child in node.nodes"
                    :key="child.Id"
                    @click="handleMenuClick(node.Id, child.Id)"
                  >
                    {{ child.text }}
                  </a-menu-item>
                </a-sub-menu>
                <a-menu-item
                  v-else
                  :key="node.Id"
                  @click="handleMenuClick(node.Id)"
                >
                  {{ node.text }}
                </a-menu-item>
              </template>
            </a-sub-menu>
          </a-menu>
        </div>
        <div class="sidebar-footer">
          <a-button type="primary" block @click="$router.push('/home')">
            返回上一级
          </a-button>
        </div>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 16px">
        <div class="header-content">
          <div class="trigger" @click="collapsed = !collapsed">
            <menu-unfold-outlined v-if="collapsed" />
            <menu-fold-outlined v-else />
          </div>
          <div class="header-title">项目管理系统</div>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 16px">
        <div
          :style="{
            background: '#fff',
            minHeight: 'calc(100vh - 132px)',
          }"
        >
          <!-- 页签 -->
          <a-tabs
            v-model:activeKey="activeTabKey"
            type="editable-card"
            hide-add
            @edit="onTabEdit"
            class="content-tabs"
          >
            <a-tab-pane
              v-for="tab in openedTabs"
              :key="tab.key"
              :closable="tab.closable"
            >
              <template #tab>
                <span @click="handleTabClick(tab)">{{ tab.title }}</span>
              </template>
              <div class="tab-content">
                <router-view></router-view>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import getDatas from "@/network/index";

const router = useRouter();
const searchText = ref<string>("");
const collapsed = ref(false);
const activeFilter = ref("all");
const activeResponsibility = ref("company_main");
const activeTab = ref("main");
const selectedMenuKeys = ref<string[]>([]);
const openMenuKeys = ref<string[]>([]);
const activeTabKey = ref("ProjectOverview");
const openedTabs = ref([
  {
    key: "ProjectOverview",
    title: "项目概况",
    closable: false,
    path: "/projectMgment/ProjectOverview",
  },
]);
//
onMounted(() => {
  getProjectList();
});

// 过滤标签数据
const filterTags = ref([
  { label: "全部", value: "all" },
  { label: "铁路", value: "railway" },
  { label: "城轨", value: "urban" },
  { label: "公路", value: "highway" },
]);

// 责任类型筛选标签数据
const responsibilityTags = ref([
  { label: "司控主责", value: "company_main" },
  { label: "司控参与", value: "company_assist" },
  { label: "自揽主责", value: "self_main" },
  { label: "自揽参与", value: "self_assist" },
]);

//后端获取目录列表
const getProjectList = async () => {
  const res = await getDatas("project/GetProjectList", {
    pageNum: 1,
    pageSize: 10,
  });
  const records = res.data.result.records;
  console.log("获取项目列表", JSON.parse(JSON.stringify(records)));

  const defaultNodes = [
    {
      Id: "12e51b31-524f-4683-82ae-e2b526464b3d",
      currentStep: false,
      text: "项目概况",
      href: "/projectMgment/ProjectOverview",
      remote: false,
      nodes: [],
    },
    {
      Id: "80533229-83c8-4d64-ac62-382d92d9724a",
      currentStep: false,
      text: "生产组织",
      href: "/projectMgment/ProductionOrganization",
      remote: false,
      nodes: [],
    },
    {
      Id: "31f603e4-2972-4716-9234-14232d6edb1b",
      currentStep: false,
      text: "进度管理",
      href: "/projectMgment/ProjectProgress",
      remote: false,
      nodes: [],
    },
    {
      Id: "2d9b57c8-0243-4288-aec9-17476d785c76",
      text: "预可研",
      currentStep: true,
      href: "",
      remote: true,
      nodes: [
        {
          Id: "36f18353-c6ee-49db-945b-ffc8cd0fefd0",
          text: "1-1",
          href: "",
          nodes: [],
        },
      ],
    },
    {
      Id: "dbf144f0-71fb-47c0-befe-8ec0348307b2",
      text: "可研",
      currentStep: false,
      href: "",
      remote: true,
      nodes: [
        {
          Id: "7e6656aa-5aa2-49b9-bfd0-64b1fd07065b2",
          text: "1-1",
          href: "",
          nodes: [],
        },
      ],
    },
  ];

  const getProjectType = (projectTypeDetail: string) => {
    if (projectTypeDetail?.includes("铁路")) return "railway";
    if (projectTypeDetail?.includes("城轨")) return "urban";
    if (projectTypeDetail?.includes("公路")) return "highway";
    return "all";
  };

  //（转化后端数据格式）
  newProjects.value = records.map((item: any) => {
    // 为每个项目创建唯一的节点ID
    const uniqueNodes = defaultNodes.map((node) => ({
      ...node,
      Id: `${item.id}-${node.Id}`, // 将项目ID与节点ID组合，确保唯一性
      href: node.href ? `${node.href}?projectId=${item.id}` : node.href, // 在href中添加项目ID参数
      nodes: node.nodes
        ? node.nodes.map((childNode) => ({
            ...childNode,
            Id: `${item.id}-${childNode.Id}`,
          }))
        : [],
    }));

    return {
      Id: item.id,
      href: "",
      text: item.projectFullName,
      tab: "main",
      type: getProjectType(item.projectTypeDetail),
      responsibility: "company_main",
      fname: item.projectFullName,
      Project_Nature: item.projectNature,
      IsFavorites: false,
      nodes: uniqueNodes,
    };
  });
};

//目录数据新
const newProjects = ref([
  {
    Id: "1",
    href: "",
    text: "新都氢能源有轨电车",
    //筛选条件
    tab: "main", //1.主管
    type: "urban", //2.城轨
    responsibility: "company_main", //3.司控主责
    fname: "成都市新都氢能源有轨电车示范线",
    Project_Nature: 0,
    IsFavorites: false,
    nodes: [
      {
        Id: "12e51b31-524f-4683-82ae-e2b526464b3d",
        currentStep: false,
        text: "项目概况",
        href: "/projectMgment/ProjectOverview",
        remote: false,
        nodes: [],
      },
      {
        Id: "80533229-83c8-4d64-ac62-382d92d9724a",
        currentStep: false,
        text: "生产组织",
        href: "/projectMgment/ProductionOrganization",
        remote: false,
        nodes: [],
      },
      {
        Id: "31f603e4-2972-4716-9234-14232d6edb1b",
        currentStep: false,
        text: "进度管理",
        href: "/projectMgment/ProjectProgress",
        remote: false,
        nodes: [],
      },
      {
        Id: "2d9b57c8-0243-4288-aec9-17476d785c76",
        text: "预可研",
        currentStep: true,
        href: "",
        remote: true,
        nodes: [
          {
            Id: "36f18353-c6ee-49db-945b-ffc8cd0fefd0",
            text: "1-1",
            href: "",
            nodes: [],
          },
        ],
      },
      {
        Id: "dbf144f0-71fb-47c0-befe-8ec0348307b2",
        text: "可研",
        currentStep: false,
        href: "",
        remote: true,
        nodes: [
          {
            Id: "7e6656aa-5aa2-49b9-bfd0-64b1fd07065b2",
            text: "1-1",
            href: "",
            nodes: [],
          },
        ],
      },
    ],
  },
  {
    Id: "2",
    href: "",
    text: "兴泉铁路",
    //筛选条件
    tab: "main", //1.主管
    type: "railway", //2.铁路
    responsibility: "company_main", //3.司控主责
  },
]);

// 根据过滤条件和选项卡筛选项目
const filteredProjects = computed(() => {
  return newProjects.value.filter((node) => {
    // 1
    const typeMatch =
      node.type === activeFilter.value || activeFilter.value === "all";
    //2
    const tabMatch = node.tab === activeTab.value || activeTab.value === "all";
    //3 责任类型筛选
    const responsibilityMatch =
      node.responsibility === activeResponsibility.value ||
      activeResponsibility.value === "all";
    //搜索框筛选
    const searchLower = searchText.value.toLowerCase();
    const textMatch =
      node.text.toLowerCase().includes(searchLower) ||
      node.nodes?.some((n) => n.text.toLowerCase().includes(searchLower));
    return typeMatch && tabMatch && responsibilityMatch && textMatch;
  });
});

// 当前显示的内容
const currentContent = ref<any>(null);

// 处理搜索
const handleSearch = (text: string) => {
  searchText.value = text;
};

// 处理过滤标签点击
const handleFilterChange = (filterValue: string) => {
  activeFilter.value = filterValue;
};

// 处理责任类型筛选标签点击
const handleResponsibilityChange = (responsibilityValue: string) => {
  activeResponsibility.value = responsibilityValue;
};

// 处理菜单项点击（修改此处）
const handleMenuClick = (nodeId: string, childId?: string) => {
  // 从节点ID中提取项目ID（格式为：projectId-nodeId）
  const projectId = nodeId.split("-")[0];

  // 先找到项目对象
  const project = newProjects.value.find((p) => p.Id === projectId);
  if (!project) return;

  // 打印项目ID到控制台
  console.log("当前点击的项目ID:", project.Id);
  //本地存储project.Id
  // localStorage.setItem("projectId", project.Id);
  // 从项目的 nodes 中找到对应的节点
  const node = project.nodes?.find((n) => n.Id === nodeId);
  if (!node) return;

  // 只展开当前项目，收起其他所有项目
  if (node.nodes && node.nodes.length > 0) {
    openMenuKeys.value = [project.Id, nodeId];
  } else {
    openMenuKeys.value = [project.Id];
  }
  //
  let targetHref = "";
  let targetTitle = "";

  if (childId) {
    // 确保子节点ID也包含项目ID前缀
    const fullChildId = childId.includes("-")
      ? childId
      : `${projectId}-${childId}`;
    const child = node.nodes?.find((c) => c.Id === fullChildId);
    if (child) {
      targetHref = child.href;
      targetTitle = `${node.text} - ${child.text}`;
      selectedMenuKeys.value = [fullChildId];
    }
  } else {
    targetHref = node.href;
    targetTitle = node.text;
    selectedMenuKeys.value = [nodeId];
  }

  if (targetHref) {
    const routeName = targetHref.split("/").pop() || targetHref;

    const existingTab = openedTabs.value.find((tab) => tab.path === targetHref);
    if (!existingTab) {
      openedTabs.value.push({
        key: routeName,
        title: targetTitle,
        closable: true,
        path: targetHref,
      });
    }

    activeTabKey.value = routeName;
    router.push(targetHref);
  }
};

const handleTabClick = (tab: any) => {
  activeTabKey.value = tab.key;
  router.push(tab.path);
};

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
</script>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.sidebar-container {
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
  /* gap: 20px; */
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

.header-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.trigger {
  font-size: 18px;
  line-height: 1;
  padding: 0 12px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
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
