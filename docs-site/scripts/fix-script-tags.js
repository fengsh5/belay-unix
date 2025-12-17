#!/usr/bin/env node

/**
 * 修复组件文档中未转义的 script 和 template 标签
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const docsDir = path.join(__dirname, '../components')

function fixScriptTags(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8')
  const originalContent = content
  
  // 在 <script setup> 块中，修复模板字符串里的标签
  // 匹配 const xxxCode = `...` 这样的模式
  const codeBlockRegex = /(const\s+\w+Code\s*=\s*`)([\s\S]*?)(`)/g
  
  content = content.replace(codeBlockRegex, (match, prefix, code, suffix) => {
    // 转义 </template>、</script>、</style>
    let fixedCode = code
      .replace(/<\/template>/g, '<\\/template>')
      .replace(/<\/script>/g, '<\\/script>')
      .replace(/<\/style>/g, '<\\/style>')
    
    return prefix + fixedCode + suffix
  })
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8')
    return true
  }
  
  return false
}

function main() {
  console.log('🔧 开始修复 script 标签...\n')
  
  const files = fs.readdirSync(docsDir)
    .filter(f => f.endsWith('.md') && f !== 'index.md')
    .map(f => path.join(docsDir, f))
  
  let fixedCount = 0
  
  for (const file of files) {
    if (fixScriptTags(file)) {
      console.log(`✅ 已修复: ${path.basename(file)}`)
      fixedCount++
    }
  }
  
  console.log(`\n✨ 完成！修复了 ${fixedCount} 个文件`)
}

main()

