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
};
