<template>
    <div class="bgf pd20 br8">
        <!--新增  -->
        <el-button type="primary" @click="addUserMenu">新增</el-button>
        <el-button @click="batchDelete" v-show="selectedRowKeys.length > 0">
            <delete-outlined /> <span class="pl-5">批量删除</span></el-button>

        <SelectNumber :num="selectedRowKeys.length" @clearSelect="clearNum"></SelectNumber>
        <!-- 展示权限菜单、树结构  -->
        <a-table :columns="columns" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            :data-source="menuList" :row-key="(record: any) => record.id" :expand-row-by-click="true"
            :default-expand-all="true" :pagination="false">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-space>
                        <a-button type="link" size="small" @click.stop="handleEdit(record)">
                            编辑
                        </a-button>
                        <a-dropdown>
                            <a-button @click.stop type="link" size="small">
                                更多
                                <DownOutlined />
                            </a-button>
                            <template #overlay>
                                <a-menu @click="(key: any) => handleMenuClick(key, record)">
                                    <a-menu-item class="custom-menu-item" key="view">查看详情</a-menu-item>
                                    <a-menu-divider />
                                    <a-menu-item class="custom-menu-item" key="add">添加下级</a-menu-item>
                                    <a-menu-divider />
                                    <a-menu-item key="delete" danger>删除</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </a-space>
                </template>
            </template>
        </a-table>
        <!-- 编辑菜单 -->
        <MenuDrawer v-model:visible="open" :edit-data="currentEditData" :menu-tree-data="menuTreeData"
            @submit="handleSubmit" @close="handleDrawerClose" />
    </div>
</template>
<script lang="ts" setup>
import { DeleteOutlined } from '@ant-design/icons-vue';
import getDatas from "@/network/index";
import MenuDrawer from '@/components/MenuDrawer.vue';
import { DownOutlined } from '@ant-design/icons-vue';
import { Usermenu, MenuType } from "./interface/menu";
import { onMounted, ref, reactive, computed } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus'
import type { MenuItem } from './interface/menu';
import { message } from "ant-design-vue";
// 引入组件
import SelectNumber from "@/components/SelectNumber.vue"

const selectedRowKeys = ref<any[]>([]);

const menuList = ref<Usermenu[]>([
    {
        "id": "1692351203619045377",
        "key": "1692351203619045377",
        "title": "栏目管理",
        "parentId": "",
        "name": "栏目管理",
        "perms": null,
        "permsType": "1",
        "icon": "cluster",
        "component": "layouts/RouteView",
        "url": "/columnmage",
        "redirect": null,
        "sortNo": 1,
        "menuType": 0,
        "isLeaf": false,
        "route": true,
        "keepAlive": false,
        "description": null,
        "delFlag": 0,
        "createBy": "admin",
        "createTime": "2023-08-18 09:42:24",
        "updateBy": "admin",
        "updateTime": "2023-08-18 10:28:35",
        "alwaysShow": false,
        "hidden": false,
        "status": "1",
        "internalOrExternal": false,
        "children": [
            {
                "id": "1686624163074867202",
                "key": "1686624163074867202",
                "title": "栏目管理",
                "parentId": "1692351203619045377",
                "name": "栏目管理",
                "perms": null,
                "permsType": "1",
                "icon": "bars",
                "component": "newsper/NewsperList",
                "url": "/newsper/NewsperList",
                "redirect": null,
                "sortNo": 1,
                "menuType": 1,
                "isLeaf": true,
                "route": true,
                "keepAlive": false,
                "description": null,
                "delFlag": 0,
                "createBy": "admin",
                "createTime": "2023-08-02 14:25:11",
                "updateBy": "admin",
                "updateTime": "2023-08-18 09:59:44",
                "alwaysShow": false,
                "hidden": false,
                "status": "1",
                "internalOrExternal": false,
                "children": null,
                "leaf": true
            },
            {
                "id": "1692351828494843906",
                "key": "1692351828494843906",
                "title": "栏目管理员",
                "parentId": "1692351203619045377",
                "name": "栏目管理员",
                "perms": null,
                "permsType": "1",
                "icon": "usergroup-add",
                "component": "columnm/ColumnAdmList",
                "url": "/columnm/ColumnAdmList",
                "redirect": null,
                "sortNo": 2,
                "menuType": 1,
                "isLeaf": true,
                "route": true,
                "keepAlive": false,
                "description": null,
                "delFlag": 0,
                "createBy": "admin",
                "createTime": "2023-08-18 09:44:53",
                "updateBy": "admin",
                "updateTime": "2023-08-18 10:48:40",
                "alwaysShow": false,
                "hidden": false,
                "status": "1",
                "internalOrExternal": false,
                "children": null,
                "leaf": true
            }
        ],
        "leaf": false
    }
])


// 处理编辑
const open = ref<boolean>(false);
const handleEdit = (record: Usermenu) => {
    console.log('编辑:', record)
    open.value = true;
    console.log('编辑:', open.value)
}

const onSelectChange = (selectedKeys: any[]) => {
    selectedRowKeys.value = selectedKeys;
};
// 处理菜单点击
const handleMenuClick = (row: any, record: any) => {
    switch (row.key) {
        case 'view':
            console.log('查看详情:', record)
            break
        case 'add':
            console.log('添加下级:', record)
            break
        case 'delete':
            console.log('删除:', record)
            break
    }
}


const clearNum = (value: number) => {
    selectedRowKeys.value = [];
}
const addUserMenu = () => {
    console.log('新增菜单');
    open.value = true;
}
const batchDelete = () => {
    console.log('批量删除菜单:', selectedRowKeys.value);
    ElMessageBox.confirm(
        '是否删除选中数据?',
        '提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            let resp = await getDatas("system/deleteMenuListTree", { ids: selectedRowKeys.value });
            if (resp.data.code == 0) {
                ElMessage({
                    type: 'success',
                    message: '删除成功!',
                });
                getUserTreeFn();
                selectedRowKeys.value = [];
            }
        })
        .catch(() => {
        })
}
// 定义表格列
const columns = [
    {
        title: '菜单名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '图标',
        dataIndex: 'icon',
        key: 'icon',
    },
    {
        title: '路径',
        dataIndex: 'url',
        key: 'url',
    },
    {
        title: '排序',
        dataIndex: 'sortNo',
        key: 'sortNo',
    },
    {
        title: '操作',
        key: 'action',
    }
]
// 转换数据为树形结构
const transformData = (item: any) => {
    return {
        ...item,
        children: item.children ? item.children.map(transformData) : undefined
    }
}
// 获取数据
const getUserTreeFn = async () => {
    let resp = await getDatas("system/GetMenuListTree");
    console.log(resp, 'respresp')
    if (resp.data.code == 0) {
        menuList.value = resp.data.result;
    }
}


const currentEditData = ref<MenuItem | null>(null);

// 构建树形数据
const menuTreeData  = computed(() => {
    const buildTree :any  = (items: MenuItem[], parentId: string = ''): any[] => {
        return items
            .filter(item => item.parentId === parentId && item.menuType !== MenuType.BUTTON)
            .map(item => ({
                id: item.id,
                key: item.key,
                title: item.title,
                children: buildTree(items, item.id),
            }));
    };
    return buildTree(menuList.value);
});

// 提交表单
const handleSubmit = async (formData: any) => {
    try {
        if (formData.id) {
            // 编辑操作
            // await updateMenu(formData);
            message.success('编辑成功');
        } else {
            // 新增操作
            // await addMenu(formData);
            message.success('新增成功');
        }
        getUserTreeFn();
    } catch (error) {
        message.error('操作失败');
    }
};


// 关闭抽屉
const handleDrawerClose = () => {
    currentEditData.value = null;
};

onMounted(() => {
    console.log('组件挂载完成');
    getUserTreeFn();
});

</script>

<style lang="less" scoped>
:deep(.custom-menu-item) {
    color: #000 !important;
    margin: 0 !important;
    padding: 5px 12px !important;
    line-height: 22px !important;
}

:deep(.custom-menu-item:hover) {
    background-color: #e6f7ff !important;
}
</style>