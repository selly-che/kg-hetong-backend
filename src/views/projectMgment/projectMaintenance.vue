<template>
    <div class="project-management">
        <!-- 搜索筛选区域 -->
        <a-card class="search-card" :bordered="false">
            <a-form :model="searchForm" layout="inline" class="search-form">
                <a-form-item label="项目名称">
                    <a-input v-model:value="searchForm.projectFullName" placeholder="请输入项目名称" allow-clear
                        style="width: 200px" />
                </a-form-item>

                <a-form-item label="主管计调">
                    <a-select v-model:value="searchForm.managerCharge" placeholder="请选择" allow-clear
                        style="width: 120px">
                        <a-select-option value="csq">陈叔清</a-select-option>
                        <a-select-option value="ljj">卢静静</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item label="板块">
                    <a-select v-model:value="searchForm.projectPlate" placeholder="请选择" allow-clear
                        style="width: 120px">
                        <a-select-option v-for="item in engineeringBusinessTypeOptions" :key="item.value"
                            :value="item.value">
                            {{ item.label }}
                        </a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item label="类型">
                    <a-select v-model:value="searchForm.projectTypeTwo" placeholder="请选择" allow-clear
                        style="width: 120px">
                        <a-select-option v-for="item in trafficTypeOptions" :key="item" :value="item">
                            {{ item }}
                        </a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item label="区域指挥部">
                    <a-select v-model:value="searchForm.projectArea" placeholder="请选择" allow-clear style="width: 120px">
                        <a-select-option v-for="item in regionTypeOptions" :key="item" :value="item">
                            {{ item }}
                        </a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item label="是否军融">
                    <a-select v-model:value="searchForm.projectIsJr" placeholder="请选择" allow-clear style="width: 120px">
                        <a-select-option :value="1">是</a-select-option>
                        <a-select-option :value="0">否</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item>
                    <a-button type="primary" @click="handleSearch">
                        <template #icon>
                            <PlusOutlined />
                        </template>
                        查询
                    </a-button>
                    <a-button style="margin: 0 10px;" @click="resetSearch">重置</a-button>
                    <a-button type="primary" @click="handleAdd">
                        <template #icon>
                            <PlusOutlined />
                        </template>
                        新增
                    </a-button>
                    <a-button style="margin-left:  10px;" danger @click="handleBatchDelete"
                        :disabled="selectedRows.length === 0">
                        <template #icon>
                            <DeleteOutlined />
                        </template>
                        删除
                    </a-button>
                </a-form-item>
            </a-form>
        </a-card>

        <!-- 数据表格 -->
        <a-card class="table-card" :bordered="false">
            <a-table :columns="columns" :data-source="tableData" row-key="id" bordered :pagination="false"
                @selection-change="handleSelectionChange">
                <!-- 复选框列 -->
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'selection'">
                        <a-checkbox :checked="selectedRows.some(item => item.id === record.id)"
                            @change="(e) => handleSelectRow(e, record)" />
                    </template>
                    <template v-else-if="column.key === 'managerCharge'">
                        {{ record.managerCharge === 'csq' ? '陈叔清' : '' }}
                        {{ record.managerCharge === 'ljj' ? '卢静静' : '' }}
                    </template>
                    <template v-else-if="column.key === 'managerAssist'">
                        {{ record.managerAssist === 'csq' ? '陈叔清' : '' }}
                        {{ record.managerAssist === 'ljj' ? '卢静静' : '' }}
                    </template>
                    <template v-else-if="column.key === 'projectPlate'">
                        {{ getProjectPlateText(record.projectPlate) }}
                    </template>
                    <template v-else-if="column.key === 'action'">
                        <a-space size="small">
                            <a-button type="link" @click="handleEdit(record)">编辑</a-button>
                            <a-button type="link" danger @click="handleDelete(record)">
                                删除
                            </a-button>
                        </a-space>
                    </template>
                </template>
            </a-table>

            <!-- 分页 -->
            <div class="pagination">
                <a-pagination v-model:current="pagination.currentPage" v-model:page-size="pagination.pageSize"
                    :page-size-options="[10, 20, 50, 100]" :total="pagination.total" show-size-changer show-quick-jumper
                    @change="handlePageChange" />
            </div>
        </a-card>

        <!-- 新增/编辑弹框 -->
        <a-modal v-model:visible="dialogVisible" :title="dialogTitle" width="80%" destroy-on-close
            @cancel="handleDialogClose">
            <a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
                <a-row :gutter="[20, 20]">
                    <a-col :span="12">
                        <a-form-item label="项目全称" name="projectFullName">
                            <a-input v-model:value="formData.projectFullName" placeholder="请输入项目全称" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="项目简称" name="projectShortName">
                            <a-input v-model:value="formData.projectShortName" placeholder="请输入项目简称" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[20, 20]">
                    <a-col :span="12">
                        <a-form-item label="项目拼音" name="projectFullPinyin">
                            <a-input v-model:value="formData.projectFullPinyin" placeholder="请输入项目拼音" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="项目简拼" name="projectShortPinyin">
                            <a-input v-model:value="formData.projectShortPinyin" placeholder="请输入项目简拼" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[24, 24]">
                    <a-col :span="8">
                        <a-form-item label="板块" name="projectPlate">
                            <a-select allowClear v-model:value="formData.projectPlate" placeholder="选择板块"
                                style="width: 100%">
                                <a-select-option v-for="item in engineeringBusinessTypeOptions" :key="item.value"
                                    :value="item.value">
                                    {{ item.label }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="类型一" name="projectType">
                            <a-select allowClear v-model:value="formData.projectType" placeholder="选择类型一"
                                style="width: 100%">
                                <a-select-option value="铁路">铁路</a-select-option>
                                <a-select-option value="城轨">城轨</a-select-option>
                                <a-select-option value="公路">公路</a-select-option>
                                <a-select-option value="市政">市政</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="类型二" name="projectTypeTwo">
                            <a-select allowClear v-model:value="formData.projectTypeTwo" placeholder="请选择"
                                style="width: 100%">
                                <a-select-option v-for="item in trafficTypeOptions" :key="item" :value="item">
                                    {{ item }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[24, 24]">
                    <a-col :span="12">
                        <a-form-item label="项目阶段" name="steps">
                            <a-select v-model:value="formData.steps" mode="multiple" placeholder="请选择"
                                style="width: 100%" allow-clear>
                                <a-select-option value="600">预付期</a-select-option>
                                <a-select-option value="601">投标</a-select-option>
                                <a-select-option value="602">规划</a-select-option>
                                <a-select-option value="603">预可研</a-select-option>
                                <a-select-option value="604">可研</a-select-option>
                                <a-select-option value="605">初步设计</a-select-option>
                                <a-select-option value="606">施工图</a-select-option>
                                <a-select-option value="607">配合施工</a-select-option>
                                <a-select-option value="608">开通运营</a-select-option>
                                <a-select-option value="609">招标图</a-select-option>
                                <a-select-option value="610">专题专项</a-select-option>
                                <a-select-option value="611">清概（结算）</a-select-option>
                                <a-select-option value="612">质保期</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="区域指挥部" name="projectArea">
                            <a-select v-model:value="formData.projectArea" placeholder="请选择" style="width: 100%">
                                <a-select-option v-for="item in regionTypeOptions" :key="item" :value="item">
                                    {{ item }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[20, 20]">
                    <a-col :span="12">
                        <a-form-item label="主管计调" name="managerCharge">
                            <a-select v-model:value="formData.managerCharge" allow-clear placeholder="请选择"
                                style="width: 100%">
                                <a-select-option value="csq">陈叔清</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="协管计调" name="managerAssist">
                            <a-select v-model:value="formData.managerAssist" allow-clear placeholder="请选择"
                                style="width: 100%">
                                <a-select-option value="ljj">卢静静</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[24, 24]">
                    <a-col :span="12">
                        <a-form-item label="是否军融" name="projectIsJr">
                            <a-select v-model:value="formData.projectIsJr" allow-clear placeholder="请选择"
                                style="width: 100%">
                                <a-select-option :value="1">是</a-select-option>
                                <a-select-option :value="0">否</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="项目来源" name="projectSource">
                            <a-select v-model:value="formData.projectSource" allow-clear placeholder="国内勘察设计"
                                style="width: 100%">
                                <a-select-option value="国内勘察设计">
                                    国内勘察设计
                                </a-select-option>
                                <a-select-option value="海外项目">海外项目</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>

            <template #footer>
                <div class="dialog-footer">
                    <a-button @click="dialogVisible = false">关闭</a-button>
                    <a-button type="primary" @click="handleSave">保存</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import getDatas from "@/network/index";

// 下拉选项
const engineeringBusinessTypeOptions = ref([
    { label: "勘察设计", value: 0 },
    { label: "工程咨询", value: 1 },
    { label: "工程监理", value: 2 },
    { label: "前期经营项目", value: 3 }
])
const regionTypeOptions = ref()
const trafficTypeOptions = ref()

// 搜索表单
const searchForm = reactive({
    projectFullName: '',
    managerCharge: '',
    projectType: '',
    projectTypeTwo: '',
    projectArea: '',
    projectIsJr: null,
    projectPlate: ''
})

// 分页
const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0
})

// 表格
const tableData = ref([])
const selectedRows = ref([])
const formRef = ref(null)

// 表格列配置
const columns = [
    { key: 'selection', title: '', width: 55 },
    { title: '项目名称', dataIndex: 'projectFullName', key: 'projectFullName' },
    { title: '项目简称', dataIndex: 'projectShortName', key: 'projectShortName' },
    { title: '区域指挥部', dataIndex: 'projectArea', key: 'projectArea', width: 120, align: 'center' },
    { title: '板块', dataIndex: 'projectPlate', key: 'projectPlate', width: 90, align: 'center' },
    { title: '类型一', dataIndex: 'projectType', key: 'projectType', width: 80, align: 'center' },
    { title: '主管计调', dataIndex: 'managerCharge', key: 'managerCharge', width: 120, align: 'center' },
    { title: '协管计调', dataIndex: 'managerAssist', key: 'managerAssist', width: 120, align: 'center' },
    { title: '操作', key: 'action', width: 100, align: 'center', fixed: 'right' }
]

// 弹框
const dialogVisible = ref(false)
const dialogTitle = ref('新增项目表')
const isEdit = ref(false)

// 表单数据
const formData = reactive({
    id: null,
    projectFullName: '',
    projectShortName: '',
    projectFullPinyin: '',
    projectShortPinyin: '',
    projectPlate: '',
    projectType: '',
    projectTypeTwo: '',
    steps: [],
    projectArea: '',
    managerCharge: '',
    managerAssist: '',
    projectSource: '国内勘察设计',
    projectIsJr: null
})

// 表单规则
const formRules = {}

// 表格单选/全选
const handleSelectRow = (e, record) => {
    const checked = e.target.checked
    if (checked) {
        selectedRows.value = [...selectedRows.value, record]
    } else {
        selectedRows.value = selectedRows.value.filter(item => item.id !== record.id)
    }
}

const handleSelectionChange = (val) => {
    selectedRows.value = val
}

// 获取表格数据
const fetchTableData = () => {
    getProjectList()
}

// 查询
const handleSearch = () => {
    pagination.currentPage = 1
    fetchTableData()
}

// 重置
const resetSearch = () => {
    searchForm.projectFullName = ''
    searchForm.managerCharge = ''
    searchForm.projectType = ''
    searchForm.projectTypeTwo = ''
    searchForm.projectArea = ''
    searchForm.projectPlate = ''
    searchForm.projectIsJr = null
    handleSearch()
}

// 新增
const handleAdd = () => {
    isEdit.value = false
    dialogTitle.value = '新增项目表'
    Object.assign(formData, {
        id: null,
        projectFullName: '',
        projectShortName: '',
        projectFullPinyin: '',
        projectShortPinyin: '',
        projectPlate: '',
        projectType: '',
        projectTypeTwo: '',
        steps: [],
        projectArea: '',
        managerCharge: '',
        managerAssist: '',
        projectSource: '',
        projectIsJr: null
    })
    dialogVisible.value = true
}

// 编辑
const handleEdit = (row) => {
    isEdit.value = true
    dialogTitle.value = '编辑项目表'
    Object.assign(formData, row)
    formData.steps = row.steps ? row.steps.split(',') : []
    dialogVisible.value = true
}

// 保存
const handleSave = async () => {
    if (!formRef.value) return
    const valid = await formRef.value.validate()
    if (!valid) return

    const params = JSON.parse(JSON.stringify(formData))
    params.urlType = 1
    params.steps = formData.steps.join(',')
    params.stepList = []

    const res = await getDatas('project/AddProject', params)
    if (res.data.code === 200) {
        message.success('保存成功')
        dialogVisible.value = false
        fetchTableData()
    }
}

// 删除
const handleDelete = (row) => {
    Modal.confirm({
        title: '提示',
        content: '确定删除该项目吗？',
        onOk: async () => {
            const res = await getDatas('project/delsProList', [row.id])
            if (res.data.code === 200) {
                message.success('删除成功')
                fetchTableData()
            } else {
                message.error('删除失败')
            }
        }
    })
}

// 批量删除
const handleBatchDelete = () => {
    if (selectedRows.value.length === 0) {
        message.warning('请选择要删除的项目')
        return
    }
    Modal.confirm({
        title: '提示',
        content: `确定删除选中的 ${selectedRows.value.length} 个项目吗？`,
        onOk: async () => {
            const ids = selectedRows.value.map(i => i.id)
            const res = await getDatas('project/delsProList', ids)
            if (res.data.code === 200) {
                message.success('删除成功')
                selectedRows.value = []
                fetchTableData()
            }
        }
    })
}

// 分页
const handlePageChange = (page, pageSize) => {
    pagination.currentPage = page
    pagination.pageSize = pageSize
    fetchTableData()
}

// 关闭弹框
const handleDialogClose = () => {
    formRef.value?.resetFields()
}

// 接口
const getProjectList = async () => {
    const res = await getDatas("project/GetProjectList", {
        pageNum: pagination.currentPage,
        pageSize: pagination.pageSize,
        urlType: 1,
        ...searchForm
    })
    tableData.value = res.data.result.records
    pagination.total = res.data.result.total
}

const getProjectSelectList = async () => {
    const res = await getDatas("project/ProSelectList", {})
    if (res.data.code === 200) {
        engineeringBusinessTypeOptions.value = res.data.result.engineeringBusinessType.map((item, index) => ({
            label: item,
            value: index
        }))
        regionTypeOptions.value = res.data.result.regionType
        trafficTypeOptions.value = res.data.result.trafficType
    }
}

// 板块文本转换
const getProjectPlateText = (value) => {
    if (!value && value !== 0) return '-'
    const opt = engineeringBusinessTypeOptions.value.find(i => i.value == value)
    return opt ? opt.label : '-'
}

onMounted(() => {
    getProjectList()
    getProjectSelectList()
})
</script>

<style scoped>
.project-management {
    padding: 20px;
    background-color: #f5f7fa;
    min-height: 100vh;
}

.search-card,
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
</style>