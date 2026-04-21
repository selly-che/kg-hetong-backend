<template>
  <div class="pie-container">
    <div class="header">
      <div class="title-section">
        <span class="pie-title">待办工作</span>
        <span class="todo-tag">待办: {{ filteredTodoList.length }}</span>
      </div>
      <a class="more-link" @click="handleViewAll()">查看更多</a>
    </div>
    <div class="todo-list">
      <div
        v-for="(item, index) in filteredTodoList"
        :key="index"
        class="todo-item"
      >
        <div class="item-content">
          <!-- taskName -->
          <div class="item-text">{{ item?.taskName }}</div>
          <div class="item-time">
            <clock-circle-outlined class="time-icon" />
            {{ item?.createTime }}
          </div>
        </div>
        <div class="item-actions">
          <a-button size="small" type="primary" class="action-btn" @click="handleView(item)">查看</a-button>
          <a-button size="small" type="danger" class="action-btn" @click="handleClose(item)">关闭</a-button>
        </div>
      </div>
    </div>
    <!-- 详情 -->
    <a-modal v-model:visible="visible" title="任务详情" width="80%">
      <taskdetails :detailData="detailData" :type="'home'" @CloseTask="closeHomeFn" @closeHome="closeHomeFn" /> 
    </a-modal>
  </div>
</template>

<script setup>
import { ClockCircleOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import getDatas from "@/network/index";
import { ref, onMounted, computed } from "vue";
import taskdetails from "@/views/projectMgment/components/taskDetails.vue";
import { useRouter } from "vue-router";

onMounted(() => {
  List();
});
const router = useRouter();
const todoList = ref([
  {
    completeStatus: "1",
    completeTime: "2025-01-03 17:10:00",
    createBy: "zhangsan",
    createTime: "2025-01-03 14:00:00",
    doId: "admin",
    doName: "王建国】下达了《234234234》的事务性工作，请填写完成情况",
    id: "TASK003",
    taskId: "d88c275e981f9c3c763ef6884877041d",
    taskName: "工作名称11",
  },
]);

const filteredTodoList = computed(() => {
  return todoList.value.filter((item) => item.completeStatus === "0");
});

//获取代办列表
const List = async () => {
  const res = await getDatas("message/getTaskArrangementTodoList");
  console.log("待办列表", res);
  if (res.data.code === 200) {
    todoList.value = res.data.result.records;
  }
  // console.log("待办列表", res);
};
const handleViewAll = () => {
  router.push({
    path: "/todoList",
  });
};

const closeHomeFn = () => {
  
  visible.value = false;
};

const visible = ref(false);
const detailData = ref({});
const handleView = async (item) => {
  visible.value = true;
  console.log("查看", item);
  const resp = await getDatas("home/GetTaskDetails", {
    taskId: item.taskId,
  });
  console.log(resp, 'respresp');
  if(resp.data.code === 200){
    detailData.value = resp.data.result;
  }
};

const handleClose = (item) => {
  Modal.confirm({
    title: "提示",
    content: "是否把当前代办设为已处理",
    okText: "确认",
    cancelText: "取消",
    async onOk() {
      console.log("关闭", item.id);
      const res = await getDatas("message/closeTaskTodo", {
        taskTodoId: item.id,
      });
      if (res.data.code === 200) {
        List();
      }
    },
  });
};
</script>

<style scoped lang="less">
.pie-container {
  height: 440px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .title-section {
      display: flex;
      align-items: center;

      .pie-title {
        font-size: 20px;
        font-weight: bold;
        color: #333;
        margin-right: 12px;
      }

      .todo-tag {
        display: inline-block;
        padding: 2px 12px;
        background-color: #409eff;
        color: #fff;
        border-radius: 15px;
        font-size: 12px;
      }
    }

    .more-link {
      font-size: 12px;
      color: #409eff;
      cursor: pointer;
      text-decoration: none;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .todo-list {
    flex: 1;
    overflow-y: auto;

    .todo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      .item-content {
        flex: 1;
        margin-right: 20px;

        .item-text {
          font-size: 14px;
          color: #555;
          line-height: 1.5;
          margin-bottom: 6px;
          text-align: left;
        }

        .item-time {
          font-size: 13px;
          color: #999;
          display: flex;
          align-items: center;

          .time-icon {
            margin-right: 4px;
          }
        }
      }

      .item-actions {
        display: flex;
        gap: 10px;

        .action-btn {
          border: 1px solid #409eff;
          color: #409eff;
          border-radius: 4px;
          background: #fff;
          padding: 0 15px;
          height: 32px;

          &:hover {
            background-color: #ecf5ff;
          }
        }
      }
    }
  }
}
</style>
