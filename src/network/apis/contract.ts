export default {
  //合同列表/jeecg-boot/contract/queryContractList
  GetContractList(params: any) {
    return {
      method: "GET",
      url: "/contract/queryContractList",
      params,
    };
  },
  //合同统计数据/jeecg-boot/contract/statistics
  GetContractStatistics(params: any) {
    return {
      method: "GET",
      url: "/contract/statistics",
      params,
    };
  },
};
