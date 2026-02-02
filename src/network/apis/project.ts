export default {
  // 获取项目列表信息
  ///jeecg-boot/project/getProjectList
  GetProjectList(params: any) {
    return {
      method: "POST",
      url: "/project/getProjectList",
      data: params,
    };
  },
  ///jeecg-boot/projectcontract/tpmProject/list
  GetProjectContractList(params: any) {
    return {
      method: "GET",
      url: "/projectcontract/tpmProject/list",
      data: params,
    };
  },
};
