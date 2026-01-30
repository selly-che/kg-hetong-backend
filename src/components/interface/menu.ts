// types/menu.ts
export enum MenuType {
  DIRECTORY = 0, // 一级菜单/目录
  MENU = 1,      // 子菜单
  BUTTON = 2     // 按钮/权限
}

export enum PermsType {
  VISIT = '1',   // 可访问
  EDIT = '2'     // 可编辑（未授权时禁用）
}

export enum Status {
  DISABLED = 0,  // 无效
  ENABLED = 1    // 有效
}

export enum OpenType {
  COMPONENT = 'Component', // 组件
  INNER = 'inner',        // 内部
  OUTER = 'outer'         // 外部
}

export interface MenuItem {
  id?: string;
  key?: string;
  title: string;
  name: string;
  parentId: string;
  perms?: string;
  permsType?: PermsType;
  icon?: string;
  component?: string;
  url: string;
  redirect?: string;
  sortNo: number;
  menuType: MenuType;
  isLeaf: boolean;
  route: boolean;
  keepAlive: boolean;
  description?: string;
  delFlag?: number;
  alwaysShow: boolean;
  hidden: boolean;
  status: Status;
  internalOrExternal: boolean;
  children?: MenuItem[];
  leaf: boolean;
  [key: string]: any;
}

export interface MenuFormData {
  menuType: MenuType;
  name: string;
  parentId: string;
  url: string;
  perms?: string;
  permsType?: PermsType;
  component?: string;
  redirect?: string;
  icon?: string;
  sortNo: number;
  route: boolean;
  hidden: boolean;
  keepAlive: boolean;
  alwaysShow: boolean;
  status: Status | string;
  internalOrExternal: boolean;
}