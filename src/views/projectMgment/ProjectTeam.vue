<template>
  <div class="project-team-container">
    <!-- 页面标题 -->
    <div class="page-title">
      <h2>项目组成员</h2>
    </div>
    <!-- <div>
      <el-button type="primary" @click="handleAddMember" v-if="Editable"
        >新增成员</el-button
      >
    </div> -->

    <!-- 新增成员对话框 - 内容保持不变 -->
    <el-dialog title="新增项目组成员" v-model="dialogVisible" width="80%">
      <el-card class="search-card" shadow="never">
        <el-form :model="formData" label-width="130px" class="task-form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="单位名称">
                <el-input v-model="formData.deptName" placeholder="请输入单位名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="专业名称">
                <el-input v-model="formData.majorName" placeholder="请输入专业名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="专业负责人域账号">
                <!-- <el-input
                  v-model="formData.majorPrincipleCode"
                  placeholder="请输入专业负责人域账号"
                ></el-input> -->
                <el-select v-model="formData.majorPrincipleCode" placeholder="请选择专业负责人域账号">
                  <el-option v-for="item in majorPrincipleOptions" :key="item.value" :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第一牵头人">
                <el-input v-model="formData.majorPrincipleName" placeholder="第一牵头人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="第二牵头人">
                <el-input v-model="formData.otherMajorPrincipleName" placeholder="第二牵头人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="专业简称">
                <el-input v-model="formData.productCode" placeholder="专业简称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-button type="primary" @click="handleAddToTable">添加到列表</el-button>
            </el-col>
          </el-row>
        </el-form>

        <!-- 临时数据表格 -->
        <div class="temp-table-wrapper" v-if="tempMemberList.length > 0">
          <el-table :data="tempMemberList" border style="width: 100%; margin-top: 20px">
            <el-table-column prop="deptName" label="单位名称" align="center" />
            <el-table-column prop="majorName" label="专业名称" align="center" />
            <el-table-column prop="majorPrincipleCode" label="专业负责人域账号" align="center" />
            <el-table-column prop="majorPrincipleName" label="第一牵头人" align="center" />
            <el-table-column prop="otherMajorPrincipleName" label="第二牵头人" align="center" />
            <el-table-column prop="productCode" label="专业简称" align="center" />
            <el-table-column label="操作" width="100" align="center" fixed="right">
              <template #default="{ $index }">
                <el-button type="danger" size="small" @click="handleDeleteTemp($index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

      <!-- 对话框底部按钮 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSaveAll" :loading="saving">保存</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 项目组成员表格 - 直接展示数组数据 -->
    <!-- <a-table
      :loading="teamDataloading"
      :dataSource="teamData"
      :columns="teamColumns"
      :pagination="false"
      size="middle"
      bordered
      class="team-table"
      :rowKey="'id'"
    >
      <template #empty>
        <div class="empty-text">暂无数据</div>
      </template>
    </a-table> -->

    <!-- 项目组协调员区域 -->
    <div class="coordinator-section">
      <!-- <div class="section-title">项目组成员</div> -->
      <div class="coordinator-input-group">
        <div class="coordinator-label">项目组计调:</div>
        <el-input v-model="coordinatorName" placeholder="请选择计调人" class="coordinator-input" clearable>
          <template #append>
            <el-button :icon="User" @click="selectCoordinator" />
          </template>
        </el-input>
      </div>
    </div>
    <!-- 动态渲染各单位成员表格区域 -->
    <div v-for="dept in groupedTeamData" :key="dept.deptName" class="dept-section">
      <div class="dept-title">{{ dept.deptName }}</div>
      <div class="table-operation-bar" v-if="Editable">
        <el-button type="primary" :icon="Plus" @click="handleAddMember">添加</el-button>
        <el-button type="primary" :icon="Remove" @click="removeMember">移除</el-button>
        <el-button type="primary" :icon="Top" @click="moveUp">上移</el-button>
        <el-button type="primary" :icon="Bottom" @click="moveDown">下移</el-button>
      </div>

      <el-table :data="dept.members" border style="width: 100%" @selection-change="handleSelectionChange"
        @row-click="handleRowClick" :header-cell-style="{ background: '#f5f7fa', color: '#303133' }">
        <el-table-column type="selection" width="55" align="center" v-if="Editable" />
        <!-- 单位名称、专业名称、专业负责人域账号、第一牵头人、第二牵头人、专业简称 -->
        <el-table-column prop="deptName" label="单位名称" align="center" />
        <el-table-column prop="majorName" label="专业名称" align="center" />
        <el-table-column prop="majorPrincipleCode" label="专业负责人域账号" align="center" />
        <el-table-column prop="majorPrincipleName" label="第一牵头人" align="center" />
        <el-table-column prop="otherMajorPrincipleName" label="第二牵头人" align="center" />
        <el-table-column prop="productCode" label="专业简称" align="center" />
      </el-table>
    </div>
    <!-- 如果没有数据，显示提示 -->
    <div v-if="!teamDataloading && groupedTeamData.length === 0" class="no-data-tip">
      暂无项目组成员数据
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import getDatas from "@/network/index";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { User, Plus, Remove, Top, Bottom } from "@element-plus/icons-vue";

const dialogVisible = ref(false);
const saving = ref(false);

// 临时成员列表（用于在对话框中展示）
const tempMemberList = ref<any[]>([]);

// 项目组成员数据
const teamDataloading = ref(false);
const teamData = ref<any[]>([]);
const groupedTeamData = ref<any[]>([
  {
    deptName: "土建一院",
    deptID: "",
    members: [],
  },
]);
const coordinatorName = ref("");

const projectInfoID = ref("");
const formData = ref({
  deptName: "",
  majorName: "",
  majorPrincipleCode: "",
  majorPrincipleName: "",
  otherMajorPrincipleName: "",
  productCode: "",
  projectInfoID: "",
});

const majorPrincipleOptions = ref<any[]>([
  {
    label: '陈叔清',
    value: 'csq'
  },
  {
    label: '卢静静',
    value: 'ljj'
  },
]);

// 表格列定义
const teamColumns = [
  {
    title: "单位名称",
    dataIndex: "deptName",
    key: "deptName",
    width: 150,
    align: "center",
  },
  {
    title: "专业名称",
    dataIndex: "majorName",
    key: "majorName",
    width: 120,
    align: "center",
  },
  {
    title: "专业负责人域账号",
    dataIndex: "majorPrincipleCode",
    key: "majorPrincipleCode",
    width: 150,
    align: "center",
  },
  {
    title: "第一牵头人",
    dataIndex: "majorPrincipleName",
    key: "majorPrincipleName",
    width: 120,
    align: "center",
  },
  {
    title: "第二牵头人",
    dataIndex: "otherMajorPrincipleName",
    key: "otherMajorPrincipleName",
    width: 150,
    align: "center",
  },
  {
    title: "专业简称",
    dataIndex: "productCode",
    key: "productCode",
    width: 100,
    align: "center",
  },
];

// 获取路由实例
const route = useRoute();

// 获取项目组成员数据
const getProjectList = async () => {
  if (teamDataloading.value) return;
  teamDataloading.value = true;
  projectInfoID.value = (route.query.projectInfoID as string) || "";

  if (!projectInfoID.value) {
    console.warn("未找到 projectInfoID");
    teamDataloading.value = false;
    return;
  }

  try {
    const res = await getDatas("project/GetProjectMembers", {
      projectInfoID: projectInfoID.value,
    });

    console.log("项目组成员数据:", res);

    if (res && res.data.code == 200) {
      const result = res.data.result;
      if (result) {
        // 项目组计调
        coordinatorName.value = result.coordinatorName || "";

        // Check for backend discrepancy
        if (result.projectInfoId === null && projectInfoID.value) {
          console.warn(
            "Backend returned 'projectInfoId' as null, but frontend sent a valid 'projectInfoID':",
            projectInfoID.value
          );
        }

        // 部门成员数据
        const deptMajorList = result.deptMajorList || [];
        teamData.value = deptMajorList;

        // 按单位分组
        const groups: Record<string, any> = {};
        deptMajorList.forEach((item: any) => {
          const deptName = item.deptName || "其他单位";
          if (!groups[deptName]) {
            groups[deptName] = {
              deptName,
              deptID: item.deptID,
              members: [],
            };
          }
          groups[deptName].members.push(item);
        });

        const groupList = Object.values(groups);

        // 如果没有数据，默认添加一个“土建一院”的占位
        if (groupList.length === 0) {
          groupList.push({
            deptName: "土建一院",
            deptID: "",
            members: [],
          });
        }

        groupedTeamData.value = groupList;
        console.log("分组后的数据:", groupedTeamData.value);
      }
    } else {
      console.error("获取项目组成员数据失败:", res.data.message);
      teamData.value = [];
      groupedTeamData.value = [
        {
          deptName: "土建一院",
          deptID: "",
          members: [],
        },
      ];
    }
  } catch (error) {
    console.error("获取项目组成员数据异常:", error);
    teamData.value = [];
  } finally {
    teamDataloading.value = false;
  }
};

// 添加到临时列表
const handleAddToTable = () => {
  if (!formData.value.deptName || !formData.value.majorName) {
    ElMessage.warning("请填写单位名称和专业名称");
    return;
  }

  tempMemberList.value.push({
    ...formData.value,
    projectInfoID: projectInfoID.value,
  });

  formData.value = {
    deptName: "",
    majorName: "",
    majorPrincipleCode: "",
    majorPrincipleName: "",
    otherMajorPrincipleName: "",
    productCode: "",
    projectInfoID: projectInfoID.value,
  };

  ElMessage.success("已添加到列表");
};

// 删除临时列表中的某一项
const handleDeleteTemp = (index: number) => {
  tempMemberList.value.splice(index, 1);
  ElMessage.success("已删除");
};

// 取消
const handleCancel = () => {
  dialogVisible.value = false;
  tempMemberList.value = [];
  formData.value = {
    deptName: "",
    majorName: "",
    majorPrincipleCode: "",
    majorPrincipleName: "",
    otherMajorPrincipleName: "",
    productCode: "",
    projectInfoID: "",
  };
};

// 保存所有数据
const handleSaveAll = async () => {
  if (tempMemberList.value.length === 0) {
    ElMessage.warning("请至少添加一个成员");
    return;
  }

  try {
    saving.value = true;

    const res = await getDatas(
      "project/AddProjectMember",
      {
        deptMajorList: tempMemberList.value,
        projectInfoId: projectInfoID.value
      },
    );

    if (res.data.code === 200) {
      ElMessage.success("保存成功");
      dialogVisible.value = false;
      tempMemberList.value = [];
      await getProjectList();
    } else {
      ElMessage.error(res.data.message || "保存失败");
    }
  } catch (error) {
    console.error("保存失败:", error);
    ElMessage.error("保存失败，请稍后重试");
  } finally {
    saving.value = false;
  }
};

// 添加成员按钮点击事件
const handleAddMember = () => {
  dialogVisible.value = true;
  tempMemberList.value = [];
  formData.value = {
    deptName: "",
    majorName: "",
    majorPrincipleCode: "",
    majorPrincipleName: "",
    otherMajorPrincipleName: "",
    productCode: "",
    projectInfoID: projectInfoID.value,
  };
};
const Editable = ref(false);

// 协调员选择
const selectCoordinator = () => {
  console.log("选择计调人");
};

// 表格操作
const addMember = () => {
  handleAddMember();
};

const removeMember = () => {
  console.log("移除成员");
};

const moveUp = () => {
  console.log("上移");
};

const moveDown = () => {
  console.log("下移");
};

const handleSelectionChange = (selection: any) => {
  console.log("选中行变化:", selection);
};

const handleRowClick = (row: any) => {
  console.log("行点击:", row);
};

// 监听路由参数变化
watch(
  () => route.query.projectInfoID,
  (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
      console.log("projectInfoID 变化:", newVal);
      Editable.value = route.query.Editable === "true";
      getProjectList();
    }
  },
  { immediate: false },
);

watch(
  () => route.query.Editable,
  (newEditable) => {
    console.log(newEditable, "newEditablenewEditable");
    Editable.value = newEditable === "true";
  },
  { deep: true, immediate: true },
);

// 组件挂载后执行一次
onMounted(() => {
  console.log("ProjectTeam 组件已挂载");
  getProjectList();
});
</script>

<style scoped>
/* 项目组协调员区域样式 */
.coordinator-section {
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 15px 20px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #303133;
}

.coordinator-input-group {
  display: flex;
  align-items: center;
  gap: 0;
}

.coordinator-label {
  background-color: #409eff;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid #409eff;
  border-radius: 4px 0 0 4px;
  height: 40px;
  line-height: 20px;
}

.coordinator-input {
  width: 400px;
}

.coordinator-input :deep(.el-input__wrapper) {
  border-radius: 0 4px 4px 0;
  height: 40px;
  box-shadow: 0 0 0 1px #dcdfe6 inset;
}

.coordinator-input :deep(.el-input-group__append) {
  background: #fff;
  /* border-radius: 0 4px 4px 0; */
  /* padding: 0; */
  /* box-shadow: 0 0 0 1px #dcdfe6 inset; */
}

.coordinator-input :deep(.el-button) {
  border: none;
  background: #fff;
  color: #606266;
  padding: 0 10px;
}

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

.team-table {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin-top: 20px;
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

.temp-table-wrapper {
  margin-top: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

:deep(.ant-table-thead > tr > th) {
  background-color: #f5f9ff !important;
}

/* 部门区域样式 */
.dept-section {
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 15px 20px;
  margin-bottom: 20px;
}

.dept-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #303133;
  border-left: 4px solid #409eff;
  padding-left: 10px;
}

.table-operation-bar {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
}
</style>
