# BlNoticeBar 通告栏

通告栏组件，用于通告栏场景。

## 📦 引入

```typescript
import { BlNoticeBar } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-notice-bar></bl-notice-bar>
  </view>
<\/template>`

const eventCode = `<template>
  <view>
    <bl-notice-bar @click="handleClick">点击我</bl-notice-bar>
  </view>
<\/template>

<script>
export default {
  methods: {
    handleClick() {
      uni.showToast({
        title: 'notice bar被点击',
        icon: 'none'
      })
    }
  }
}
<\/script>`
</script>

### 基础用法

<ClientOnly>
  <ExamplePreview 
    title="基础用法"
    :code="basicCode"
    :editable="true"
  />
</ClientOnly>

### 点击事件

<ClientOnly>
  <ExamplePreview 
    title="点击事件"
    :code="eventCode"
    :editable="true"
  />
</ClientOnly>

## 📋 Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| text | 通知栏文本  | `string` | - | 否 |
| scrollable | 是否可滚动  | `boolean` | `false` | 否 |
| scrollWithAnimation | 滚动时是否使用动画  | `boolean` | `true` | 否 |
| icon | 左侧图标  | `string` | - | 否 |
| iconColor | 左侧图标颜色  | `string` | `#ff9500` | 否 |
| closable | 是否显示关闭按钮  | `boolean` | `false` | 否 |
| color | 文本颜色  | `string` | `#ed6a0c` | 否 |
| background | 背景颜色  | `string` | `#fffbe8` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭事件  | `\(event: any\) =\> void` |
| click | 点击事件  | `\(event: any\) =\> void` |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，通知栏文本内容  | - |



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
`uni_modules/belay-unix/components/bl-notice-bar/README.md`
