export default {
  // 获取用户管理数据
  GetUserinfo(params: any) {
    return {
      method: "GET",
      url: "/sys/user/list",
      params,
    };
  },
  // 根据id查询用户数据
  // /jeecg-boot/sys/user/queryById
  GetUserinfoById(params: any) {
    return {
      method: "GET",
      url: "/sys/user/queryById",
      params,
    };
  },
  // 获取用户角色管理信息
  GetUserRole(params: any) {
    return {
      method: "GET",
      url: "/sys/role/list",
      params,
    };
  },

// 根据角色信息查询用户
  GetRoleListInfo(params: any) {
    return {
      method: "GET",
      url: "/sys/user/userRoleList",
      params,
    };
  },

  // 删除用户数据
  DeleteUserinfo(params: any) {
    return {
      method: "DELETE",
      url: "/sys/user/deleteUserRole",
      params,
    };
  } ,
 // 批量删除
  DeleteUserinfoBatch(params: any) {
    return {
      method: "DELETE",
      url: "/sys/user/deleteUserRoleBatch",
      params,
    };
  },

  // 添加角色数据
  AddUserRole(data: any) {
    return {
      method: "POST",
      url: "/sys/role/add",
      data
    };
  },
  // 编辑角色数据
  EditUserRole(params: any) {
    return {
      method: "PUT",
      url: "/sys/role/edit",
      data: params
    };
  },
  // 删除角色数据
  DeleteUserRole(params: any) {
    return {
      method: "DELETE",
      url: "sys/role/delete",
      params
    };
  },
  // 获取角色管理树
  GetRoleListTree(params: any) {
    return {
      method: "GET",
      url: "/sys/role/queryTreeList",
      params,
    };
  },
  // 获取角色管理树(根据角色id获取已分配菜单)
  GetRoleListTreeById(params: any) {
    return {
      method: "GET",
      url: "/sys/permission/queryRolePermission",
      params,
    };
  },
  // 保存角色分配权限
  SaveRolePermission(data: any) {
    return {
      method: "POST",
      url: "/sys/permission/saveRolePermission",
      data
    };
  },

  // 获取系统菜单管理树
  GetMenuListTree(params: any) {
    return {
      method: "GET",
      url: "/sys/permission/list",
      params,

    };
  },

  // 添加系统菜单管理树
  addMenuListTree(params: any) {
    return {
      method: "POST",
      url: "/sys/permission/add",
      data: params,

    };
  },
  // 编辑系统菜单管理树
  updateMenuListTree(params: any) {
    return {
      method: "PUT",
      url: "/sys/permission/edit",
      data: params,

    };
  },
  // 删除系统菜单管理树
  deleteMenuListTree(params: any) {
    return {
      method: "DELETE",
      url: "/sys/permission/deleteBatch",
      params,
    };
  },
}

