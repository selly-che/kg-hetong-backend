<template>
  <div class="pie-container">
    <div class="header">
      <div class="title-section">
        <span class="pie-title">待办工作</span>
        <span class="todo-tag">待办: {{ todoList.length }}</span>
      </div>
      <a class="more-link">查看更多</a>
    </div>
    <div class="todo-list">
      <div v-for="(item, index) in todoList" :key="index" class="todo-item">
        <div class="item-content">
          <div class="item-text">{{ item.content }}</div>
          <div class="item-time">
            <clock-circle-outlined class="time-icon" />
            {{ item.time }}
          </div>
        </div>
        <div class="item-actions">
          <a-button size="small" class="action-btn" @click="handleView(item)"
            >查看</a-button
          >
          <a-button size="small" class="action-btn" @click="handleClose(item)"
            >关闭</a-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ClockCircleOutlined } from "@ant-design/icons-vue";

const todoList = [
  {
    id: 1,
    content: "【王建国】下达了《234234234》的事务性工作，请填写完成情况",
    time: "2026-03-04",
  },
  {
    id: 2,
    content:
      "你已被指派为【土一-自揽-20251216-城轨】项目的主管计调，请及时完善生产组织信息。",
    time: "2026-02-26",
  },
  {
    id: 3,
    content:
      "【生产管理系统过程考核登记情况】：2026-01-29 非项目类【不服从责任主体单位工作安排，-1分/次】，考核：-1.00，如有疑问，请在3天内，在生产系统考核模块进行申述，过期将不再进行申述！",
    time: "2026-01-29",
  },
];

const handleView = (item) => {
  console.log("查看", item.id);
};

const handleClose = (item) => {
  console.log("关闭", item.id);
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
