/**
 * 左侧菜单栏
 */

// 从 localStorage 中获取的菜单数据

const rawMenus = localStorage.getItem('wuyemenusJSON');
interface MenuItem {
    index: string;
    title: string;
    icon?: string;
    children?: MenuItem[];
}

let menus: MenuItem[] = rawMenus ? JSON.parse(rawMenus) : [];

// 转换菜单数据格式以匹配 layoutMenuItems 结构
function formatMenus(menus: MenuItem[]): MenuItem[] {
    return menus.map(menu => ({
        index: menu.index,
        title: menu.title,
        icon: menu.icon,
        children: menu.children ? menu.children.map(child => ({
            index: child.index,
            title: child.title,
            path: { name: child.index }, 
        })) : [],
    }));
}

menus = formatMenus(menus);


export default menus; 