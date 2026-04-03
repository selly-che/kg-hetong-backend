<template>
    <div class="project-management">
        <!-- 搜索筛选区域 -->
        <el-card class="search-card" shadow="never">
            <el-form :inline="true" :model="searchForm" class="search-form">
                <el-form-item label="项目名称">
                    <el-input v-model="searchForm.projectFullName" placeholder="请输入项目名称" clearable
                        style="width: 200px" />
                </el-form-item>
                <el-form-item label="主管计调">
                    <el-select v-model="searchForm.managerCharge" placeholder="请选择" clearable style="width: 120px">
                        <el-option label="王若成" value="王若成" />
                        <el-option label="梁斌" value="梁斌" />
                        <el-option label="王京" value="王京" />
                    </el-select>
                </el-form-item>
                <el-form-item label="板块">
                    <el-select v-model="searchForm.projectPlate" placeholder="请选择" clearable style="width: 120px">
                        <el-option v-for="item in engineeringBusinessTypeOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="searchForm.projectTypeTwo" placeholder="请选择" clearable style="width:120px">
                        <el-option v-for="item in trafficTypeOptions" :key="item" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item label="区域指挥部">
                    <el-select v-model="searchForm.projectArea" placeholder="请选择" style="width: 120px">
                        <el-option v-for="item in regionTypeOptions" :key="item" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item label="是否军融">
                    <el-select v-model="searchForm.projectIsJr" placeholder="请选择" clearable style="width: 120px">
                        <el-option label="是" :value="1" />
                        <el-option label="否" :value="0" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                    <el-button @click="resetSearch">重置</el-button>
                    <el-button type="primary" @click="handleAdd">
                        <el-icon>
                            <Plus />
                        </el-icon>
                        新增
                    </el-button>
                    <el-button type="danger" plain @click="handleBatchDelete" :disabled="selectedRows.length === 0">
                        <el-icon>
                            <Delete />
                        </el-icon>
                        删除
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 数据表格 -->
        <el-card class="table-card" shadow="never">
            <el-table :data="tableData" stripe border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="projectFullName" label="项目名称">
                    <!-- <template #default="{ row }">
                        <el-link type="primary" @click="handleViewDetail(row)">
                            {{ row.projectName }}
                        </el-link>
                    </template> -->
                </el-table-column>
                <el-table-column prop="projectShortName" label="项目简称" />
                <el-table-column prop="projectArea" label="区域指挥部" width="120" align="center" />
                <el-table-column prop="projectSection" label="板块" width="90" align="center" />
                <el-table-column prop="projectSection" label="类型一" width="80" align="center" />
                <!-- <el-table-column prop="subjectUnit" label="主体责任单位" width="150" align="center" /> -->
                <!-- <el-table-column prop="undertakingUnit" label="承担单位" width="150" align="center" /> -->
                <el-table-column prop="managerCharge" label="主管计调" width="120" align="center" />
                <el-table-column prop="managerAssist" label="协管计调" width="120" align="center" />
                <!-- <el-table-column prop="supervisor" label="关注领导" width="120" align="center" /> -->
                <el-table-column label="操作" width="100" fixed="right">
                    <template #default="{ row }">
                        <el-button link type="primary" size="small" @click="handleEdit(row)">
                            编辑
                        </el-button>
                        <el-button link type="danger" size="small" @click="handleDelete(row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="pagination">
                <el-pagination v-model:current-page="pagination.currentPage" v-model:page-size="pagination.pageSize"
                    :page-sizes="[10, 20, 50, 100]" :total="pagination.total"
                    layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </div>
        </el-card>

        <!-- 新增/编辑弹框 -->
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="80%" destroy-on-close @close="handleDialogClose">
            <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="right">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="项目全称" prop="projectFullName">
                            <el-input v-model="formData.projectFullName" placeholder="请输入项目全称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目简称" prop="projectShortName">
                            <el-input v-model="formData.projectShortName" placeholder="请输入项目简称" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="项目拼音" prop="projectFullPinyin">
                            <el-input v-model="formData.projectFullPinyin" placeholder="请输入项目拼音" />

                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目简拼" prop="projectShortPinyin">
                            <el-input v-model="formData.projectShortPinyin" placeholder="请输入项目简拼" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="8">
                        <el-form-item label="板块" prop="projectPlate">
                            <el-select v-model="formData.projectPlate" placeholder="选择板块" style="width: 100%">
                                <el-option v-for="item in engineeringBusinessTypeOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="类型一" prop="projectSection">
                            <el-select v-model="formData.projectType" placeholder="选择类型一" style="width: 100%">
                                <el-option label="铁路" :value="0" />
                                <el-option label="城轨" :value="1" />
                                <el-option label="公路" :value="2" />
                                <el-option label="市政" :value="3" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="类型二" prop="projectTypeTwo">
                            <el-select v-model="formData.projectTypeTwo" placeholder="请选择" style="width: 100%">
                                <el-option v-for="item in trafficTypeOptions" :key="item" :label="item" :value="item" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-col :span="12">
                        <el-form-item label="业主单位" prop="ownerUnit">
                            <el-select v-model="formData.ownerUnit" placeholder="请选择" style="width: 100%">
                                <el-option label="业主单位A" value="业主单位A" />
                                <el-option label="业主单位B" value="业主单位B" />
                            </el-select>
                        </el-form-item>
                    </el-col> -->

                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="项目阶段" prop="steps">
                            <el-select v-model="formData.steps" multiple placeholder="请选择" style="width: 100%"
                                clearable>
                                <!-- 600-预付期，601-投标，602-规划，603-预可研，604-可研，605-初步设计，606-施工图，607-配合施工，608-开通运营，609-招标图，610-专题专项，611-清概（结算），612-质保期， -->
                                <el-option label="预付期" value="600" />
                                <el-option label="投标" value="601" />
                                <el-option label="规划" value="602" />
                                <el-option label="预可研" value="603" />
                                <el-option label="可研" value="604" />
                                <el-option label="初步设计" value="605" />
                                <el-option label="施工图" value="606" />
                                <el-option label="配合施工" value="607" />
                                <el-option label="开通运营" value="608" />
                                <el-option label="招标图" value="609" />
                                <el-option label="专题专项" value="610" />
                                <el-option label="清概（结算）" value="611" />
                                <el-option label="质保期" value="612" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="区域指挥部" prop="projectArea">
                            <el-select v-model="formData.projectArea" placeholder="请选择" style="width: 100%">
                                <el-option v-for="item in regionTypeOptions" :key="item" :label="item" :value="item" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">

                    <el-col :span="12">
                        <el-form-item label="主管计调" prop="managerCharge">
                            <el-select v-model="formData.managerCharge" placeholder="请选择" style="width: 100%">
                                <el-option label="王若晨" value="王若晨" />
                                <el-option label="张三" value="张三" />
                                <el-option label="李四" value="李四" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="协管计调" prop="managerAssist">
                            <el-select v-model="formData.managerAssist" placeholder="请选择" style="width: 100%">
                                <el-option label="赵六" value="赵六" />
                                <el-option label="王五" value="王五" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="是否军融" prop="projectIsJr">
                            <el-select v-model="formData.projectIsJr" placeholder="请选择" style="width: 100%">
                                <el-option label="是" :value="1" />
                                <el-option label="否" :value="0" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目来源" prop="projectSource">
                            <el-select v-model="formData.projectSource" placeholder="国内勘察设计" style="width: 100%">
                                <el-option label="国内勘察设计" value="国内勘察设计" />
                                <el-option label="海外项目" value="海外项目" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">关闭</el-button>
                    <el-button type="primary" @click="handleSave">保存</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
import getDatas from "@/network/index"; // 引入接口


const engineeringBusinessTypeOptions = ref()
const regionTypeOptions = ref()
const trafficTypeOptions = ref()

// 搜索表单
const searchForm = reactive({
    projectFullName: '',
    managerCharge: '',
    projectSection: '',
    projectTypeTwo: '',
    projectArea: '',
    projectIsJr: 0
})

// 分页
const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0
})

// 表格数据
const tableData = ref([])
const selectedRows = ref([])

// 弹框相关
const dialogVisible = ref(false)
const dialogTitle = ref('新增项目表')
const isEdit = ref(false)
const formRef = ref(null)

// 表单数据
const formData = reactive({
    id: null,
    projectFullName: '',
    projectShortName: '',
    abbreviation: '',
    projectSection: '',
    type1: '',
    projectTypeTwo: '',
    ownerUnit: '',
    projectIsJr: 0,
    steps: [],
    projectArea: '',
    managerCharge: '',
    managerAssist: '',
    projectSource: '国内勘察设计'
})

// 表单验证规则
const formRules = {
    projectFullName: [{ required: true, message: '请输入项目全称', trigger: 'blur' }],
    projectShortName: [{ required: true, message: '请输入项目简称', trigger: 'blur' }],
    projectPlate: [{ required: true, message: '请选择板块', trigger: 'change' }],
    projectArea: [{ required: true, message: '请选择区域指挥部', trigger: 'change' }]
}




// 获取表格数据
const fetchTableData = () => {
    getProjectList()
}

// 搜索
const handleSearch = () => {
    pagination.currentPage = 1
    fetchTableData()
}

// 重置搜索
const resetSearch = () => {
    searchForm.projectName = ''
    searchForm.projectSection = ''
    searchForm.projectType = ''
    searchForm.projectArea = ''
    searchForm.projectIsJr = 0
    handleSearch()
}

// 新增
const handleAdd = () => {
    isEdit.value = false
    dialogTitle.value = '新增项目表'
    // 重置表单
    Object.assign(formData, {
        id: null,
        projectFullName: '',
        projectShortName: '',
        abbreviation: '',
        projectSection: '',
        type1: '',
        projectTypeTwo: '',
        ownerUnit: '',
        projectIsJr: 0,
        steps: [],
        projectArea: '',
        managerCharge: '',
        managerAssist: '',
        projectSource: '国内勘察设计'
    })
    dialogVisible.value = true
}

// 编辑
const handleEdit = (row) => {
    console.log(row);

    isEdit.value = true
    dialogTitle.value = '编辑项目表'
    Object.assign(formData, row)
    formData.steps = row.steps ? row.steps.split(',') : [] // 将字符串转换为数组
    dialogVisible.value = true
}

// 保存
const handleSave = async () => {
    if (!formRef.value) return

    await formRef.value.validate(async (valid) => {
        if (valid) {
            console.log(formData, 'formData');
            const prrams = JSON.parse(JSON.stringify(formData))
            prrams.steps = formData.steps.join(',')
            const res = await getDatas('project/AddProject', prrams);
            console.log(res, 'resresres');

            if (res.data.code === 200) {
                ElMessage.success('保存成功');
                dialogVisible.value = false
                fetchTableData()
            }

        } else {
            ElMessage.error('请完善表单信息')
        }
    })
}

// 删除单条
const handleDelete = (row) => {
    console.log(row);

    ElMessageBox.confirm('确定删除该项目吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        console.log('123456789');

        const res = await getDatas('project/delsProList', [row.id]);
        console.log(res, 'rreess');
        if (res.data.code === 200) {
            ElMessage.success('删除成功')
            fetchTableData()
        } else {
            ElMessage.error('删除失败')
        }
    }).catch(() => { })
}

// 批量删除
const handleBatchDelete = () => {
    if (selectedRows.value.length === 0) {
        ElMessage.warning('请选择要删除的项目')
        return
    }
    ElMessageBox.confirm(`确定删除选中的 ${selectedRows.value.length} 个项目吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        const idsToDelete = selectedRows.value.map(row => row.id.toString())
        const res = await getDatas('project/delsProList', idsToDelete);
        if (res.data.code === 200) {
            selectedRows.value = []
            ElMessage.success('删除成功')
            fetchTableData()
        }
    }).catch(() => { })
}

// 查看详情
const handleViewDetail = (row) => {
    ElMessage.info(`查看项目详情: ${row.projectName}`)
    // 可跳转详情页或打开详情弹框
}

// 表格选中变化
const handleSelectionChange = (val) => {
    selectedRows.value = val
}

// 分页大小变化
const handleSizeChange = (val) => {
    pagination.pageSize = val
    fetchTableData()
}

// 当前页变化
const handleCurrentChange = (val) => {
    pagination.currentPage = val
    fetchTableData()
}

// 弹框关闭回调
const handleDialogClose = () => {
    formRef.value?.resetFields()
}

// 存储原始mock数据
const mockData = ref([])


const getProjectList = async () => {
    const res = await getDatas("project/GetProjectList", {
        pageNum: pagination.currentPage,
        pageSize: pagination.pageSize,
        ...searchForm
    });
    console.log("项目列表信息:", res.data.result.records);
    tableData.value = res.data.result.records;
    pagination.total = res.data.result.total;
};
const getProjectSelectList = async () => {
    const res = await getDatas("project/ProSelectList", {});
    console.log("项目下拉列表信息:", res.data.result);
    // 可将下拉列表数据存储在响应式变量中，供表单使用
    if (res.data.code == 200) {
        // engineeringBusinessTypeOptions.value = res.data.result.engineeringBusinessType
        engineeringBusinessTypeOptions.value = (res.data.result.engineeringBusinessType).map((item, index) => ({
            label: item,
            value: String(index)
        }))
        regionTypeOptions.value = res.data.result.regionType
        trafficTypeOptions.value = res.data.result.trafficType
    }
};

onMounted(() => {
    getProjectList()
    getProjectSelectList()
    mockData.value = [...tableData.value]
})
</script>

<style scoped>
.project-management {
    padding: 20px;
    background-color: #f5f7fa;
    min-height: 100vh;
}

.search-card,
.action-card,
.table-card {
    margin-bottom: 20px;
    border-radius: 8px;
}

.search-form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
}

.action-bar {
    display: flex;
    gap: 12px;
}

.pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

:deep(.el-table .el-link) {
    font-weight: 500;
}

:deep(.el-card__body) {
    padding: 20px;
}
</style>