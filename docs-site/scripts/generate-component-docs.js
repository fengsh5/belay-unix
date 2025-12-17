#!/usr/bin/env node

/**
 * 批量生成组件文档页面
 * 从组件库的 README.md 文件生成文档网站的组件页面
 * 自动为示例代码添加预览组件
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const componentsDir = path.join(__dirname, '../../uni_modules/belay-unix/components')
const docsDir = path.join(__dirname, '../components')

// 确保 docs 目录存在
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true })
}

// 获取所有有 README.md 的组件
function getComponentsWithReadme() {
  const components = []
  const dirs = fs.readdirSync(componentsDir)
  
  for (const dir of dirs) {
    const readmePath = path.join(componentsDir, dir, 'README.md')
    if (fs.existsSync(readmePath)) {
      components.push(dir)
    }
  }
  
  return components.sort()
}

// 提取代码块中的示例
function extractExamples(content: string) {
  const examples: Array<{ title: string, code: string }> = []
  const codeBlockRegex = /```vue\n([\s\S]*?)```/g
  const headingRegex = /^###\s+(.+)$/gm
  
  let match
  let currentHeading = '基础用法'
  let lastIndex = 0
  
  // 先提取所有标题
  const headings: Array<{ index: number, title: string }> = []
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

// 转换 README 内容为文档网站格式
function convertReadmeToDoc(readmeContent: string, componentName: string) {
  let content = readmeContent
  
  // 提取示例
  const examples = extractExamples(content)
  
  // 替换相对路径链接为文档网站链接
  content = content.replace(/\[组件库文档\]\(\.\.\/\.\.\/README\.md\)/g, '[组件库文档](/guide/)')
  content = content.replace(/\[主题系统\]\(\.\.\/\.\.\/docs\/THEME\.md\)/g, '[主题系统](/theme/)')
  content = content.replace(/\[国际化\]\(\.\.\/\.\.\/docs\/I18N\.md\)/g, '[组件索引](/components/)')
  
  // 替换其他相对路径
  content = content.replace(/\[([^\]]+)\]\(\.\.\/\.\.\/docs\/([^\)]+)\)/g, (match, text, file) => {
    const fileMap = {
      'IMPORTANT.md': '/guide/important',
      'IMPORT.md': '/guide/import',
      'COMPONENT_USAGE.md': '/guide/usage',
      'EASYCOM_GUIDE.md': '/guide/easycom',
      'THEME.md': '/theme/',
      'COMPONENTS.md': '/components/'
    }
    return `[${text}](${fileMap[file] || '/guide/'})`
  })
  
  // 为示例代码块添加预览组件
  if (examples.length > 0) {
    // 为前 3 个示例添加预览组件
    for (let i = 0; i < Math.min(examples.length, 3); i++) {
      const example = examples[i]
      // 转义代码中的特殊字符
      const escapedCode = example.code
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\${/g, '\\${')
        .replace(/\n/g, '\\n')
      
      // 查找对应的代码块
      const codeBlockPattern = new RegExp(
        `(###\\s+${example.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?)(\\`\\`\\`vue\\n${example.code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n\\`\\`\\`)`,
        'g'
      )
      
      // 创建预览组件代码
      const previewComponent = `
<ExamplePreview 
  title="${example.title}"
  code={\`${escapedCode}\`}
  :editable="true"
/>
`
      
      // 替换代码块
      content = content.replace(
        `\`\`\`vue\n${example.code}\n\`\`\``,
        previewComponent
      )
    }
  }
  
  // 添加文档网站相关的链接
  content += '\n\n## 🔗 相关链接\n\n'
  content += '- [组件索引](/components/) - 查看所有组件\n'
  content += '- [组件导入说明](/guide/import) - 如何导入组件\n'
  content += '- [组件使用说明](/guide/usage) - 如何使用组件\n'
  content += '\n## 📚 完整文档\n\n'
  content += `组件的完整文档请查看组件库源码中的 README 文件：\n`
  content += `\`uni_modules/belay-unix/components/${componentName}/README.md\`\n`
  
  return content
}

// 生成组件文档
function generateComponentDoc(componentName: string) {
  const readmePath = path.join(componentsDir, componentName, 'README.md')
  const docPath = path.join(docsDir, `${componentName}.md`)
  
  if (!fs.existsSync(readmePath)) {
    console.warn(`⚠️  组件 ${componentName} 没有 README.md 文件`)
    return false
  }
  
  const readmeContent = fs.readFileSync(readmePath, 'utf-8')
  const docContent = convertReadmeToDoc(readmeContent, componentName)
  
  fs.writeFileSync(docPath, docContent, 'utf-8')
  console.log(`✅ 已生成: ${componentName}.md`)
  
  return true
}

// 主函数
function main() {
  console.log('🚀 开始生成组件文档...\n')
  
  const components = getComponentsWithReadme()
  console.log(`📦 找到 ${components.length} 个组件\n`)
  
  let successCount = 0
  let failCount = 0
  
  for (const component of components) {
    if (generateComponentDoc(component)) {
      successCount++
    } else {
      failCount++
    }
  }
  
  console.log(`\n✨ 完成！成功: ${successCount}, 失败: ${failCount}`)
}

main()

