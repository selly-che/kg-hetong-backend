<template>
  <a-drawer
    :title="drawerTitle"
    :width="drawerWidth"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="handleClose"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      layout="horizontal"
    >
      <!-- 菜单类型 -->
      <a-form-item label="菜单类型" name="menuType">
        <a-radio-group v-model:value="formState.menuType" @change="handleMenuTypeChange">
          <a-radio :value="MenuType.DIRECTORY">一级菜单</a-radio>
          <a-radio :value="MenuType.MENU">子菜单</a-radio>
          <a-radio :value="MenuType.BUTTON">按钮/权限</a-radio>
        </a-radio-group>
      </a-form-item>

      <!-- 菜单名称 -->
      <a-form-item 
        :label="menuTypeLabel + '名称'" 
        name="name"
        :required="true"
      >
        <a-input
          v-model:value="formState.name"
          :placeholder="`请输入${menuTypeLabel}名称`"
        />
      </a-form-item>

      <!-- 上级菜单（非一级菜单显示） -->
      <a-form-item 
        v-if="formState.menuType !== MenuType.DIRECTORY" 
        label="上级菜单" 
        name="parentId"
        :required="true"
      >
        <a-tree-select
          v-model:value="formState.parentId"
          :tree-data="menuTreeData"
          :placeholder="'请选择父级菜单'"
          :field-names="{
            children: 'children',
            label: 'title',
            value: 'id',
            key: 'key'
          }"
          show-search
          tree-default-expand-all
          allow-clear
        />
      </a-form-item>

      <!-- 菜单路径 -->
      <a-form-item 
        v-if="formState.menuType !== MenuType.BUTTON" 
        label="菜单路径" 
        name="url"
        :required="true"
      >
        <a-input
          v-model:value="formState.url"
          placeholder="请输入菜单路径"
        />
      </a-form-item>

      <!-- 授权标识（仅按钮/权限显示） -->
      <a-form-item 
        v-if="formState.menuType === MenuType.BUTTON" 
        label="授权标识" 
        name="perms"
        :required="true"
      >
        <a-input
          v-model:value="formState.perms"
          placeholder="请输入授权标识, 如: user.list"
        />
      </a-form-item>

      <!-- 授权策略（仅按钮/权限显示） -->
      <a-form-item 
        v-if="formState.menuType === MenuType.BUTTON" 
        label="授权策略" 
        name="permsType"
      >
        <div>
          <div style="margin-bottom: 8px;">
            <a-radio-group v-model:value="formState.permsType">
              <a-radio :value="PermsType.VISIT">可以/可访问(授权后可以/可访问)</a-radio>
            </a-radio-group>
          </div>
          <div>
            <a-checkbox 
              :checked="formState.permsType === PermsType.EDIT"
              @change="handlePermsTypeChange"
            >
              可编辑未授权时禁用
            </a-checkbox>
          </div>
        </div>
      </a-form-item>

      <!-- 前端组件（仅菜单显示） -->
      <a-form-item 
        v-if="formState.menuType === MenuType.MENU" 
        label="前端组件" 
        name="component"
        :required="true"
      >
        <a-input
          v-model:value="formState.component"
          placeholder="请输入前端组件"
        />
      </a-form-item>

      <!-- 默认跳转地址（仅菜单显示） -->
      <a-form-item 
        v-if="formState.menuType === MenuType.MENU" 
        label="默认跳转地址" 
        name="redirect"
      >
        <a-input
          v-model:value="formState.redirect"
          placeholder="请输入路由参数 redirect"
        />
      </a-form-item>

      <!-- 菜单图标（非按钮显示） -->
      <a-form-item 
        v-if="formState.menuType !== MenuType.BUTTON" 
        label="菜单图标" 
        name="icon"
      >
        <div class="icon-selector">
          <a-input
            v-model:value="formState.icon"
            placeholder="点击选择图标"
            readonly
            @click="showIconSelector = true"
          />
          <div v-if="formState.icon" class="icon-preview">
            <component :is="formState.icon" v-if="typeof formState.icon === 'object'" />
            <Icon :type="formState.icon" v-else />
          </div>
        </div>
      </a-form-item>

      <!-- 排序 -->
      <a-form-item label="排序" name="sortNo">
        <a-input-number
          v-model:value="formState.sortNo"
          :min="0"
          style="width: 100%"
          placeholder="请输入排序"
        />
      </a-form-item>

      <!-- 是否路由菜单（仅菜单显示） -->
      <a-form-item 
        v-if="formState.menuType !== MenuType.BUTTON" 
        label="是否路由菜单" 
        name="route"
      >
        <a-switch
          v-model:checked="formState.route"
          checked-children="是"
          un-checked-children="否"
        />
      </a-form-item>

      <!-- 隐藏路由（仅菜单显示） -->
      <a-form-item 
        v-if="formState.menuType !== MenuType.BUTTON && formState.route" 
        label="隐藏路由" 
        name="hidden"
      >
        <a-switch
          v-model:checked="formState.hidden"
          checked-children="是"
          un-checked-children="否"
        />
      </a-form-item>

      <!-- 是否缓存路由（仅菜单显示） -->
      <a-form-item 
        v-if="formState.menuType !== MenuType.BUTTON && formState.route" 
        label="是否缓存路由" 
        name="keepAlive"
      >
        <a-switch
          v-model:checked="formState.keepAlive"
          checked-children="是"
          un-checked-children="否"
        />
      </a-form-item>

      <!-- 聚合路由（仅菜单显示） -->
      <a-form-item 
        v-if="formState.menuType !== MenuType.BUTTON && formState.route" 
        label="聚合路由" 
        name="alwaysShow"
      >
        <a-switch
          v-model:checked="formState.alwaysShow"
          checked-children="是"
          un-checked-children="否"
        />
      </a-form-item>

      <!-- 打开方式（仅菜单显示） -->
      <a-form-item 
        v-if="formState.menuType !== MenuType.BUTTON && formState.route" 
        label="打开方式" 
        name="internalOrExternal"
      >
        <a-radio-group v-model:value="formState.internalOrExternal">
          <a-radio :value="false">内部</a-radio>
          <a-radio :value="true">外部</a-radio>
        </a-radio-group>
      </a-form-item>

      <!-- 状态 -->
      <a-form-item label="状态" name="status">
        <a-radio-group v-model:value="formState.status">
          <a-radio :value="Status.DISABLED">无效</a-radio>
          <a-radio :value="Status.ENABLED">有效</a-radio>
        </a-radio-group>
      </a-form-item>

      <!-- 图标选择器模态框 -->
      <a-modal
        v-model:visible="showIconSelector"
        title="选择图标"
        width="600px"
        :footer="null"
      >
        <IconSelector @select="handleIconSelect" />
      </a-modal>
    </a-form>

    <!-- 抽屉底部按钮 -->
    <div class="drawer-footer">
      <a-button style="margin-right: 8px" @click="handleClose">关闭</a-button>
      <a-button type="primary" @click="handleSubmit">确定</a-button>
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, } from 'vue';
import { FormInstance, message } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { MenuItem, MenuType, PermsType, Status } from './interface/menu';
import IconSelector from './IconSelector.vue';

const props = defineProps<{
  visible: boolean;
  editData?: MenuItem | null;
  menuTreeData: any[];
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'submit', data: any): void;
  (e: 'close'): void;
}>();

const formRef = ref<FormInstance>();
const showIconSelector = ref(false);

// 表单初始状态
const defaultFormState = {
  menuType: MenuType.DIRECTORY,
  name: '',
  parentId: '',
  url: '',
  perms: '',
  permsType: PermsType.VISIT,
  component: '',
  redirect: '',
  icon: '',
  sortNo: 0,
  route: true,
  hidden: false,
  keepAlive: false,
  alwaysShow: false,
  status: Status.ENABLED,
  internalOrExternal: false,
};

const formState = reactive({ ...defaultFormState });

// 根据菜单类型计算标签
const menuTypeLabel = computed(() => {
  switch (formState.menuType) {
    case MenuType.DIRECTORY:
      return '一级菜单';
    case MenuType.MENU:
      return '子菜单';
    case MenuType.BUTTON:
      return '按钮/权限';
    default:
      return '菜单';
  }
});

// 抽屉标题
const drawerTitle = computed(() => {
  return props.editData ? '编辑菜单' : '新增菜单';
});

// 抽屉宽度（根据菜单类型调整）
const drawerWidth = computed(() => {
//   switch (formState.menuType) {
//     case MenuType.DIRECTORY:
//       return '500px';
//     case MenuType.MENU:
//       return '600px';
//     case MenuType.BUTTON:
//       return '500px';
//     default:
//       return '500px';
//   }
  return '700px';
});

// 表单验证规则
const rules = computed<Record<string, Rule[]>>(() => {
  const baseRules: Record<string, Rule[]> = {
    name: [
      { required: true, message: `请输入${menuTypeLabel.value}名称`, trigger: 'blur' },
    ],
  };

  // 添加菜单路径验证
  if (formState.menuType !== MenuType.BUTTON) {
    baseRules.url = [
      { required: true, message: '请输入菜单路径', trigger: 'blur' },
    ];
  }

  // 添加授权标识验证
  if (formState.menuType === MenuType.BUTTON) {
    baseRules.perms = [
      { required: true, message: '请输入授权标识', trigger: 'blur' },
    ];
  }

  // 添加上级菜单验证
  if (formState.menuType !== MenuType.DIRECTORY) {
    baseRules.parentId = [
      { required: true, message: '请选择上级菜单', trigger: 'change' },
    ];
  }

  // 添加前端组件验证
  if (formState.menuType === MenuType.MENU) {
    baseRules.component = [
      { required: true, message: '请输入前端组件', trigger: 'blur' },
    ];
  }

  return baseRules;
});

// 菜单类型变化处理
const handleMenuTypeChange = (value: number) => {
  // 重置相关字段
  if (value === MenuType.DIRECTORY) {
    formState.parentId = '';
  }
  
  if (value === MenuType.BUTTON) {
    formState.url = '';
    formState.component = '';
    formState.redirect = '';
    formState.icon = '';
    formState.route = false;
    formState.hidden = false;
    formState.keepAlive = false;
    formState.alwaysShow = false;
    formState.internalOrExternal = false;
  }
};

// 授权策略变化处理
const handlePermsTypeChange = (e: any) => {
  formState.permsType = e.target.checked ? PermsType.EDIT : PermsType.VISIT;
};

// 图标选择处理
const handleIconSelect = (icon: string) => {
  formState.icon = icon;
  showIconSelector.value = false;
};

// 关闭抽屉
const handleClose = () => {
  formRef.value?.resetFields();
  emit('update:visible', false);
  emit('close');
};

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value?.validate();
    
    const formData = {
      ...formState,
      id: props.editData?.id,
      title: formState.name,
      isLeaf: formState.menuType === MenuType.BUTTON,
      leaf: formState.menuType === MenuType.BUTTON,
      delFlag: 0,
    };

    // 发送数据
    emit('submit', formData);
    handleClose();
    
    message.success(props.editData ? '编辑成功' : '新增成功');
  } catch (error) {
    console.error('表单验证失败:', error);
  }
};

// 监听编辑数据
watch(() => props.editData, (newVal) => {
  if (newVal) {
    Object.assign(formState, {
      menuType: newVal.menuType,
      name: newVal.name,
      parentId: newVal.parentId,
      url: newVal.url,
      perms: newVal.perms || '',
      permsType: newVal.permsType || PermsType.VISIT,
      component: newVal.component || '',
      redirect: newVal.redirect || '',
      icon: newVal.icon || '',
      sortNo: newVal.sortNo || 0,
      route: newVal.route !== undefined ? newVal.route : true,
      hidden: newVal.hidden || false,
      keepAlive: newVal.keepAlive || false,
      alwaysShow: newVal.alwaysShow || false,
      status: newVal.status !== undefined ? newVal.status : Status.ENABLED,
      internalOrExternal: newVal.internalOrExternal || false,
    });
  } else {
    Object.assign(formState, defaultFormState);
  }
}, { immediate: true });

// 监听可见性变化
watch(() => props.visible, (newVal) => {
  if (!newVal) {
    formRef.value?.resetFields();
  }
});
</script>

<style scoped>
.icon-selector {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-preview {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.drawer-footer {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 10px 16px;
  background: #fff;
  text-align: right;
  z-index: 1;
}

:deep(.ant-form-item-label) {
  font-weight: 500;
}

:deep(.ant-radio-group) {
  width: 100%;
}
</style>