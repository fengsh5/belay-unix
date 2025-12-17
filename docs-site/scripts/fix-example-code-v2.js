#!/usr/bin/env node

/**
 * 修复组件文档中的示例代码格式
 * 将所有示例的代码字符串合并到一个 <script setup> 块中
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const componentsDir = path.join(__dirname, '../components')
const files = ['bl-button.md', 'bl-input.md', 'bl-dialog.md']

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8')
  let modified = false
  
  // 收集所有示例代码
  const examples = []
  const pattern = /<script setup>[\s\S]*?<\/script>\s*<ExamplePreview\s+title="([^"]+)"[^>]*\n\s+:code="([^"]+)"[^>]*\/>/g
  
  let match
  while ((match = pattern.exec(content)) !== null) {
    examples.push({
      title: match[1],
      varName: match[2],
      fullMatch: match[0]
    })
  }
  
  if (examples.length === 0) {
    return false
  }
  
  // 生成所有代码字符串
  const codeStrings = []
  const varNames = new Set()
  
  examples.forEach((example, index) => {
    // 从原始内容中提取代码字符串
    const scriptPattern = new RegExp(`<script setup>\\s*const ${example.varName} = \\`([\\s\\S]*?)\\`\\s*</script>`, 'g')
    const scriptMatch = scriptPattern.exec(content)
    
    if (scriptMatch) {
      const code = scriptMatch[1]
        .replace(/\\`/g, '`')
        .replace(/\\\$\{/g, '${')
        .replace(/<\\\/script>/g, '</script>')
      
      // 生成唯一的变量名
      let varName = example.varName
      let counter = 1
      while (varNames.has(varName)) {
        varName = `${example.varName}${counter}`
        counter++
      }
      varNames.add(varName)
      
      codeStrings.push({ varName, code, title: example.title })
    }
  })
  
  if (codeStrings.length === 0) {
    return false
  }
  
  // 生成合并后的 script setup 块
  const scriptSetupBlock = `<script setup>
${codeStrings.map(({ varName, code }) => `const ${varName} = \`${code.replace(/`/g, '\\`').replace(/\${/g, '\\${').replace(/<\/script>/g, '<\\/script>')}\``).join('\n')}
</script>`
  
  // 替换所有示例
  let newContent = content
  examples.forEach((example, index) => {
    const codeStr = codeStrings[index]
    if (codeStr) {
      // 移除旧的 script setup 块
      newContent = newContent.replace(
        /<script setup>[\s\S]*?<\/script>\s*<ExamplePreview\s+title="([^"]+)"[^>]*\n\s+:code="([^"]+)"[^>]*\/>/,
        `<ExamplePreview 
  title="${codeStr.title}"
  :code="${codeStr.varName}"
  :editable="true"
/>`
      )
    }
  })
  
  // 在第一个示例之前插入合并后的 script setup 块
  const firstExampleIndex = newContent.indexOf('## 💡 示例')
  if (firstExampleIndex !== -1) {
    const exampleStart = newContent.indexOf('###', firstExampleIndex)
    if (exampleStart !== -1) {
      newContent = newContent.slice(0, exampleStart) + scriptSetupBlock + '\n\n' + newContent.slice(exampleStart)
      modified = true
    }
  }
  
  // 移除剩余的单独 script setup 块
  newContent = newContent.replace(/<script setup>[\s\S]*?<\/script>\s*(?=<ExamplePreview)/g, '')
  
  if (modified) {
    fs.writeFileSync(filePath, newContent, 'utf-8')
    console.log(`✅ 已修复: ${path.basename(filePath)}`)
    return true
  }
  
  return false
}

// 修复所有文件
let fixedCount = 0
for (const file of files) {
  const filePath = path.join(componentsDir, file)
  if (fs.existsSync(filePath)) {
    if (fixFile(filePath)) {
      fixedCount++
    }
  }
}

console.log(`\n✨ 完成！修复了 ${fixedCount} 个文件`)

