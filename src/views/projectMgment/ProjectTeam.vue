<template>
    <div class="project-team-container">
        <!-- 页面标题 -->
        <div class="page-title">
            <h2>项目组成员</h2>
        </div>
        <el-card class="search-card" shadow="never">
            <el-form :model="formData" label-width="100px" class="task-form">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="单位名称">
                            <el-input v-model="formData.deptName" placeholder="请输入单位名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="专业名称">
                            <el-input v-model="formData.majorName" placeholder="请输入专业名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <!-- 按钮 -->
                        <el-button type="primary" @click="handleAdd">添加成员</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <!-- 项目组成员表格 - 遍历所有部门 -->
            <div v-for="(members, deptId) in groupedTeamData" :key="deptId" class="team-section">
                <div class="section-header">
                    <span class="section-title">{{ members[0]?.deptName || deptId }}</span>
                </div>
                <a-table :loading="teamDataloading" :dataSource="members" :columns="teamColumns" :pagination="false"
                    size="middle" bordered class="team-table" :rowKey="'id'">
                    <template #empty>
                        <div class="empty-text">暂无数据</div>
                    </template>
                </a-table>
            </div>

            <!-- 如果没有数据，显示提示 -->
            <div v-if="!teamDataloading && Object.keys(groupedTeamData).length === 0" class="no-data-tip">
                暂无项目组成员数据
            </div>
        </el-card>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, reactive } from 'vue';
import getDatas from "@/network/index";
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

// 项目组成员数据
const teamDataloading = ref(false);
const rawTeamData = ref<Record<string, any[]>>({});

// 其他专业团队数据（如果需要可以单独处理）
const otherTeamData = ref<any[]>([]);

const formData = reactive({
    deptName: '',
    majorName: ''
})

// 表格列定义
const teamColumns = [
    {
        title: '专业',
        dataIndex: 'majorName',
        key: 'majorName',
        width: 150,
        align: 'center'
    },
    {
        title: '第一牵头人',
        dataIndex: 'majorPrincipleName',
        key: 'majorPrincipleName',
        width: 180,
        align: 'center'
    },
    {
        title: '其他牵头人',
        dataIndex: 'otherMajorPrincipleName',
        key: 'otherMajorPrincipleName',
        width: 180,
        align: 'center'
    },
    {
        title: '生产所（室）',
        dataIndex: 'suoshi',
        key: 'suoshi',
        width: 180,
        align: 'center'
    }
];

// 获取路由实例
const route = useRoute();

// 按部门分组的数据（用于渲染多个表格）
const groupedTeamData = computed(() => {
    return rawTeamData.value;
});

// 获取项目组成员数据
const getProjectList = async () => {
    // 防止重复请求
    if (teamDataloading.value) return;
    teamDataloading.value = true;
    const taskArrangementId = route.query.taskArrangementId;
    // 如果没有 taskArrangementId，不发起请求
    if (!taskArrangementId) {
        console.warn('未找到 taskArrangementId');
        teamDataloading.value = false;
        return;
    }
    try {
        const res = await getDatas('project/GetProjectMembers', {
            taskArrangementId: taskArrangementId,
        });
        console.log("项目组成员数据:", res);
        // 处理返回的数据
        if (res && res.data.code == 200) {
            // 假设返回的数据是一个对象，键是部门 ID，值是成员数组
            rawTeamData.value = res.data.result || {};
            console.log("处理后的数据:", rawTeamData.value);
        } else {
            console.error("获取项目组成员数据失败:", res.data.message);
            rawTeamData.value = {};
        }
    } catch (error) {
        console.error("获取项目组成员数据异常:", error);
        rawTeamData.value = {};
    } finally {
        teamDataloading.value = false;
    }
};

// 添加成员
const handleAdd = async () => {
    const resp = await getDatas('project/AddProjectMember', formData);
    if (resp.data.code == 200) {
        ElMessage.success('添加成功');
        getProjectList();
    } else {
        ElMessage.error(resp.data.message);
    }
};

// 监听路由参数变化
watch(
    () => route.query.taskArrangementId,
    (newVal, oldVal) => {
        // 只有当值真正变化时才请求
        if (newVal && newVal !== oldVal) {
            console.log('taskArrangementId 变化:', newVal);
            getProjectList();
        }
    },
    { immediate: false }
);

// 组件挂载后执行一次
onMounted(() => {
    console.log('ProjectTeam 组件已挂载');
    getProjectList();
});
</script>

<style scoped>
.project-team-container {
    padding: 20px;
    background-color: #f5f7fa;
}

.page-title {
    text-align: center;
    margin-bottom: 30px;
}

.page-title h2 {
    font-size: 24px;
    color: #000;
    font-weight: bold;
}

.team-section {
    margin-bottom: 30px;
}

.section-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding: 8px 16px;
    background-color: #f5f5f5;
    border-left: 4px solid #1890ff;
}

.section-title {
    font-size: 16px;
    font-weight: 600;
    color: #000;
}

.team-table {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
}

.team-table .ant-table-thead>tr>th {
    background-color: #f5f5f5;
    font-weight: 600;
    color: #000;
    border-bottom: 1px solid #d9d9d9;
}

.team-table .ant-table-tbody>tr:hover {
    background-color: #f5f5f5;
}

.empty-text {
    text-align: center;
    color: #999;
    padding: 40px 0;
}

.no-data-tip {
    text-align: center;
    color: #999;
    padding: 40px 0;
    font-size: 14px;
}

:deep(.ant-table-thead > tr > th) {
    background-color: #f5f9ff !important;
}
</style>