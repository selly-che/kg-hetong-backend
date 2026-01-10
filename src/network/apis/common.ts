export default {
    // 登录
    PostLogin(params: any) {
        return {
            method: "POST",
            url: "/jeecg-boot/sys/login",
            data:params,
        };
    },

    // /pc/index/index	首页数据
    GetIndex(params: any) {
        return {
            method: "GET",
            url: "/jeecg-boot/sys/permission/getUserPermissionByToken?",
            params,

        };
    },
}