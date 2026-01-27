# Vue3 后台管理系统模板

一个基于 Vue3 + TypeScript + Element Plus 的后台管理系统模板，集成了动态路由和权限管理功能。

![alt text](image-2.png)

## 技术栈

- Vue 3.2
- TypeScript 4.5
- Vue Router 4
- Vuex 4
- Element Plus 2.9
- Axios
- Less

## 功能特性

- 🚀 基于 Vue3 最新技术栈开发
- 📦 使用 TypeScript 进行开发，提供更好的类型检查和开发体验
- 🔐 完整的权限管理解决方案，支持动态路由和按钮级权限控制
- 🎨 使用 Element Plus 组件库，提供美观的 UI 界面
- 📱 响应式设计，支持多种设备访问
- 🔧 支持 PWA，可离线访问
- 📝 集成 ESLint + Prettier，统一代码风格
- 🔥 图标使用的iconfont , 记得替换.

## 项目结构

```
src/
├── assets/         # 静态资源
├── components/     # 公共组件
├── hooks/          # Vue3 组合式 API 钩子
├── network/        # 网络请求相关
├── plugins/        # 插件
├── router/         # 路由配置
├── store/          # Vuex 状态管理
├── utils/          # 工具函数
└── views/          # 页面组件
```

## 安装和使用

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run serve
```

### 生产环境构建

```bash
npm run build
```

### 代码检查

```bash
npm run lint
```

## 权限管理

本项目实现了完整的权限管理功能，包括动态路由和按钮级权限控制。以下是详细的实现说明：

### 1. 权限管理架构

权限管理主要包含以下几个部分：
- 路由权限控制
- 菜单权限控制
- 按钮级权限控制
- 数据权限控制

### 2. 实现细节

#### 2.1 路由权限控制

1. **路由守卫实现**
   - 在 `router/index.ts` 中实现全局路由守卫
   - 检查用户是否登录（通过 token）
   - 动态添加路由配置

2. **动态路由生成**
   - 用户登录后获取权限菜单数据
   - 通过 `addDynamicRoutes` 工具函数动态生成路由
   - 支持路由懒加载，提高性能

3. **路由配置示例**
```typescript
// 路由守卫实现
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (!token && to.meta.check) {
    next({ name: 'login' });
    return;
  }
  // 动态添加路由
  if (token && !layoutRoute.children.length) {
    const menus = JSON.parse(localStorage.getItem('menus') || '[]');
    addDynamicRoutes(router, menus);
    next({ ...to, replace: true });
    return;
  }
  next();
});
```

#### 2.2 菜单权限控制

1. **菜单数据结构**
   - 支持多级菜单
   - 包含路径、名称、组件、元数据等信息
   - 支持菜单图标、权限标识等扩展属性

2. **菜单渲染**
   - 根据用户权限动态生成菜单
   - 支持菜单缓存，提高性能
   - 支持菜单排序和分组

#### 2.3 按钮级权限控制

1. **权限指令实现**
   - 通过自定义指令 `v-permission` 控制按钮显示
   - 支持权限表达式，如：`v-permission="['add', 'edit']"`
   - 支持权限组合判断

2. **使用示例**
```vue
<template>
  <el-button v-permission="['add']">添加</el-button>
  <el-button v-permission="['edit']">编辑</el-button>
  <el-button v-permission="['delete']">删除</el-button>
</template>
```

#### 2.4 数据权限控制

1. **数据过滤**
   - 根据用户角色过滤数据
   - 支持数据范围控制
   - 支持字段级权限控制

2. **实现方式**
   - 在 API 请求中添加权限参数
   - 后端根据权限参数过滤数据
   - 前端处理权限数据展示

### 3. 权限管理流程

1. **登录流程**
   - 用户输入账号密码登录
   - 获取用户 token 和权限信息
   - 存储权限信息到本地存储

2. **权限验证流程**
   - 路由跳转时验证权限
   - 动态生成路由和菜单
   - 控制按钮和数据的访问权限

3. **权限更新流程**
   - 支持动态更新权限
   - 支持权限缓存清理
   - 支持权限实时生效

### 4. 安全考虑

1. **前端安全**
   - 敏感信息加密存储
   - 路由权限双重验证
   - XSS 防护

2. **后端安全**
   - 接口权限验证
   - 数据权限过滤
   - 防 SQL 注入

## 接口封装

本项目采用统一的接口封装方案，提供了完整的请求拦截、响应拦截和错误处理机制。以下是详细的实现说明：

### 1. 接口封装架构

接口封装主要包含以下几个部分：
- 请求实例配置
- 请求拦截器
- 响应拦截器
- 接口模块化
- 统一错误处理

### 2. 实现细节

#### 2.1 请求实例配置

```typescript
const service = axios.create({
    baseURL: "/api/pc",
    timeout: 40000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Connection": "Keep-Alive",
        "Content-Type": "application/json; charset = utf-8"
    }
})
```

#### 2.2 请求拦截器

```typescript
service.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["access-token"] = token
        }
        return config;
    }
)
```

#### 2.3 响应拦截器

```typescript
service.interceptors.response.use(
    (res) => {
        const code = res.data.code
        if (code == 100) {
            router.push({ name: "login" });
        } else if (code == 1) {
            ElMessage({
                message: res.data.msg,
                type: 'warning'
            });
        }
        return res
    }, (error) => {
        return Promise.reject(error);
    }
)
```

#### 2.4 接口模块化

1. **目录结构**
```
src/network/
├── index.ts        # 请求配置和拦截器
└── apis/           # 接口模块
    ├── home.ts     # 首页相关接口
    ├── work.ts     # 工作相关接口
    └── user.ts     # 用户相关接口
```

2. **接口定义示例**
```typescript
// apis/home.ts
export default {
    // 获取首页数据
    getHomeData: (params: any) => ({
        url: '/home/data',
        method: 'get',
        params
    }),
    // 更新首页数据
    updateHomeData: (data: any) => ({
        url: '/home/update',
        method: 'post',
        data
    })
}
```

3. **接口调用示例**
```typescript
import getData from '@/network';

// 获取首页数据
const getHomeData = async () => {
    try {
        const res = await getData('home/getHomeData', { page: 1 });
        return res.data;
    } catch (error) {
        console.error('获取首页数据失败:', error);
    }
}
```

### 3. 接口封装特点

1. **统一配置**
   - 统一的 baseURL 配置
   - 统一的超时时间设置
   - 统一的请求头配置

2. **自动处理**
   - 自动添加 token
   - 自动处理登录过期
   - 自动处理错误提示

3. **模块化管理**
   - 按功能模块划分接口
   - 支持接口自动导入
   - 支持接口命名空间

4. **类型支持**
   - 完整的 TypeScript 类型支持
   - 接口参数类型检查
   - 响应数据类型定义

### 4. 错误处理机制

1. **请求错误处理**
   - 网络错误处理
   - 超时错误处理
   - 请求取消处理

2. **响应错误处理**
   - 状态码错误处理
   - 业务错误处理
   - 登录过期处理

3. **错误提示**
   - 统一的错误提示组件
   - 可配置的错误提示方式
   - 支持自定义错误处理

### 5. 使用建议

1. **接口定义**
   - 使用 TypeScript 定义接口类型
   - 添加详细的接口注释
   - 遵循统一的命名规范

2. **接口调用**
   - 使用 async/await 处理异步
   - 添加适当的错误处理
   - 注意请求参数的合法性

3. **性能优化**
   - 合理使用请求缓存
   - 避免重复请求
   - 控制并发请求数量

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证

[MIT](LICENSE)
