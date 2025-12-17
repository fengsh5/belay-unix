# BlText 文本

文本组件，用于文本场景。

## 📦 引入

```typescript
import { BlText } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-text></bl-text>
  </view>
<\/template>`

const eventCode = `<template>
  <view>
    <bl-text @click="handleClick">点击我</bl-text>
  </view>
<\/template>

<script>
export default {
  methods: {
    handleClick() {
      uni.showToast({
        title: '文本被点击',
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
| selectable | 文本是否可选  | `boolean` | `false` | 否 |
| userSelect | 是否允许用户选择文本  | `boolean` | `false` | 否 |
| space | 显示连续空格，可选值：ensp(中文字符空格一半大小)、emsp(中文字符空格大小)、nbsp(根据字体设置的空格大小)  | `'ensp' \| 'emsp' \| 'nbsp' \| ''` | - | 否 |
| decode | 是否解码  | `boolean` | `false` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件  | `\(event: any\) =\> void` |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，文本内容  | - |



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
`uni_modules/belay-unix/components/bl-text/README.md`
