<template>
    <div class="peijianSort">
        <!--新增  -->
        <el-button type="primary" @click="num++">新增</el-button>
        <SelectNumber :num="num" @clearSelect="clearNum"></SelectNumber>
        <!-- 展示权限菜单、树结构  -->
        <a-table :columns="columns" :data-source="dataSource" :row-key="(record: any) => record.id"
            :expand-row-by-click="true" :default-expand-all="true" :pagination="false">
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
        <template>
            <a-drawer title="编辑菜单" :width="720" :visible="open" :body-style="{ paddingBottom: '80px' }"
                :footer-style="{ textAlign: 'right' }" @close="onClose">
                <a-form :model="form" :rules="rules" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :span="12">
                            <a-form-item label="Name" name="name">
                                <a-input v-model:value="form.name" placeholder="Please enter user name" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="Url" name="url">
                                <a-input v-model:value="form.url" style="width: 100%" addon-before="http://"
                                    addon-after=".com" placeholder="please enter url" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16">
                        <a-col :span="12">
                            <a-form-item label="Owner" name="owner">
                                <a-select v-model:value="form.owner" placeholder="Please a-s an owner">
                                    <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
                                    <a-select-option value="mao">Maomao Zhou</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="Type" name="type">
                                <a-select v-model:value="form.type" placeholder="Please choose the type">
                                    <a-select-option value="private">Private</a-select-option>
                                    <a-select-option value="public">Public</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16">
                        <a-col :span="12">
                            <a-form-item label="Approver" name="approver">
                                <a-select v-model:value="form.approver" placeholder="Please choose the approver">
                                    <a-select-option value="jack">Jack Ma</a-select-option>
                                    <a-select-option value="tom">Tom Liu</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <!-- <a-form-item label="DateTime" name="dateTime">
                                <a-date-picker v-model:value="form.dateTime" style="width: 100%"
                                    :get-popup-container="trigger => trigger.parentElement" />
                            </a-form-item> -->
                        </a-col>
                    </a-row>
                    <a-row :gutter="16">
                        <a-col :span="24">
                            <a-form-item label="Description" name="description">
                                <a-textarea v-model:value="form.description" :rows="4"
                                    placeholder="please enter url description" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
                <template #extra>
                    <a-space>
                        <a-button @click="onClose">Cancel</a-button>
                        <a-button type="primary" @click="onClose">Submit</a-button>
                    </a-space>
                </template>
            </a-drawer>
        </template>
    </div>
</template>
<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form';
import { DownOutlined } from '@ant-design/icons-vue';
import { Usermenu } from "./interface/menu";
import { onMounted, ref, reactive } from 'vue';
// 引入组件
import SelectNumber from "@/components/SelectNumber.vue"

const dataSource = ref<Usermenu[]>([
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

let num = ref(100);

const clearNum = (value: number) => {
    num.value = value;
}
// 定义表格列
const columns = [
    {
        title: '菜单',
        dataIndex: 'name',
        key: 'name',
        width: '40%'
    },
    {
        title: '图标',
        dataIndex: 'icon',
        key: 'icon',
        width: '20%'
    },
    {
        title: '排序',
        dataIndex: 'sortNo',
        key: 'sortNo',
        width: '20%',
    },
    {
        title: '操作',
        key: 'action',
        width: '20%'
    }
]
// 转换数据为树形结构
const transformData = (item: any) => {
    return {
        ...item,
        children: item.children ? item.children.map(transformData) : undefined
    }
}

// 编辑表格内数据
const form = reactive({
    name: '',
    url: '',
    owner: '',
    type: '',
    approver: '',
    dateTime: null,
    description: '',
});
const rules: Record<string, Rule[]> = {
    name: [{ required: true, message: 'Please enter user name' }],
    url: [{ required: true, message: 'please enter url' }],
    owner: [{ required: true, message: 'Please select an owner' }],
    type: [{ required: true, message: 'Please choose the type' }],
    approver: [{ required: true, message: 'Please choose the approver' }],
    dateTime: [{ required: true, message: 'Please choose the dateTime', type: 'object' }],
    description: [{ required: true, message: 'Please enter url description' }],
};
const onClose = () => {
    open.value = false;
};
onMounted(() => {
    console.log('组件挂载完成');
});

</script>

<style lang="less" scoped>
.peijianSort {
    padding: 1rem;
    background-color: white;
    margin: 1rem;

}

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