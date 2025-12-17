# 组件显示问题排查

如果组件没有显示，请检查以下几点：

## 1. 检查浏览器控制台

打开浏览器开发者工具（F12），查看 Console 标签页是否有错误信息。

## 2. 检查组件是否正确注册

在浏览器控制台中运行以下代码：

```javascript
// 检查组件是否已注册
console.log('ExamplePreview:', window.__VUE_DEVTOOLS_GLOBAL_HOOK__?.apps?.[0]?.config?.globalProperties)
```

## 3. 检查组件文件

确保以下文件存在：
- `.vitepress/components/ExamplePreview.vue`
- `.vitepress/components/CodeEditor.vue`
- `.vitepress/components/PreviewContainer.vue`

## 4. 检查 Markdown 文件中的组件使用

确保在 Markdown 文件中正确使用了组件：

```markdown
<ExamplePreview 
  title="测试"
  :code="testCode"
  :editable="true"
/>
```

## 5. 检查脚本设置

确保在 Markdown 文件中正确设置了 `<script setup>`：

```markdown
<script setup>
const testCode = `代码内容`
</script>
```

## 6. 重启开发服务器

如果以上都正常，尝试重启开发服务器：

```bash
npm run dev
```

