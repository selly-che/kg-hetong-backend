<template>
    <div>
        <div style="text-align: right;margin-bottom: 10px;"> <a-button type="dashed"   @click="ClosePdfFn">关闭</a-button></div>
        <div class="pdf-wrapper">
            <div ref="pdfSourceRef" id="pdf-source" class="notice-container-hidden">
                <h1 class="title">{{ fromData.taTaskName || '总体通知单' }}</h1>
    
                <div class="notice-number">
                    编号：{{ fromData.taSerialNumber || '-' }}
                </div>
    
                <table class="info-table">
                    <tbody>
                        <tr>
                            <th class="label-cell">项目名称及阶段</th>
                            <td class="content-cell" colspan="3">
                                {{ fromData.taTaskName || '-' }} {{ fromData.projectStepStr || '' }}
                            </td>
                        </tr>
                        <tr>
                            <th class="label-cell">主送单位及部门</th>
                            <td class="content-cell" colspan="3">
                                {{ fromData.taCCUnit || '-' }}
                            </td>
                        </tr>
                        <tr>
                            <th class="label-cell">抄送单位及部门</th>
                            <td class="content-cell" colspan="3">
                                {{ fromData.taCCUnit || '-' }}
                            </td>
                        </tr>
                        <tr>
                            <th class="label-cell">编制</th>
                            <td class="content-cell">{{ fromData.taCreator || '-' }}</td>
                            <th class="label-cell">日期</th>
                            <td class="content-cell">{{ formatDate(fromData.taEndDate) }}</td>
                        </tr>
                    </tbody>
                </table>
    
                <div class="content-section">
                    <p class="content-title"><strong>{{ fromData.taTaskName || '联系事项' }}</strong></p>
                    <p style="text-indent: 2em;">{{ fromData.taPreface || '根据集团公司生产计划安排，现下达相关任务，请各单位遵照执行。' }}</p>
                    <p style="text-indent: 2em;">工期计划及要求详见附件。</p>
    
                    <div class="signature">
                        <p>签署：{{ fromData.taCreator || '管理员' }} {{ formatDate(fromData.taEndDate) }}</p>
                    </div>
                </div>
    
                <div class="schedule-section">
                    <h3>工期计划</h3>
                    <table class="schedule-table">
                        <thead>
                            <tr>
                                <th style="width: 80px;">序号</th>
                                <th>任务内容</th>
                                <th style="width: 150px;">完成单位</th>
                                <th style="width: 150px;">完成时间</th>
                                <th style="width: 200px;">备注</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(group, index) in fromData.taskGroups" :key="group.id">
                                <tr class="parent-row">
                                    <td>{{ Number(index) + 1 }}</td>
                                    <td class="task-name">{{ group.tgName }}</td>
                                    <td>--</td>
                                    <td>{{ formatDate(group.tgUpdateTime) }}</td>
                                    <td>{{ group.tgDescription }}</td>
                                </tr>
    
                                <tr v-for="(status, sIndex) in group.twaTaskContentStatuses" :key="status.id"
                                    class="child-row">
                                    <td>{{ Number(index) + 1 }}.{{ Number(sIndex) + 1 }}</td>
                                    <td class="task-name child-name">{{ status.tcName }}</td>
                                    <td>{{ status.deptMajor || '--' }}</td>
                                    <td>{{ formatDate(status.euCompleteDate) }}</td>
                                    <td>{{ status.tcRemark }}</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
    
            <!-- PDF 预览区域 -->
            <div class="pdf-preview-box">
                <div v-if="isLoading" class="loading-tip">正在生成 PDF，请稍候...</div>
                <embed v-else-if="pdfUrl" :src="pdfUrl" type="application/pdf" width="100%" height="800px" />
                <div v-else class="empty-tip">
                    {{ errorMsg || '暂无数据' }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onBeforeUnmount, nextTick } from 'vue';
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


export default defineComponent({
    name: 'PdfDetail',
    props: {
        fromData: {
            type: Object,
            required: true,
            default: () => ({})
        }
    },
    setup(props,{ emit }) {
        const pdfUrl = ref<string | null>(null);
        const isLoading = ref<boolean>(false);
        const errorMsg = ref<string>('');
        const pdfSourceRef = ref<HTMLElement | null>(null);

        // 日期格式化
        const formatDate = (dateStr: string | null) => {
            if (!dateStr) return '--';
            try {
                return format(new Date(dateStr), 'yyyy/MM/dd');
            } catch (e) {
                return dateStr;
            }
        };

        // 核心生成逻辑
        const generatePDF = async () => {
            // 1. 基本校验
            if (!props.fromData || !props.fromData.taTaskName) {
                // 如果连任务名都没有，说明数据还没准备好，静默返回即可，不报错
                return;
            }

            isLoading.value = true;
            errorMsg.value = '';

            // 清理旧的 URL
            if (pdfUrl.value) {
                URL.revokeObjectURL(pdfUrl.value);
                pdfUrl.value = null;
            }

            try {
                // 2. 等待 Vue 更新 DOM
                await nextTick();

                // 使用 ref 获取元素，比 getElementById 更可靠
                const element = pdfSourceRef.value;
                if (!element) {
                    throw new Error('渲染容器未就绪');
                }

                // 额外等待 100ms 确保字体和样式完全应用
                await new Promise(resolve => setTimeout(resolve, 100));

                // 3. 执行截图
                const canvas = await html2canvas(element, {
                    scale: 2, // 提高清晰度
                    useCORS: true, // 允许跨域图片
                    allowTaint: true,
                    logging: false,
                    backgroundColor: '#ffffff',
                    windowWidth: element.scrollWidth,
                    windowHeight: element.scrollHeight
                });

                // 4. 创建 PDF
                const imgWidth = 595.28; // A4 宽度 pt
                const pageHeight = 841.89; // A4 高度 pt
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                const pdf = new jsPDF('p', 'pt', 'a4');

                let heightLeft = imgHeight;
                let position = 0;

                // 第一页
                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                // 后续页
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                // 5. 输出 Blob
                const blob = pdf.output('blob');
                pdfUrl.value = URL.createObjectURL(blob);

            } catch (error: any) {
                console.error('PDF 生成详细错误:', error);
                errorMsg.value = '生成失败: ' + (error.message || '未知错误');
            } finally {
                isLoading.value = false;
            }
        };

        const ClosePdfFn = () => {
            // 触发父组件的关闭事件
            emit('closePdf');
        }

        // 监听数据变化
        watch(() => props.fromData, (newVal) => {
            // 只有当 newVal 有实际内容时才生成
            if (newVal && newVal.taTaskName) {
                generatePDF();
            }
        }, { deep: true, immediate: true });

        // 组件销毁时清理
        onBeforeUnmount(() => {
            if (pdfUrl.value) {
                URL.revokeObjectURL(pdfUrl.value);
            }
        });

        return {
            formatDate,
            pdfUrl,
            isLoading,
            errorMsg,
            pdfSourceRef,
            ClosePdfFn
        };
    }
});
</script>

<style scoped>
.pdf-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f0f2f5;
    min-height: 100%;
}

/* 关键：隐藏但保留布局空间，或者移出屏幕 */
.notice-container-hidden {
    position: absolute;
    left: -9999px;
    top: 0;
    width: 800px;
    /* 必须固定宽度，否则截图可能变形 */
    padding: 40px;
    background-color: #fff;
    font-family: "SimSun", "Songti SC", serif;
    z-index: -1;
}

.title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
}

.notice-number {
    text-align: right;
    margin-bottom: 20px;
    font-size: 14px;
    color: #333;
}

.info-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 0;
    font-size: 14px;
}

.info-table th,
.info-table td {
    border: 1px solid #000;
    padding: 8px 12px;
    text-align: left;
    vertical-align: middle;
}

.info-table th {
    background-color: #f9f9f9;
    font-weight: bold;
    width: 150px;
    text-align: center;
}

.content-section {
    border: 1px solid #000;
    border-top: none;
    padding: 20px;
    margin-bottom: 30px;
    line-height: 1.8;
    font-size: 14px;
}

.content-title {
    text-align: center;
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: bold;
}

.signature {
    text-align: right;
    margin-top: 30px;
    font-size: 14px;
}

.schedule-section h3 {
    font-size: 16px;
    margin-bottom: 10px;
    border-left: 4px solid #333;
    padding-left: 10px;
    color: #333;
}

.schedule-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.schedule-table th,
.schedule-table td {
    border: 1px solid #000;
    padding: 8px;
    text-align: center;
    vertical-align: middle;
}

.schedule-table th {
    background-color: #f0f0f0;
    font-weight: bold;
}

.task-name {
    text-align: left !important;
}

.child-row {
    background-color: #fafafa;
}

.child-name {
    padding-left: 30px !important;
    text-align: left !important;
    color: #666;
}

.pdf-preview-box {
    width: 100%;
    min-height: 800px;
    border: 1px solid #dcdcdc;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background: #fff;
    margin-top: 20px;
}

.loading-tip,
.empty-tip {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    color: #666;
    font-size: 14px;
}
</style>