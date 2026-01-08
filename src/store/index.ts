import { createStore } from 'vuex'

// 从指定目录中读取所有的模块
const modules = require.context('./modules', true, /\.(js|ts)$/);

// 获取所有的文件名称，并且将名称作为 key 和 module 进行匹配
const moduleList = modules.keys().reduce((target: Record<string, any>, filePath: string) => {
    // 题目文件的名称
    const fileName = filePath.replace(/\.\/(\w+)\.(js|ts)/, '$1');
    // 将文件名称和对应导出的模块进行绑定
    target[fileName] = modules(filePath).default; 
    return target;
}, {});

const store = createStore({
    modules: {
        ...moduleList,
    },
});

export default store;
