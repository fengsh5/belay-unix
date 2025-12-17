# BlTreeselect BlTreeselect

BlTreeselect组件，用于bltreeselect场景。

## 📦 引入

```typescript
import { BlTreeselect } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-treeselect></bl-treeselect>
  </view>
<\/template>`

const disabledCode = `<template>
  <view>
    <bl-treeselect disabled>禁用状态</bl-treeselect>
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
| value | 当前值  | `string \| number \| Array\<string \| number\>` | `null` | 否 |
| defaultValue | 默认值  | `string \| number \| Array\<string \| number\>` | `null` | 否 |
| treeData | 树节点数据  | `Array\<TreeNodeData\>` | `[]` | 否 |
| placeholder | 输入框占位符  | `string` | `请选择` | 否 |
| disabled | 是否禁用  | `boolean` | `false` | 否 |
| allowClear | 是否允许清除  | `boolean` | `true` | 否 |
| multiple | 是否多选  | `boolean` | `false` | 否 |
| showSearch | 是否显示搜索框  | `boolean` | `false` | 否 |
| showLine | 是否显示树连接线  | `boolean` | `false` | 否 |
| showIcon | 是否显示图标  | `boolean` | `false` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值改变事件  | `\(value: string \| number \| Array\<string \| number\>\) =\> void` |
| search | 搜索事件  | `\(value: string\) =\> void` |
| expand | 展开/收起事件  | `\(expandedKeys: Array\<string \| number\>\) =\> void` |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，自定义选择器内容  | - |



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
`uni_modules/belay-unix/components/bl-treeselect/README.md`
