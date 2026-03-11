export default {
  // 获取外包列表
  setContract(params: any){
    return {
      url: '/contract/updateContract',
      method: 'post',
      data: params
    };
  }
};