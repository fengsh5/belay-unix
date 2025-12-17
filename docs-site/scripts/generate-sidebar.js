#!/usr/bin/env node

/**
 * 生成侧边栏配置
 * 根据组件分类自动生成侧边栏配置
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const componentsDir = path.join(__dirname, '../../uni_modules/belay-unix/components')
const configPath = path.join(__dirname, '../.vitepress/config.js')

// 组件分类
const componentCategories = {
  '基础组件': [
    'bl-alert', 'bl-amount', 'bl-avatar', 'bl-badge', 'bl-button', 'bl-cell',
    'bl-divider', 'bl-flex', 'bl-gap', 'bl-hairline', 'bl-icon', 'bl-image',
    'bl-message', 'bl-rate', 'bl-segmented', 'bl-text', 'bl-view'
  ],
  '表单组件': [
    'bl-autocomplete', 'bl-checkbox', 'bl-checkbox-group', 'bl-checkbox-popup',
    'bl-checker', 'bl-checker-popup', 'bl-form', 'bl-input', 'bl-number-input',
    'bl-radio', 'bl-radio-group', 'bl-radio-popup', 'bl-search-bar', 'bl-slider',
    'bl-switch', 'bl-textarea', 'bl-treeselect', 'bl-uploader'
  ],
  '反馈组件': [
    'bl-dialog', 'bl-drawer', 'bl-empty', 'bl-error-capture', 'bl-loading',
    'bl-modal', 'bl-notice-bar', 'bl-notification', 'bl-popconfirm', 'bl-popup',
    'bl-progress', 'bl-spinner', 'bl-tour'
  ],
  '展示组件': [
    'bl-calendar', 'bl-card-layout', 'bl-collapse', 'bl-count-down', 'bl-descriptions',
    'bl-float-button', 'bl-qrcode', 'bl-result', 'bl-skeleton', 'bl-statistic',
    'bl-table', 'bl-tag', 'bl-check-tag', 'bl-sort-tag', 'bl-timeline',
    'bl-transfer', 'bl-tree', 'bl-watermark'
  ],
  '导航组件': [
    'bl-back-top', 'bl-custom-navigation-bar', 'bl-menu', 'bl-pagination',
    'bl-tabbar', 'bl-tab-button', 'bl-tab-panel', 'bl-tabs', 'bl-mp-custom-tabbar'
  ],
  '布局组件': [
    'bl-bottom-bar', 'bl-col', 'bl-filter', 'bl-flex', 'bl-grid', 'bl-grid-item',
    'bl-page', 'bl-page-style', 'bl-row', 'bl-scroll-view', 'bl-list-view', 'bl-space'
  ],
  '其他组件': [
    'bl-picker-cascader-selector', 'bl-picker-date', 'bl-picker-multi-selector',
    'bl-picker-selector', 'bl-picker-time', 'bl-portal', 'bl-poster-painter',
    'bl-preview-context', 'bl-share-app-message', 'bl-share-dialog', 'bl-share-poster',
    'bl-step', 'bl-steps', 'bl-swiper', 'bl-theme', 'bl-theme-provider', 'bl-theme-root',
    'bl-i18n-provider', 'bl-video', 'bl-tooltip', 'bl-noop'
  ]
}

// 从 README 文件获取组件显示名称
function getComponentDisplayName(componentName) {
  const readmePath = path.join(componentsDir, componentName, 'README.md')
  
  if (fs.existsSync(readmePath)) {
    const content = fs.readFileSync(readmePath, 'utf-8')
    // 提取标题，格式通常是 # BlXxx 中文名
    const match = content.match(/^#\s+(.+?)\s+(.+?)$/m)
    if (match && match[2]) {
      // 如果有中文名，使用中文名
      const chineseName = match[2].trim()
      if (chineseName && /[\u4e00-\u9fa5]/.test(chineseName)) {
        const englishName = match[1].replace(/^Bl/, '').replace(/([A-Z])/g, ' $1').trim()
        return `${englishName} ${chineseName}`
      }
    }
    // 如果只有英文名，使用英文名
    if (match && match[1]) {
      const englishName = match[1].replace(/^Bl/, '').replace(/([A-Z])/g, ' $1').trim()
      return englishName
    }
  }
  
  // 如果没有 README，从组件名生成
  const name = componentName.replace('bl-', '').split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
  
  return name
}

// 检查组件文档是否存在
function componentDocExists(componentName) {
  const docPath = path.join(__dirname, '../components', `${componentName}.md`)
  return fs.existsSync(docPath)
}

// 生成侧边栏配置代码
function generateSidebarConfig() {
  let config = '      \'/components/\': [\n'
  config += '        {\n'
  config += '          text: \'组件索引\',\n'
  config += '          items: [\n'
  config += '            { text: \'所有组件\', link: \'/components/\' }\n'
  config += '          ]\n'
  config += '        },\n'
  
  for (const [category, components] of Object.entries(componentCategories)) {
    const validComponents = components.filter(comp => componentDocExists(comp))
    
    if (validComponents.length > 0) {
      config += `        {\n`
      config += `          text: '${category}',\n`
      config += `          items: [\n`
      
      for (const component of validComponents) {
        const displayName = getComponentDisplayName(component)
        config += `            { text: '${displayName}', link: '/components/${component}' },\n`
      }
      
      config += `          ]\n`
      config += `        },\n`
    }
  }
  
  config += '      ],\n'
  return config
}

// 主函数
function main() {
  console.log('🚀 生成侧边栏配置...\n')
  
  const sidebarConfig = generateSidebarConfig()
  console.log('生成的侧边栏配置：\n')
  console.log(sidebarConfig)
  
  // 读取现有配置
  let configContent = fs.readFileSync(configPath, 'utf-8')
  
  // 替换侧边栏配置
  const sidebarRegex = /      '\/components\/': \[[\s\S]*?      \],/g
  configContent = configContent.replace(sidebarRegex, sidebarConfig)
  
  // 写回文件
  fs.writeFileSync(configPath, configContent, 'utf-8')
  console.log('\n✅ 侧边栏配置已更新！')
}

main()

