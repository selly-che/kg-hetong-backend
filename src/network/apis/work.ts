
export default {
    //   新增配件分类管理 
    peijian_typeSave(params: any) {
        return {
            method: "POST",
            url: "/peijian_type/save",
            params,
        };
    },
    // 配件分类列边 
    peijian_typeIndex(params: any) {
        return {
            method: "GET",
            url: `/peijian_type/index`,
            params
        };
    },
    
};
