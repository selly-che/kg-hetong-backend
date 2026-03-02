export default {
  // // 分页查询项目列表信息
  ///jeecg-boot/projectcontract/tpmProject/list
  GetProjectList(params: any) {
    return {
      method: "GET",
      url: "/projectcontract/tpmProject/list",
      params,
    };
  },
  //全部项目列表信息
  ///jeecg-boot/projectcontract/tpmProject/details
  GetProjectDetails(params: any) {
    return {
      method: "GET",
      url: "/projectcontract/tpmProject/details",
      params,
    };
  },
  // 工作安排
  GetWorkArrangement(params: any) {
    return {
      method: "GET",
      url: "/projectcontract/taskArrangement/gzap",
      params,
    };
  },
  // 项目组成员
  GetProjectMembers(params: any) {
       return {
      method: "GET",
      url: "/projectcontract/taskArrangement/xmzcy",
      params,
    };
  }
};
