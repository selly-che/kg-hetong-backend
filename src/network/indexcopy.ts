// 导入axios网络请求
import axios from "axios"

//定义函数完成公共网路请求的封装
function startNetwork(params: any) {
    // params是一个对象，用来存储开发人员传递的网络请求参数
    return axios({
        baseURL: "http://43.143.190.87:8086",
        timeout: 2000,
        ...params
    });
}
const modules = require.context("./apis", true, /\.(js|ts)$/);
//获取modules对应的模块名称
const newModules = modules.keys().reduce((target: any, keyName) => {
    //获取文件的文件名, replace(re, "$1")--使用左侧正则指令中第一个括号中的内容去替换正则匹配的内容
    const fileName = keyName.replace(/^\.\/(\w+)\.(js|ts)$/, "$1");
    //获取模块内容
    const module = modules(keyName).default;
    //在所有的函数名称前面添加文件的名字 
    for (const key in module) {
        target[fileName + "/" + key] = module[key];
    }
    return target;
}, {});
//遍历newModules中的键值对，为key添加getter方法
const proxy = new Proxy(newModules, {
    // target代表proxy操作的对象， keyName代表被操作的对象的属性名
    async get(target, keyName) {
        //获取请求需要的参数配置
        const params = target[keyName](target.meta ? target.meta : {});
        //根据params进行对应的网络请求 
        const data = await startNetwork(params);
        target.meta = null;
        // 返回服务器响应结果
        return data;
    }
});
// 定义函数获取指定的数据
async function getData(keyName: any, meta = null) {
    if (meta) {
        proxy.meta = meta;
    }
    return await proxy[keyName];
}

export default getData;