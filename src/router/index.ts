import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/views/layout/layout.vue";
import addDynamicRoutes from "@/utils/addRoutes";

const routes: Array<RouteRecordRaw> = [
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
    ],
  },
  {
    path: "/login",
    name: "login",
    meta: { check: false },
    component: () => import("../views/login/Login.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("../views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("wuyetoken");
  // console.log("token",JSON.parse(JSON.stringify(token)));
  const currentRoutes = router.getRoutes(); // 获取当前所有路由
  const layoutRoute = currentRoutes.find((item) => item.name === "Layout");

  // 如果用户未登录且访问需要认证的路由，则重定向到登录页面
  if (!token && to.meta.check) {
    next({ name: "login" });
    return;
  }

  // 已登录且需要初始化路由
  // 注意：检查是否有子路由，但至少应该有一个首页路由
  if (token && layoutRoute && layoutRoute.children.length <= 1) {
    const menus = JSON.parse(localStorage.getItem("wuyemenusJSON") || "[]");
    addDynamicRoutes(router, menus);
    // 如果当前路由是根路径或首页，直接导航到首页
    if (to.path === "/" || to.path === "/home") {
      next("/home");
      return;
    }

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
