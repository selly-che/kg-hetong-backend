import { App, DirectiveBinding } from 'vue'

interface PermissionItem {
    action: string
    describe: string
    type: string
    status: string
}

/**
 * 权限指令 v-permission
 * 根据按钮权限数组中的 action 字段进行权限控制
 * 
 * 使用方式：
 * 1. v-permission="'user:add'" - 单个权限
 * 2. v-permission="['user:add', 'user:edit']" - 满足任一权限
 */
const permissionDirective = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        const { value } = binding

        if (!value) {
            console.warn('请设置权限标签值')
            return
        }

        // 获取用户拥有的权限列表（action 数组）
        const userPermissions = getUserPermissions()
        console.log(userPermissions, '用户权限列表');

        // 判断是否有权限
        let hasPermission = false

        if (typeof value === 'string') {
            // 单个权限字符串
            hasPermission = userPermissions.includes(value)
        } else if (Array.isArray(value)) {
            // 数组形式 - 满足任一权限即可
            hasPermission = value.some((perm: string) => userPermissions.includes(perm))
        }
        console.log(hasPermission, '是否有权限');

        // 如果没有权限，移除元素
        if (!hasPermission) {
            el.parentNode?.removeChild(el)
        }
    },

    // 当绑定的值变化时重新检查权限
    updated(el: HTMLElement, binding: DirectiveBinding) {
        const { value, oldValue } = binding

        if (JSON.stringify(value) !== JSON.stringify(oldValue)) {
            const userPermissions = getUserPermissions()
            let hasPermission = false

            if (typeof value === 'string') {
                hasPermission = userPermissions.includes(value)
            } else if (Array.isArray(value)) {
                hasPermission = value.some((perm: string) => userPermissions.includes(perm))
            }

            if (!hasPermission) {
                el.style.display = 'none'
            } else {
                el.style.display = ''
            }
        }
    }
}

/**
 * 从权限数组中提取所有 action 标识
 */
function extractActions(permissionList: PermissionItem[]): string[] {
    if (!permissionList || !Array.isArray(permissionList)) {
        return []
    }

    // 过滤出状态为启用（status === "1"）的权限，提取 action 字段
    return permissionList
        .filter(item => item.action)
        .map(item => item.action)
}

/**
 * 获取用户权限列表（action 数组）
 * 从 localStorage 中获取按钮权限数据
 */
function getUserPermissions(): string[] {
    try {
        // 从 localStorage 获取按钮权限数组
        const permissionsStr = localStorage.getItem('auths')

        if (permissionsStr) {
            const permissionList: PermissionItem[] = JSON.parse(permissionsStr)
            console.log(permissionList, '权限列表');
            return extractActions(permissionList)
        }
    } catch (error) {
        console.error('获取用户权限失败:', error)
    }

    return []
}

/**
 * 工具函数：设置用户按钮权限
 * 在登录成功后调用此函数保存权限信息
 * @param permissionList 按钮权限数组
 */
export function setUserPermissions(permissionList: PermissionItem[]) {
    try {
        // 保存完整的按钮权限数据
        localStorage.setItem('auths', JSON.stringify(permissionList))

        // 提取并保存 action 列表
        const actions = extractActions(permissionList)
        localStorage.setItem('userActions', JSON.stringify(actions))

        console.log('用户按钮权限已更新:', actions)
    } catch (error) {
        console.error('保存用户权限失败:', error)
    }
}

/**
 * 工具函数：检查是否有指定权限
 * 可在 JavaScript 代码中使用
 * @param permission 权限标识或权限数组
 */
export function hasPermission(permission: string | string[]): boolean {
    const userPermissions = getUserPermissions()

    if (typeof permission === 'string') {
        return userPermissions.includes(permission)
    } else if (Array.isArray(permission)) {
        return permission.some(perm => userPermissions.includes(perm))
    }

    return false
}

/**
 * 工具函数：获取所有可用权限列表
 */
export function getAllPermissions(): string[] {
    return getUserPermissions()
}

export default {
    install(app: App) {
        app.directive('permission', permissionDirective)
    }
}