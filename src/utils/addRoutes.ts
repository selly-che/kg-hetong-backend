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

        let resolvedComponentPath = componentMapping[child.component as string] || child.component;
        
        if (placeholderComponents.includes(resolvedComponentPath)) {
          console.log(`菜单项 ${child.name} 是占位符组件，跳过路由添加`);
          return;
        }
        
        if (!resolvedComponentPath || resolvedComponentPath === 'undefined') {
          console.warn(`菜单项 ${child.name} 的 component 为空，尝试从 path 推断:`, child.path);
          const pathParts = child.path?.split('/').filter(Boolean);
          if (pathParts && pathParts.length > 0) {
            resolvedComponentPath = pathParts.join('/');
          } else {
            console.error(`无法为菜单项 ${child.name} 解析组件路径`);
            return;
          }
        }
        
        if (resolvedComponentPath?.startsWith("/")) {
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
      
      let resolvedMenuComponentPath = componentMapping[menu.component ?? ''] || menu.component;
      
      if (placeholderComponents.includes(resolvedMenuComponentPath)) {
        console.log(`菜单项 ${menu.name} 是占位符组件，跳过路由添加`);
        return;
      }
      
      if (!resolvedMenuComponentPath || resolvedMenuComponentPath === 'undefined') {
        console.warn(`菜单项 ${menu.name} 的 component 为空，尝试从 path 推断:`, menu.path);
        const pathParts = menu.path?.split('/').filter(Boolean);
        if (pathParts && pathParts.length > 0) {
          resolvedMenuComponentPath = pathParts.join('/');
        } else {
          console.error(`无法为菜单项 ${menu.name} 解析组件路径`);
          return;
        }
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