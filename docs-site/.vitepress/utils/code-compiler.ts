/**
 * 代码编译器
 * 将 Vue 单文件组件代码编译为可执行的组件
 */

import { compile, h, createApp, Component } from 'vue'
import { uni } from './uni-mock'
import { mapComponentName } from './component-loader'

/**
 * 解析 Vue 单文件组件代码
 */
export function parseVueCode(code: string): {
  template: string
  script: string
  style: string
} {
  const templateMatch = code.match(/<template>([\s\S]*?)<\/template>/)
  const scriptMatch = code.match(/<script[^>]*>([\s\S]*?)<\/script>/)
  const styleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/)
  
  return {
    template: templateMatch ? templateMatch[1].trim() : '',
    script: scriptMatch ? scriptMatch[1].trim() : '',
    style: styleMatch ? styleMatch[1].trim() : ''
  }
}

/**
 * 转换模板中的 uni-app 组件
 */
function transformTemplate(template: string): string {
  // 将 uni-app 组件转换为 HTML 标签
  let transformed = template
  
  // 转换 view -> div
  transformed = transformed.replace(/<view\s+/g, '<div ')
  transformed = transformed.replace(/<\/view>/g, '</div>')
  
  // 转换 text -> span
  transformed = transformed.replace(/<text\s+/g, '<span ')
  transformed = transformed.replace(/<\/text>/g, '</span>')
  
  // 转换 image -> img
  transformed = transformed.replace(/<image\s+/g, '<img ')
  transformed = transformed.replace(/<\/image>/g, '')
  
  // 转换 bl- 组件（保持原样，因为它们是自定义组件）
  // 这些组件需要在运行时动态加载
  
  return transformed
}

/**
 * 创建组件实例
 */
export function createComponentInstance(code: string): Component {
  const { template, script, style } = parseVueCode(code)
  
  // 转换模板
  const transformedTemplate = transformTemplate(template)
  
  // 执行脚本获取组件选项
  let componentOptions: any = {}
  
  try {
    // 创建一个函数来执行脚本
    const scriptFn = new Function(
      'uni',
      'h',
      'createApp',
      `
      ${script}
      return typeof exports !== 'undefined' ? exports.default : typeof module !== 'undefined' && module.exports ? module.exports.default : undefined
      `
    )
    
    const result = scriptFn(uni, h, createApp)
    if (result) {
      componentOptions = result
    } else {
      // 尝试直接执行
      const evalFn = new Function(`
        const exports = {}
        const module = { exports }
        ${script}
        return exports.default || module.exports.default || {}
      `)
      componentOptions = evalFn()
    }
  } catch (e) {
    console.error('[CodeCompiler] Script execution error:', e)
    componentOptions = {
      data() {
        return {}
      }
    }
  }
  
  // 如果没有 template，使用转换后的模板
  if (!componentOptions.template && transformedTemplate) {
    componentOptions.template = transformedTemplate
  }
  
  // 添加样式
  if (style) {
    if (!componentOptions.style) {
      componentOptions.style = []
    }
    if (Array.isArray(componentOptions.style)) {
      componentOptions.style.push(style)
    }
  }
  
  return componentOptions
}

/**
 * 编译并渲染组件
 */
export function compileAndRender(code: string, container: HTMLElement) {
  try {
    const component = createComponentInstance(code)
    const app = createApp(component)
    
    // 挂载到容器
    app.mount(container)
    
    return app
  } catch (e) {
    console.error('[CodeCompiler] Compile error:', e)
    container.innerHTML = `
      <div style="padding: 20px; color: #f56c6c;">
        <h3>编译错误</h3>
        <pre>${String(e)}</pre>
      </div>
    `
    return null
  }
}

