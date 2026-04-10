<template>
  <div class="icon-picker">
    <a-tabs v-model:activeKey="activeKey" @change="handleTabChange">
      <!-- 方向性图标 -->
      <a-tab-pane tab="方向性图标" key="direction">
        <div class="icon-grid">
          <div 
            v-for="icon in directionIcons" 
            :key="icon" 
            class="icon-item" 
            :class="{ 'active': selectedIcon === icon }"
            @click="chooseIcon(icon, 'direction')" 
            :title="icon"
          >
            <component :is="getIconComponent(icon)" />
          </div>
        </div>
      </a-tab-pane>

      <!-- 指示性图标 -->
      <a-tab-pane tab="指示性图标" key="indication">
        <div class="icon-grid">
          <div 
            v-for="icon in indicationIcons" 
            :key="icon" 
            class="icon-item"
            :class="{ 'active': selectedIcon === icon }" 
            @click="chooseIcon(icon, 'indication')" 
            :title="icon"
          >
            <component :is="getIconComponent(icon)" />
          </div>
        </div>
      </a-tab-pane>

      <!-- 编辑类图标 -->
      <a-tab-pane tab="编辑类图标" key="editor">
        <div class="icon-grid">
          <div 
            v-for="icon in editorIcons" 
            :key="icon" 
            class="icon-item" 
            :class="{ 'active': selectedIcon === icon }"
            @click="chooseIcon(icon, 'editor')" 
            :title="icon"
          >
            <component :is="getIconComponent(icon)" />
          </div>
        </div>
      </a-tab-pane>

      <!-- 数据类图标 -->
      <a-tab-pane tab="数据类图标" key="data">
        <div class="icon-grid">
          <div 
            v-for="icon in dataIcons" 
            :key="icon" 
            class="icon-item" 
            :class="{ 'active': selectedIcon === icon }"
            @click="chooseIcon(icon, 'data')" 
            :title="icon"
          >
            <component :is="getIconComponent(icon)" />
          </div>
        </div>
      </a-tab-pane>

      <!-- 网站通用图标 -->
      <a-tab-pane tab="网站通用图标" key="website">
        <div class="icon-grid">
          <div 
            v-for="icon in websiteIcons" 
            :key="icon" 
            class="icon-item" 
            :class="{ 'active': selectedIcon === icon }"
            @click="chooseIcon(icon, 'website')" 
            :title="icon"
          >
            <component :is="getIconComponent(icon)" />
          </div>
        </div>
      </a-tab-pane>

      <!-- 品牌和标识 -->
      <a-tab-pane tab="品牌和标识" key="brand">
        <div class="icon-grid">
          <div 
            v-for="icon in brandIcons" 
            :key="icon" 
            class="icon-item" 
            :class="{ 'active': selectedIcon === icon }"
            @click="chooseIcon(icon, 'brand')" 
            :title="icon"
          >
            <component :is="getIconComponent(icon)" />
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>

    <!-- 选中的图标和操作按钮 -->
    <div class="selection-area" v-if="selectedIcon">
      <div class="selected-info">
        <div class="preview">
          <component :is="getIconComponent(selectedIcon)" style="font-size: 24px;" />
          <span>已选择: {{ selectedIcon }}</span>
        </div>
        <div class="actions">
          <a-button type="default" @click="handleCancel">
            <template #icon>
              <CloseOutlined />
            </template>
            取消
          </a-button>
          <a-button type="primary" @click="handleConfirm">
            <template #icon>
              <CheckOutlined />
            </template>
            确认
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as Icons from '@ant-design/icons-vue'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue'

const activeKey = ref('direction')
const selectedIcon = ref('')
const selectedCategory = ref('')

// 定义自定义事件
const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'select', data: { icon: string; category: string }): void
}>()

// 方向性图标
const directionIcons = [
  'StepForwardOutlined',
  'StepBackwardOutlined',
  'FastForwardOutlined',
  'FastBackwardOutlined',
  'ShrinkOutlined',
  'ArrowsAltOutlined',
  'DownOutlined',
  'UpOutlined',
  'LeftOutlined',
  'RightOutlined',
  'CaretUpOutlined',
  'CaretDownOutlined',
  'CaretLeftOutlined',
  'CaretRightOutlined',
  'DoubleLeftOutlined',
  'DoubleRightOutlined',
  'VerticalLeftOutlined',
  'VerticalRightOutlined',
  'ArrowUpOutlined',
  'ArrowDownOutlined',
  'ArrowLeftOutlined',
  'ArrowRightOutlined'
]

// 指示性图标
const indicationIcons = [
  'CheckCircleFilled',
  'ExclamationCircleFilled',
  'CloseCircleFilled',
  'InfoCircleFilled',
  'QuestionCircleFilled',
  'WarningFilled',
  'CheckCircleOutlined',
  'ExclamationCircleOutlined',
  'CloseCircleOutlined',
  'InfoCircleOutlined',
  'QuestionCircleOutlined',
  'WarningOutlined',
  'ClockCircleOutlined',
  'SyncOutlined',
  'LoadingOutlined',
  'HourglassOutlined',
  'PlayCircleOutlined',
  'PauseCircleOutlined',
  'StopOutlined',
  'StepBackwardOutlined',
  'StepForwardOutlined',
  'ForwardOutlined',
  'BackwardOutlined',
  'PlusOutlined',
  'MinusOutlined',
  'CloseOutlined',
  'CheckOutlined',
  'EditOutlined',
  'CopyOutlined',
  'DeleteOutlined',
  'ScissorOutlined',
  'SaveOutlined',
  'UploadOutlined',
  'DownloadOutlined',
  'PieChartOutlined',
  'AreaChartOutlined',
  'BarChartOutlined',
  'LineChartOutlined',
  'ToTopOutlined',
  'RiseOutlined',
  'FallOutlined',
  'StockOutlined',
  'SlidersOutlined',
  'AuditOutlined'
]

// 编辑类图标
const editorIcons = [
  'EditOutlined',
  'DeleteOutlined',
  'CopyOutlined',
  'ScissorOutlined',
  'FileTextOutlined',
  'FormOutlined',
  'SaveOutlined',
  'UndoOutlined',
  'RedoOutlined',
  'ClearOutlined',
  'DragOutlined',
  'OrderedListOutlined',
  'UnorderedListOutlined',
  'CheckSquareOutlined',
  'CloseSquareOutlined',
  'CheckCircleOutlined',
  'CloseCircleOutlined',
  'MinusCircleOutlined',
  'InfoCircleOutlined',
  'ExclamationCircleOutlined',
  'QuestionCircleOutlined',
  'PlusCircleOutlined',
  'MinusSquareOutlined',
  'PlusSquareOutlined',
  'MinusOutlined',
  'PlusOutlined',
  'UploadOutlined',
  'DownloadOutlined',
  'ExportOutlined',
  'ImportOutlined',
  'PaperClipOutlined',
  'SnippetsOutlined',
  'HighlightOutlined',
]

// 数据类图标
const dataIcons = [
  'PieChartOutlined',
  'BarChartOutlined',
  'LineChartOutlined',
  'AreaChartOutlined',
  'FundOutlined',
  'TableOutlined',
  'DatabaseOutlined',
  'FileExcelOutlined',
  'FileTextOutlined',
  'CloudServerOutlined',
  'CloudOutlined',
  'CloudDownloadOutlined',
  'CloudUploadOutlined',
  'SnippetsOutlined',
  'BarsOutlined',
  'BookOutlined',
  'ProfileOutlined',
  'CalendarOutlined',
  'CalendarFilled',
  'FolderOpenOutlined',
  'FolderOutlined',
  'FolderAddOutlined',
  'TagOutlined',
  'TagsOutlined',
  'TagFilled',
  'TagsFilled',
  'UserOutlined',
  'TeamOutlined',
  'BookFilled',
  'FileMarkdownOutlined',
  'FileMarkdownFilled',
  'FilePdfOutlined',
]

// 网站通用图标
const websiteIcons = [
  'HomeOutlined',
  'UserOutlined',
  'SettingOutlined',
  'SearchOutlined',
  'BellOutlined',
  'MessageOutlined',
  'MenuOutlined',
  'BarsOutlined',
  'MailOutlined',
  'PhoneOutlined',
  'HeartOutlined',
  'StarOutlined',
  'ShoppingCartOutlined',
  'CreditCardOutlined',
  'PayCircleOutlined',
  'SafetyCertificateOutlined',
  'LaptopOutlined',
  'DesktopOutlined',
  'TabletOutlined',
  'MobileOutlined',
  'AppstoreOutlined',
  'SkinOutlined',
  'SkinFilled',
  'NotificationOutlined',
  'NotificationFilled',
  'SoundOutlined',
  'SoundFilled',
  'CameraOutlined',
  'CameraFilled',
  'EyeOutlined',
  'EyeInvisibleOutlined',
  'EyeInvisibleFilled',
  'PoweroffOutlined',
  'LogoutOutlined',
  'LoginOutlined',
  'SwapOutlined',
  'SwapLeftOutlined',
  'SwapRightOutlined',
  'ReloadOutlined',
  'ArrowLeftOutlined',
  'RollbackOutlined',
]

// 品牌和标识
const brandIcons = [
  'AntDesignOutlined',
  'AppleOutlined',
  'WindowsOutlined',
  'ChromeOutlined',
  'GithubOutlined',
  'AlipayOutlined',
  'WechatOutlined',
  'TaobaoOutlined',
  'WeiboOutlined',
  'AlibabaOutlined',
  'YahooOutlined',
  'SkypeOutlined',
  'LinkedinOutlined',
  'FacebookOutlined',
  'GoogleOutlined',
  'TwitterOutlined',
  'InstagramOutlined',
  'YoutubeOutlined',
  'DropboxOutlined',
  'MediumOutlined',
  'BehanceOutlined',
  'DribbbleOutlined',
  'RedditOutlined',
]

// 获取图标组件
const getIconComponent = (iconName: string) => {
  const component = (Icons as any)[iconName]
  if (!component) {
    console.warn(`Icon "${iconName}" not found in @ant-design/icons-vue`)
    return null
  }
  return component
}

// 选择图标
const chooseIcon = (icon: string, category: string) => {
  selectedIcon.value = icon
  selectedCategory.value = category
}

// 标签页切换
const handleTabChange = (key: string) => {
  activeKey.value = key
  selectedIcon.value = '' // 清空选择
}

// 取消操作
const handleCancel = () => {
  selectedIcon.value = ''
  emit('cancel')
}

// 确认操作
const handleConfirm = () => {
  if (selectedIcon.value) {
    emit('select', {
      icon: selectedIcon.value,
      category: selectedCategory.value
    })
  }
}
</script>

<style scoped>
.icon-picker {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  background: #fff;
}

:deep(.ant-tabs-nav) {
  margin-bottom: 0;
}

:deep(.ant-tabs-content) {
  padding: 20px 0;
  min-height: 300px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
  padding: 10px 0;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fafafa;
}

.icon-item:hover {
  border-color: #1890ff;
  background: #e6f7ff;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.icon-item.active {
  border-color: #1890ff;
  background: #e6f7ff;
  color: #1890ff;
}

.icon-item :deep(.anticon) {
  font-size: 24px;
  margin-bottom: 8px;
  color: inherit;
}

.icon-item.active :deep(.anticon) {
  color: #1890ff;
}

.selection-area {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.selected-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #fafafa;
  border-radius: 6px;
}

.preview {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #666;
}

.preview :deep(.anticon) {
  color: #1890ff;
}

.actions {
  display: flex;
  gap: 12px;
}

@media (max-width: 768px) {
  .icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 12px;
  }

  .selected-info {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .actions {
    justify-content: flex-end;
  }
}
</style>