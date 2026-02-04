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
  //header头综合统计/jeecg-boot/statistics/comprehensiveStats
  GetComprehensiveStats() {
    return {
      method: "GET",
      url: "/statistics/comprehensiveStats",
    };
  },
  //饼图/jeecg-boot/statistics/contractCollectionStats
  GetContractCollectionStats() {
    return {
      method: "GET",
      url: "/statistics/contractCollectionStats",
    };
  },
  //柱状图/jeecg-boot/statistics/contractCountStats
  GetContractCountStats(params: any) {
    return {
      method: "POST",
      url: "/statistics/contractCountStats",
      params,
    };
  },
};
