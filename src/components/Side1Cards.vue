<template>
  <div class="project-card">
    <div class="project-card-header">
      <a-tag class="project-type-tag">{{ props.project.type }}</a-tag>
      <a-tag
        class="project-status-tag"
        :class="getStatusClass(props.project.status)"
      >
        {{ props.project.status }}
      </a-tag>
    </div>
    <h3 class="project-name">{{ props.project.name }}</h3>
    <div class="project-stats">
      <div class="stat-item">
        <div class="stat-label">集团合同数量</div>
        <div class="stat-value">{{ props.project.groupContractCount }}</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-label">外协合同数量</div>
        <div class="stat-value">
          {{ props.project.outsourcingContractCount }}
        </div>
      </div>
    </div>
    <div class="project-actions">
      <a-button class="action-btn view-btn" @click="watchProject"
        >查看项目</a-button
      >
      <a-button class="action-btn edit-btn">编辑</a-button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

// 根据状态返回不同的样式类
const getStatusClass = (status) => {
  switch (status) {
    case "进行中":
      return "status-in-progress";
    case "已暂停":
      return "status-paused";
    case "已结束":
      return "status-completed";
    default:
      return "";
  }
};
</script>

<style scoped>
.project-card {
  background: #fff;
  border-radius: 8px;
  border: 0.2px solid #bebebe;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
}

.project-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.project-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  flex-shrink: 0;
}

.project-type-tag {
  font-size: 11px;
  padding: 1px 6px;
  background: #f0f2f5;
  border-color: #f0f2f5;
  color: #666;
}

.project-status-tag {
  font-size: 11px;
  padding: 1px 6px;
  margin-right: 0;
  margin-top: 0;
}

.project-status-tag.status-in-progress {
  background: #e6f7ff;
  border-color: #e6f7ff;
  color: #1890ff;
}

.project-status-tag.status-paused {
  background: #fff7e6;
  border-color: #fff7e6;
  color: #fa8c16;
}

.project-status-tag.status-completed {
  background: #f6ffed;
  border-color: #f6ffed;
  color: #52c41a;
}

.project-name {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin: 0 0 8px 0;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-stats {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
  justify-content: space-around;
}

.stat-item {
  flex: 1;
  text-align: center;
}

.stat-label {
  font-size: 11px;
  color: #999;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-value {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.stat-divider {
  width: 1px;
  height: 28px;
  background: #f0f0f0;
  margin: 0 8px;
}

.project-actions {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  margin-bottom: 0;
  flex-shrink: 0;
  gap: 8px;
}

.action-btn {
  flex: 1;
  height: 28px;
  font-size: 12px;
  border-radius: 4px;
  transition: all 0.3s ease;
  padding: 0 12px;
  min-width: 0;
}

.view-btn {
  border: 1px solid #d9d9d9;
  color: #666;
  background: #fff;
}

.view-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.edit-btn {
  border: 1px solid #d9d9d9;
  color: #666;
  background: #fff;
}

.edit-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

@media (max-width: 768px) {
  .project-stats {
    flex-direction: column;
    align-items: stretch;
  }

  .stat-divider {
    width: 100%;
    height: 1px;
    margin: 8px 0;
  }

  .stat-item {
    text-align: left;
  }
}
</style>
