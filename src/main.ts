import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import ElementPlus from 'element-plus'
import zhCn from "element-plus/es/locale/lang/zh-cn"
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import '@/assets/font/iconfont.css'
import './registerServiceWorker'
import 'element-plus/dist/index.css'
import "./static/style.css";
import 'ant-design-vue/dist/antd.css'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
const app = createApp(App)

app.use(ElementPlus, { locale: zhCn })
app.use(Antd as any)
app.use(store).use(router).mount('#app')






