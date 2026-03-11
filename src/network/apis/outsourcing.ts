export default {
  // 获取合同列表
  setContract(params: any){
    return {
      url: '/contract/updateContract',
      method: 'post',
      data: params
    };
  },
  // 获取项目列表
  getProjects(params: any){
    return {
      url: '/projectcontract/tpmProject/list',
      method: 'get',
      params
    };
  }
};