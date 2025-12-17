# BlButton 按钮

按钮组件，用于按钮场景。

## 📦 引入

```typescript
import { BlButton } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
// main.uts 或 main.js
import BelayUnix from '@/uni_modules/belay-unix'
app.use(BelayUnix)
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-button></bl-button>
  </view>
<\/template>`

const typesCode = `<template>
  <view class="button-group">
    <bl-button type="default">默认按钮</bl-button>
    <bl-button type="primary">主要按钮</bl-button>
    <bl-button type="success">成功按钮</bl-button>
    <bl-button type="warning">警告按钮</bl-button>
    <bl-button type="danger">危险按钮</bl-button>
  </view>
<\/template>`

const sizeCode = `<template>
  <view class="button-group">
    <bl-button size="default">默认尺寸</bl-button>
    <bl-button size="mini">迷你尺寸</bl-button>
  </view>
<\/template>`

const stateCode = `<template>
  <view class="button-group">
    <bl-button disabled>禁用按钮</bl-button>
    <bl-button :loading="true">加载中</bl-button>
    <bl-button plain>镂空按钮</bl-button>
  </view>
<\/template>

<style>
.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
<\/style>`

const clickCode = `<template>
  <view>
    <bl-button @click="handleClick">点击我</bl-button>
  </view>
<\/template>

<script>
export default {
  methods: {
    handleClick() {
      uni.showToast({
        title: '按钮被点击',
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

### 不同类型

<ClientOnly>
  <ExamplePreview 
    title="不同类型"
    :code="typesCode"
    :editable="true"
  />
</ClientOnly>

### 不同尺寸

<ClientOnly>
  <ExamplePreview 
    title="不同尺寸"
    :code="sizeCode"
    :editable="true"
  />
</ClientOnly>

### 禁用和加载状态

<ClientOnly>
  <ExamplePreview 
    title="禁用和加载状态"
    :code="disabledCode"
    :editable="true"
  />
</ClientOnly>

### 点击事件

<ClientOnly>
  <ExamplePreview 
    title="点击事件"
    :code="clickCode"
    :editable="true"
  />
</ClientOnly>

### 禁用和加载状态

<ClientOnly>
  <ExamplePreview 
    title="禁用和加载状态"
    :code="stateCode"
    :editable="true"
  />
</ClientOnly>

### 点击事件

<ClientOnly>
  <ExamplePreview 
    title="点击事件"
    :code="clickCode"
    :editable="true"
  />
</ClientOnly>

## 📋 Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| type | 按钮的样式类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | 否 |
| size | 按钮的大小 | `'default' \| 'mini'` | `'default'` | 否 |
| plain | 按钮是否镂空，背景色透明 | `boolean` | `false` | 否 |
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| loading | 名称前是否带 loading 图标 | `boolean` | `false` | 否 |
| formType | 用于 form 组件，点击分别会触发 form 组件的 submit/reset 事件 | `string` | `''` | 否 |
| openType | 微信开放能力 | `string` | `''` | 否 |
| hoverClass | 指定按钮按下去的样式类 | `string` | `'button-hover'` | 否 |
| hoverStartTime | 按住后多久出现点击态，单位毫秒 | `number` | `20` | 否 |
| hoverStayTime | 手指松开后点击态保留时间，单位毫秒 | `number` | `70` | 否 |
| appParameter | 打开 APP 时，向 APP 传递的参数 | `string` | `''` | 否 |
| hoverStopPropagation | 指定是否阻止本节点的祖先节点出现点击态 | `boolean` | `false` | 否 |
| lang | 指定返回用户信息的语言 | `string` | `'en'` | 否 |
| sessionFrom | 会话来源 | `string` | `''` | 否 |
| sendMessageTitle | 会话内消息卡片标题 | `string` | `''` | 否 |
| sendMessagePath | 会话内消息卡片点击跳转小程序路径 | `string` | `''` | 否 |
| sendMessageImg | 会话内消息卡片图片 | `string` | `''` | 否 |
| showMessageCard | 是否显示会话内消息卡片 | `boolean` | `false` | 否 |
| customStyle | 自定义样式 | `string` | `''` | 否 |
| customClass | 自定义类名 | `string` | `''` | 否 |
| text | 按钮文本内容 | `string` | `''` | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件 | `(event: any) => void` | - |
| getUserInfo | 获取用户信息事件 | `(event: any) => void` | - |
| contact | 联系客服事件 | `(event: any) => void` | - |
| getPhoneNumber | 获取手机号事件 | `(event: any) => void` | - |
| error | 错误事件 | `(event: any) => void` | - |
| launchApp | 打开 APP 事件 | `(event: any) => void` | - |
| openSetting | 打开设置事件 | `(event: any) => void` | - |
| chooseAvatar | 选择头像事件 | `(event: any) => void` | - |
| getRealtimePhoneNumber | 获取实时手机号事件 | `(event: any) => void` | - |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，按钮内容 | - |

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
`uni_modules/belay-unix/components/bl-button/README.md`
