# BlI18nProvider 国际化提供者

国际化提供者组件，用于国际化提供者场景。

## 📦 引入

```typescript
import { BlI18nProvider } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-i18n-provider></bl-i18n-provider>
  </view>
<\/template>`
</script>

### 基础用法

<ClientOnly>
  <ExamplePreview 
    title="基础用法"
    :code="basicCode"
    :editable="true"
  />
</ClientOnly>

## 📋 Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| locale | 语言配置对象（参考 antd 的 ConfigProvider locale 属性） 可以传递 Locale 对象，类似 antd 的 zhCN、enUS 等  | `Locale \| null` | `null` | 否 |
| autoInit | 是否自动初始化默认语言  | `boolean` | `true` | 否 |
| loadFromFile | 是否从本地文件加载语言资源（优先从文件加载，失败则使用代码中的默认值）  | `boolean` | `false` | 否 |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽  | - |



## 📝 注意事项

- 此组件支持 uni-app x 和 uni-app 项目
- 使用前请确保已正确引入组件库
- 更多用法请参考组件库文档

## 🔗 相关链接

- [组件库文档](/guide/)
- [主题系统](/theme/)
- [组件索引](/components/)

## 🔗 相关链接

- [组件索引](/components/) - 查看所有组件
- [组件导入说明](/guide/import) - 如何导入组件
- [组件使用说明](/guide/usage) - 如何使用组件

## 📚 完整文档

组件的完整文档请查看组件库源码中的 README 文件：
`uni_modules/belay-unix/components/bl-i18n-provider/README.md`
