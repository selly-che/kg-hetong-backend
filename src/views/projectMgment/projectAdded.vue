<template>
    <div class="bgf br8">
        <div class="project-detail-page">
            <div class="content-wrapper">
                <h2>项目信息录入</h2>
                <el-form ref="fromRef" :model="formData" label-width="120px">
                    <!-- 项目名称（必填） -->
                    <el-form-item label="项目名称" prop="projectFullName"
                        :rules="{ required: true, message: '请输入项目名称', trigger: 'blur' }">
                        <el-input v-model="formData.projectFullName" placeholder="请输入项目名称" />
                    </el-form-item>
                    <!-- 项目类型（必填） -->
                    <el-form-item label="项目类型" prop="projectType"
                        :rules="{ required: true, message: '请选择项目类型', trigger: 'change' }">
                        <el-select v-model="formData.projectType" placeholder="请选择项目类型">
                            <el-option label="司控主责" value="司控主责" />
                            <el-option label="司控参与" value="司控参与" />
                            <el-option label="自揽主责" value="自揽主责" />
                            <el-option label="自揽参与" value="自揽参与" />
                        </el-select>
                    </el-form-item>
                    <!-- 项目阶段（必填） -->
                    <el-form-item label="项目阶段" prop="projectStep"
                        :rules="{ required: true, message: '请选择项目阶段', trigger: 'change' }">
                        <el-select v-model="formData.projectStep" placeholder="请选择项目阶段">
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
                    <!-- 线路长度 & 速度目标值 -->
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="线路长度">
                                <el-input v-model.number="formData.projectLength" clearable placeholder="如：200 km">
                                    <template #append>km</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="速度目标值">
                                <el-input v-model="formData.projectSpeed" clearable placeholder="如：200 km/h">
                                    <template #append> km/h</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- 铁路等级 & 运营组织模式 -->
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="铁路等级">
                                <el-select v-model="formData.saixuantLx2" placeholder="请选择等级">
                                    <el-option label="等級一" :value="1" />
                                    <el-option label="等級二" :value="2" />
                                    <el-option label="等級三" :value="3" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="运营组织模式">
                                <el-input v-model="formData.operationMode" placeholder="如：--" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- 车辆选型与编组 & 重点工程 -->
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="车辆选型与编组">
                                <el-input v-model="formData.vehicleType" placeholder="如：--" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="重点工程">
                                <el-radio-group v-model="formData.projectIsEmphasis">
                                    <el-radio value="0">否</el-radio>
                                    <el-radio value="1">是</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- 项目说明 -->
                    <el-form-item label="项目说明">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"
                            v-model="formData.projectDescription" placeholder="请输入项目说明" />
                    </el-form-item>
                    <!-- 合同时间 & 项目状态 -->
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="合同时间">
                                <el-date-picker v-model="formData.projectContractTime" type="datetime"
                                    format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                                    placeholder="请选择合同时间" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="项目状态">
                                <el-select v-model="formData.projectStatus">
                                    <el-option label="暂停" value="0" />
                                    <el-option label="进行中" value="1" />
                                    <el-option label="已完成" value="2" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- 计划通车时间 & 项目投资 -->
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="计划通车时间">
                                <el-date-picker v-model="formData.projectFinishTime" type="datetime"
                                    format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                                    placeholder="请选择计划通车时间" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="项目投资">
                                <el-input v-model.number="formData.projectInvestAmount" clearable
                                    placeholder="如：200 万元">
                                    <template #append> 万元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- 开工时间 & 合同金额 -->
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="开工时间">
                                <el-date-picker v-model="formData.projectStartTime" type="datetime"
                                    format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                                    placeholder="请选择开工时间" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同金额">
                                <el-input v-model.number="formData.projectAmount" clearable placeholder="如：200 万元">
                                    <template #append> 万元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- 保存按钮 -->
                    <el-form-item>
                        <!-- native-type="submit" -->
                        <el-button type="primary" @click="saveProject">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import getDatas from "@/network/index";
import { ElMessage } from 'element-plus';
import { useRouter, useRoute } from "vue-router";
const fromRef = ref()
// 初始化表单数据
const formData = ref({
    projectFullName: '',
    projectType: '',
    projectStep: '',
    projectLength: null,
    projectSpeed: '',
    operationMode: '',
    vehicleType: '',
    projectIsEmphasis: '0',
    projectDescription: '',
    projectContractTime: new Date('2023-12-01'),
    projectStatus: '1',
    projectFinishTime: null,
    projectInvestAmount: null,
    projectStartTime: new Date('2024-01-15'),
    projectAmount: null,
    saixuantLx2: null,
});
const router = useRouter();
// 保存逻辑
const saveProject = async () => {
    const isValid = await fromRef.value.validate()
    if (!isValid) {
        return;
    }
    try {
        // 发送保存请求
        const res = await getDatas('project/AddProject', formData.value);
        if (res.data.code === 200) {
            ElMessage.success('保存成功');
            // 跳转到首页
            router.push('/projectMgment/projectHome').finally(() => {
                // 刷新页面
                sessionStorage.setItem('openedTabs', [])
                window.location.reload();
            });
        }
        console.log(res);
    } catch (error) {
        console.log(error);
    } finally {
        // 清空formData
        formData.value = {};
    }
};  
</script>

<style lang="less" scoped>
.bgf {
    background-color: #fff;
    padding: 20px;
}

.project-detail-page {
    max-width: 1200px;
    margin: 0 auto;
}

.content-wrapper {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
}
</style>