# BlAlert BlAlert

BlAlert组件，用于blalert场景。

## 📦 引入

```typescript
import { BlAlert } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-alert></bl-alert>
  </view>
<\/template>`

const eventCode = `<template>
  <view>
    <bl-alert @click="handleClick">点击我</bl-alert>
  </view>
<\/template>

<script>
export default {
  methods: {
    handleClick() {
      uni.showToast({
        title: '警告提示被点击',
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
| type | 指定警告提示的样式类型  | `AlertType` | `info` | 否 |
| message | 警告提示内容  | `string` | - | 否 |
| description | 警告提示的辅助性文字介绍  | `string` | - | 否 |
| showIcon | 是否显示辅助图标  | `boolean` | `false` | 否 |
| icon | 自定义图标  | `string` | - | 否 |
| closable | 是否可关闭  | `boolean` | `false` | 否 |
| closeText | 关闭按钮自定义文字  | `string` | - | 否 |
| size | 警告提示的尺寸  | `AlertSize` | `default` | 否 |
| onClose | 关闭时触发的回调函数  | `\(\) =\> void` | - | 否 |
| onClick | 点击 Alert 时触发的回调函数  | `\(\) =\> void` | - | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭事件  | `\(\) =\> void` |
| click | 点击事件  | `\(\) =\> void` |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，警告提示内容  | - |
| icon | 自定义图标  | - |
| closeIcon | 自定义关闭按钮  | - |
| description | 自定义描述内容  | - |

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
`uni_modules/belay-unix/components/bl-alert/README.md`
