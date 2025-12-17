#!/usr/bin/env node

/**
 * 增强组件文档示例
 * 为所有组件文档添加丰富的交互式使用示例，并将示例部分移到 Props 前面
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const componentsDir = path.join(__dirname, '../../uni_modules/belay-unix/components')
const docsDir = path.join(__dirname, '../components')

// 解析 Props 表格
function parseProps(content) {
  const props = []
  const propsTableRegex = /## 📋 Props\s*\n\s*\|[^\n]+\|\s*\n\s*\|[^\n]+\|\s*\n((?:\|[^\n]+\|\s*\n?)+)/g
  const match = propsTableRegex.exec(content)
  
  if (match) {
    const rows = match[1].trim().split('\n')
    for (const row of rows) {
      const cells = row.split('|').map(c => c.trim()).filter(c => c)
      if (cells.length >= 4) {
        const name = cells[0].replace(/`/g, '')
        const type = cells[2].replace(/`/g, '')
        const defaultValue = cells[3]
        props.push({ name, type, defaultValue })
      }
    }
  }
  
  return props
}

// 解析 Events 表格
function parseEvents(content) {
  const events = []
  const eventsTableRegex = /## 📡 Events\s*\n\s*\|[^\n]+\|\s*\n\s*\|[^\n]+\|\s*\n((?:\|[^\n]+\|\s*\n?)+)/g
  const match = eventsTableRegex.exec(content)
  
  if (match) {
    const rows = match[1].trim().split('\n')
    for (const row of rows) {
      const cells = row.split('|').map(c => c.trim()).filter(c => c)
      if (cells.length >= 2) {
        events.push({ name: cells[0] })
      }
    }
  }
  
  return events
}

// 从 README.md 中提取示例
function extractExamplesFromReadme(readmePath) {
  if (!fs.existsSync(readmePath)) {
    return []
  }
  
  const content = fs.readFileSync(readmePath, 'utf-8')
  const examples = []
  
  // 提取代码块
  const codeBlockRegex = /```vue\n([\s\S]*?)```/g
  const headingRegex = /^###\s+(.+)$/gm
  
  // 先提取所有标题
  const headings = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      index: match.index,
      title: match[1].trim()
    })
  }
  
  // 提取代码块
  while ((match = codeBlockRegex.exec(content)) !== null) {
    const code = match[1].trim()
    const codeIndex = match.index
    
    // 找到最近的标题
    let title = '基础用法'
    for (let i = headings.length - 1; i >= 0; i--) {
      if (headings[i].index < codeIndex) {
        title = headings[i].title
        break
      }
    }
    
    // 只提取包含组件的代码块
    if (code.includes('<bl-') || code.includes('<Bl')) {
      examples.push({ title, code })
    }
  }
  
  return examples
}

// 根据 Props 生成示例代码
function generateExamplesFromProps(componentName, props, events) {
  const examples = []
  const componentTag = componentName.replace('bl-', 'bl-')
  
  // 基础用法
  examples.push({
    title: '基础用法',
    code: `<template>
  <view>
    <${componentTag}>${getComponentDisplayName(componentName)}</${componentTag}>
  </view>
<\/template>`
  })
  
  // 查找 type 属性
  const typeProp = props.find(p => p.name === 'type' && p.type.includes('|'))
  if (typeProp) {
    const types = extractTypesFromProp(typeProp.type)
    if (types.length > 0) {
      const typesCode = types.slice(0, 4).map(t => {
        const value = t.replace(/'/g, '').replace(/"/g, '')
        return `    <${componentTag} type="${value}">${getTypeLabel(value)}</${componentTag}>`
      }).join('\n')
      
      examples.push({
        title: '不同类型',
        code: `<template>
  <view class="group">
${typesCode}
  </view>
<\/template>

<style>
.group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
<\/style>`
      })
    }
  }
  
  // 查找 size 属性
  const sizeProp = props.find(p => p.name === 'size' && p.type.includes('|'))
  if (sizeProp) {
    const sizes = extractTypesFromProp(sizeProp.type)
    if (sizes.length > 0) {
      const sizesCode = sizes.slice(0, 3).map(s => {
        const value = s.replace(/'/g, '').replace(/"/g, '')
        return `    <${componentTag} size="${value}">${getSizeLabel(value)}</${componentTag}>`
      }).join('\n')
      
      examples.push({
        title: '不同尺寸',
        code: `<template>
  <view class="group">
${sizesCode}
  </view>
<\/template>

<style>
.group {
  display: flex;
  gap: 12px;
  align-items: center;
}
<\/style>`
      })
    }
  }
  
  // 查找 disabled 属性
  const disabledProp = props.find(p => p.name === 'disabled' || p.name === 'readonly')
  if (disabledProp) {
    examples.push({
      title: '禁用状态',
      code: `<template>
  <view>
    <${componentTag} ${disabledProp.name}>禁用状态</${componentTag}>
  </view>
<\/template>`
    })
  }
  
  // 查找 v-model 相关的属性（表单组件）
  const valueProp = props.find(p => p.name === 'value' || p.name === 'modelValue')
  if (valueProp && events.some(e => e.name === 'input' || e.name === 'update:modelValue')) {
    examples.push({
      title: '双向绑定',
      code: `<template>
  <view style="padding: 20px;">
    <${componentTag} v-model="value" placeholder="请输入内容"></${componentTag}>
    <text style="margin-top: 10px; display: block;">输入的值：{{ value }}</text>
  </view>
<\/template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  }
}
<\/script>`
    })
  }
  
  // 查找 click 事件
  const clickEvent = events.find(e => e.name === 'click' || e.name === 'onClick')
  if (clickEvent) {
    examples.push({
      title: '点击事件',
      code: `<template>
  <view>
    <${componentTag} @click="handleClick">点击我</${componentTag}>
  </view>
<\/template>

<script>
export default {
  methods: {
    handleClick() {
      uni.showToast({
        title: '${getComponentDisplayName(componentName)}被点击',
        icon: 'none'
      })
    }
  }
}
<\/script>`
    })
  }
  
  return examples
}

// 从类型字符串中提取类型值
function extractTypesFromProp(typeStr) {
  const types = []
  // 匹配 'value1' | 'value2' 或 "value1" | "value2"
  const regex = /['"]([^'"]+)['"]/g
  let match
  while ((match = regex.exec(typeStr)) !== null) {
    types.push(match[1])
  }
  return types
}

// 获取组件显示名称
function getComponentDisplayName(componentName) {
  const nameMap = {
    'bl-button': '按钮',
    'bl-input': '输入框',
    'bl-alert': '警告提示',
    'bl-badge': '徽标',
    'bl-avatar': '头像',
    'bl-dialog': '对话框',
    'bl-message': '消息提示',
    'bl-loading': '加载中',
    'bl-switch': '开关',
    'bl-checkbox': '复选框',
    'bl-radio': '单选框',
    'bl-slider': '滑块',
    'bl-rate': '评分',
    'bl-tag': '标签',
    'bl-card': '卡片',
    'bl-table': '表格',
    'bl-list': '列表',
    'bl-empty': '空状态',
    'bl-skeleton': '骨架屏',
    'bl-progress': '进度条',
    'bl-tabs': '标签页',
    'bl-steps': '步骤条',
    'bl-pagination': '分页',
    'bl-menu': '菜单',
    'bl-popup': '弹出层',
    'bl-drawer': '抽屉',
    'bl-modal': '模态框',
    'bl-tooltip': '文字提示',
    'bl-popover': '气泡弹出框',
    'bl-notification': '通知',
    'bl-uploader': '文件上传',
    'bl-form': '表单',
    'bl-textarea': '多行输入框',
    'bl-search-bar': '搜索栏',
    'bl-number-input': '数字输入框',
    'bl-autocomplete': '自动完成',
    'bl-picker-date': '日期选择器',
    'bl-picker-time': '时间选择器',
    'bl-picker-selector': '选择器',
    'bl-calendar': '日历',
    'bl-image': '图片',
    'bl-icon': '图标',
    'bl-text': '文本',
    'bl-view': '视图容器',
    'bl-flex': '弹性布局',
    'bl-row': '行',
    'bl-col': '列',
    'bl-gap': '间距',
    'bl-divider': '分割线',
    'bl-cell': '单元格',
    'bl-grid': '网格',
    'bl-space': '间距',
    'bl-scroll-view': '滚动视图',
    'bl-swiper': '轮播图',
    'bl-timeline': '时间轴',
    'bl-result': '结果页',
    'bl-statistic': '统计数值',
    'bl-count-down': '倒计时',
    'bl-qrcode': '二维码',
    'bl-watermark': '水印',
    'bl-back-top': '回到顶部',
    'bl-float-button': '悬浮按钮',
    'bl-segmented': '分段控制器',
    'bl-check-tag': '可选择标签',
    'bl-sort-tag': '排序标签',
    'bl-badge': '徽标',
    'bl-amount': '金额显示',
    'bl-descriptions': '描述列表',
    'bl-collapse': '折叠面板',
    'bl-tree': '树形控件',
    'bl-treeselect': '树形选择器',
    'bl-transfer': '穿梭框',
    'bl-tour': '漫游式引导',
    'bl-error-capture': '错误捕获',
    'bl-i18n-provider': '国际化提供者',
    'bl-theme': '主题',
    'bl-theme-provider': '主题提供者',
    'bl-theme-root': '主题根',
    'bl-page': '页面容器',
    'bl-page-style': '页面样式',
    'bl-custom-navigation-bar': '自定义导航栏',
    'bl-mp-custom-tabbar': '小程序自定义标签栏',
    'bl-tabbar': '标签栏',
    'bl-bottom-bar': '底部栏',
    'bl-tab-button': '标签按钮',
    'bl-tab-panel': '标签面板',
    'bl-tabs': '标签页',
    'bl-menu': '菜单',
    'bl-list-view': '列表视图',
    'bl-poster-painter': '海报绘制器',
    'bl-share-poster': '分享海报',
    'bl-share-dialog': '分享对话框',
    'bl-share-app-message': '分享应用消息',
    'bl-preview-context': '预览上下文',
    'bl-portal': '传送门',
    'bl-noop': '空操作',
    'bl-hairline': '细线边框',
    'bl-filter': '筛选器',
    'bl-picker-cascader-selector': '级联选择器',
    'bl-picker-multi-selector': '多选选择器',
    'bl-pagination': '分页',
    'bl-popconfirm': '气泡确认框',
    'bl-radio-group': '单选框组',
    'bl-radio-popup': '单选框弹窗',
    'bl-checkbox-group': '复选框组',
    'bl-checkbox-popup': '复选框弹窗',
    'bl-checker': '选择器',
    'bl-checker-popup': '选择器弹窗',
    'bl-step': '步骤',
    'bl-steps': '步骤条',
    'bl-video': '视频',
    'bl-spinner': '加载动画'
  }
  
  return nameMap[componentName] || componentName.replace('bl-', '').replace(/-/g, ' ')
}

// 获取类型标签
function getTypeLabel(type) {
  const labelMap = {
    'default': '默认',
    'primary': '主要',
    'success': '成功',
    'warning': '警告',
    'danger': '危险',
    'info': '信息',
    'error': '错误',
    'text': '文本',
    'link': '链接',
    'outline': '描边',
    'dashed': '虚线',
    'ghost': '幽灵',
    'solid': '实心'
  }
  
  return labelMap[type] || type
}

// 获取尺寸标签
function getSizeLabel(size) {
  const labelMap = {
    'default': '默认尺寸',
    'small': '小尺寸',
    'mini': '迷你尺寸',
    'large': '大尺寸',
    'medium': '中等尺寸'
  }
  
  return labelMap[size] || `${size}尺寸`
}

// 将示例代码转换为文档格式
function formatExamplesAsCode(examples) {
  if (examples.length === 0) {
    return ''
  }
  
  // 生成变量定义
  const varDefinitions = examples.map((example, index) => {
    const varName = index === 0 ? 'basicCode' : 
                   example.title.includes('类型') ? 'typesCode' :
                   example.title.includes('尺寸') ? 'sizeCode' :
                   example.title.includes('禁用') ? 'disabledCode' :
                   example.title.includes('绑定') ? 'modelCode' :
                   example.title.includes('事件') ? 'eventCode' :
                   example.title.includes('状态') ? 'stateCode' :
                   `example${index + 1}Code`
    
    // 转义代码中的特殊字符
    const escapedCode = example.code
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\${/g, '\\${')
    
    return `const ${varName} = \`${escapedCode}\``
  }).join('\n\n')
  
  // 生成示例展示
  const examplePreviews = examples.map((example, index) => {
    const varName = index === 0 ? 'basicCode' : 
                   example.title.includes('类型') ? 'typesCode' :
                   example.title.includes('尺寸') ? 'sizeCode' :
                   example.title.includes('禁用') ? 'disabledCode' :
                   example.title.includes('绑定') ? 'modelCode' :
                   example.title.includes('事件') ? 'eventCode' :
                   example.title.includes('状态') ? 'stateCode' :
                   `example${index + 1}Code`
    
    return `### ${example.title}

<ClientOnly>
  <ExamplePreview 
    title="${example.title}"
    :code="${varName}"
    :editable="true"
  />
</ClientOnly>`
  }).join('\n\n')
  
  return `<script setup>
${varDefinitions}
</script>

${examplePreviews}`
}

// 增强组件文档
function enhanceComponentDoc(docPath, componentName) {
  if (!fs.existsSync(docPath)) {
    console.warn(`⚠️  文档不存在: ${docPath}`)
    return false
  }
  
  const content = fs.readFileSync(docPath, 'utf-8')
  
  // 解析 Props 和 Events
  const props = parseProps(content)
  const events = parseEvents(content)
  
  // 从 README.md 提取示例
  const readmePath = path.join(componentsDir, componentName, 'README.md')
  let examples = extractExamplesFromReadme(readmePath)
  
  // 如果 README 中没有示例或示例不足，根据 Props 生成
  if (examples.length < 2) {
    const generatedExamples = generateExamplesFromProps(componentName, props, events)
    // 合并示例，去重
    const existingTitles = new Set(examples.map(e => e.title))
    for (const example of generatedExamples) {
      if (!existingTitles.has(example.title)) {
        examples.push(example)
      }
    }
  }
  
  // 限制示例数量（最多 5 个）
  examples = examples.slice(0, 5)
  
  if (examples.length === 0) {
    console.warn(`⚠️  ${componentName} 没有生成示例`)
    return false
  }
  
  // 格式化示例代码
  const examplesSection = formatExamplesAsCode(examples)
  
  // 查找引入部分的位置
  let importSectionEnd = content.indexOf('## 📋 Props')
  if (importSectionEnd === -1) {
    // 如果没有 Props 部分，查找其他部分（Events、Slots、注意事项等）
    importSectionEnd = content.indexOf('## 📡 Events')
    if (importSectionEnd === -1) {
      importSectionEnd = content.indexOf('## 🎨 Slots')
      if (importSectionEnd === -1) {
        importSectionEnd = content.indexOf('## 📝 注意事项')
        if (importSectionEnd === -1) {
          importSectionEnd = content.indexOf('## 🔗 相关链接')
          if (importSectionEnd === -1) {
            // 如果都没有，就在引入部分后面插入
            importSectionEnd = content.indexOf('```', content.indexOf('## 📦 引入'))
            if (importSectionEnd !== -1) {
              importSectionEnd = content.indexOf('\n', importSectionEnd + 3)
            } else {
              console.warn(`⚠️  ${componentName} 没有找到合适的插入位置`)
              return false
            }
          }
        }
      }
    }
  }
  
  // 检查是否已有示例部分
  const existingExamplesIndex = content.indexOf('## 💡 示例')
  let newContent
  
  if (existingExamplesIndex !== -1 && existingExamplesIndex < importSectionEnd) {
    // 如果示例已经在 Props 前面，替换它
    const nextSectionIndex = content.indexOf('## ', existingExamplesIndex + 1)
    if (nextSectionIndex === -1 || nextSectionIndex > importSectionEnd) {
      // 示例部分一直到 Props
      newContent = content.substring(0, existingExamplesIndex) + 
                   '## 💡 示例\n\n' + examplesSection + '\n\n' + 
                   content.substring(importSectionEnd)
    } else {
      // 示例部分在中间
      newContent = content.substring(0, existingExamplesIndex) + 
                   '## 💡 示例\n\n' + examplesSection + '\n\n' + 
                   content.substring(nextSectionIndex)
    }
  } else if (existingExamplesIndex !== -1 && existingExamplesIndex > importSectionEnd) {
    // 如果示例在 Props 后面，移动到前面
    const examplesEndIndex = content.indexOf('## ', existingExamplesIndex + 1)
    const examplesContent = content.substring(existingExamplesIndex, 
      examplesEndIndex === -1 ? content.length : examplesEndIndex)
    
    newContent = content.substring(0, importSectionEnd) + 
                 '\n\n## 💡 示例\n\n' + examplesSection + '\n\n' + 
                 content.substring(importSectionEnd, existingExamplesIndex) + 
                 (examplesEndIndex === -1 ? '' : content.substring(examplesEndIndex))
  } else {
    // 没有示例部分，在 Props 前面插入
    newContent = content.substring(0, importSectionEnd) + 
                 '\n\n## 💡 示例\n\n' + examplesSection + '\n\n' + 
                 content.substring(importSectionEnd)
  }
  
  // 移除重复的示例部分（如果在 Props 后面还有）
  const propsIndex = newContent.indexOf('## 📋 Props')
  if (propsIndex !== -1) {
    const examplesAfterProps = newContent.indexOf('## 💡 示例', propsIndex)
    if (examplesAfterProps !== -1) {
      const examplesEndAfterProps = newContent.indexOf('## ', examplesAfterProps + 1)
      newContent = newContent.substring(0, examplesAfterProps) + 
                   (examplesEndAfterProps === -1 ? '' : newContent.substring(examplesEndAfterProps))
    }
  }
  
  // 移除重复的示例标题（如 "## 基础用法" 在 💡 示例部分之后）
  const examplesSectionIndex = newContent.indexOf('## 💡 示例')
  if (examplesSectionIndex !== -1) {
    const examplesEndIndex = newContent.indexOf('## ', examplesSectionIndex + 1)
    const examplesSection = newContent.substring(examplesSectionIndex, 
      examplesEndIndex === -1 ? newContent.length : examplesEndIndex)
    
    // 查找重复的示例标题（在示例部分之后）
    if (examplesEndIndex !== -1) {
      const afterExamples = newContent.substring(examplesEndIndex)
      // 移除重复的 "### 基础用法" 等标题
      const duplicatePattern = /^###\s+(基础用法|不同类型|不同尺寸|禁用状态|双向绑定|点击事件)/gm
      const cleanedAfter = afterExamples.replace(duplicatePattern, '')
      newContent = newContent.substring(0, examplesEndIndex) + cleanedAfter
    }
  }
  
  // 移除重复的代码块（```vue 代码块）
  const codeBlockPattern = /```vue\n[\s\S]*?```/g
  const matches = []
  let match
  while ((match = codeBlockPattern.exec(newContent)) !== null) {
    matches.push({ index: match.index, content: match[0] })
  }
  
  // 如果找到重复的代码块，移除后面的
  for (let i = 1; i < matches.length; i++) {
    const prevContent = matches[i - 1].content.trim()
    const currContent = matches[i].content.trim()
    if (prevContent === currContent) {
      newContent = newContent.substring(0, matches[i].index) + 
                   newContent.substring(matches[i].index + matches[i].content.length)
    }
  }
  
  fs.writeFileSync(docPath, newContent, 'utf-8')
  console.log(`✅ 已增强: ${componentName}.md (${examples.length} 个示例)`)
  
  return true
}

// 主函数
function main() {
  console.log('🚀 开始增强组件文档示例...\n')
  
  // 获取所有组件文档
  const docFiles = fs.readdirSync(docsDir)
    .filter(f => f.endsWith('.md') && f !== 'index.md')
    .map(f => f.replace('.md', ''))
    .sort()
  
  console.log(`📦 找到 ${docFiles.length} 个组件文档\n`)
  
  let successCount = 0
  let failCount = 0
  
  for (const componentName of docFiles) {
    const docPath = path.join(docsDir, `${componentName}.md`)
    if (enhanceComponentDoc(docPath, componentName)) {
      successCount++
    } else {
      failCount++
    }
  }
  
  console.log(`\n✨ 完成！成功: ${successCount}, 失败: ${failCount}`)
}

main()

