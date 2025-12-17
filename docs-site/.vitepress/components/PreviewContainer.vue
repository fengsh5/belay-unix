<template>
  <div class="preview-container-wrapper">
    <div class="preview-header">
      <span class="preview-title">预览效果</span>
      <div class="preview-actions">
        <button 
          class="action-btn" 
          :class="{ active: viewMode === 'desktop' }"
          @click="viewMode = 'desktop'"
          title="桌面视图"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1 3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h3v-2H2V4h12v6h-2v2h3a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H1z"/>
            <path d="M5 10h6v6H5v-6z"/>
          </svg>
        </button>
        <button 
          class="action-btn" 
          :class="{ active: viewMode === 'mobile' }"
          @click="viewMode = 'mobile'"
          title="移动视图"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4zm0 1h8v12H4V2z"/>
            <path d="M7 12h2v1H7v-1z"/>
          </svg>
        </button>
        <button class="action-btn" @click="handleRefresh" title="刷新预览">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
          </svg>
        </button>
      </div>
    </div>
    <div 
      class="preview-container" 
      :class="[`view-${viewMode}`]"
    >
      <div class="preview-content" ref="previewRef">
        <component v-if="PreviewComponent" :is="PreviewComponent" :key="componentKey" />
        <div v-else-if="errorMessage" class="error-placeholder">
          <p style="color: #f56c6c; font-weight: bold;">预览加载失败</p>
          <p style="color: #909399; font-size: 12px; margin-top: 8px;">{{ errorMessage }}</p>
          <details style="margin-top: 12px; text-align: left;">
            <summary style="cursor: pointer; color: #409eff;">查看代码</summary>
            <pre style="margin-top: 8px; padding: 12px; background: #f5f7fa; border-radius: 4px; overflow: auto; font-size: 12px;">{{ props.code }}</pre>
          </details>
        </div>
        <div v-else class="loading-placeholder">
          <p>正在加载组件...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, getCurrentInstance, h, createApp, markRaw } from 'vue'
import { compile } from 'vue'

const props = defineProps<{
  code: string
}>()

const viewMode = ref<'desktop' | 'mobile'>('desktop')
const previewRef = ref<HTMLElement>()
const PreviewComponent = ref<any>(null)
const errorMessage = ref<string>('')
const componentKey = ref(0)
const instance = getCurrentInstance()
const app = instance?.appContext.app

// 组件库组件缓存
let componentCache: Record<string, any> = {}

// 动态加载组件库组件
async function loadComponent(componentName: string): Promise<any> {
  if (componentCache[componentName]) {
    return componentCache[componentName]
  }
  
  try {
    // 将组件名转换为路径（BlButton -> bl-button）
    const kebabName = componentName
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '')
    
    // @ts-ignore - 动态导入路径
    const module = await import(`../../../uni_modules/belay-unix/components/${kebabName}/index.vue`)
    if (module && module.default) {
      componentCache[componentName] = module.default
      return module.default
    }
  } catch (e) {
    console.debug(`[PreviewContainer] Failed to load ${componentName}:`, e)
  }
  
  return null
}

// 解析代码并创建组件
async function createPreviewComponent() {
  errorMessage.value = ''
  
  if (!app) {
    const msg = 'Vue app instance not available'
    console.warn('[PreviewContainer]', msg)
    errorMessage.value = msg
    return
  }
  
  // 等待 DOM 准备好
  await new Promise(resolve => setTimeout(resolve, 0))
  
  if (!previewRef.value) {
    const msg = 'previewRef not available'
    console.warn('[PreviewContainer]', msg)
    errorMessage.value = msg
    return
  }
  
  try {
    if (!props.code || typeof props.code !== 'string') {
      const msg = 'Code prop is empty or not a string'
      console.warn('[PreviewContainer]', msg, 'code:', props.code)
      errorMessage.value = msg
      return
    }
    
    console.log('[PreviewContainer] Creating preview component, code length:', props.code.length)
    console.log('[PreviewContainer] Code preview:', props.code.substring(0, 200))
    
    // 处理转义的标签
    const templateEnd = '<' + '/template>'
    const scriptEnd = '<' + '/script>'
    const styleEnd = '<' + '/style>'
    
    let processedCode = props.code
      .replace(/<\\\/template>/g, templateEnd)
      .replace(/<\\\/script>/g, scriptEnd)
      .replace(/<\\\/style>/g, styleEnd)
    
    // 提取 template 内容
    const templateRegex = new RegExp('<template>([\\s\\S]*?)' + templateEnd)
    const templateMatch = processedCode.match(templateRegex)
    if (!templateMatch) {
      const msg = 'No template found in code'
      console.warn('[PreviewContainer]', msg)
      errorMessage.value = msg
      return
    }
    
    let template = templateMatch[1].trim()
    
    // 提取 script 内容
    const scriptRegex = new RegExp('<script[^>]*>([\\s\\S]*?)' + scriptEnd)
    const scriptMatch = processedCode.match(scriptRegex)
    
    // 提取 style 内容
    const styleRegex = new RegExp('<style[^>]*>([\\s\\S]*?)' + styleEnd)
    const styleMatch = processedCode.match(styleRegex)
    
    // 注意：不再转换 uni-app 标签，而是使用适配组件
    // 这样组件库的组件可以正常使用 <view>、<text>、<image> 等标签
    
    // 提取所有使用的 bl- 组件
    const componentMatches = template.matchAll(/<bl-([a-z-]+)(\s|>)/g)
    const componentNames = new Set<string>()
    for (const match of componentMatches) {
      const kebabName = `bl-${match[1]}`
      // 转换为 PascalCase（bl-button -> BlButton）
      const pascalName = kebabName
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')
      componentNames.add(pascalName)
    }
    
    console.log('[PreviewContainer] Found components:', Array.from(componentNames))
    
    // 加载所有需要的组件
    const components: Record<string, any> = {}
    for (const compName of componentNames) {
      console.log(`[PreviewContainer] Loading component: ${compName}`)
      const comp = await loadComponent(compName)
      if (comp) {
        // 注册为 kebab-case 和 PascalCase
        const kebabName = compName
          .replace(/([A-Z])/g, '-$1')
          .toLowerCase()
          .replace(/^-/, '')
        components[kebabName] = comp
        components[compName] = comp
        console.log(`[PreviewContainer] Successfully loaded ${compName} as ${kebabName}`)
      } else {
        console.warn(`[PreviewContainer] Failed to load ${compName}`)
      }
    }
    
    console.log('[PreviewContainer] Loaded components:', Object.keys(components))
    
    // 创建 uni-app 标签适配组件（用于动态组件）
    const uniView = {
      name: 'view',
      setup(_props: any, { slots }: any) {
        return () => h('div', _props, slots)
      }
    }
    
    const uniText = {
      name: 'text',
      setup(_props: any, { slots }: any) {
        return () => h('span', _props, slots)
      }
    }
    
    const uniImage = {
      name: 'image',
      setup(_props: any) {
        return () => h('img', _props)
      }
    }
    
    // 解析 script 内容（在 setup 外部）
    let setupData: any = {}
    if (scriptMatch) {
      try {
        const scriptContent = scriptMatch[1].trim()
        console.log('[PreviewContainer] Script content:', scriptContent.substring(0, 100))
        // 尝试提取 data() 函数
        const dataMatch = scriptContent.match(/data\s*\(\)\s*\{[^}]*return\s*\{([^}]*)\}/s)
        if (dataMatch) {
          // 简单的数据提取
          const dataProps: any = {}
          const propMatches = dataMatch[1].matchAll(/(\w+)\s*:\s*['"]([^'"]+)['"]/g)
          for (const match of propMatches) {
            dataProps[match[1]] = match[2]
          }
          setupData = dataProps
          console.log('[PreviewContainer] Extracted data:', setupData)
        }
      } catch (e) {
        console.warn('[PreviewContainer] Failed to parse script:', e)
      }
    }
    
    // 创建组件选项
    const componentOptions: any = {
      components: {
        ...components,
        // 注册 uni-app 标签适配组件
        'view': uniView,
        'text': uniText,
        'image': uniImage
      },
      setup() {
        return setupData
      }
    }
    
    // 编译模板
    try {
      const templateWithWrapper = `<div>${template}</div>`
      console.log('[PreviewContainer] Compiling template:', templateWithWrapper.substring(0, 200))
      console.log('[PreviewContainer] Available components:', Object.keys(componentOptions.components))
      
      const renderFn = compile(templateWithWrapper)
      componentOptions.render = renderFn
      console.log('[PreviewContainer] Template compiled successfully, render function type:', typeof renderFn)
    } catch (e) {
      const msg = `Template compilation failed: ${e instanceof Error ? e.message : String(e)}`
      console.error('[PreviewContainer]', msg)
      console.error('[PreviewContainer] Template was:', template)
      if (e instanceof Error && e.stack) {
        console.error('[PreviewContainer] Stack trace:', e.stack)
      }
      errorMessage.value = msg
      return
    }
    
    // 添加样式
    if (styleMatch && previewRef.value) {
      const styleContent = styleMatch[1].trim()
      // 移除旧的样式元素
      const oldStyle = previewRef.value.querySelector('style[data-preview-style]')
      if (oldStyle) {
        oldStyle.remove()
      }
      // 创建新的样式元素
      const styleElement = document.createElement('style')
      styleElement.setAttribute('data-preview-style', 'true')
      styleElement.textContent = styleContent
      previewRef.value.appendChild(styleElement)
    }
    
    PreviewComponent.value = markRaw(componentOptions)
    componentKey.value++ // 强制重新渲染
    console.log('[PreviewContainer] Preview component created successfully')
    console.log('[PreviewContainer] PreviewComponent value:', PreviewComponent.value)
    console.log('[PreviewContainer] Component key:', componentKey.value)
  } catch (error) {
    const msg = `Failed to create preview: ${error instanceof Error ? error.message : String(error)}`
    console.error('[PreviewContainer]', msg)
    console.error('[PreviewContainer] Error stack:', error instanceof Error ? error.stack : '')
    errorMessage.value = msg
  }
}

// 监听 code 变化
watch(() => props.code, () => {
  // 清理旧的样式
  if (previewRef.value) {
    const oldStyle = previewRef.value.querySelector('style[data-preview-style]')
    if (oldStyle) {
      oldStyle.remove()
    }
  }
  PreviewComponent.value = null
  errorMessage.value = ''
  createPreviewComponent()
}, { immediate: false })

onMounted(() => {
  console.log('[PreviewContainer] ========== Component mounted ==========')
  console.log('[PreviewContainer] Code prop exists:', !!props.code)
  console.log('[PreviewContainer] Code prop type:', typeof props.code)
  console.log('[PreviewContainer] Code prop length:', props.code?.length || 0)
  console.log('[PreviewContainer] Code preview:', props.code?.substring(0, 200))
  console.log('[PreviewContainer] previewRef exists:', !!previewRef.value)
  console.log('[PreviewContainer] app exists:', !!app)
  console.log('[PreviewContainer] ========================================')
  
  // 使用 nextTick 确保 DOM 已准备好
  setTimeout(() => {
    console.log('[PreviewContainer] Starting createPreviewComponent after delay')
    createPreviewComponent()
  }, 100)
})

const handleRefresh = () => {
  PreviewComponent.value = null
  createPreviewComponent()
}

defineExpose({
  refresh: handleRefresh
})
</script>

<style scoped>
.preview-container-wrapper {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.preview-title {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.preview-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.action-btn:hover {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.action-btn.active {
  background: var(--vp-c-brand);
  color: white;
}

.preview-container {
  flex: 1;
  min-height: 200px;
  background: var(--vp-c-bg);
  overflow: auto;
}

.preview-container.view-desktop {
  padding: 20px;
}

.preview-container.view-mobile {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #f5f5f5;
}

.preview-container.view-mobile .preview-content {
  width: 375px;
  max-width: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 300px;
  padding: 20px;
}

.preview-content {
  min-height: 100px;
}

.loading-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.error-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 20px;
  text-align: center;
}

/* 按钮基础样式 */
:deep(.bl-btn) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  margin: 4px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  color: #606266;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  transition: all 0.2s;
  box-sizing: border-box;
  font-family: inherit;
}

:deep(.bl-btn:hover) {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

/* Primary 按钮 */
:deep(.bl-btn-primary) {
  background: #409eff;
  color: #fff;
  border-color: #409eff;
}

:deep(.bl-btn-primary:hover) {
  background: #66b1ff;
  border-color: #66b1ff;
}

/* Success 按钮 */
:deep(.bl-btn-success) {
  background: #67c23a;
  color: #fff;
  border-color: #67c23a;
}

:deep(.bl-btn-success:hover) {
  background: #85ce61;
  border-color: #85ce61;
}

/* Warning 按钮 */
:deep(.bl-btn-warning) {
  background: #e6a23c;
  color: #fff;
  border-color: #e6a23c;
}

:deep(.bl-btn-warning:hover) {
  background: #ebb563;
  border-color: #ebb563;
}

/* Danger 按钮 */
:deep(.bl-btn-danger) {
  background: #f56c6c;
  color: #fff;
  border-color: #f56c6c;
}

:deep(.bl-btn-danger:hover) {
  background: #f78989;
  border-color: #f78989;
}

/* Info 按钮 */
:deep(.bl-btn-info) {
  background: #909399;
  color: #fff;
  border-color: #909399;
}

:deep(.bl-btn-info:hover) {
  background: #a6a9ad;
  border-color: #a6a9ad;
}

/* Plain 样式 */
:deep(.bl-btn-plain) {
  background: transparent;
}

:deep(.bl-btn-primary.bl-btn-plain) {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
}

:deep(.bl-btn-success.bl-btn-plain) {
  color: #67c23a;
  background: #f0f9eb;
  border-color: #c2e7b0;
}

:deep(.bl-btn-warning.bl-btn-plain) {
  color: #e6a23c;
  background: #fdf6ec;
  border-color: #f5dab1;
}

:deep(.bl-btn-danger.bl-btn-plain) {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
}

/* Disabled 样式 */
:deep(.bl-btn-disabled),
:deep(.bl-btn[disabled]) {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Round 样式 */
:deep(.bl-btn-round) {
  border-radius: 20px;
}

/* Size 样式 */
:deep(.bl-btn-mini) {
  padding: 5px 10px;
  font-size: 12px;
}

:deep(.bl-btn-small) {
  padding: 7px 14px;
  font-size: 13px;
}

:deep(.bl-btn-large) {
  padding: 14px 28px;
  font-size: 16px;
}

/* Loading 样式 */
:deep(.bl-btn-loading) {
  position: relative;
  pointer-events: none;
}

:deep(.bl-btn-loading::before) {
  content: '';
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 6px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: btn-spin 0.8s linear infinite;
}

@keyframes btn-spin {
  to { transform: rotate(360deg); }
}

/* 按钮组容器样式 */
:deep(.button-group),
:deep([class*="button"]),
:deep(.preview-content > div) {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

/* 输入框基础样式 */
:deep(.bl-input) {
  display: inline-block;
  width: 100%;
  max-width: 300px;
  padding: 8px 12px;
  margin: 4px 0;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  color: #606266;
  font-size: 14px;
  line-height: 1.5;
  box-sizing: border-box;
  transition: all 0.2s;
}

:deep(.bl-input:focus) {
  outline: none;
  border-color: #409eff;
}

:deep(.bl-input:hover:not(:disabled):not([readonly])) {
  border-color: #c0c4cc;
}

:deep(.bl-input-disabled),
:deep(.bl-input[disabled]) {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}

:deep(.bl-input-readonly),
:deep(.bl-input[readonly]) {
  background-color: #f5f7fa;
  cursor: default;
}

:deep(.bl-input[type="password"]) {
  font-family: monospace;
}

/* 输入框容器样式 */
:deep(.preview-content > div) {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

:deep(.preview-content > div > .bl-input) {
  width: 100%;
  max-width: 100%;
}
</style>
