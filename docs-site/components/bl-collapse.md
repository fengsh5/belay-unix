# BlCollapse 折叠面板

折叠面板组件，用于折叠面板场景。

## 📦 引入

```typescript
import { BlCollapse } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-collapse></bl-collapse>
  </view>
<\/template>`

const disabledCode = `<template>
  <view>
    <bl-collapse disabled>禁用状态</bl-collapse>
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
| activeKey | 当前激活的面板 key  | `string \| number \| Array\<string \| number\>` | `null` | 否 |
| defaultActiveKey | 默认激活的面板 key  | `string \| number \| Array\<string \| number\>` | `null` | 否 |
| accordion | 是否手风琴模式（同时只能展开一个）  | `boolean` | `false` | 否 |
| bordered | 是否显示边框  | `boolean` | `true` | 否 |
| disabled | 是否禁用  | `boolean` | `false` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 面板切换事件  | `\(activeKey: string \| number \| Array\<string \| number\>\) =\> void` |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，CollapsePanel 组件  | - |



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
`uni_modules/belay-unix/components/bl-collapse/README.md`
