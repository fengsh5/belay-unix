# BlNumberInput BlNumberInput

BlNumberInput组件，用于blnumberinput场景。

## 📦 引入

```typescript
import { BlNumberInput } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-number-input></bl-number-input>
  </view>
<\/template>`

const disabledCode = `<template>
  <view>
    <bl-number-input disabled>禁用状态</bl-number-input>
  </view>
<\/template>`

const modelCode = `<template>
  <view style="padding: 20px;">
    <bl-number-input v-model="value" placeholder="请输入内容"></bl-number-input>
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
| value | 当前值  | `number` | `0` | 否 |
| min | 最小值  | `number` | `Number.MIN_SAFE_INTEGER` | 否 |
| max | 最大值  | `number` | `Number.MAX_SAFE_INTEGER` | 否 |
| step | 步长，每次点击时改变的值  | `number` | `1` | 否 |
| disabled | 是否禁用  | `boolean` | `false` | 否 |
| editable | 是否可编辑  | `boolean` | `true` | 否 |
| showMinus | 是否显示减少按钮  | `boolean` | `true` | 否 |
| showPlus | 是否显示增加按钮  | `boolean` | `true` | 否 |
| placeholder | 占位符  | `string` | - | 否 |
| width | 输入框宽度  | `number \| string` | `120` | 否 |
| buttonSize | 按钮大小  | `number` | `48` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值变化事件  | `\(value: number\) =\> void` |
| input | 输入事件  | `\(value: number\) =\> void` |
| blur | 失焦事件  | `\(event: any\) =\> void` |
| focus | 聚焦事件  | `\(event: any\) =\> void` |
| plus | 增加按钮点击事件  | `\(value: number\) =\> void` |
| minus | 减少按钮点击事件  | `\(value: number\) =\> void` |



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
`uni_modules/belay-unix/components/bl-number-input/README.md`
