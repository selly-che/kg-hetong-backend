// ... existing code ...
export default function addDynamicRoutes(router: any, menus: any[]) {
  const componentMapping: Record<string, string | null> = {
    "system/UserList": "systemMgment/userMgment",
    "system/RoleUserList": "systemMgment/roleMgment",
    "system/PermissionList": "systemMgment/menuMgment",
    "contractMgment/internal": "contractMgment/internal",
    "contractMgment/outsourcing": "contractMgment/outsourcing",
    "projectMgment/projectMaintenance": "projectMgment/projectMaintenance",
    "ledgerMgment": "ledgerMgment/index",
    "/ledgerMgment": "ledgerMgment/index",
    "approvalMgment": "approvalMgment/index",
    "/approvalMgment": "approvalMgment/index",
    "bidMgment": "bidMgment/index",
    "/bidMgment": "bidMgment/index",
    "systemMgment": "systemMgment/index",
    "/systemMgment": "systemMgment/index",
    "layouts/RouteView": null,
    "RouteView": null,
    "Layout": null,
    "layouts/Layout": null,
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
  const existingNames = new Set<string>();
  
  router.getRoutes().forEach((route: any) => {
    existingPaths.add(route.path);
    if (route.name) {
      existingNames.add(String(route.name));
    }
  });

  const resolveComponentPath = (component: string, path: string): string | null => {
    if (componentMapping[component] === null || componentMapping[path] === null) {
      return null;
    }

    let resolvedPath = componentMapping[component] || componentMapping[path] || component || path;

    if (!resolvedPath) {
      return null;
    }

    if (resolvedPath.startsWith("/")) {
      resolvedPath = resolvedPath.slice(1);
    }

    if (
      !resolvedPath.includes("/") &&
      !resolvedPath.endsWith(".vue") &&
      resolvedPath.length > 0
    ) {
      resolvedPath = `${resolvedPath}/index`;
    }

    return resolvedPath;
  };

  const generateUniqueName = (baseName: string, path: string): string => {
    if (!existingNames.has(baseName)) {
      existingNames.add(baseName);
      return baseName;
    }
    
    const uniqueName = `${baseName}-${path.replace(/\//g, '-')}`;
    if (!existingNames.has(uniqueName)) {
      existingNames.add(uniqueName);
      return uniqueName;
    }
    
    let counter = 1;
    let finalName = `${uniqueName}-${counter}`;
    while (existingNames.has(finalName)) {
      counter++;
      finalName = `${uniqueName}-${counter}`;
    }
    existingNames.add(finalName);
    return finalName;
  };

  menus.forEach((menu: any) => {
    if (menu.children && menu.children.length > 0) {
      menu.children.forEach((child: any) => {
        if (existingPaths.has(child.path)) {
          console.log(`路由 ${child.path} 已存在，跳过添加`);
          return;
        }

        if (child.path === "/home") {
          console.log("首页路由已存在，跳过添加");
          return;
        }

        const isPlaceholderComponent = placeholderComponents.includes(child.component);
        if (isPlaceholderComponent) {
          console.log(`子菜单 ${child.path} 是占位组件，跳过添加`);
          return;
        }

        const resolvedComponentPath = resolveComponentPath(child.component, child.path);

        if (!resolvedComponentPath) {
          console.warn(
            "动态路由添加失败：子菜单缺少 component 配置或为占位组件，已跳过",
            child,
          );
          return;
        }

        const uniqueName = generateUniqueName(child.name || child.path, child.path);

        const routeConfig = {
          path: child.path,
          name: uniqueName,
          component: () => import(`@/views/${resolvedComponentPath}.vue`),
          meta: {
            ...child.meta,
            title: child.meta?.title || "",
            icon: child.meta?.icon || "",
            keepAlive: child.meta?.keepAlive || false,
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

      const isPlaceholderComponent = placeholderComponents.includes(menu.component);
      
      if (isPlaceholderComponent) {
        console.log(`菜单 ${menu.path} 是占位组件，跳过添加`);
        return;
      }

      const resolvedMenuComponentPath = resolveComponentPath(menu.component, menu.path);

      if (!resolvedMenuComponentPath) {
        console.warn(
          "动态路由添加失败：菜单缺少 component 配置，已跳过",
          menu,
        );
        return;
      }

      const uniqueName = generateUniqueName(menu.name || menu.path, menu.path);

      const routeConfig = {
        path: menu.path,
        name: uniqueName,
        component: () => import(`@/views/${resolvedMenuComponentPath}.vue`),
        meta: {
          ...menu.meta,
          title: menu.meta?.title || "",
          icon: menu.meta?.icon || "",
          keepAlive: menu.meta?.keepAlive || false,
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