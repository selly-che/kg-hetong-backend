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
  },
  // 查询项目生产组织详情
  GetProjectProductionOrg(params: any) {
    return {
      method: "GET",
      url: "/projectcontract/tpmProject/production-org",
      params,
    };
  },
  // 新增项目
  AddProject(params: any) {
    return {
      method: "POST",
      url: "/projectcontract/tpmProject/save",
      data: params,
    };
  },
  ProSelectList(params: any) {
    return {
      method: "GET",
      url: "/projectcontract/tpmProject/proSelectList",
      params,
    };
  },
  delsProList(params: any) {
    return {
      method: "POST",
      url: "/projectcontract/tpmProject/delsPro",
      data: params,
    };
  },
  // 新增工作安排
  AddWorkArrangement(params: any) {
    return {
      method: "POST",
      url: "/projectcontract/taskArrangement/saveGzap",
      data: params,
    };
  },
  // 删除工作安排
  DeleteWorkArrangement(params: any) {
    return {
      method: "POST",
      url: "/projectcontract/taskArrangement/delGzap",
      data: params,
    };
  },
  // 新增项目组成员
  AddProjectMember(params: any) {
    return {
      method: "POST",
      url: "/projectcontract/taskArrangement/update-members",
      data: params,
    };
  },
  // 新增生产组织
  addProductionOrg(params: any) {
    return {
      method: "POST",
      url: "/projectcontract/tpmProjectOrg/production-org",
      data: params,
    };
  },

  // 上传项目 
  uploadProject(params: any) {
    return {
      method: "POST",
      url: "/sys/file/upload",
      data: params,
    }
  },
  majorByProIdAndStep(params: any) {
    return {
      method: "POST",
      url: "/projectcontract/taskArrangemenTodo/majorByProIdAndStep",
      data: params,
    }
  }

};
