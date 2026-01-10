export default {
    // 获取用户管理数据
    GetUserinfo(params: any) {
        return {
            method: "GEt",
            url: "/jeecg-boot/sys/user/list",
            params
        };
    },

    // 获取用户角色信息
    GetUserRole(params: any) {
        return {
            method: "GET",
            url: "/jeecg-boot/sys/role/list",
            params,

        };
    },
    // 获取系统菜单管理
    GetMenuList(params: any) {
        return {
            method: "GET",
            url: "/jeecg-boot/sys/permission/list",
            params,

        };
    },
}