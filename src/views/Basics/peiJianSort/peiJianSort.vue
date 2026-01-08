<template>
    <div class="peiJianSort">
        <div class="sousuo">
            <el-button type="primary" size="large" @click="peiJianSortAction">新增配件分类</el-button>
            <el-input v-model="search" :prefix-icon="Search" size="large" @clear="peijian_typeIndex()" clearable
                style="width: 240px;margin: 0 0.5rem;" placeholder="请输入搜索内容" />
            <el-button type="primary" :icon="Search" plain @click="peijian_typeIndex()" size="large">搜索</el-button>
        </div>
        <el-dialog :title="peiJianSortTitle" v-model="peiJianSortDialog" width="50%" center>
            <el-form :model="ruleForm" label-width="100px">
                <el-form-item label="配件分类名">
                    <el-input v-model="ruleForm.title" placeholder="请输入配件分类名称" size="large" clearable></el-input>
                </el-form-item>
                <el-form-item label="备注信息">
                    <el-input v-model="ruleForm.bz" type="textarea" placeholder="请输入备注信息" :autosize="true"
                        clearable></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-checkbox v-model="status" size="large" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleForm)">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-table :data="tableData" border v-loading="loading" style="width: 100%"  :header-cell-style="{background:'#f7f8fa'}">
            <el-table-column type="index" width="50" align="center"> </el-table-column>
            <el-table-column prop="title" label="配件分类名称" width="150" align="center" />
            <el-table-column prop="status_title" label="状态" width="100" align="center" />
            <el-table-column prop="bz" label="备注" align="center" />
            <el-table-column fixed="right" label="操作" width="100" align="center">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleSeleUserId(scope.row)">编辑</el-button>
                    <el-button link type="danger" size="small" @click="deleteActionSele(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="currentPageChange" :current-page="currentPage"
            :page-sizes="[10, 15]" :page-size="pageSize" background layout="total, sizes, prev, pager, next, jumper"
            :total="totle" style="margin-top: 0.5rem;">
        </el-pagination>
    </div>
</template>
<script lang="ts" setup>

import getDatas from "@/network/index";
import { ref, onMounted, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'


const search = ref('');
const loading = ref(false);
const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const totle = ref(0);
const peiJianSortDialog = ref(false);
const peiJianSortTitle = ref('');
const peiJianSortSaveType = ref<number | null>(null);//1 新增 2 修改
const status = ref(true);

const ruleForm = reactive({
    id: '',
    title: "",//公司名称
    bz: "", //备注信息
});

onMounted(() => {
    peijian_typeIndex();
});
// 配件分类类型列表
const peijian_typeIndex = async () => {
    loading.value = true;
    const res = await getDatas("work/peijian_typeIndex", {
        title: search.value,
        status: '',
        page: currentPage.value,
        limit: pageSize.value,
    });
    console.log("配件分类类型列表", JSON.parse(JSON.stringify(res.data)));
    if (res.data.code == 0) {
        tableData.value = res.data.lists;
        totle.value = res.data.totle_num;
        loading.value = false;
    }else {
        ElMessage.error(res.data.msg);
        loading.value = false;
    }
};
// 分页
const handleSizeChange = (val: any) => {
    pageSize.value = val;
    peijian_typeIndex();
}
// 当前页
const currentPageChange = (val: any) => {
    currentPage.value = val;
    peijian_typeIndex();
}
// 新增配件分类
const peiJianSortAction = () => {
    peiJianSortTitle.value = '新增配件分类';
    peiJianSortSaveType.value = 1;
    peiJianSortDialog.value = true;
    Object.keys(ruleForm).forEach((key) => {
        // @ts-ignore
        ruleForm[key] = '';
    });
}
// 编辑
const handleSeleUserId = async (scope: any) => {
    peiJianSortSaveType.value = 2;
    peiJianSortTitle.value = '修改配件分类信息';
    const res = await getDatas("work/peijian_typeInfo", {
        id: scope.id,
    })
    // console.log("详情", JSON.parse(JSON.stringify(res.data)));
    if (res.data.code == 0) {
        ruleForm.id = res.data.result.id;
        ruleForm.title = res.data.result.title;
        ruleForm.bz = res.data.result.bz;
        status.value = res.data.result.status == 1 ? true : false;
        peiJianSortDialog.value = true;
    } else {
        ElMessage.error(res.data.msg);
    }
}
// 删除
const deleteActionSele = (scope: any) => {
    ElMessageBox.confirm('此操作将永久删除该配件分类, 是否继续?','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(async () => {
            const res = await getDatas("work/peijian_typeDel", {
                id: scope.id,
            })
            if (res.data.code == 0) {
                peijian_typeIndex();
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                })
            } else {
                ElMessage.error(res.data.msg);
            }
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}
// 提交
const submitForm = async (item: any) => {
    if (peiJianSortSaveType.value == 1) {
        const res = await getDatas("work/peijian_typeSave", {
            id: '',
            title: item.title,
            status: status.value ? 1 : 0,
            bz: item.bz,
        });
        if (res.data.code == 0) {
            peiJianSortDialog.value = false;
            peijian_typeIndex();
            ElMessage.success('新增配件分类成功');
        } else {
            ElMessage.error(res.data.msg);
        }
    }
    if (peiJianSortSaveType.value == 2) {
        const res = await getDatas("work/peijian_typeSave", {
            id: ruleForm.id,
            title: ruleForm.title,
            status: status.value ? 1 : 0,
            bz: ruleForm.bz,
        });
        if (res.data.code == 0) {
            peiJianSortDialog.value = false;
            peijian_typeIndex();
            ElMessage.success('修改配件分类成功');
        } else {
            ElMessage.error(res.data.msg);
        }
    }
}

</script>

<style lang="less" scoped>

.peiJianSort {
    // padding: 1rem;
    // border: 1px solid #ebeef5;
    background-color: white;
    // margin-top: 1rem;
    margin: 1rem;
    padding: 1rem;


    .sousuo {
        margin-bottom: 0.5rem;
    }

}
</style>