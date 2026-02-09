// 定义菜单和菜单项的类型
interface Menu {
    children?: MenuItem[];
    path?: string;
    name?: string;
    component?: string;
    meta?: Record<string, any>;
}

interface MenuItem {
    path: string;
    name: string;
    component: string;
    meta?: Record<string, any>;
}
export default function addDynamicRoutes(router: any, menus: any[]) {
    // 获取所有注册的路由，包括根路由
    const allRoutes = router.options.routes;

    // 找到名为 'Layout' 的路由配置
    const layoutRoute = allRoutes.find((route: any) => route.name == 'Layout');
    if (!layoutRoute) {
        console.error('Layout route not found.');
        return;
    }

    // 获取当前已存在的路由路径，避免重复添加
    const existingPaths = new Set<string>();
    router.getRoutes().forEach((route: any) => {
        existingPaths.add(route.path);
    });

    menus.forEach((menu: Menu) => {
        if (menu.children) {
            menu.children.forEach((child: any) => {
                // 如果路由已存在，则跳过
                if (existingPaths.has(child.path)) {
                    console.log(`路由 ${child.path} 已存在，跳过添加`);
                    return;
                }

                // 跳过添加首页路由，因为它已经在基础路由中定义
                if (child.path === '/home') {
                    console.log('首页路由已存在，跳过添加');
                    return;
                }
   
                // 构建路由配置对象
                const routeConfig = {
                    path: child.path,
                    name: child.name, // 假设 child.component 是唯一的路由名称
                    component: () => import(`@/views/${child.component}.vue`), // 使用 ES6 动态导入语法
                    meta: {
                        ...child.meta,
                        ...(child.path === '/approvalMgment/editht' ? { noTab: true } : {})
                    },
                };
                
                // 添加新的路由配置到 Layout 路由的子路由中
                router.addRoute(layoutRoute.name, routeConfig);
                allRoutes.find((item: any) => item.name === 'Layout')?.children.push(routeConfig);
                
                // 添加到已存在路径集合
                existingPaths.add(child.path);
            });
        }else if (menu.path) {
            // 如果路由已存在，则跳过
            if (existingPaths.has(menu.path)) {
                console.log(`路由 ${menu.path} 已存在，跳过添加`);
                return;
            }
            // 如果菜单项没有子菜单，则直接添加到 Layout 路由的子路由中
            const routeConfig = {
                path: menu.path,
                name: menu.name,
                component: () => import(`@/views/${menu.component}.vue`),
                meta: {
                    ...menu.meta,
                    // 为编辑合同路由添加 noTab 配置
                    ...(menu.path === '/approvalMgment/editht' ? { noTab: true } : {})
                },
            };
            router.addRoute(layoutRoute.name, routeConfig);
            allRoutes.find((item: any) => item.name === 'Layout')?.children.push(routeConfig);
            existingPaths.add(menu.path);
        }

        
    });
    // console.log("allRoutes",allRoutes);
}

