# BlTabButton BlTabButton

BlTabButton组件，用于bltabbutton场景。

## 📦 引入

```typescript
import { BlTabButton } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-tab-button></bl-tab-button>
  </view>
<\/template>`

const eventCode = `<template>
  <view>
    <bl-tab-button @click="handleClick">点击我</bl-tab-button>
  </view>
<\/template>

<script>
export default {
  methods: {
    handleClick() {
      uni.showToast({
        title: '标签按钮被点击',
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
| text | 按钮文本  | `string` | - | 否 |
| icon | 图标名称  | `string` | - | 否 |
| iconColor | 图标颜色  | `string` | `#646566` | 否 |
| badge | 徽章值  | `string \| number` | - | 否 |
| active | 是否选中  | `boolean` | `false` | 否 |
| activeIconColor | 选中时的图标颜色  | `string` | `#007aff` | 否 |
| activeTextColor | 选中时的文字颜色  | `string` | `#007aff` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件  | `\(event: any\) =\> void` |



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
`uni_modules/belay-unix/components/bl-tab-button/README.md`
