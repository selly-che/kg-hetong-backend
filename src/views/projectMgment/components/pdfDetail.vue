<template>
    <div ref="htmlContent" class="contact-sheet">
        <!-- 标题部分 -->
        <h1 class="sheet-title">{{ fromData.taTaskName }}</h1>

        <!-- 编号部分 -->
        <div class="serial-number">土一-自揽-20251216-城轨-业-土建一院-【2025】002号</div>

        <!-- 项目信息部分 -->
        <a-descriptions :column="1" bordered colon :labelStyle="{ width: '150px' }">
            <a-descriptions-item label="项目名称及阶段">
                土一-自揽-20251216-城轨 初步设计
            </a-descriptions-item>
            <a-descriptions-item label="主送单位">
                规划院
            </a-descriptions-item>
            <a-descriptions-item label="抄送单位">
                经营计划部、西南指挥部
            </a-descriptions-item>
            <a-descriptions-item label="发送单位">
                土建一院
            </a-descriptions-item>
        </a-descriptions>
        <a-descriptions :column="2" bordered colon :labelStyle="{ width: '150px' }">
            <a-descriptions-item label="编制">
                {{ fromData.taCreator }}
            </a-descriptions-item>
            <a-descriptions-item label="日期">
                {{ formatDate(compileDate) }}
            </a-descriptions-item>
        </a-descriptions>

        <div class="contact-content">
            <h4>联系事项：</h4>
            <h2>1216-1216-自揽-城轨-主责1</h2>
            <p>{{ formatDate.taPreface }}</p>
            <p>工期计划及要求详见附件。</p>
        </div>
        <!-- 联系事项 -->

        <!-- 工期计划表格 -->
        <div class="schedule-table">
            <h4>工期计划：</h4>
            <el-table :data="fromData.taskGroups" style="width: 100%" border
                :header-cell-style="{ 'text-align': 'center' }">
                <el-table-column type="index" label="序号" width="80" align="center" />
                <el-table-column prop="tgName" label="任务内容" header-align="center" />
                <el-table-column prop="unit" label="完成单位" width="150" align="center" />
                <el-table-column prop="tgUpdateTime" label="完成时间" width="150" align="center" />
                <el-table-column prop="tgDescription" label="备注" width="200" header-align="center" />
            </el-table>
        </div>

        <!-- 下载按钮 -->
        <!-- <div class="download-btn">
            <el-button type="primary" size="large" @click="downloadHTML">
                <el-icon>
                    <Download />
                </el-icon> 下载HTML
            </el-button>
        </div> -->
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Download } from '@element-plus/icons-vue'
import { format } from 'date-fns'

// 接收父组件的数据
const props = defineProps({
    fromData: {
        type: Object,
        required: true
    }
})

const aaaa = {
    "taCreatTime": null,
    "taCCUnit": "",
    "projectStepStr": null,
    "taskGroups": [
        {
            "waTaskArrangementId": "e1f98163114c68ffd030bf8a7e9718ff",
            "isDelete": 0,
            "tgUpdateTime": null,
            "tgType": null,
            "twaTaskContentStatuses": [
                {
                    "euCompleteDate": "2026-04-10 11:05:35",
                    "waTaskGroupId": "fd6fe0760c97c54bfff4852996459506",
                    "materialId": null,
                    "tcRemark": "备注",
                    "tcName": "任务1",
                    "tcLimitDate": null,
                    "inputFile": null,
                    "majorPrincipleName": null,
                    "deptMajorId": null,
                    "euIsComplete": null,
                    "id": "49d40252e417a7f2c88a9c0282d70d11",
                    "majorName": null,
                    "deptMajor": "unit1",
                    "tcId": null,
                    "day": null
                },
                {
                    "euCompleteDate": "2026-04-10 11:05:43",
                    "waTaskGroupId": "fd6fe0760c97c54bfff4852996459506",
                    "materialId": null,
                    "tcRemark": "备注",
                    "tcName": "任务2",
                    "tcLimitDate": null,
                    "inputFile": null,
                    "majorPrincipleName": null,
                    "deptMajorId": null,
                    "euIsComplete": null,
                    "id": "1d8015803056d872150a6e7bacde74e5",
                    "majorName": null,
                    "deptMajor": "unit2",
                    "tcId": null,
                    "day": null
                }
            ],
            "id": "fd6fe0760c97c54bfff4852996459506",
            "tgName": "节点分期",
            "tgDescription": "节点分期节点分期节点分期节点分期",
            "changeMarkId": null,
            "tgOrder": null
        }
    ],
    "taSerialNumber": "号1775790348673",
    "taEndDate": "2026-04-30 11:05:49",
    "taDemand": "要求1",
    "taStatus": 0,
    "taTaskSource": null,
    "taReleaseTime": null,
    "taRequestOAId": null,
    "projectDept": null,
    "taOriginalCreator": null,
    "isAssess": null,
    "completionCount": "0/2",
    "taUpdateTime": "2026-04-10 11:05:49",
    "taskRole": null,
    "isOnlyDeduct": null,
    "id": "e1f98163114c68ffd030bf8a7e9718ff",
    "gzaprwfj": null,
    "taPreface": "根据集团公司生产计划安排，现下达《》，请各单位遵照执行。",
    "taHasPictureWork": null,
    "taChangeIds": null,
    "taPlanType": "0",
    "taIssuanceTime": null,
    "taCreator": "csq",
    "isDelete": 0,
    "taTaskName": "工作名称1",
    "isChangeDesign": null,
    "taCompleteDate": null,
    "isCounted": null,
    "taHasFileWork": null,
    "dicType": null,
    "taTaskType": null,
    "pmAlterInfoListId": null,
    "taIssuancer": null,
    "planExecutionProgress": 0,
    "workType": 0,
    "projectId": "ef983326bd7a9a7e58ec07708bd57e6d",
    "taReason": "无",
    "projectStep": 602
}

console.log(props.fromData, 'fromDatafromData');


// 基础数据
const compileDate = ref(new Date(1766141922000))

// DOM引用
const htmlContent = ref(null)

// 日期格式化
const formatDate = (date) => {
    return format(date, 'yyyy年MM月dd日')
}

// 下载HTML功能
const downloadHTML = () => {
    const content = htmlContent.value.innerHTML
    const source = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>工作联系单</title>
      <link rel="stylesheet" href="https://unpkg.com/element-plus/dist/index.css">
      <style>
        body {
          font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", Arial, sans-serif;
        }
        .contact-sheet {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .sheet-title {
          text-align: center;
          font-size: 24px;
          color: #333;
          margin-bottom: 10px;
        }
        .serial-number {
          text-align: left;
          font-size: 16px;
          color: #666;
          margin-bottom: 20px;
        }
        .contact-content p, .schedule-table p {
          text-align: left;
          line-height: 1.8;
        }
        .download-btn {
          text-align: center;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="contact-sheet">
        ${content}
      </div>
    </body>
    </html>
  `

    const blob = new Blob([source], { type: 'text/html' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `土一-自揽-20251216-城轨-业-土建一院-【2025】002号.html`
    document.body.appendChild(a)
    a.click()

    // 清理
    setTimeout(() => {
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }, 100)
}
</script>

<style scoped>
.contact-sheet {
    max-width: 800px;
    margin: 20px auto;
}

.sheet-title {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
}

.serial-number {
    text-align: right;
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
}



.schedule-table {
    margin-top: 20px;
}

.contact-content {
    border: 1px solid #f0f0f0;
    padding: 4px 8px;
}

.contact-content h2 {
    text-align: center;
}

.contact-content p {
    /* 第一行需要两个空格 */
    text-indent: 2em;
}

.schedule-table p {
    text-align: left;
    line-height: 1.8;
}

.download-btn {
    text-align: center;
    margin-top: 30px;
}
</style>
