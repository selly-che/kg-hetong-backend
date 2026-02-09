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
            <a-sub-menu :key="newProjects.Id">
              <template #title>
                <span class="project-title">{{ newProjects.text }}</span>
              </template>
              <template v-for="node in newProjects.nodes" :key="node.Id">
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
            padding: '24px',
            background: '#fff',
            minHeight: 'calc(100vh - 132px)',
          }"
        >
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        项目管理系统 ©2024
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { Tag, Tabs } from "ant-design-vue";

export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ATag: Tag,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
  },
  setup() {
    const router = useRouter();
    const searchText = ref("");
    const collapsed = ref(false);
    const activeFilter = ref("all");
    const activeTab = ref("main");
    const selectedMenuKeys = ref<string[]>([]);
    const openMenuKeys = ref<string[]>([]);

    // 过滤标签数据
    const filterTags = ref([
      { label: "全部", value: "all" },
      { label: "铁路", value: "railway" },
      { label: "城轨", value: "urban" },
      { label: "公路", value: "highway" },
    ]);

    // 旧目录数据
    const projects = ref([
      {
        id: "1",
        name: "新都氢能源有轨电车",
        type: "urban",
        tab: "main",
        children: [
          { id: "1-1", name: "项目概况" },
          { id: "1-2", name: "生产组织" },
          { id: "1-3", name: "进度管理" },
          { id: "1-4", name: "预可研" },
          { id: "1-5", name: "可研" },
        ],
      },
      {
        id: "2",
        name: "兴泉铁路",
        type: "railway",
        tab: "main",
        children: [
          { id: "2-1", name: "项目概况" },
          { id: "2-2", name: "施工进度" },
          { id: "2-3", name: "质量安全" },
        ],
      },
      {
        id: "3",
        name: "京沪高速",
        type: "highway",
        tab: "main",
        children: [
          { id: "3-1", name: "项目概况" },
          { id: "3-2", name: "建设进展" },
        ],
      },
      {
        id: "4",
        name: "地铁3号线",
        type: "urban",
        tab: "assist",
        children: [
          { id: "4-1", name: "项目概况" },
          { id: "4-2", name: "技术协调" },
        ],
      },
    ]);

    //目录数据新
    const newProjects = ref({
      Id: "e4a66a5d-dd41-44b4-836d-37f6e3c495cc",
      href: "",
      text: "新都氢能源有轨电车",
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
              Id: "7e6656aa-5aa2-49b9-bfd0-64b1fd07065b",
              text: "1-1",
              href: "",
              nodes: [],
            },
          ],
        },
      ],
    });

    // 当前显示的内容
    const currentContent = ref<any>(null);

    // 根据过滤条件和选项卡筛选项目
    const filteredProjects = computed(() => {
      return newProjects.value.nodes.filter((node) => {
        return true;
      });
    });

    // 处理搜索
    const handleSearch = (text: string) => {
      searchText.value = text;
    };

    // 处理过滤标签点击
    const handleFilterChange = (filterValue: string) => {
      activeFilter.value = filterValue;
    };

    // 处理菜单项点击（修改此处）
    // const handleMenuClick = (nodeId: string, childId?: string) => {
    //   const node = newProjects.value.nodes.find((n) => n.Id === nodeId);
    //   if (!node) return;

    //   if (childId) {
    //     const child = node.nodes?.find((c) => c.Id === childId);
    //     if (child) {
    //       currentContent.value = {
    //         title: `${node.text} - ${child.text}`,
    //         description: `这是${node.text}的${child.text}页面内容。`,
    //       };
    //     }
    //   } else {
    //     currentContent.value = {
    //       title: node.text,
    //       description: `这是${node.text}的主页面内容。`,
    //     };
    //   }

    //   // 更新选中的菜单项
    //   selectedMenuKeys.value = childId ? [childId] : [nodeId];
    // };

    const handleMenuClick = (nodeId: string, childId?: string) => {
      const node = newProjects.value.nodes.find((n) => n.Id === nodeId);
      if (!node) return;

      let targetHref = "";
      let targetTitle = "";

      if (childId) {
        const child = node.nodes?.find((c) => c.Id === childId);
        if (child) {
          targetHref = child.href;
          targetTitle = `${node.text} - ${child.text}`;
          selectedMenuKeys.value = [childId];
        }
      } else {
        targetHref = node.href;
        targetTitle = node.text;
        selectedMenuKeys.value = [nodeId];
      }

      if (targetHref) {
        router.push(targetHref);
      } else {
        currentContent.value = {
          title: targetTitle,
          description: `这是${targetTitle}的主页面内容。`,
        };
      }
    };
    return {
      searchText,
      collapsed,
      activeFilter,
      activeTab,
      selectedMenuKeys,
      openMenuKeys,
      filterTags,
      currentContent,
      newProjects,
      handleFilterChange,
      handleMenuClick,
      handleSearch,
    };
  },
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
</style>
