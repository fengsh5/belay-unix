#!/usr/bin/env node

/**
 * 检查所有组件文档的完整性
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const docsDir = path.join(__dirname, '../components')
const configPath = path.join(__dirname, '../.vitepress/config.js')

console.log('=== 组件文档完整性检查报告 ===\n')

// 1. 获取所有组件文档文件
const docFiles = fs.readdirSync(docsDir)
  .filter(f => f.endsWith('.md') && f.startsWith('bl-'))
  .map(f => f.replace('.md', ''))
  .sort()

console.log(`1. 文件统计:`)
console.log(`   - 组件文档文件总数: ${docFiles.length}`)

// 2. 从侧边栏配置中提取链接
const configContent = fs.readFileSync(configPath, 'utf-8')
const sidebarLinks = []
const linkRegex = /link:\s*'\/components\/([^']+)'/g
let match
while ((match = linkRegex.exec(configContent)) !== null) {
  sidebarLinks.push(match[1])
}
const uniqueSidebarLinks = [...new Set(sidebarLinks)].sort()

console.log(`   - 侧边栏配置链接数: ${uniqueSidebarLinks.length}`)

// 3. 检查文件与侧边栏的匹配
console.log(`\n2. 文件与侧边栏匹配检查:`)
const missingInSidebar = docFiles.filter(f => !uniqueSidebarLinks.includes(f))
const missingFiles = uniqueSidebarLinks.filter(l => !docFiles.includes(l))

if (missingInSidebar.length === 0 && missingFiles.length === 0) {
  console.log(`   ✅ 所有文件都在侧边栏中，所有侧边栏链接都有对应文件`)
} else {
  if (missingInSidebar.length > 0) {
    console.log(`   ⚠️  有 ${missingInSidebar.length} 个文件不在侧边栏中:`)
    missingInSidebar.forEach(f => console.log(`      - ${f}.md`))
  }
  if (missingFiles.length > 0) {
    console.log(`   ⚠️  有 ${missingFiles.length} 个侧边栏链接没有对应文件:`)
    missingFiles.forEach(l => console.log(`      - ${l}`))
  }
}

// 4. 检查文件格式
console.log(`\n3. 文件格式检查:`)
let invalidCount = 0
const invalidFiles = []

for (const file of docFiles) {
  const filePath = path.join(docsDir, `${file}.md`)
  const content = fs.readFileSync(filePath, 'utf-8')
  
  // 检查是否有标题
  if (!content.match(/^#\s+/m)) {
    invalidFiles.push(`${file}.md (缺少标题)`)
    invalidCount++
  }
  
  // 检查文件是否为空
  if (content.trim().length === 0) {
    invalidFiles.push(`${file}.md (空文件)`)
    invalidCount++
  }
  
  // 检查是否有未转义的标签（在 script setup 中）
  if (content.includes('<script setup>')) {
    const scriptMatch = content.match(/<script setup>([\s\S]*?)<\/script>/)
    if (scriptMatch) {
      const scriptContent = scriptMatch[1]
      if (scriptContent.includes('</template>') && !scriptContent.includes('\\</template>')) {
        invalidFiles.push(`${file}.md (未转义的 </template> 标签)`)
        invalidCount++
      }
      if (scriptContent.includes('</script>') && !scriptContent.includes('\\</script>')) {
        invalidFiles.push(`${file}.md (未转义的 </script> 标签)`)
        invalidCount++
      }
    }
  }
}

if (invalidCount === 0) {
  console.log(`   ✅ 所有文件格式正确`)
} else {
  console.log(`   ⚠️  有 ${invalidCount} 个文件格式有问题:`)
  invalidFiles.forEach(f => console.log(`      - ${f}`))
}

// 5. 检查示例部分
console.log(`\n4. 示例部分检查:`)
let noExamplesCount = 0
const noExamplesFiles = []

for (const file of docFiles) {
  const filePath = path.join(docsDir, `${file}.md`)
  const content = fs.readFileSync(filePath, 'utf-8')
  
  if (!content.includes('## 💡 示例')) {
    noExamplesFiles.push(file)
    noExamplesCount++
  }
}

if (noExamplesCount === 0) {
  console.log(`   ✅ 所有文件都有示例部分`)
} else {
  console.log(`   ⚠️  有 ${noExamplesCount} 个文件缺少示例部分:`)
  noExamplesFiles.forEach(f => console.log(`      - ${f}.md`))
}

// 6. 检查 Props 部分
console.log(`\n5. Props 部分检查:`)
let noPropsCount = 0
const noPropsFiles = []

for (const file of docFiles) {
  const filePath = path.join(docsDir, `${file}.md`)
  const content = fs.readFileSync(filePath, 'utf-8')
  
  if (!content.includes('## 📋 Props')) {
    noPropsFiles.push(file)
    noPropsCount++
  }
}

if (noPropsCount === 0) {
  console.log(`   ✅ 所有文件都有 Props 部分`)
} else {
  console.log(`   ⚠️  有 ${noPropsCount} 个文件缺少 Props 部分:`)
  noPropsFiles.forEach(f => console.log(`      - ${f}.md`))
}

// 总结
console.log(`\n=== 检查总结 ===`)
const totalIssues = missingInSidebar.length + missingFiles.length + invalidCount + noExamplesCount + noPropsCount
if (totalIssues === 0) {
  console.log(`✅ 所有检查通过！所有组件文档都正常。`)
} else {
  console.log(`⚠️  发现 ${totalIssues} 个问题，请查看上面的详细信息。`)
}

