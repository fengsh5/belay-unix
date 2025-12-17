# BlTextarea BlTextarea

BlTextarea组件，用于bltextarea场景。

## 📦 引入

```typescript
import { BlTextarea } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-textarea></bl-textarea>
  </view>
<\/template>`

const disabledCode = `<template>
  <view>
    <bl-textarea disabled>禁用状态</bl-textarea>
  </view>
<\/template>`

const modelCode = `<template>
  <view style="padding: 20px;">
    <bl-textarea v-model="value" placeholder="请输入内容"></bl-textarea>
    <text style="margin-top: 10px; display: block;">输入的值：{{ value }}</text>
  </view>
<\/template>

<script>
export default {
  data() {
    return {
      value: ''
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

### 禁用状态

<ClientOnly>
  <ExamplePreview 
    title="禁用状态"
    :code="disabledCode"
    :editable="true"
  />
</ClientOnly>

### 双向绑定

<ClientOnly>
  <ExamplePreview 
    title="双向绑定"
    :code="modelCode"
    :editable="true"
  />
</ClientOnly>

## 📋 Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 输入值  | `string` | - | 否 |
| placeholder | 占位符  | `string` | - | 否 |
| disabled | 是否禁用  | `boolean` | `false` | 否 |
| maxlength | 最大长度  | `number` | `-1` | 否 |
| autoFocus | 是否自动聚焦  | `boolean` | `false` | 否 |
| focus | 是否聚焦  | `boolean` | `false` | 否 |
| autoHeight | 是否自动增高  | `boolean` | `false` | 否 |
| fixed | 是否固定  | `boolean` | `false` | 否 |
| cursorSpacing | 指定光标与键盘的距离  | `number` | `0` | 否 |
| cursor | 指定focus时的光标位置  | `number` | `-1` | 否 |
| showConfirmBar | 是否显示键盘上方带有"完成"按钮那一栏  | `boolean` | `true` | 否 |
| selectionStart | 光标起始位置  | `number` | `-1` | 否 |
| selectionEnd | 光标结束位置  | `number` | `-1` | 否 |
| holdKeyboard | 是否保持键盘不收起  | `boolean` | `false` | 否 |
| adjustPosition | 键盘弹起时，是否自动上推页面  | `boolean` | `true` | 否 |
| inputAlign | 文本对齐  | `'left' \| 'center' \| 'right'` | `left` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| input | 输入事件  | `\(value: string\) =\> void` |
| change | 值变化事件  | `\(value: string\) =\> void` |
| focus | 聚焦事件  | `\(event: any\) =\> void` |
| blur | 失焦事件  | `\(event: any\) =\> void` |
| confirm | 确认事件  | `\(event: any\) =\> void` |
| linechange | 行高变化事件  | `\(event: any\) =\> void` |
| keyboardheightchange | 键盘高度变化事件  | `\(event: any\) =\> void` |



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
`uni_modules/belay-unix/components/bl-textarea/README.md`
