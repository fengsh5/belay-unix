/**
 * VitePress 主题配置
 * 使用主题扩展方式注册组件
 */

import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import { h } from 'vue'
import { uni } from '../utils/uni-mock'

// 确保 uni 对象在全局可用
if (typeof window !== 'undefined') {
  (window as any).uni = uni
}

// 创建 uni-app 标签的适配组件
const UniView = {
  name: 'view',
  setup(props: any, { slots }: any) {
    return () => h('div', props, slots)
  }
}

const UniText = {
  name: 'text',
  setup(props: any, { slots }: any) {
    return () => h('span', props, slots)
  }
}

const UniImage = {
  name: 'image',
  setup(props: any) {
    return () => h('img', props)
  }
}

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }: EnhanceAppContext) {
    // 注册 uni-app 标签适配组件
    app.component('view', UniView)
    app.component('text', UniText)
    app.component('image', UniImage)
    
    // 动态导入并注册组件
    try {
      const [
        { default: ExamplePreview },
        { default: CodeEditor },
        { default: PreviewContainer }
      ] = await Promise.all([
        import('../components/ExamplePreview.vue'),
        import('../components/CodeEditor.vue'),
        import('../components/PreviewContainer.vue')
      ])
      
      // 注册全局组件
      app.component('ExamplePreview', ExamplePreview)
      app.component('CodeEditor', CodeEditor)
      app.component('PreviewContainer', PreviewContainer)
      
      // 尝试导入并注册组件库组件
      // 注意：组件库专为 uni-app 设计，在浏览器环境中可能无法完全正常工作
      // 这里尝试按需导入 .vue 文件，如果失败则使用降级方案（HTML 转换）
      try {
        const components = [
          { name: 'BlButton', path: 'bl-button' },
          { name: 'BlInput', path: 'bl-input' },
          { name: 'BlText', path: 'bl-text' },
          { name: 'BlView', path: 'bl-view' },
          { name: 'BlImage', path: 'bl-image' },
          { name: 'BlIcon', path: 'bl-icon' },
          { name: 'BlCell', path: 'bl-cell' },
          { name: 'BlTag', path: 'bl-tag' },
          { name: 'BlBadge', path: 'bl-badge' },
          { name: 'BlAvatar', path: 'bl-avatar' },
          { name: 'BlDivider', path: 'bl-divider' },
          { name: 'BlFlex', path: 'bl-flex' },
          { name: 'BlGap', path: 'bl-gap' },
          { name: 'BlSpace', path: 'bl-space' },
          { name: 'BlRow', path: 'bl-row' },
          { name: 'BlCol', path: 'bl-col' }
        ]
        
        let loadedCount = 0
        for (const comp of components) {
          try {
            // 尝试从组件库导入单个组件的 .vue 文件
            const compPath = `../../../uni_modules/belay-unix/components/${comp.path}/index.vue`
            // @ts-ignore - 动态导入路径，Vite 无法静态分析
            const compModule = await import(/* @vite-ignore */ compPath).catch(() => null)
            if (compModule && compModule.default) {
              app.component(comp.name, compModule.default)
              // 同时注册 kebab-case 名称
              const kebabName = comp.path
              app.component(kebabName, compModule.default)
              loadedCount++
            }
          } catch (e) {
            // 忽略单个组件导入失败
            console.debug(`[Theme] Failed to load ${comp.name}:`, e)
          }
        }
        
        if (loadedCount > 0) {
          console.log(`[Theme] Successfully loaded ${loadedCount} BelayUnix components`)
        } else {
          console.warn('[Theme] No BelayUnix components loaded, using fallback HTML rendering')
        }
      } catch (error) {
        console.warn('[Theme] Failed to load BelayUnix components, using fallback HTML rendering:', error)
      }
    } catch (error) {
      console.error('[Theme] Failed to load components:', error)
    }
    
    // 在全局属性中提供 uni 对象
    app.config.globalProperties.$uni = uni
    
    // 提供 uni 对象给所有组件
    app.provide('uni', uni)
  }
}

