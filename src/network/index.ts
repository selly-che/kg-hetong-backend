// 导入axios网络请求
import axios from "axios";
import router from "@/router";
import { ElMessage } from "element-plus";

// 直接访问
const apiUrl = process.env.VUE_APP_API_URL;
const service = axios.create({
  // baseURL: "/api/pc",
  baseURL: "/jeecg-boot",
  timeout: 40000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    // "Connection": "Keep-Alive",
    "Content-Type": "application/json;charset=utf-8",
  },
});
//请求拦截
service.interceptors.request.use((config) => {
  const token = localStorage.getItem("accesstoken");
  if (token) {
    config.headers["x-access-token"] = token;
  }
  return config;
});
// 响应拦截
service.interceptors.response.use(
  (res) => {
    const code = res.data.code; // 获取后端返回的状态码
    if (code == 100) {
      router.push({ name: "login" });
    } else if (code == 1) {
      ElMessage({
        message: res.data.msg,
        type: "warning",
      });
    }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);
function startNetwork(params: any) {
  return service({
    ...params,
  });
}

const modules = require.context("./apis", true, /\.(js|ts)$/);
const newModules = modules.keys().reduce((target: any, keyName) => {
  const fileName = keyName.replace(/^\.\/(\w+)\.(js|ts)$/, "$1");
  const module = modules(keyName).default;
  for (const key in module) {
    target[fileName + "/" + key] = module[key];
  }
  return target;
}, {});

//遍历newModules中的键值对，为key添加getter方法
const proxy = new Proxy(newModules, {
  async get(target, keyName) {
    const params = target[keyName](target.meta ? target.meta : {});
    const data = await startNetwork(params);
    target.meta = null;
    return data;
  },
});

async function getData<T = any>(
  keyName: string,
  meta: Record<string, any> | null = null,
): Promise<T> {
  // 检查 keyName 是否存在
  if (!(keyName in proxy)) {
    throw new Error(`Key "${keyName}" does not exist in the proxy object.`);
  }
  // 如果 meta 存在，设置到 proxy.meta
  if (meta) {
    proxy.meta = meta;
  }
  try {
    // 调用 proxy[keyName] 并返回结果
    const result = await proxy[keyName];
    return result;
  } catch (error) {
    console.error(
      `Error occurred while fetching data for key "${keyName}":`,
      error,
    );
    throw error; // 抛出错误以便调用方处理
  }
}

export default getData;
