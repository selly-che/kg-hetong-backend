import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/views/layout/layout.vue";
import addDynamicRoutes from "@/utils/addRoutes";
import { ElMessageBox } from "element-plus";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/projectMgment",
    name: "projectMgment",
    component: () => import("../views/projectMgment/index.vue"),
    meta: { check: true },
    children: [
      {
        path: "ProjectHome",
        name: "ProjectHome",
        component: () => import("../views/projectMgment/ProjectHome.vue"),
        meta: { check: true, title: "项目首页" },
      },
      {
        path: "projectAdded",
        name: "projectAdded",
        component: () => import("../views/projectMgment/projectAdded.vue"),
        meta: { check: true, title: "项目新增" },
      },
      {
        path: "ProjectOverview",
        name: "ProjectOverview",
        component: () => import("../views/projectMgment/ProjectOverview.vue"),
        meta: { check: true, title: "项目概况" },
      },
      {
        path: "ProductionOrganization",
        name: "ProductionOrganization",
        component: () =>
          import("../views/projectMgment/ProductionOrganization.vue"),
        meta: { check: true, title: "生产组织" },
      },
      {
        path: "ProjectProgress",
        name: "ScheduleManagement",
        component: () =>
          import("../views/projectMgment/ScheduleManagement.vue"),
        meta: { check: true, title: "进度管理" },
      },
      // 查看组建项目组成员
      {
        path: "ProjectTeam",
        name: "ProjectTeam",
        component: () => import("../views/projectMgment/ProjectTeam.vue"),
        meta: { check: true, title: "组建项目组成员" },
      },
      // 查看全部工作安排
      {
        path: "WorkArrangementList",
        name: "WorkArrangementList",
        component: () =>
          import("../views/projectMgment/WorkArrangementList.vue"),
        meta: { check: true, title: "查看全部工作安排", keepAlive: true },
      },
      // 工作安排
      {
        path: "WorkArrangement",
        name: "WorkArrangement",
        component: () => import("../views/projectMgment/WorkArrangement.vue"),
        meta: { check: true, title: "工作安排", keepAlive: true },
      },
      // 自揽项目信息维护
      // {
      //    path: "projectMaintenance",
      //   name: "projectMaintenance",
      //   component: () => import("../views/projectMgment/projectMaintenance.vue"),
      //   meta: { check: true, title: "自揽项目信息维护" },
      // }
    ],
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    meta: { check: true },
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/home/dashboard/ShouYe.vue"),
        meta: { check: true, title: "首页" },
      },
      {
        path: "/approvalMgment/editht",
        name: "editht",
        component: () => import("../views/approvalMgment/edit/Editht.vue"),
        meta: { check: true, title: "编辑合同", noTab: true },
      },
      {
        path: "/projectMgment/create",
        name: "create",
        component: () => import("../views/projectMgment/Create.vue"),
        meta: { check: true, title: "新建项目", noTab: true },
      },
      {
        path: "/contractMgment/htDetail/:id/:name",
        name: "htDetail",
        component: () => import("../views/contractMgment/HtDetail.vue"),
        meta: { check: true, title: "内部合同详情", noTab: false },
      },
      {
        path: "/contractMgment/outsourcingDetail/:id/:name",
        name: "outsourcingDetail",
        component: () =>
          import("../views/contractMgment/outsourcingDetail.vue"),
        meta: { check: true, title: "外协合同详情", noTab: false },
      },
      //代办事项
      {
        path: "/todoList",
        name: "todoList",
        component: () => import("../views/Todolist/index.vue"),
        meta: { check: true, title: "代办事项" },
      },
      {
        path: "/contractMgment/internal",
        name: "contractMgment-internal",
        component: () => import("../views/contractMgment/internal.vue"),
        meta: { check: true, title: "内部合同" },
      },
      // 外协合同
      {
        path: "/contractMgment/outsourcing",
        name: "contractMgment-outsourcing",
        component: () => import("../views/contractMgment/outsourcing.vue"),
        meta: { check: true, title: "外协合同" },
      },
      {
        path: "/bidMgment",
        name: "bidMgment-index",
        component: () => import("../views/bidMgment/index.vue"),
        meta: { check: true, title: "投标管理" },
      },
      {
        path: "/approvalMgment",
        name: "approvalMgment-index",
        component: () => import("../views/approvalMgment/index.vue"),
        meta: { check: true, title: "审批管理" },
      },
      {
        path: "/ledgerMgment",
        name: "ledgerMgment-index",
        component: () => import("../views/ledgerMgment/index.vue"),
        meta: { check: true, title: "台账管理" },
      },
      {
        path: "/projectMgment/projectMaintenance",
        name: "projectMgment-index",
        component: () => import("../views/projectMgment/projectMaintenance.vue"),
        meta: { check: true, title: "项目管理" },
      },
      {
        path: "/systemMgment/userMgment",
        name: "system-user",
        component: () => import("../views/systemMgment/userMgment.vue"),
        meta: { check: true, title: "用户管理" },
      },
      {
        path: "/systemMgment/menuMgment",
        name: "isystem/permission",
        component: () => import("../views/systemMgment/menuMgment.vue"),
        meta: { check: true, title: "用户管理" },
      },
      {
        path: "/systemMgment/roleMgment",
        name: "system-role",
        component: () => import("../views/systemMgment/roleMgment.vue"),
        meta: { check: true, title: "角色管理" },
      }

    ],
  },
  {
    path: "/login",
    name: "login",
    meta: { check: false },
    component: () => import("../views/login/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("accesstoken");
  const currentRoutes = router.getRoutes(); // 获取当前所有路由
  const layoutRoute = currentRoutes.find((item) => item.name === "Layout");

  // 如果用户未登录且访问需要认证的路由，则重定向到登录页面
  if (!token && to.meta.check) {
    ElMessageBox.alert("登录失效，请重新登录", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "",
      type: "warning",
      callback: (action: any) => {
        router.push({ name: "login" });
      },
    });

    return;
  } 

  // 已登录且需要初始化路由
  // 注意：检查是否有子路由，但至少应该有一个首页路由
  if (token && layoutRoute && layoutRoute.children.length <= 5) {
    const menus = JSON.parse(localStorage.getItem("wuyemenusJSON") || "[]");
    addDynamicRoutes(router, menus);
    // 在动态路由添加完成后，再添加 404 路由
    router.addRoute({
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("../views/error/404.vue"),
    });
    // 如果当前路由是根路径或首页，直接导航到首页
    if (to.path === "/" || to.path === "/home") {
      next("/home");
      return;
    }
    console.log(to, "addDynamicRoutes");
    // 否则重定向到目标路由
    next({ ...to, replace: true });
    return;
  }

  // 处理直接访问 / 根路径的情况
  if (to.path === "/") {
    next("/home");
    return;
  }

  next();
});

export default router;
