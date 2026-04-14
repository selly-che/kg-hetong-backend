<template>
    <div>
        <!-- 详情弹窗 -->
        <a-modal v-model:visible="detailModalVisible" :title="detailModalTitle" width="80%" :footer="null">
            <div class="detail-container">
                <!-- 头部信息 -->
                <div class="detail-header">
                    <div class="header-left">
                        <el-image :src="Imgurl" :fit="fit" alt="图片" class="detail-image" />
                        <div class="header-info">
                            <div class="info-title">{{ detailModalData.taTaskName || '土一-自揽-20251216-城轨[初步设计]' }}</div>
                            <div class="info-subtitle">

                                {{ detailModalData.tcName || '1216-1216-自揽-城轨-主责1' }}
                            </div>
                            <!-- 筛选区域 -->
                            <div class="detail-filter">
                                <a-form :model="detailForm" layout="inline">
                                    <a-form-item label="状态">
                                        <el-radio-group v-model="detailForm.status">
                                            <el-radio :value="1">未完成</el-radio>
                                            <el-radio :value="2">已完成</el-radio>
                                        </el-radio-group>
                                    </a-form-item>
                                    <a-form-item label="单位">
                                        <el-select v-model="detailForm.taTaskName" placeholder="请选择"
                                            style="width: 200px">
                                            <el-option v-for="item in unitOptions" :key="item.value" :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </a-form-item>
                                </a-form>
                            </div>
                        </div>
                    </div>
                    <div class="header-right">
                        <a-space>
                            <a-button type="primary" @click="detailSearch">查询</a-button>
                            <a-button @click="detailReset">重置</a-button>
                            <a-button @click="toggleFullScreen">全屏</a-button>
                        </a-space>
                    </div>
                    <div class="header_last">
                        <div class="header_last_box" @click="handleAdjust">
                            <SettingOutlined style="font-size: 30px;" />
                            <span>工作调整</span>
                        </div>
                        <div class="header_last_box" @click="UrgentReminderFn">
                            <SoundOutlined style="font-size: 30px;" /><span>催办</span>
                        </div>
                        <div class="header_last_box" @click="ClosingTimeFn">
                            <HistoryOutlined style="font-size: 30px;" /><span>关门时间</span>
                        </div>
                    </div>
                </div>

                <!-- 任务列表 -->
                <div class="task-list">
                    <a-table :columns="columns" :data-source="treeData" row-key="Id" bordered :pagination="false"
                        :expandable="{
                            defaultExpandAllRows: true,
                            expandRowByClick: true,
                            indentSize: 30
                        }" :row-class-name="getRowClassName">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.dataIndex === 'TD_Order'">
                                <span>{{ record.TD_Order }}</span>
                            </template>
                            <template v-if="column.dataIndex === 'TD_Name'">
                                <span :style="{ fontWeight: record.Level === 1 ? '600' : '400' }">{{ record.TD_Name
                                    }}</span>
                            </template>
                            <template v-if="column.dataIndex === 'TD_LimitTime'">
                                <span>{{ formatDate(record.TD_LimitTime) }}</span>
                            </template>
                            <template v-if="column.dataIndex === 'TD_CompletionTime'">
                                <span>{{ record.TD_CompletionTime || '-' }}</span>
                            </template>
                            <template v-if="column.dataIndex === 'Is_Red'">
                                <a-tag :color="record.Is_Red ? 'red' : 'green'">
                                    {{ record.Is_Red ? '逾期' : '正常' }}
                                </a-tag>
                            </template>
                            <template v-if="column.dataIndex === 'Reason'">
                                <span v-if="record.Reason" style="color: #ff4d4f;">{{ record.Reason }}</span>
                                <span v-else>-</span>
                            </template>
                        </template>
                    </a-table>
                </div>
            </div>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, toRaw, onMounted } from 'vue';

const Imgurl = require("@/static/image/e93263af-ce49-4278-b619-6d6b4ef6f015.png");
const fit = ref('contain'); // 图片适应方式
const detailModalVisible = ref(false);
const detailModalTitle = ref('查看工作安排');
const detailModalData = ref<any>({});

const detailForm = reactive({
    status: '',
    taTaskName: '',
});
// 获取行类名
const getRowClassName = (record: any) => {
    if (record.Level === 1) {
        return 'parent-row';
    }
    return 'child-row';
};

const columns = [
    {
        title: '序号',
        dataIndex: 'TD_Order', // 或者使用自定义索引, 下面会说明
        // 如果需要自定义序号，可以使用 slot 或下面方式
        customRender: ({ index }: { index: number }) => index + 1,
    },
    {
        title: '单位/专业',
        dataIndex: 'TD_DeptMajor',
    },
    {
        title: '节点计划',
        dataIndex: 'TD_Name',
    },
    {
        title: '工点系统类型',
        dataIndex: 'TD_WorkPointsName',
    },
    {
        title: '要求完成时间',
        dataIndex: 'TD_LimitTime',
    },
    {
        title: '实际完成时间',
        dataIndex: 'TD_CompletionTime',
    },
    {
        title: '专业负责人',
        dataIndex: 'TD_MajorCharge',
    },
    {
        title: '前序专业完成情况未完成/总数',
        dataIndex: 'CompleteStatistics',
    },
    {
        title: '进展情况',
        dataIndex: 'Reason',
    },
    {
        title: '备注',
        dataIndex: 'Remark',
    },
];
const unitOptions = ref([
    { label: '规划院(运输组织)', value: '规划院(运输组织)' },
]);

const detailSearch = () => {
    console.log('查询详情:', detailForm);
};
const detailReset = () => {
    detailForm.status = '';
    detailForm.taTaskName = '';
    console.log('重置详情查询条件');
};
// 全屏切换
const toggleFullScreen = () => {
    const modalElement = document.querySelector('.detail-container');
    if (modalElement) {
        if (!document.fullscreenElement) {
            modalElement.requestFullscreen().catch(err => {
                console.error('全屏失败:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
};

const handleAdjust = () => {
    console.log('调整');
};
const UrgentReminderFn = () => {
    console.log('催办');
};
const ClosingTimeFn = () => {
    console.log('关门时间');
};
const treeData = computed(() => {
    return buildTree(taskDetailList.value);
});
// 任务详情数据
const taskDetailList = ref<any[]>([]);
taskDetailList.value = [
    {
        "Id": "5eb045c1-1109-80c9-c811-ef0678e782f9",
        "TD_Order": "1",
        "TD_Name": "1",
        "TD_WorkPointsName": null,
        "TD_DeptMajor": null,
        "TD_LimitTime": "2025年12月14日",
        "TD_CompletionTime": null,
        "Remark": "",
        "Is_Delete": 0,
        "TD_WorkPointsId": null,
        "TD_MajorId": null,
        "TD_MajorCharge": null,
        "TD_Deptid": null,
        "TC_Id": null,
        "Parent_Id": "843c36a6-c03f-ae76-f581-20a652f91f6e",
        "CompleteStatistics": null,
        "Is_Group": false,
        "Level": 1,
        "Is_Red": false,
        "isCG": true,
        "Colour": "#52D017",
        "Material_id": null,
        "input_file": null,
        "speciality": null,
        "MaterialIncomplete": null,
        "MaterialTotal": null,
        "MaterialColour": null,
        "TD_ProjectName": null,
        "TD_NoticeName": null,
        "Status": null,
        "Reason": null
    },
    {
        "Id": "050d9f34-dfc8-44e5-b7a2-e7e1da075f3a",
        "TD_Order": "2",
        "TD_Name": "11",
        "TD_WorkPointsName": "工点车站",
        "TD_DeptMajor": "规划院(运输组织)",
        "TD_LimitTime": "2025-12-13",
        "TD_CompletionTime": "2025-12-15",
        "Remark": null,
        "Is_Delete": 0,
        "TD_WorkPointsId": "2101",
        "TD_MajorId": null,
        "TD_MajorCharge": "曾扬",
        "TD_Deptid": null,
        "TC_Id": "5eb045c1-1109-80c9-c811-ef0678e782f9",
        "Parent_Id": "5eb045c1-1109-80c9-c811-ef0678e782f9",
        "CompleteStatistics": null,
        "Is_Group": false,
        "Level": 2,
        "Is_Red": false,
        "isCG": true,
        "Colour": "#52D017",
        "Material_id": null,
        "input_file": null,
        "speciality": null,
        "MaterialIncomplete": null,
        "MaterialTotal": null,
        "MaterialColour": "",
        "TD_ProjectName": null,
        "TD_NoticeName": null,
        "Status": null,
        "Reason": null
    },
    {
        "Id": "82d9d8be-e045-49c6-82b0-dcbe831af2cc",
        "TD_Order": "3",
        "TD_Name": "22",
        "TD_WorkPointsName": "工点车站",
        "TD_DeptMajor": "规划院(运输组织)",
        "TD_LimitTime": "2025-12-14",
        "TD_CompletionTime": "2025-12-15",
        "Remark": null,
        "Is_Delete": 0,
        "TD_WorkPointsId": "2101",
        "TD_MajorId": null,
        "TD_MajorCharge": "曾扬",
        "TD_Deptid": null,
        "TC_Id": "5eb045c1-1109-80c9-c811-ef0678e782f9",
        "Parent_Id": "5eb045c1-1109-80c9-c811-ef0678e782f9",
        "CompleteStatistics": null,
        "Is_Group": false,
        "Level": 2,
        "Is_Red": false,
        "isCG": true,
        "Colour": "#52D017",
        "Material_id": null,
        "input_file": null,
        "speciality": null,
        "MaterialIncomplete": null,
        "MaterialTotal": null,
        "MaterialColour": "",
        "TD_ProjectName": null,
        "TD_NoticeName": null,
        "Status": null,
        "Reason": null
    },
    {
        "Id": "20220a6d-db6c-1721-b482-4d7dc9390918",
        "TD_Order": "2",
        "TD_Name": "2",
        "TD_WorkPointsName": null,
        "TD_DeptMajor": null,
        "TD_LimitTime": "2025年12月15日",
        "TD_CompletionTime": null,
        "Remark": "",
        "Is_Delete": 0,
        "TD_WorkPointsId": null,
        "TD_MajorId": null,
        "TD_MajorCharge": null,
        "TD_Deptid": null,
        "TC_Id": null,
        "Parent_Id": "843c36a6-c03f-ae76-f581-20a652f91f6e",
        "CompleteStatistics": null,
        "Is_Group": false,
        "Level": 1,
        "Is_Red": false,
        "isCG": true,
        "Colour": "#52D017",
        "Material_id": null,
        "input_file": null,
        "speciality": null,
        "MaterialIncomplete": null,
        "MaterialTotal": null,
        "MaterialColour": null,
        "TD_ProjectName": null,
        "TD_NoticeName": null,
        "Status": null,
        "Reason": null
    },
    {
        "Id": "bc9bebe7-8b37-421f-997a-3c32a7233c7b",
        "TD_Order": "3",
        "TD_Name": "33",
        "TD_WorkPointsName": "工点车站",
        "TD_DeptMajor": "规划院(运输组织)",
        "TD_LimitTime": "2025-12-14",
        "TD_CompletionTime": "2025-12-15",
        "Remark": null,
        "Is_Delete": 0,
        "TD_WorkPointsId": "2101",
        "TD_MajorId": null,
        "TD_MajorCharge": "曾扬",
        "TD_Deptid": null,
        "TC_Id": "20220a6d-db6c-1721-b482-4d7dc9390918",
        "Parent_Id": "20220a6d-db6c-1721-b482-4d7dc9390918",
        "CompleteStatistics": null,
        "Is_Group": false,
        "Level": 2,
        "Is_Red": false,
        "isCG": true,
        "Colour": "#52D017",
        "Material_id": null,
        "input_file": null,
        "speciality": null,
        "MaterialIncomplete": null,
        "MaterialTotal": null,
        "MaterialColour": "",
        "TD_ProjectName": null,
        "TD_NoticeName": null,
        "Status": null,
        "Reason": null
    },
    {
        "Id": "7bb8bf1f-7d58-42d0-b968-5083b4f10f88",
        "TD_Order": "4",
        "TD_Name": "44",
        "TD_WorkPointsName": "工点车站",
        "TD_DeptMajor": "规划院(运输组织)",
        "TD_LimitTime": "2025-12-15",
        "TD_CompletionTime": "2025-12-15",
        "Remark": null,
        "Is_Delete": 0,
        "TD_WorkPointsId": "2101",
        "TD_MajorId": null,
        "TD_MajorCharge": "曾扬",
        "TD_Deptid": null,
        "TC_Id": "20220a6d-db6c-1721-b482-4d7dc9390918",
        "Parent_Id": "20220a6d-db6c-1721-b482-4d7dc9390918",
        "CompleteStatistics": null,
        "Is_Group": false,
        "Level": 2,
        "Is_Red": false,
        "isCG": true,
        "Colour": "#52D017",
        "Material_id": null,
        "input_file": null,
        "speciality": null,
        "MaterialIncomplete": null,
        "MaterialTotal": null,
        "MaterialColour": "",
        "TD_ProjectName": null,
        "TD_NoticeName": null,
        "Status": null,
        "Reason": null
    },
    {
        "Id": "2689801f-ea9d-b7d7-d6df-ee2fb783a93d",
        "TD_Order": "3",
        "TD_Name": "3",
        "TD_WorkPointsName": null,
        "TD_DeptMajor": null,
        "TD_LimitTime": "2025年12月16日",
        "TD_CompletionTime": null,
        "Remark": "",
        "Is_Delete": 0,
        "TD_WorkPointsId": null,
        "TD_MajorId": null,
        "TD_MajorCharge": null,
        "TD_Deptid": null,
        "TC_Id": null,
        "Parent_Id": "843c36a6-c03f-ae76-f581-20a652f91f6e",
        "CompleteStatistics": null,
        "Is_Group": false,
        "Level": 1,
        "Is_Red": false,
        "isCG": true,
        "Colour": "#FF0000",
        "Material_id": null,
        "input_file": null,
        "speciality": null,
        "MaterialIncomplete": null,
        "MaterialTotal": null,
        "MaterialColour": null,
        "TD_ProjectName": null,
        "TD_NoticeName": null,
        "Status": null,
        "Reason": null
    },
    {
        "Id": "4e43cc97-0ea9-473a-a765-d1e27379b47c",
        "TD_Order": "4",
        "TD_Name": "55",
        "TD_WorkPointsName": "工点车站",
        "TD_DeptMajor": "规划院(运输组织)",
        "TD_LimitTime": "2025-12-16",
        "TD_CompletionTime": "",
        "Remark": null,
        "Is_Delete": 0,
        "TD_WorkPointsId": "2101",
        "TD_MajorId": null,
        "TD_MajorCharge": "曾扬",
        "TD_Deptid": null,
        "TC_Id": "2689801f-ea9d-b7d7-d6df-ee2fb783a93d",
        "Parent_Id": "2689801f-ea9d-b7d7-d6df-ee2fb783a93d",
        "CompleteStatistics": null,
        "Is_Group": false,
        "Level": 2,
        "Is_Red": false,
        "isCG": true,
        "Colour": "#FF0000",
        "Material_id": null,
        "input_file": null,
        "speciality": null,
        "MaterialIncomplete": null,
        "MaterialTotal": null,
        "MaterialColour": "",
        "TD_ProjectName": null,
        "TD_NoticeName": null,
        "Status": null,
        "Reason": "未上传成果"
    }
];
const formatDate = (dateString: string) => {
    // 简单处理日期格式，如果需要可以更复杂
    if (/年/.test(dateString)) return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString();
};
// 构建树形结构
const buildTree = (list: any[]) => {
    const map = new Map();
    const tree: any[] = [];

    // 创建映射
    list.forEach(item => {
        map.set(item.Id, { ...item, children: [] });
    });

    // 构建树形结构
    list.forEach(item => {
        const node = map.get(item.Id);
        if (item.Parent_Id && map.has(item.Parent_Id)) {
            const parent = map.get(item.Parent_Id);
            parent.children.push(node);
        } else {
            tree.push(node);
        }
    });
    // 清理空 children 数组
    const cleanEmptyChildren = (nodes: any[]) => {
        nodes.forEach(node => {
            if (node.children && node.children.length === 0) {
                delete node.children;
            } else if (node.children && node.children.length > 0) {
                cleanEmptyChildren(node.children);
            }
        });
    };

    cleanEmptyChildren(tree);
    return tree;
};
</script>

<style lang="scss" scoped></style>