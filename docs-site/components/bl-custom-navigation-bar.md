# BlCustomNavigationBar BlCustomNavigationBar

BlCustomNavigationBar组件，用于blcustomnavigationbar场景。

## 📦 引入

```typescript
import { BlCustomNavigationBar } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-custom-navigation-bar></bl-custom-navigation-bar>
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
| title | 标题  | `string` | - | 否 |
| showBack | 是否显示返回按钮  | `boolean` | `true` | 否 |
| backgroundColor | 背景颜色  | `string` | `#ffffff` | 否 |
| textColor | 文字颜色  | `string` | `#323233` | 否 |
| fixed | 是否固定在顶部  | `boolean` | `true` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| back | 返回按钮点击事件  | `\(\) =\> void` |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| center | 中间内容插槽  | - |
| right | 右侧内容插槽  | - |



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
`uni_modules/belay-unix/components/bl-custom-navigation-bar/README.md`
