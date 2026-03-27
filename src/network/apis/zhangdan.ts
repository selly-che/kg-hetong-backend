export default {
  //删除/jeecg-boot/bill/delete
  Delete(params: string) {
    return {
      method: "DELETE",
      url: "/bill/delete",
      params,
    };
  },
  //查询单条/jeecg-boot/bill/getById
  GetById(params: string) {
    return {
      method: "GET",
      url: "/bill/getById",
      params,
    };
  },
  //新增/jeecg-boot/bill/save
  Save(params: any) {
    return {
      method: "POST",
      url: "/bill/save",
      data: params,
    };
  },
  //列表查询/jeecg-boot/bill/queryBillList
  QueryBillList(params: any) {
    return {
      method: "GET",
      url: "/bill/queryBillList",
      params,
    };
  },
};
