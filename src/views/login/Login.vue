<template>
    <div class="login">
        <div class="from">
            <div class="title">合同管理系统</div>
            <el-input v-model="input" size="large" style="width: 400px" placeholder="请输入您的账号" prefix-icon="User" />
            <div class="password">
                <el-input v-model="password" @keyup.enter="login" size="large" type="password" style="width: 400px"
                    placeholder="请输入您的密码" show-password prefix-icon="Lock" />
            </div>
            <div class="login-btn" @click="login">登录</div>
            <div>游客登录账号同密码：admin</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import getDatas from "@/network/index";
import { ElMessage } from 'element-plus'

const input = ref("admin");
const password = ref("123456");
const router = useRouter()
// const data:any = reactive({});

// 游客路由配置
const guestRoutes = {
    "nav": [
        {
            "parentId": "1",
            "index": "1",
            "title": "首页",
            "icon": "icon-shouye",
            "type": "",
            "path": "/home",
            "redirect": "/home",
            "component": "home/index",
            "meta": {
                "title": "首页",

            }
        },
        {
            "parentId": "10",
            "index": "10",
            "title": "项目管理",
            "icon": "icon-xiangmu",
            "type": "",
            "name": "projectMgment",
            "path": "/projectMgment",
            "component": "projectMgment/index",
            "meta": {
                "title": "项目管理",
            }
        },
        {
            "parentId": "3",
            "index": "3",
            "title": "投标管理",
            "icon": "icon-fuzhi",
            "type": "",
            "name": "bidMgment",
            "path": "/bidMgment",
            "component": "bidMgment/index",
            "meta": {
                "title": "投标管理",
            }
        },
        {
            "parentId": "4",
            "index": "4",
            "title": "台账管理",
            "icon": "icon-24gl-paperPlane",
            "type": "",
            "name": "ledgerMgment",
            "path": "/ledgerMgment",
            "component": "ledgerMgment/index",
            "meta": {
                "title": "台账管理",
            }
        },
        {
            "parentId": "5",
            "index": "5",
            "title": "合同管理",
            "icon": "icon-mokuai",
            "type": "",
            "meta": {
                "title": "合同管理",
            },
            "children": [
                {
                    "index": "5-1",
                    "title": "内部合同",
                    "name": "internal",
                    "icon": "icon-hetong2",
                    "path": "/contractMgment/internal",
                    "component": "contractMgment/internal",
                    "menuType": 0,
                    "meta": {
                        "title": "内部合同",
                    }
                },
                {
                    "index": "5-2",
                    "title": "外协合同",
                    "name": "outsourcing",
                    "icon": "icon-hetong",
                    "path": "/contractMgment/outsourcing",
                    "component": "contractMgment/outsourcing",
                    "menuType": 1,
                    "meta": {
                        "title": "外协合同",
                    }
                },
            ]
        },
        {
            "parentId": "6",
            "index": "6",
            "title": "审批管理",
            "icon": "icon-qiche",
            "type": "",
            "name": "approvalMgment",
            "path": "/approvalMgment",
            "component": "approvalMgment/index",
            "meta": {
                "title": "审批管理",
            }
        },
        {
            "parentId": "9",
            "index": "9",
            "title": "开票及收款管理",
            "icon": "icon-xiangmu1",
            "type": "",
            "name": "InvoicingMgment",
            "path": "/InvoicingMgment",
            "component": "InvoicingMgment/index",
            "meta": {
                "title": "开票及收款管理",
            }
        },
        {
            "parentId": "7",
            "index": "7",
            "title": "系统管理",
            "icon": "icon-xitong",
            "type": "",
            "name": "systemMgment",
            // "path": "/systemMgment",
            // "component": "systemMgment/index",
            "meta": {
                "title": "系统管理",
            },
            "children": [
                {
                    "index": "7-1",
                    "title": "用户管理",
                    "name": "userMgment",
                    "icon": "icon-hetong2",
                    "path": "/systemMgment/userMgment",
                    "component": "systemMgment/userMgment",
                    "menuType": 0,
                    "meta": {
                        "title": "用户管理",
                    }
                },
                {
                    "index": "7-2",
                    "title": "角色管理",
                    "name": "roleMgment",
                    "icon": "icon-hetong",
                    "path": "/systemMgment/roleMgment",
                    "component": "systemMgment/roleMgment",
                    "menuType": 1,
                    "meta": {
                        "title": "角色管理",
                    }
                },
                {
                    "index": "7-3",
                    "title": "菜单管理",
                    "name": "menuMgment",
                    "icon": "icon-hetong",
                    "path": "/systemMgment/menuMgment",
                    "component": "systemMgment/menuMgment",
                    "menuType": 2,
                    "meta": {
                        "title": "菜单管理",
                    }
                },

            ]
        },
    ]
};

// admin真是账号数据
const adminRoutes = {
    menu: [
        {
            "redirect": null,
            "path": "/online",
            "component": "layouts/RouteView",
            "route": "1",
            "children": [
                {
                    "path": "/online/copyform/:code",
                    "component": "modules/online/cgform/OnlCgformCopyList",
                    "route": "1",
                    "hidden": true,
                    "meta": {
                        "keepAlive": false,
                        "internalOrExternal": false,
                        "componentName": "OnlCgformCopyList",
                        "title": "AUTO复制表单"
                    },
                    "name": "online-copyform-@code",
                    "id": "f2849d3814fc97993bfc519ae6bbf049"
                },
                {
                    "path": "/online/cgformErpList/:code",
                    "component": "modules/online/cgform/auto/erp/OnlCgformErpList",
                    "route": "1",
                    "hidden": true,
                    "meta": {
                        "keepAlive": false,
                        "internalOrExternal": false,
                        "componentName": "OnlCgformErpList",
                        "title": "AUTO在线表单ERP"
                    },
                    "name": "online-cgformErpList-@code",
                    "id": "1229674163694841857"
                },
                {
                    "path": "/online/cgformTabList/:code",
                    "component": "modules/online/cgform/auto/tab/OnlCgformTabList",
                    "route": "1",
                    "hidden": true,
                    "meta": {
                        "keepAlive": false,
                        "internalOrExternal": false,
                        "componentName": "OnlCgformTabList",
                        "title": "AUTO在线表单TAB"
                    },
                    "name": "online-cgformTabList-@code",
                    "id": "1304032910990495745"
                },
                {
                    "path": "/online/cgreport/:code",
                    "component": "modules/online/cgreport/auto/OnlCgreportAutoList",
                    "route": "1",
                    "hidden": true,
                    "meta": {
                        "keepAlive": false,
                        "internalOrExternal": false,
                        "componentName": "onlineAutoList",
                        "title": "AUTO在线报表"
                    },
                    "name": "onlineAutoList",
                    "id": "9fe26464838de2ea5e90f2367e35efa0"
                },
                {
                    "path": "/online/cgformTreeList/:code",
                    "component": "modules/online/cgform/auto/OnlCgformTreeList",
                    "route": "1",
                    "hidden": true,
                    "meta": {
                        "keepAlive": false,
                        "internalOrExternal": false,
                        "componentName": "OnlCgformTreeList",
                        "title": "AUTO树表单列表"
                    },
                    "name": "online-cgformTreeList-@code",
                    "id": "fba41089766888023411a978d13c0aa4"
                },
                {
                    "path": "/online/cgformList/:code",
                    "component": "modules/online/cgform/auto/OnlCgformAutoList",
                    "route": "1",
                    "hidden": true,
                    "meta": {
                        "keepAlive": false,
                        "internalOrExternal": false,
                        "componentName": "OnlCgformAutoList",
                        "title": "AUTO在线表单"
                    },
                    "name": "online-cgformList-@code",
                    "id": "54097c6a3cf50fad0793a34beff1efdf"
                },
                {
                    "path": "/online/cgformInnerTableList/:code",
                    "component": "modules/online/cgform/auto/innerTable/OnlCgformInnerTableList",
                    "route": "1",
                    "hidden": true,
                    "meta": {
                        "keepAlive": false,
                        "internalOrExternal": false,
                        "componentName": "OnlCgformInnerTableList",
                        "title": "AUTO在线内嵌子表"
                    },
                    "name": "online-cgformInnerTableList-@code",
                    "id": "1235823781053313025"
                }
            ],
            "meta": {
                "keepAlive": false,
                "internalOrExternal": false,
                "icon": "cloud",
                "componentName": "RouteView",
                "title": "在线开发"
            },
            "name": "online",
            "id": "e41b69c57a941a3bbcce45032fe57605"
        }
    ]
}

const login = async () => {
    console.log("登录", input.value, password.value);

    // 游客登录（admin/admin）
    if (input.value === 'admin' && password.value === 'admin') {
        const menus = guestRoutes.nav;
        const wuyemenusJSON = JSON.stringify(menus);
        localStorage.setItem('wuyemenusJSON', wuyemenusJSON);
        localStorage.setItem('accesstoken', 'guest-token'); // 设置游客token
        router.push("/home");
        ElMessage({ message: '游客登录成功!', type: 'success' });
        return;
    }


    //正常登录流程
    const res = await getDatas("common/PostLogin", {
        username: input.value,
        password: password.value
    });
    console.log("登录123", JSON.parse(JSON.stringify(res)));
    if (res.data.code == 200) {
        const menus = adminRoutes.menu
        console.log(menus, 'menusmenus');

        const wuyemenusJSON = JSON.stringify(menus);
        // console.log("wuyemenusJSON", JSON.parse(JSON.stringify(wuyemenusJSON)));
        localStorage.setItem('wuyemenusJSON', wuyemenusJSON)
        localStorage.setItem('accesstoken', res.data.result.token)//本地存储
        // router.push({ name: "shouye" });
        router.push("/home");
        ElMessage({ message: '登录成功!', type: 'success' })
    } else {
        ElMessage({ message: res.data.msg, type: 'error' })
    }
};

//添加监听
onBeforeMount(() => {
    console.log("组件首次挂载之前");
});

onMounted(() => {
    console.log("组件首次挂载完成");
});
</script>
<style lang="less" scoped>
.login {
    background-color: #f2f3f5;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;

    .from {
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        background-color: white;
        border-radius: 10px;
        padding: 2rem;
        // box-shadow: ;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

        .title {
            color: black;
            font-size: 18px;
            font-weight: bold;
            background-color: white;
            text-align: center;
            margin-bottom: 2rem;
        }

        .password {
            margin-top: 1rem;
        }

        .login-btn {
            margin-top: 1.5rem;
            color: white;
            text-align: center;
            padding: 8px 0;
            border-radius: 5px;
            background-color: #409eff;
            cursor: pointer;
            font-size: 14px;
        }
    }
}
</style>