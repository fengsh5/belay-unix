/**
 * VitePress 应用增强
 * 
 * VitePress 会自动注册 .vitepress/components 目录下的组件
 * 组件可以直接在 Markdown 中使用
 */

import type { App } from 'vue'
import { uni } from './utils/uni-mock'

// 确保 uni 对象在全局可用
if (typeof window !== 'undefined') {
  (window as any).uni = uni
}

export default function enhanceApp({ app }: { app: App }) {
  // VitePress 会自动注册 .vitepress/components 目录下的组件
  // 组件可以直接在 Markdown 中使用，无需手动注册
  
  // 在全局属性中提供 uni 对象
  app.config.globalProperties.$uni = uni
  
  // 提供 uni 对象给所有组件
  app.provide('uni', uni)
}

