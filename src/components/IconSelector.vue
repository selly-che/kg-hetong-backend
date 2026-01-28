<!-- components/menu/IconSelector.vue -->
<template>
  <div class="icon-selector">
    <a-input
      v-model:value="searchText"
      placeholder="搜索图标"
      style="margin-bottom: 16px"
    />
    
    <div class="icon-grid">
      <div
        v-for="icon in filteredIcons"
        :key="icon"
        class="icon-item"
        :class="{ selected: selectedIcon === icon }"
        @click="handleSelect(icon)"
      >
        <a-icon :type="icon" />
        <div class="icon-name">{{ icon }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const emit = defineEmits<{
  (e: 'select', icon: string): void;
}>();

const searchText = ref('');
const selectedIcon = ref('');

// 这里列出一些常用的 Ant Design 图标
const icons = [
  'home', 'dashboard', 'user', 'team', 'setting', 'appstore',
  'menu', 'folder', 'file', 'database', 'cloud', 'bell',
  'mail', 'message', 'calendar', 'clock-circle', 'star',
  'heart', 'like', 'dislike', 'lock', 'unlock', 'key',
  'safety-certificate', 'wallet', 'shopping', 'tag', 'tags',
  'gift', 'rocket', 'fire', 'thunderbolt', 'bulb', 'experiment',
  'compass', 'global', 'environment', 'camera', 'video-camera',
  'sound', 'customer-service', 'phone', 'mobile', 'tablet',
  'laptop', 'desktop', 'printer', 'scan', 'car', 'bank',
  'shop', 'rest', 'medicine-box', 'skin', 'red-envelope',
  'coffee', 'fork', 'gift', 'box-plot', 'pie-chart', 'bar-chart',
  'line-chart', 'dot-chart', 'area-chart', 'radar-chart',
  'heat-map', 'fall', 'rise', 'stock', 'loading', 'reload',
  'download', 'upload', 'export', 'import', 'save', 'delete',
  'edit', 'form', 'copy', 'scissor', 'snippets', 'ordered-list',
  'unordered-list', 'align-left', 'align-center', 'align-right',
  'bold', 'italic', 'underline', 'strikethrough', 'font-colors',
  'font-size', 'line-height', 'colum-height', 'dash', 'small-dash',
  'sort-ascending', 'sort-descending', 'drag', 'menu-unfold',
  'menu-fold', 'vertical-align-top', 'vertical-align-middle',
  'vertical-align-bottom', 'column-width', 'check', 'close',
  'plus', 'minus', 'question', 'info-circle', 'exclamation-circle',
  'warning', 'issues-close', 'stop', 'check-circle', 'close-circle',
  'info-circle', 'right-circle', 'left-circle', 'up-circle',
  'down-circle', 'play-circle', 'pause-circle', 'minus-circle',
  'plus-circle', 'eye', 'eye-invisible', 'filter', 'funnel-plot',
  'search', 'zoom-in', 'zoom-out', 'expand', 'collapse',
  'fullscreen', 'fullscreen-exit', 'swap', 'swap-left', 'swap-right',
];

const filteredIcons = computed(() => {
  if (!searchText.value) {
    return icons;
  }
  return icons.filter(icon => 
    icon.toLowerCase().includes(searchText.value.toLowerCase())
  );
});

const handleSelect = (icon: string) => {
  selectedIcon.value = icon;
  emit('select', icon);
};
</script>

<style scoped>
.icon-selector {
  max-height: 400px;
  overflow-y: auto;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.icon-item:hover {
  border-color: #1890ff;
  background-color: #e6f7ff;
}

.icon-item.selected {
  border-color: #1890ff;
  background-color: #e6f7ff;
  color: #1890ff;
}

.icon-item i {
  font-size: 24px;
  margin-bottom: 8px;
}

.icon-name {
  font-size: 12px;
  text-align: center;
  word-break: break-all;
}
</style>