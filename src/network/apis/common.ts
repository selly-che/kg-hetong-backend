export default {
    // 登录
    PostLogin(params: any) {
        return {
            method: "POST",
            url: "/sys/login",
            data:params,
        };
    },
    getUserPermission(params: any) {
        return {
            method: "get",
            url: "/sys/permission/getUserPermissionByToken",
            data:params,
        };
    },

    // /pc/index/index	首页数据
    GetIndex(params: any) {
        return {
            method: "GET",
            url: "/sys/permission/getUserPermissionByToken?",
            params,
        };
    },
    GetToken(params: any) {
        return {
            method: "GET",
            url: "/jeecg-boot/sys/getToken",
            params,
        };
    },
}