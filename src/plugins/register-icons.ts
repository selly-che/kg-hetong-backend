// src/plugins/register-icons.ts
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export default function registerIcons(app: any) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        if (key !== 'default') {
            app.component(key, component);
        }
    }
}