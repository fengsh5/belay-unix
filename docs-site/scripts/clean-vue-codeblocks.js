#!/usr/bin/env node

/**
 * 清理组件文档中 Props 部分之后的重复代码块
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const docsDir = path.join(__dirname, '../components')

function cleanDuplicateCodeBlocks(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8')
  const originalContent = content
  
  // 查找 Props 部分之后是否有重复的代码块
  const propsIndex = content.indexOf('## 📋 Props')
  if (propsIndex === -1) {
    return false
  }
  
  // 在 Props 之后查找 "## 基础用法" 或类似的标题，后面跟着 ```vue 代码块
  const afterProps = content.substring(propsIndex)
  
  // 匹配 "## 基础用法" 或 "## 不同类型" 等标题，后面跟着 ```vue 代码块
  const duplicatePattern = /^##\s+(基础用法|不同类型|不同尺寸|禁用状态|双向绑定|点击事件)[\s\S]*?```vue[\s\S]*?```/gm
  
  const cleaned = afterProps.replace(duplicatePattern, '')
  
  if (cleaned !== afterProps) {
    content = content.substring(0, propsIndex) + cleaned
    fs.writeFileSync(filePath, content, 'utf-8')
    return true
  }
  
  return false
}

function main() {
  console.log('🧹 开始清理重复的代码块...\n')
  
  const files = fs.readdirSync(docsDir)
    .filter(f => f.endsWith('.md') && f !== 'index.md')
    .map(f => path.join(docsDir, f))
  
  let cleanedCount = 0
  
  for (const file of files) {
    if (cleanDuplicateCodeBlocks(file)) {
      console.log(`✅ 已清理: ${path.basename(file)}`)
      cleanedCount++
    }
  }
  
  console.log(`\n✨ 完成！清理了 ${cleanedCount} 个文件`)
}

main()

