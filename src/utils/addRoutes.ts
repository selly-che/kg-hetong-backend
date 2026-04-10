// ... existing code ...
export default function addDynamicRoutes(router: any, menus: any[]) {
  const componentMapping: Record<string, string> = {
    "system/UserList": "systemMgment/userMgment",
    "system/RoleUserList": "systemMgment/roleMgment",
    "system/PermissionList": "systemMgment/menuMgment",
    "/isystem/user": "systemMgment/userMgment",
    "/isystem/roleUserList": "systemMgment/roleMgment",
    "/isystem/permission": "systemMgment/menuMgment",
    "contractMgment": "contractMgment/internal",
    "/contractMgment": "contractMgment/internal",
    "projectMgment": "projectMgment/index",
    "/projectMgment": "projectMgment/index",
    "ledgerMgment": "ledgerMgment/index",
    "/ledgerMgment": "ledgerMgment/index",
    "approvalMgment": "approvalMgment/index",
    "/approvalMgment": "approvalMgment/index",
    "bidMgment": "bidMgment/index",
    "/bidMgment": "bidMgment/index",
    "systemMgment": "systemMgment/index",
    "/systemMgment": "systemMgment/index",
    "layouts/RouteView": "layout/layout",
  };

  const placeholderComponents = [
    "layouts/RouteView",
    "RouteView",
    "Layout",
    "layouts/Layout",
  ];

  const allRoutes = router.options.routes;

  const layoutRoute = allRoutes.find((route: any) => route.name == "Layout");
  if (!layoutRoute) {
    console.error("Layout route not found.");
    return;
  }

  const existingPaths = new Set<string>();
  router.getRoutes().forEach((route: any) => {
    existingPaths.add(route.path);
  });

  menus.forEach((menu: any) => {
    if (menu.children) {
      menu.children.forEach((child: any) => {
        if (existingPaths.has(child.path)) {
          console.log(`路由 ${child.path} 已存在，跳过添加`);
          return;
        }

        if (child.path === "/home") {
          console.log("首页路由已存在，跳过添加");
          return;
        }

        let resolvedComponentPath =
          componentMapping[child.component as string] ||
          componentMapping[child.path as string] ||
          child.component ||
          child.path;

        if (!resolvedComponentPath) {
          console.warn(
            "动态路由添加失败：子菜单缺少 component 配置，已跳过",
            child,
          );
          return;
        }

        if (resolvedComponentPath.startsWith("/")) {
          resolvedComponentPath = resolvedComponentPath.slice(1);
        }
        
        if (
          !resolvedComponentPath?.includes("/") &&
          !resolvedComponentPath?.endsWith(".vue") &&
          resolvedComponentPath?.length > 0
        ) {
          resolvedComponentPath = `${resolvedComponentPath}/index`;
        }

        const routeConfig = {
          path: child.path,
          name: child.name,
          component: () => import(`@/views/${resolvedComponentPath}.vue`),
          meta: {
            ...child.meta,
            ...(child.path === "/approvalMgment/editht" ? { noTab: true } : {}),
          },
        };

        router.addRoute(layoutRoute.name, routeConfig);
        allRoutes
          .find((item: any) => item.name === "Layout")
          ?.children.push(routeConfig);

        existingPaths.add(child.path);
      });
    } else if (menu.path) {
      if (existingPaths.has(menu.path)) {
        console.log(`路由 ${menu.path} 已存在，跳过添加`);
        return;
      }
      // 移除了路径开头的斜杠
      let resolvedMenuComponentPath =
        componentMapping[menu.component as string] ||
        componentMapping[menu.path as string] ||
        menu.component ||
        menu.path;

      if (!resolvedMenuComponentPath) {
        console.warn(
          "动态路由添加失败：菜单缺少 component 配置，已跳过",
          menu,
        );
        return;
      }
      if (resolvedMenuComponentPath?.startsWith("/")) {
        resolvedMenuComponentPath = resolvedMenuComponentPath.slice(1);
      }
      
      if (
        resolvedMenuComponentPath &&
        !resolvedMenuComponentPath.includes("/") &&
        !resolvedMenuComponentPath.endsWith(".vue") &&
        resolvedMenuComponentPath.length > 0
      ) {
        resolvedMenuComponentPath = `${resolvedMenuComponentPath}/index`;
      }

      const routeConfig = {
        path: menu.path,
        name: menu.name,
        component: () => import(`@/views/${resolvedMenuComponentPath}.vue`),
        meta: {
          ...menu.meta,
          ...(menu.path === "/approvalMgment/editht" ? { noTab: true } : {}),
        },
      };
      router.addRoute(layoutRoute.name, routeConfig);
      allRoutes
        .find((item: any) => item.name === "Layout")
        ?.children.push(routeConfig);
      existingPaths.add(menu.path);
    }
  });
}