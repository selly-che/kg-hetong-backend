export default {
    // 获取用户管理数据
    GetUserinfo(params: any) {
        return {
            method: "GEt",
            url: "/sys/user/list",
            params
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
            data:params
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
            params,

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