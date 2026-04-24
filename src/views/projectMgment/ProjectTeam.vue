<template>
  <div class="project-team-container">
    <!-- 页面标题 -->
    <div class="page-title">
      <h2>项目组成员</h2>
    </div>

    <!-- 新增成员对话框 -->
    <a-modal title="新增项目组成员" v-model:visible="dialogVisible" width="80%">
      <a-card class="search-card" :bordered="false">
        <a-form :model="formData" layout="vertical" class="task-form">
          <a-row :gutter="[16, 16]">
            <a-col :span="12">
              <a-form-item label="单位名称">
                <a-input v-model:value="formData.deptName" placeholder="请输入单位名称" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="专业名称">
                <a-input v-model:value="formData.majorName" placeholder="请输入专业名称" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="[16, 16]">
            <a-col :span="12">
              <a-form-item label="专业负责人域账号">
                <a-select v-model:value="formData.majorPrincipleCode" placeholder="请选择专业负责人域账号">
                  <a-select-option v-for="item in majorPrincipleOptions" :key="item.value" :value="item.value">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="第一牵头人">
                <a-input v-model:value="formData.majorPrincipleName" placeholder="第一牵头人" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="[16, 16]">
            <a-col :span="12">
              <a-form-item label="第二牵头人">
                <a-input v-model:value="formData.otherMajorPrincipleName" placeholder="第二牵头人" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="专业简称">
                <a-input v-model:value="formData.productCode" placeholder="专业简称" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row>
            <a-col :span="12">
              <a-button type="primary" @click="handleAddToTable">添加到列表</a-button>
            </a-col>
          </a-row>
        </a-form>

        <!-- 临时数据表格 修复JSX报错 -->
        <div class="temp-table-wrapper" v-if="tempMemberList.length > 0">
          <a-table :columns="tempColumns" :data-source="tempMemberList" row-key="index" bordered :pagination="false">
            <template #bodyCell="{ column, index }">
              <template v-if="column.key === 'action'">
                <a-button type="link" danger size="small" @click="handleDeleteTemp(index)">
                  删除
                </a-button>
              </template>
            </template>
          </a-table>
        </div>
      </a-card>

      <!-- 对话框底部按钮 -->
      <template #footer>
        <div class="dialog-footer">
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" @click="handleSaveAll" :loading="saving">保存</a-button>
        </div>
      </template>
    </a-modal>

    <!-- 项目组协调员区域 -->
    <div class="coordinator-section">
      <div class="coordinator-input-group">
        <div class="coordinator-label">项目组计调:</div>
        <a-input v-model:value="coordinatorName" placeholder="请选择计调人" class="coordinator-input" allow-clear>
        </a-input>
        <a-button @click="selectCoordinator" style="height: 40px;width: 40px;">
          <template #icon>
            <UserOutlined />
          </template>
        </a-button>
      </div>
    </div>

    <!-- 动态渲染各单位成员表格区域 -->
    <div v-for="dept in groupedTeamData" :key="dept.deptName" class="dept-section">
      <div class="dept-title">{{ dept.deptName }}</div>
      <div class="table-operation-bar" v-if="Editable">
        <a-button type="primary" @click="handleAddMember">
          <template #icon>
            <PlusOutlined />
          </template>
          添加
        </a-button>
        <a-button type="primary" @click="removeMember">
          <template #icon>
            <MinusOutlined />
          </template>
          移除
        </a-button>
        <a-button type="primary" @click="moveUp">
          <template #icon>
            <ArrowUpOutlined />
          </template>
          上移
        </a-button>
        <a-button type="primary" @click="moveDown">
          <template #icon>
            <ArrowDownOutlined />
          </template>
          下移
        </a-button>
      </div>

      <a-table :data-source="dept.members" bordered row-key="id" :pagination="false" :columns="teamColumns"
        @selection-change="handleSelectionChange" @row-click="handleRowClick"
        :header-cell-style="{ background: '#f5f7fa', color: '#303133' }" />
    </div>

    <!-- 如果没有数据，显示提示 -->
    <div v-if="!teamDataloading && groupedTeamData.length === 0" class="no-data-tip">
      暂无项目组成员数据
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import getDatas from "@/network/index";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import {
  UserOutlined,
  PlusOutlined,
  MinusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from "@ant-design/icons-vue";

const dialogVisible = ref(false);
const saving = ref(false);
const tempMemberList = ref<any[]>([]);
const selectedRows = ref<any[]>([]);

const teamDataloading = ref(false);
const teamData = ref<any[]>([]);
const groupedTeamData = ref<any[]>([
  { deptName: "土建一院", deptID: "", members: [] },
]);
const coordinatorName = ref("");
const projectInfoID = ref("");
const Editable = ref(false);

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
  { label: "陈叔清", value: "csq" },
  { label: "卢静静", value: "ljj" },
]);

// 临时表格列 - 移除JSX 纯模板插槽
const tempColumns = [
  { title: "单位名称", dataIndex: "deptName", align: "center" },
  { title: "专业名称", dataIndex: "majorName", align: "center" },
  { title: "专业负责人域账号", dataIndex: "majorPrincipleCode", align: "center" },
  { title: "第一牵头人", dataIndex: "majorPrincipleName", align: "center" },
  { title: "第二牵头人", dataIndex: "otherMajorPrincipleName", align: "center" },
  { title: "专业简称", dataIndex: "productCode", align: "center" },
  { title: "操作", key: "action", width: 100, align: "center", fixed: "right" }
];

// 主表格列
const teamColumns = [
  { type: "selection", width: 55, align: "center", vif: "Editable" },
  { title: "单位名称", dataIndex: "deptName", align: "center" },
  { title: "专业名称", dataIndex: "majorName", align: "center" },
  { title: "专业负责人域账号", dataIndex: "majorPrincipleCode", align: "center" },
  { title: "第一牵头人", dataIndex: "majorPrincipleName", align: "center" },
  { title: "第二牵头人", dataIndex: "otherMajorPrincipleName", align: "center" },
  { title: "专业简称", dataIndex: "productCode", align: "center" },
];

const route = useRoute();

// 获取项目组成员数据
const getProjectList = async () => {
  if (teamDataloading.value) return;
  teamDataloading.value = true;
  projectInfoID.value = (route.query.projectInfoID as string) || "";

  if (!projectInfoID.value) {
    teamDataloading.value = false;
    return;
  }

  try {
    const res = await getDatas("project/GetProjectMembers", {
      projectInfoID: projectInfoID.value,
    });

    if (res?.data.code == 200) {
      const result = res.data.result;
      coordinatorName.value = result.coordinatorName || "";
      const deptMajorList = result.deptMajorList || [];
      teamData.value = deptMajorList;

      const groups: Record<string, any> = {};
      deptMajorList.forEach((item: any) => {
        const deptName = item.deptName || "其他单位";
        if (!groups[deptName]) {
          groups[deptName] = { deptName, deptID: item.deptID, members: [] };
        }
        groups[deptName].members.push(item);
      });

      let groupList = Object.values(groups);
      if (groupList.length === 0) {
        groupList = [{ deptName: "土建一院", deptID: "", members: [] }];
      }
      groupedTeamData.value = groupList;
    } else {
      teamData.value = [];
      groupedTeamData.value = [{ deptName: "土建一院", deptID: "", members: [] }];
    }
  } catch (err) {
    console.error(err);
  } finally {
    teamDataloading.value = false;
  }
};

// 添加到临时列表
const handleAddToTable = () => {
  if (!formData.value.deptName || !formData.value.majorName) {
    message.warning("请填写单位名称和专业名称");
    return;
  }
  tempMemberList.value.push({ ...formData.value, projectInfoID: projectInfoID.value });
  formData.value = {
    deptName: "",
    majorName: "",
    majorPrincipleCode: "",
    majorPrincipleName: "",
    otherMajorPrincipleName: "",
    productCode: "",
    projectInfoID: projectInfoID.value,
  };
  message.success("已添加到列表");
};

// 删除临时列表项
const handleDeleteTemp = (index: number) => {
  tempMemberList.value.splice(index, 1);
  message.success("已删除");
};

// 取消弹窗
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

// 保存全部
const handleSaveAll = async () => {
  if (tempMemberList.value.length === 0) {
    message.warning("请至少添加一个成员");
    return;
  }
  try {
    saving.value = true;
    const res = await getDatas("project/AddProjectMember", {
      deptMajorList: tempMemberList.value,
      projectInfoId: projectInfoID.value,
    });
    if (res.data.code === 200) {
      message.success("保存成功");
      dialogVisible.value = false;
      tempMemberList.value = [];
      await getProjectList();
    } else {
      message.error(res.data.message || "保存失败");
    }
  } catch (err) {
    message.error("保存失败，请稍后重试");
  } finally {
    saving.value = false;
  }
};

// 打开新增弹窗
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

const selectCoordinator = () => console.log("选择计调人");
const removeMember = () => console.log("移除成员");
const moveUp = () => console.log("上移");
const moveDown = () => console.log("下移");
const handleSelectionChange = (val: any[]) => selectedRows.value = val;
const handleRowClick = (row: any) => console.log("行点击", row);

// 路由监听
watch(
  () => route.query.projectInfoID,
  (newVal) => {
    if (newVal) {
      Editable.value = route.query.Editable === "true";
      getProjectList();
    }
  },
  { immediate: true }
);

watch(
  () => route.query.Editable,
  (val) => {
    Editable.value = val === "true";
  },
  { immediate: true }
);

onMounted(() => {
  getProjectList();
});
</script>

<style scoped>
.coordinator-section {
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 15px 20px;
  margin-bottom: 20px;
}

.coordinator-input-group {
  display: flex;
  align-items: center;
  gap: 0;
  height: 40px;
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
  height: 100%;
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