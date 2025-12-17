#!/usr/bin/env node

/**
 * 修复组件文档中的示例代码格式
 * 将 code="..." 转换为使用 <script setup> 定义代码字符串
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
  
  // 匹配 <ExamplePreview> 组件，提取 title 和 code 属性
  // 使用更宽松的模式，匹配多行代码
  const pattern = /<ExamplePreview\s+title="([^"]+)"[^>]*\n\s+code="([\s\S]*?)"\s*[^>]*\/>/gs
  
  content = content.replace(pattern, (match, title, code) => {
    // 生成变量名（基于 title）
    const varName = title
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^[a-z]/, (c) => c.toUpperCase())
      .replace(/([A-Z])/g, (c, p1, offset) => offset > 0 ? c.toLowerCase() : c) + 'Code'
    
    // 转义代码中的反引号、美元符号和 script 标签
    const escapedCode = code
      .replace(/`/g, '\\`')
      .replace(/\${/g, '\\${')
      .replace(/&quot;/g, '"')
      .replace(/<\/script>/g, '<\\/script>')
      .replace(/<script>/g, '<script>')
    
    modified = true
    
    // 返回修复后的代码
    return `<script setup>
const ${varName} = \`${escapedCode}\`
</script>

<ExamplePreview 
  title="${title}"
  :code="${varName}"
  :editable="true"
/>`
  })
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8')
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

