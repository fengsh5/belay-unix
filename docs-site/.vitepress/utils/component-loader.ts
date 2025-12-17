/**
 * 组件加载器
 * 动态加载 Belay-Unix 组件库的组件
 */

// 组件映射：将 uni-app 组件映射到 HTML 元素
export const componentMap: Record<string, string> = {
  'view': 'div',
  'text': 'span',
  'image': 'img',
  'button': 'button',
  'input': 'input',
  'textarea': 'textarea',
  'scroll-view': 'div',
  'swiper': 'div',
  'swiper-item': 'div'
}

/**
 * 转换 uni-app 组件名为 HTML 标签名
 */
export function mapComponentName(tagName: string): string {
  return componentMap[tagName.toLowerCase()] || tagName.toLowerCase()
}

/**
 * 加载组件库组件
 * 在预览环境中，我们需要动态导入组件
 */
export async function loadComponent(componentName: string) {
  try {
    // 尝试从组件库导入
    // 注意：在实际预览环境中，可能需要不同的导入方式
    const module = await import('../../uni_modules/belay-unix/index.js').catch(() => null)
    if (module) {
      return (module as any)[componentName] || null
    }
    return null
  } catch (e) {
    console.warn(`[ComponentLoader] Failed to load component: ${componentName}`, e)
    return null
  }
}

/**
 * 获取所有可用的组件
 */
export function getAvailableComponents() {
  return [
    'BlButton', 'BlInput', 'BlDialog', 'BlPopup', 'BlMessage',
    'BlNotification', 'BlLoading', 'BlForm', 'BlCheckbox', 'BlRadio',
    'BlSwitch', 'BlSlider', 'BlUploader', 'BlTable', 'BlTag',
    'BlCardLayout', 'BlCalendar', 'BlTimeline', 'BlTabs', 'BlMenu',
    'BlPagination', 'BlTabbar', 'BlRow', 'BlCol', 'BlFlex',
    'BlGrid', 'BlSpace', 'BlIcon', 'BlImage', 'BlText', 'BlView'
  ]
}

