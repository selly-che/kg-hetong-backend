export default {
  // 获取项目列表信息
  ///jeecg-boot/projectcontract/tpmProject/list
  GetProjectList(params: any) {
    return {
      method: "GET",
      url: "/projectcontract/tpmProject/list",
      data: params,
    };
  },
};
