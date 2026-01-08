<template>
    <div class="page-content">
        index
    </div>
</template>
<script lang="ts" setup>
import getDatas from "@/network/index";
import { ref, onMounted, reactive, h } from 'vue';
import { ElMessage, ElNotification } from 'element-plus';


const search = ref('');
const loading = ref(false);
const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const totle = ref(0);
const yuJingDialog = ref(false);
const newId = ref(0);
const is_warning = ref();
const is_warningType = ref([ // 报警类型
    { value: 0, label: '全部' },
    { value: 1, label: '报警' }
]);
const yuJingData = reactive({ // 预警图片数据
    pic_path: '',// 图片
    value: '',
    warningTime: '',// 报警时间
    warningLevel: '',// 报警级别
    sx: '',// X位移
    sy: '',// Y位移
    ax: '',// X角度
    ay: '',// Y角度
    az: '',// Z角度
});

onMounted(() => {
    // iot_alarm_logIndex();
    // setTimeout(() => {
    //     iot_alarm_logIndex();
    // }, 1000);
    // newsJingBaoSet
});

// // 每秒请求一次 新预警
// const newsJingBaoSet = setInterval(() => {
//     iot_alarm_logNew();
// }, 2000);
const iot_alarm_logIndex = async () => {
    const res = await getDatas("biaoba/iot_alarm_logIndex", {
        title: search.value,
        is_warning: is_warning.value,
        page: currentPage.value,
        limit: pageSize.value,
    });
    console.log("标靶报警列表", JSON.parse(JSON.stringify(res.data)));
    if (res.data.code == 0) {
        tableData.value = res.data.lists;
        if (res.data.lists.length > 0 && res.data.lists[0].id > newId.value) {
            newId.value = res.data.lists[0].id;
            // iot_alarm_logNew();
        }
        totle.value = res.data.totle_num;
        loading.value = false;
    } else {
        ElMessage.error(res.data.msg);
        loading.value = false;
    }
};
// 需要传index接口最新的id才能获取到最新数据
const iot_alarm_logNew = async () => {
    const res = await getDatas("biaoba/iot_alarm_logNew", {
        id: newId.value
    });
    // console.log("标靶报警列表 new", JSON.parse(JSON.stringify(res.data)));
    if (res.data.code == 0) {
        if (res.data.lists.length > 0) {
            ActionSele();
            newId.value = res.data.lists[0].id; // 获取最新id
            iot_alarm_logIndex();
        }
    }
};
// 分页
const handleSizeChange = (val: any) => {
    pageSize.value = val;
    iot_alarm_logIndex();
};
// 当前页
const currentPageChange = (val: any) => {
    currentPage.value = val;
    iot_alarm_logIndex();
};
// 查看预警图片
const handleSeleUserId = async (scope: any) => {
    // console.log("scope", JSON.parse(JSON.stringify(scope)));
    yuJingDialog.value = true;
    yuJingData.pic_path = scope.pic_path; // 图片
    yuJingData.warningTime = scope.warningTime; // 报警时间
    yuJingData.warningLevel = scope.warningLevel; // 报警级别
    yuJingData.sx = scope.sx; // X位移
    yuJingData.sy = scope.sy; // Y位移
    yuJingData.ax = scope.ax; // X角度
    yuJingData.ay = scope.ay; // Y角度
    yuJingData.az = scope.az; // Z角度
};
// 提示 警告
const ActionSele = () => {
    ElNotification({
        title: '提示',
        message: h('i', { style: 'color: teal' }, '有一个新的警告!'),
        type: 'warning',
    })
};

</script>

<style lang="less" scoped>
.page-content {
    .sousuo {
        margin-bottom: 0.5rem;
    }
}

:deep(.el-table) {
    --el-table-border-color: #039da5;
    --el-table-text-color: #fff;
    --el-table-header-text-color: #fff;
    --el-table-bg-color: transparent;
    --el-table-tr-bg-color: transparent;
    --el-table-header-bg-color: transparent;
    --el-table-row-hover-bg-color: transparent;

    .el-table__cell {
        color: #fff;
    }

    .el-table__header th {
        color: #fff;
    }

    .el-table__row {
        color: #fff;
    }
}

.warning-dialog-content {
    // min-height: 16rem;
    overflow: hidden;
    overflow-y: auto;

    .image-container {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .warning-image {
            max-width: 100%;
            max-height: 70vh;
            object-fit: contain;
            display: block;
        }

        .warning-info-overlay {
            position: absolute;
            top: 80px;
            left: 170px;
            background: rgba(7, 38, 53, 0.8);
            border: 1px solid rgba(0, 250, 255, 0.2);
            border-radius: 8px;
            padding: 15px;
            max-width: 300px;
            z-index: 1;

            .info-item {
                display: flex;
                margin-bottom: 10px;
                color: #fff;
                font-size: 14px;

                &:last-child {
                    margin-bottom: 0;
                }

                .label {
                    width: 80px;
                    color: #00faff;
                    font-weight: bold;
                }

                .value {
                    flex: 1;
                }
            }
        }
    }
}

:deep(.el-dialog) {
    background: #072635;
    border: 1px solid #00faff;

    .el-dialog__title {
        color: #00faff;
    }

    .el-dialog__headerbtn .el-dialog__close {
        color: #00faff;
    }
}
</style>