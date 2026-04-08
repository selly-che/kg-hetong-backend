import { DirectiveBinding } from 'vue';

/**
 * 权限控制指令v-permission="['user:add', 'user:edit']"
 */
export const permission = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    // 从 localStorage 中获取当前用户的权限列表
    // 如果不存在，则默认不显示该元素
    if (!localStorage.getItem('userPermissions')) {
      el.parentNode && el.parentNode.removeChild(el);
      return;
    }
    const permissions = JSON.parse(localStorage.getItem('userPermissions') || '[]');

    if (value && value instanceof Array && value.length > 0) {
      const hasPermission = permissions.some((perm: string) => value.includes(perm));
      
      if (!hasPermission) {
        // 如果没有权限，则移除该元素
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`need permissions! Like v-permission="['user:add', 'user:edit']"`);
    }
  }
};
