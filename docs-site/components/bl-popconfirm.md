# BlPopconfirm 气泡确认框

气泡确认框组件，用于气泡确认框场景。

## 📦 引入

```typescript
import { BlPopconfirm } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-popconfirm></bl-popconfirm>
  </view>
<\/template>`

const disabledCode = `<template>
  <view>
    <bl-popconfirm disabled>禁用状态</bl-popconfirm>
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

### 禁用状态

<ClientOnly>
  <ExamplePreview 
    title="禁用状态"
    :code="disabledCode"
    :editable="true"
  />
</ClientOnly>

## 📋 Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 确认框标题  | `string` | - | 否 |
| description | 确认框描述  | `string` | - | 否 |
| okText | 确认按钮文字  | `string` | `确定` | 否 |
| cancelText | 取消按钮文字  | `string` | `取消` | 否 |
| okType | 确认按钮类型  | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `primary` | 否 |
| visible | 是否显示确认框  | `boolean` | `false` | 否 |
| disabled | 是否禁用  | `boolean` | `false` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| confirm | 确认事件  | `\(\) =\> void` |
| cancel | 取消事件  | `\(\) =\> void` |
| visibleChange | 可见性改变事件  | `\(visible: boolean\) =\> void` |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，触发元素  | - |
| title | 标题插槽  | - |
| description | 描述插槽  | - |



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
`uni_modules/belay-unix/components/bl-popconfirm/README.md`
