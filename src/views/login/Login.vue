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

const input = ref("");
const password = ref("");
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
                    "menuType": 0,
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
            "path": "/systemMgment",
            "component": "systemMgment/index",
            "meta": {
                "title": "系统管理",
            }
        },
    ]
};

const login = async () => {
    console.log("登录", input.value, password.value);

    // 游客登录（admin/admin）
    if (input.value === 'admin' && password.value === 'admin') {
        const menus = guestRoutes.nav;
        const wuyemenusJSON = JSON.stringify(menus);
        localStorage.setItem('wuyemenusJSON', wuyemenusJSON);
        localStorage.setItem('wuyetoken', 'guest-token'); // 设置游客token
        router.push("/home");
        ElMessage({ message: '游客登录成功!', type: 'success' });
        return;
    }

    //正常登录流程
    const res = await getDatas("home/PostLogin", {
        phone: input.value,
        password: password.value
    });
    console.log("登录", JSON.parse(JSON.stringify(res)));
    if (res.data.code == 0) {
        const menus = res.data.nav;
        const wuyemenusJSON = JSON.stringify(menus);
        // console.log("wuyemenusJSON", JSON.parse(JSON.stringify(wuyemenusJSON)));
        localStorage.setItem('wuyemenusJSON', wuyemenusJSON)
        localStorage.setItem('wuyetoken', res.data.access_token)//本地存储
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