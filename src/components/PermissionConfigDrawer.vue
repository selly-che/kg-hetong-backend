<template>
  <!-- 角色权限配置抽屉 -->
  <a-drawer v-model:visible="drawerVisible" title="角色权限配置" :width="720" placement="right" :mask-closable="false"
    @close="handleDrawerClose">
    <div class="permission-config">
      <h2 class="config-title">所拥有的权限：</h2>

      <!-- 树操作工具栏 -->
      <!-- <div class="tree-toolbar">

        <div class="toolbar-right">
          <a-input-search v-model:value="searchValue" placeholder="搜索权限" style="width: 180px" @search="handleSearch"
            allow-clear>
            <template #prefix>
              <SearchOutlined />
            </template>
</a-input-search>
</div>
</div> -->

      <!-- 权限树 -->
      <div class="tree-container">
        <div v-if="loading" class="loading-wrapper">
          <a-spin tip="加载中..." />
        </div>

        <div v-else-if="!treeData.length" class="empty-wrapper">
          <a-empty description="暂无权限数据" />
        </div>

        <a-tree v-else v-model:checkedKeys="checkedKeys" v-model:expandedKeys="expandedKeys"
          :tree-data="formattedTreeData" checkable :check-strictly="!parentChildRelation" :selectable="false"
          :auto-expand-parent="autoExpandParent" :field-names="fieldNames" @check="handleTreeCheck"
          @expand="handleTreeExpand" :filterTreeNode="filterTreeNode">
          <template #title="{ slotTitle, title, label, ruleFlag }">
            <div class="tree-node-title">
              <span>{{ slotTitle || title || label }}</span>
              <!-- <a-tag v-if="ruleFlag === 1" color="blue" size="small" style="margin-left: 6px;">
                数据规则
              </a-tag> -->
            </div>
          </template>

          <template #icon="{ isLeaf }">
            <span class="tree-node-icon">
              <FolderOutlined v-if="!isLeaf" style="color: #faad14;" />
              <FileOutlined v-else style="color: #8c8c8c;" />
            </span>
          </template>
        </a-tree>
      </div>

      <!-- 选中的数量 -->
      <div class="selected-count">
        <span>已选择 {{ checkedKeys.length }} 个权限</span>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <a-dropdown style="float: left" :trigger="['click']" placement="top">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="enableParentChild">父子关联</a-menu-item>
              <a-menu-item key="2" @click="disableParentChild">取消关联</a-menu-item>
              <a-menu-item key="3" @click="selectAll">全部勾选</a-menu-item>
              <a-menu-item key="4" @click="unselectAll">取消全选</a-menu-item>
              <a-menu-item key="5" @click="expandAll">展开所有</a-menu-item>
              <a-menu-item key="6" @click="collapseAll">合并所有</a-menu-item>
            </a-menu>
          </template>

          <a-button>
            树操作
            <UpOutlined />
          </a-button>
        </a-dropdown>
        <a-space>
          <a-button @click="handleCancel">取消</a-button>
          <a-button @click="handleSaveOnly" type="primary" :loading="saving">
            仅保存
          </a-button>
          <a-button @click="handleSaveAndClose" type="primary" :loading="saving">
            保存并关闭
          </a-button>
        </a-space>
      </div>
    </div>
  </a-drawer>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { Modal, message } from 'ant-design-vue'
import {
  LinkOutlined,
  DisconnectOutlined,
  CheckSquareOutlined,
  BorderOutlined,
  DownOutlined,
  UpOutlined,
  FileOutlined,
  FolderOutlined,
  SearchOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue'

// 定义Props
const props = defineProps({
  // 是否显示抽屉
  visible: {
    type: Boolean,
    default: false
  },
  // 角色ID
  roleId: {
    type: [String, Number, null],
    required: true
  },
  // 获取树数据的API函数
  fetchTreeApi: {
    type: Function,
    required: true
  },
  // 获取已选权限的API函数
  fetchCheckedApi: {
    type: Function,
    required: true
  },
  // 保存权限的API函数
  saveApi: {
    type: Function,
    required: true
  }
})

// 定义事件
const emit = defineEmits(['update:visible', 'close', 'save-success'])

// 抽屉显示状态
const drawerVisible = ref(false)

// 加载状态
const loading = ref(false)
const saving = ref(false)

// 搜索相关
const searchValue = ref('')
const autoExpandParent = ref(true)

// 树相关
const treeData = ref([])
const formattedTreeData = ref([])
const checkedKeys = ref([])
const expandedKeys = ref([])
const parentChildRelation = ref(false)

// 原始选中的key，用于取消操作时恢复
const originalCheckedKeys = ref([])

// 字段映射配置
const fieldNames = {
  key: 'value',
  title: 'title',
  children: 'children'
}

// 监听visible变化
watch(() => props.visible, (val) => {
  drawerVisible.value = val
  if (val) {
    loadData()
  }
})

// 监听抽屉显示状态
watch(drawerVisible, (val) => {
  emit('update:visible', val)
})

const defaultCheckedKeys = ref([])
// 加载数据
const loadData = async () => {
  if (!props.roleId) {
    message.error('请提供角色ID')
    return
  }

  loading.value = true
  try {
    // 并行获取树数据和已选权限
    const [treeDataRes, checkedDataRes] = await Promise.all([
      props.fetchTreeApi(props.roleId),
      props.fetchCheckedApi(props.roleId)
    ])

    // 处理树数据
    treeData.value = treeDataRes || []
    formattedTreeData.value = formatTreeData(treeData.value)

    // 处理已选权限
    const checkedValues = Array.isArray(checkedDataRes)
      ? checkedDataRes
      : []
    checkedKeys.value = checkedValues
    originalCheckedKeys.value = [...checkedValues]
    defaultCheckedKeys.value = [...checkedValues]

    // 默认展开所有节点
    expandAllNodes()

    message.success('数据加载成功')
  } catch (error) {
    console.error('加载数据失败:', error)
    message.error('加载权限数据失败')
    treeData.value = []
    checkedKeys.value = []
    originalCheckedKeys.value = []
  } finally {
    loading.value = false
  }
}

// 格式化树数据
const formatTreeData = (data) => {
  if (!Array.isArray(data)) return []

  return data.map(item => {
    const node = {
      ...item,
      title: item.slotTitle || item.title || item.label,
      key: item.value,
      children: item.children ? formatTreeData(item.children) : undefined,
      isLeaf: item.isLeaf || (!item.children || item.children.length === 0)
    }
    return node
  })
}

// 展开所有节点
const expandAllNodes = () => {
  const getAllKeys = (nodes) => {
    let keys = []
    nodes.forEach(node => {
      keys.push(node.value)
      if (node.children && node.children.length > 0) {
        keys = keys.concat(getAllKeys(node.children))
      }
    })
    return keys
  }
  expandedKeys.value = getAllKeys(treeData.value)
}

// 搜索过滤
const filterTreeNode = (node) => {
  if (!searchValue.value) return true

  const title = node.slotTitle || node.title || node.label || ''
  return title.toString().toLowerCase().includes(searchValue.value.toLowerCase())
}

// 树操作
const expandAll = () => {
  expandAllNodes()
}

const collapseAll = () => {
  expandedKeys.value = []
}

const selectAll = () => {
  const getAllLeafKeys = (nodes) => {
    let keys = []
    nodes.forEach(node => {
      // if (node.isLeaf || (!node.children || node.children.length === 0)) {
        keys.push(node.value)
      // }
      if (node.children && node.children.length > 0) {
        keys = keys.concat(getAllLeafKeys(node.children))
      }
    })
    return keys
  }
  checkedKeys.value = getAllLeafKeys(treeData.value)
}

const unselectAll = () => {
  checkedKeys.value = []
}

const enableParentChild = () => {
  parentChildRelation.value = true
  message.info('已启用父子关联模式')
}

const disableParentChild = () => {
  parentChildRelation.value = false
  message.info('已禁用父子关联模式')
}

const handleSearch = () => {
  if (!searchValue.value) {
    expandedKeys.value = []
    return
  }

  // 搜索时展开匹配的节点
  const findAndExpand = (nodes, parentKeys = []) => {
    nodes.forEach(node => {
      const title = node.slotTitle || node.title || node.label || ''
      if (title.toString().toLowerCase().includes(searchValue.value.toLowerCase())) {
        // 展开父级节点
        expandedKeys.value = [...new Set([...expandedKeys.value, ...parentKeys])]
      }
      if (node.children) {
        findAndExpand(node.children, [...parentKeys, node.value])
      }
    })
  }

  const tempExpandedKeys = []
  findAndExpand(treeData.value)
}

// 树事件
const handleTreeCheck = (checkedKeysValue) => {
  console.log('选中的key:', checkedKeysValue,parentChildRelation.value);
  
  checkedKeys.value = parentChildRelation.value ? checkedKeysValue : checkedKeysValue.checked
}

const handleTreeExpand = (expandedKeysValue) => {
  expandedKeys.value = expandedKeysValue
  autoExpandParent.value = false
}


// 抽屉关闭
const handleDrawerClose = () => {
  // 检查是否有未保存的修改
  const hasChanges = JSON.stringify(checkedKeys.value.sort()) !== JSON.stringify(originalCheckedKeys.value.sort())

  if (hasChanges) {
    Modal.confirm({
      title: '确认关闭',
      // icon: <ExclamationCircleOutlined />,
      content: '当前修改尚未保存，确定要关闭吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        handleCancel()
      }
    })
  } else {
    handleCancel()
  }
}

// 操作按钮处理
const handleCancel = () => {
  // 恢复原始选中的key
  checkedKeys.value = [...originalCheckedKeys.value]
  drawerVisible.value = false
  emit('close')
}

const handleSaveOnly = async () => {
  await savePermissions(false)
}

const handleSaveAndClose = async () => {
  await savePermissions(true)
}

// 保存权限
const savePermissions = async (closeAfterSave = false) => {
  if (checkedKeys.value.length === 0) {
    Modal.confirm({
      title: '确认保存',
      // icon: <ExclamationCircleOutlined />,
      content: '当前没有选择任何权限，确定要保存空权限吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await performSave(closeAfterSave)
      }
    })
    return
  }

  await performSave(closeAfterSave)
}

const performSave = async (closeAfterSave) => {
  saving.value = true
  console.log(checkedKeys.value, '保存的key');
  
  try {
    const saveData = {
      roleId: props.roleId,
      permissionIds: checkedKeys.value.join(','),
      lastpermissionIds: defaultCheckedKeys.value.join(',')
    }

    // 调用保存API
    await props.saveApi(saveData)

    // 更新原始选中key
    originalCheckedKeys.value = [...checkedKeys.value]

    // message.success('权限保存成功')
    console.log(originalCheckedKeys.value, '更新后的原始选中key');
    
    emit('save-success', saveData)

    if (closeAfterSave) {
      drawerVisible.value = false
      emit('close')
    }
  } catch (error) {
    console.error('保存失败:', error)
    message.error('保存失败：' + (error.message || '未知错误'))
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.permission-config {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.config-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.tree-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px;
  background: #fafafa;
  border-radius: 6px;
  border: 1px solid #f0f0f0;
}

.toolbar-left {
  display: flex;
  align-items: center;
}

.toolbar-right {
  display: flex;
  align-items: center;
}

.tree-container {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  background: #fff;
  margin-bottom: 16px;
  position: relative;
}

.loading-wrapper,
.empty-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

:deep(.ant-tree) {
  background: transparent;
}

:deep(.ant-tree .ant-tree-node-content-wrapper) {
  padding: 4px 8px;
  border-radius: 4px;
}

:deep(.ant-tree .ant-tree-node-content-wrapper:hover) {
  background-color: #f5f5f5;
}

:deep(.ant-tree .ant-tree-checkbox) {
  margin-top: 0;
  margin-right: 8px;
}

.tree-node-title {
  display: flex;
  align-items: center;
}

.tree-node-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.selected-count {
  padding: 12px 16px;
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 6px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.selected-count span {
  color: #1890ff;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .tree-toolbar {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .toolbar-left,
  .toolbar-right {
    width: 100%;
  }

  .toolbar-left {
    flex-wrap: wrap;
  }
}
</style>