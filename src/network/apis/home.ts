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
      data: params,
    };
  },

  // 查看任务详情
  GetTaskDetails(params: any) {
    return {
      method: "GET",
      url: "/projectcontract/taskArrangemenTodo/detail",
      params,
    };
  },
  // 确认完成任务
  PostTaskComplete(params: any) {
    return {
      method: "POST",
      url: "/projectcontract/taskArrangemenTodo/complete",
      data:params,
    };
  },

};
