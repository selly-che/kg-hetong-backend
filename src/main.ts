import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/font/iconfont.css'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from "element-plus/es/locale/lang/zh-cn"
// import registerIcons from './plugins/register-icons';
import "./static/style.css";
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
app.use(ElementPlus, { locale: zhCn })
// registerIcons(app); // 注册所有图标
app.use(Antd as any)
app.use(store).use(router).mount('#app')






