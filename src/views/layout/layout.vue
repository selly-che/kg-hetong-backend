<template>
    <div class="layout">
        <div class="main-container">
            <div class="side-menu-container" :style="`width:${collWidth}`">
                <div class="title">{{ isCollapse ? '系统' : '合同管理系统' }} </div>
                <el-menu class="side-menu" :style="`width:${collWidth}`" :default-active="activeMenu" mode="vertical"
                    :collapse-transition="false" router unique-opened text-color="#bfcbd9" active-text-color="#ffffff"
                    background-color="#409eff" :collapse="isCollapse">
                    <template v-for="item in menus" :key="item.index">
                        <el-sub-menu v-if="item.children" :index="item.index">
                            <template #title>
                                <i :class="'iconfont ' + item.icon"></i>
                                <span class="pl-10">{{ item.meta.title }}
                                    <i class="el-icon-edit" style="color: red;"></i>
                                </span>
                            </template>
                            <el-menu-item v-for="child in item.children" :key="child.index" :index="child.path">
                                <template #title>
                                    <div>
                                        <i :class="'iconfont ' + child.icon"></i>
                                        <span class="pl-10"> {{ child.meta.title }}</span>
                                    </div>
                                </template>
                            </el-menu-item>
                        </el-sub-menu>
                        <el-menu-item v-else :index="item.path">
                            <i :class="'iconfont ' + item.icon"></i>
                            <template #title="">
                                <span :class="item.children ? '' : 'pl-10'">{{ item.meta.title }}</span>
                            </template>

                        </el-menu-item>
                    </template>
                </el-menu>
            </div>
            <div class="content-container">
                <div class="header">
                    <div class="breadcrumb cu_p" @click="changeMenu">
                        <div v-show="!isCollapse">
                            <MenuFoldOutlined style="font-size: 20px;" />
                        </div>
                        <div v-show="isCollapse">
                            <MenuUnfoldOutlined style="font-size: 20px;" />
                        </div>
                        <!-- <b>{{ BreadcrumbTitle }} </b>
                        <span v-show="Breadcrumb"><i>/</i>{{ Breadcrumb }}</span>
                        <span v-show="BreadSun"><i>/</i>{{ BreadSun }}</span> -->
                    </div>

                    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item v-for="item in tabs">{{item.title}}</el-breadcrumb-item>
                    </el-breadcrumb> -->

                    <div class="flexTWO cu_p" @click="logout">
                        <span class="mr-8">退出登录</span>
                        <el-icon>
                            <SwitchButton />
                        </el-icon>
                    </div>
                </div>
                <div class="tabs-container">
                    <el-tabs v-model="activeTab" type="card" closable @tab-remove="removeTab" @tab-click="handleClick">
                        <el-tab-pane v-for="tab in tabs" :key="tab.path" :label="tab.title" :name="tab.path"
                            :closable="tab.path !== '/home'" @close="removeTab(tab.path)">
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'

import { SwitchButton } from '@element-plus/icons-vue';
import { ref, watch, onMounted, computed } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from 'element-plus';

const collWidth = computed(() => {
    return store.state.common.isCollapse ? "80px" : "216px";
});
const isCollapse = computed(() => {
    return store.state.common.isCollapse;
})
const Router = useRouter();
const store = useStore();
// 添加当前激活菜单
const activeMenu = ref('');
const route = useRoute();
const menus = ref<MenuItem[]>([]);
const BreadcrumbTitle = ref('首页');// 面包屑标题
const Breadcrumb = ref<string>(''); // 面包屑二级标题
const BreadSun = ref<string>(''); // 面包屑三级标题
const icons = ref<string[]>();
const activeTab = ref('/home');
const tabs = ref<Array<{ title: string; path: string }>>([
    { title: '首页', path: '/home' }
]);


interface MenuItem {
    index: string;
    title: string;
    path: string;
    type?: string;
    icon?: string;
    name?: string;
    meta: {
        title?: string;
    }
    children?: MenuItem[];
};

onMounted(() => {

});


// 从 Vuex 中获取 menus
const menusFromVuex = store.state.menus;
if (menusFromVuex) {
    menus.value = menusFromVuex;
} else {
    // 从本地存储获取菜单
    const menusFromStorage = localStorage.getItem("wuyemenusJSON");
    if (menusFromStorage) {
        try {
            menus.value = JSON.parse(menusFromStorage);
            icons.value = menus.value.map((item: any) => {
                return item.icon;
            });
        } catch (error) {
            console.error("Failed to parse menus from storage", error);
        }
    }
}

const changeMenu = () => {
    store.dispatch('common/toggleSidebar');
}

// console.log("menus", menus);
const logout = () => {
    ElMessageBox.confirm('您确定要退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        Router.replace({ name: "login" });
        localStorage.removeItem("accesstoken");
        ElMessage({
            type: 'success', message: '已退出',
        })
    }).catch(() => {
        ElMessage({ type: 'info', message: '已取消' })
    })
}

// 添加标签页
const addTab = (route: any) => {

    const { path } = route;
    // if (path === '/home') return;

    const isExist = tabs.value.some(tab => tab.path === path);
    if (!isExist) {
        // 从菜单中查找对应的标题
        let tabTitle = '未命名';
        for (const menu of menus.value) {
            if (menu.path === path) {
                tabTitle = menu.title;
                break;
            }
            if (menu.children) {
                const child = menu.children.find(child => child.path === path);
                if (child) {
                    tabTitle = child.title;
                    break;
                }
            }
        }

        tabs.value.push({
            title: tabTitle,
            path: path
        });
    }
    activeTab.value = path;
};

// 移除标签页
const removeTab = (targetPath: string) => {
    // 防止删除首页标签
    if (targetPath === '/home') {
        ElMessage({
            type: 'warning',
            message: '首页标签不可删除'
        });
        return;
    }

    const targetIndex = tabs.value.findIndex(tab => tab.path === targetPath);
    if (targetIndex === -1) return;

    tabs.value.splice(targetIndex, 1);
    if (activeTab.value === targetPath) {
        const nextTab = tabs.value[targetIndex] || tabs.value[targetIndex - 1];
        if (nextTab) {
            activeTab.value = nextTab.path;
            Router.push(nextTab.path);
        }
    }
};

// 点击标签页
const handleClick = (tab: any) => {
    console.log(tab, 'handleClick');

    Router.push(tab.props.name);
};

// 监听路由变化
watch(route, (newRoute) => {
    activeMenu.value = newRoute.path;
    console.log("路由变化", newRoute);
    addTab(newRoute);
    if (String(newRoute.meta?.title) !== '首页') {
        Breadcrumb.value = String(newRoute.meta?.title || '')
    }
    menus.value.forEach((item) => {
        item.children?.forEach((child) => {
            if (newRoute.name === child.name) {
                Breadcrumb.value = item.title;
                BreadSun.value = child.title;
            }
        })
    });
}, { immediate: true });


</script>

<style lang="less" scoped>
:deep(.el-menu) {
    // background:  !important;
    background-color: #001529 !important;

    :hover {
        background: none !important;
        // color: #bfcbd9 !important;
        color: white !important;
    }

    &-item {
        // color: white !important;
        background-color: #0f2438 !important;

        &.is-active {
            background: #409eff !important;
            // color: white !important;
        }

        &:hover {
            // background: none !important;
        }
    }
}

.layout {
    // display: flex;
    // flex-direction: column;
    // height: 100%;
    // overflow: hidden;

    .main-container {
        width: 100%;
        background-color: rgb(247, 248, 250);
        display: flex;
        // margin-top: 40px;
        // height: calc(100vh - 20px);
        // border: 1px solid rebeccapurple;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        .side-menu-container {
            height: 100%;
            overflow: hidden;
            overflow-y: auto;
            background-color: #001529;

            .title {
                // width: 180px;
                color: black;
                font-size: 18px;
                font-weight: bold;
                text-align: center;
                padding: 10px 0;
                padding-top: 20px;
                cursor: pointer;
                // border-right: 1px solid #e6e6e6;
                // background-color: #ffffff;
                color: #ffffff;
            }

            .side-menu {
                max-width: 216px;
                height: calc(100vh - 54px);
                overflow: hidden;
                overflow-y: auto;
                background-color: #0f2438;

                .el-sub-menu__title {
                    .iconfont {
                        font-size: 20px;
                    }
                }

            }

        }
    }

    .content-container {
        flex: 1;
        width: 100%;
        overflow: hidden;
        // padding: 20px;
        background-color: rgb(247, 248, 250);

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: white;
            padding: 10px 20px;
            border-bottom: 1px solid #dcdfe6;

            // 面包屑
            .breadcrumb {
                display: flex;
                align-items: center;

                b {
                    font-size: 14px;
                    font-weight: bold;
                    // 鼠标移入变小手
                    // cursor: pointer;
                }

                i {
                    color: #c2c5d4;
                    font-size: 12px;
                    margin: 0 8px;
                }

                span {
                    font-size: 14px;
                }
            }
        }

        .tabs-container {
            background-color: white;
            padding: 8px 16px;
            border-bottom: 1px solid #e4e7ed;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

            :deep(.el-tabs__header) {
                margin: 0;
                border: none;
            }

            :deep(.el-tabs__nav-wrap::after) {
                display: none;
            }

            :deep(.el-tabs__item) {
                height: 36px;
                line-height: 36px;
                border: none;
                border-radius: 4px;
                margin-right: 8px;
                padding: 0 16px;
                font-size: 14px;
                transition: all 0.3s;
                position: relative;
                border: 1px solid #dcdfe6;

                &:hover {
                    color: #409eff;
                }

                &.is-active {
                    background-color: #409eff;
                    color: white;
                    font-weight: 500;
                }

                .el-icon-close {
                    border-radius: 50%;
                    text-align: center;
                    transition: all 0.3s;
                    transform-origin: 100% 50%;
                    margin-left: 8px;
                    font-size: 12px;
                    height: 16px;
                    width: 16px;
                    line-height: 16px;
                    vertical-align: middle;
                    top: -1px;
                    right: 2px;
                    color: #909399;

                    &:hover {
                        background-color: #c0c4cc;
                        color: white;
                    }
                }

                &.is-active .el-icon-close {
                    color: white;

                    &:hover {
                        background-color: rgba(255, 255, 255, 0.3);
                    }
                }
            }

            // 隐藏首页标签页的关闭按钮
            :deep(.el-tabs__item[aria-controls="pane-home"]) {
                .el-icon-close {
                    display: none !important;
                }
            }

            :deep(.el-tabs__nav) {
                border: none;
            }

            :deep(.el-tabs__nav-scroll) {
                padding: 10;
                // border: none;

            }
        }
    }

}
</style>
