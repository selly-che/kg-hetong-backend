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
        <MenuDrawer v-model:visible="open" :edit-data="currentEditData" :menu-tree-data="menuList"
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

const menuList = ref<Usermenu[]>([])


// 处理编辑
const open = ref<boolean>(false);
const handleEdit = (record: Usermenu) => {
    console.log('编辑:', record)
    open.value = true;
    currentEditData.value = { ...record };
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


const clearNum = () => {
    selectedRowKeys.value = [];
}
const addUserMenu = () => {
    console.log('新增菜单');
    open.value = true;
    // let formDataFinal = {
    //     "alwaysShow": false,
    //     "component": "1",
    //     "hidden": false,
    //      "icon": "ArrowsAltOutlined",
    //     "keepAlive": false,
    //     "menuType": "0",
    //     "name": "11421",
    //     "perms": "",
    //     "permsType": "1",
    //     "redirect": "",
    //     "route": true,
    //     "status": "1",
    //     "sortNo": "0",
    //     "url": "11",

    //     // "parentId": "",
    //     "internalOrExternal": false,
    //     "title": "11",
    //     "isLeaf": false,
    //     "leaf": false,
    // }
    // handleSubmit(formDataFinal)
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
            let idss = selectedRowKeys.value.join(',');
            let resp = await getDatas("system/deleteMenuListTree", { ids: idss });
            if (resp.data.code == 200) {
                ElMessage({
                    type: 'success',
                    message: '删除成功!',
                });
                getUserTreeFn();
                selectedRowKeys.value = [];
            } else {
                ElMessage({
                    type: 'error',
                    message: resp.data.message || '删除失败!',
                });
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


let currentEditData = ref<any>(null);


// 提交表单
const handleSubmit = async (formData: any) => {
    try {
        console.log(formData, 'formDataformData');
        if (formData.id) {
            // 编辑操作
            await updateMenu(formData);
        } else {
            // 新增操作
            await addMenu(formData);
        }
    } catch (error) {
        message.error('操作失败');
    }
};
const addMenu = async (data: any) => {
    let resp = await getDatas("system/addMenuListTree", data);
    console.log(resp, 'respresp');

    if (resp.data.code == 200) {
        message.success('新增成功');
        getUserTreeFn();
        open.value = false;
    } else {
        message.error(resp.data.message || '新增失败');
    }
};

const updateMenu = async (data: any) => {
    let resp = await getDatas("system/updateMenuListTree", data);
    console.log(resp, 'respresp');
    if (resp.data.code == 200) {
        message.success('编辑成功');
        getUserTreeFn();
        open.value = false;
    } else {
        message.error(resp.data.message || '编辑失败');
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