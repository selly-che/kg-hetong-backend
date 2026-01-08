export default {
    // 登录
    PostLogin(params: any) {
        return {
            method: "POST",
            url: "/login/check",
            params,
        };
    },
    
    // /pc/index/index	首页数据
    GetIndex(params: any) {
        return {
            method: "GET",
            url: "/index/index",
            params,
        };
    },
}