#!/usr/bin/env node

/**
 * 清理组件文档中的重复示例部分
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const docsDir = path.join(__dirname, '../components')

function cleanDuplicates(docPath) {
  if (!fs.existsSync(docPath)) {
    return false
  }
  
  let content = fs.readFileSync(docPath, 'utf-8')
  const originalContent = content
  
  // 找到 💡 示例部分
  const examplesIndex = content.indexOf('## 💡 示例')
  if (examplesIndex === -1) {
    return false
  }
  
  // 找到示例部分的结束位置（下一个 ## 开头的部分）
  let examplesEndIndex = content.indexOf('\n## ', examplesIndex + 1)
  if (examplesEndIndex === -1) {
    examplesEndIndex = content.length
  }
  
  const examplesSection = content.substring(examplesIndex, examplesEndIndex)
  
  // 在示例部分之后查找重复的内容
  const afterExamples = content.substring(examplesEndIndex)
  
  // 移除重复的示例标题和预览组件
  // 匹配 "## 基础用法" 或 "### 基础用法" 后面跟着 ExamplePreview
  const duplicatePattern = /^##?\s+(基础用法|不同类型|不同尺寸|禁用状态|双向绑定|点击事件|自定义内容|禁用和只读|禁用和加载状态)[\s\S]*?<\/ClientOnly>/gm
  let cleanedAfter = afterExamples.replace(duplicatePattern, '')
  
  // 移除重复的代码块（```vue 代码块，如果已经在示例部分中出现）
  const codeBlocksInExamples = examplesSection.match(/```[\s\S]*?```/g) || []
  const codeBlockPattern = /```[\s\S]*?```/g
  let match
  const codeBlocksToRemove = []
  
  while ((match = codeBlockPattern.exec(cleanedAfter)) !== null) {
    const codeBlock = match[0]
    // 检查这个代码块是否已经在示例部分中出现
    if (codeBlocksInExamples.some(existing => {
      const existingContent = existing.replace(/\s+/g, ' ').trim()
      const newContent = codeBlock.replace(/\s+/g, ' ').trim()
      return existingContent === newContent || existingContent.includes(newContent.substring(0, 50))
    })) {
      codeBlocksToRemove.push({ index: match.index, length: match[0].length })
    }
  }
  
  // 从后往前移除，避免索引变化
  for (let i = codeBlocksToRemove.length - 1; i >= 0; i--) {
    const { index, length } = codeBlocksToRemove[i]
    cleanedAfter = cleanedAfter.substring(0, index) + cleanedAfter.substring(index + length)
  }
  
  // 移除重复的 ExamplePreview 组件（如果变量名已经在示例部分中使用）
  const varNamesInExamples = examplesSection.match(/const\s+(\w+Code)\s*=/g) || []
  const varNames = varNamesInExamples.map(m => m.match(/const\s+(\w+Code)\s*=/)[1])
  
  const previewPattern = /<ClientOnly>[\s\S]*?<\/ClientOnly>/g
  const previewsToRemove = []
  
  while ((match = previewPattern.exec(cleanedAfter)) !== null) {
    const preview = match[0]
    // 检查是否使用了已经在示例部分中定义的变量
    for (const varName of varNames) {
      if (preview.includes(`:code="${varName}"`)) {
        previewsToRemove.push({ index: match.index, length: match[0].length })
        break
      }
    }
  }
  
  // 从后往前移除
  for (let i = previewsToRemove.length - 1; i >= 0; i--) {
    const { index, length } = previewsToRemove[i]
    cleanedAfter = cleanedAfter.substring(0, index) + cleanedAfter.substring(index + length)
  }
  
  // 合并内容
  content = content.substring(0, examplesEndIndex) + cleanedAfter
  
  // 清理多余的空行
  content = content.replace(/\n{4,}/g, '\n\n\n')
  
  // 移除空的标题行（### 标题后面直接是空行或另一个标题）
  content = content.replace(/^###\s+[^\n]+\n{2,}(?=###|##|$)/gm, '')
  
  // 清理多余的空行（再次）
  content = content.replace(/\n{3,}/g, '\n\n')
  
  if (content !== originalContent) {
    fs.writeFileSync(docPath, content, 'utf-8')
    return true
  }
  
  return false
}

function main() {
  console.log('🧹 开始清理重复示例...\n')
  
  const docFiles = fs.readdirSync(docsDir)
    .filter(f => f.endsWith('.md') && f !== 'index.md')
  
  let cleanedCount = 0
  
  for (const file of docFiles) {
    const docPath = path.join(docsDir, file)
    if (cleanDuplicates(docPath)) {
      console.log(`✅ 已清理: ${file}`)
      cleanedCount++
    }
  }
  
  console.log(`\n✨ 完成！清理了 ${cleanedCount} 个文件`)
}

main()

