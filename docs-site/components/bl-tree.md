# BlTree 树形控件

树形控件组件，用于树形控件场景。

## 📦 引入

```typescript
import { BlTree } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-tree></bl-tree>
  </view>
<\/template>`

const disabledCode = `<template>
  <view>
    <bl-tree disabled>禁用状态</bl-tree>
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
| treeData | 树节点数据  | `Array\<TreeNodeData\>` | `[]` | 否 |
| checkable | 是否显示复选框  | `boolean` | `false` | 否 |
| defaultExpandAll | 是否默认展开所有节点  | `boolean` | `false` | 否 |
| defaultExpandedKeys | 默认展开的节点 key  | `Array\<string \| number\>` | `[]` | 否 |
| expandedKeys | 当前展开的节点 key（受控）  | `Array\<string \| number\>` | `null` | 否 |
| defaultSelectedKeys | 默认选中的节点 key  | `Array\<string \| number\>` | `[]` | 否 |
| selectedKeys | 当前选中的节点 key（受控）  | `Array\<string \| number\>` | `null` | 否 |
| defaultCheckedKeys | 默认勾选的节点 key  | `Array\<string \| number\>` | `[]` | 否 |
| checkedKeys | 当前勾选的节点 key（受控）  | `Array\<string \| number\>` | `null` | 否 |
| showLine | 是否显示连接线  | `boolean` | `false` | 否 |
| showIcon | 是否显示图标  | `boolean` | `false` | 否 |
| disabled | 是否禁用  | `boolean` | `false` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| expand | 节点展开/收起事件  | `\(expandedKeys: Array\<string \| number\>` |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，自定义树节点内容  | node: TreeNodeData |
| icon | 图标插槽  | node: TreeNodeData |
| title | 标题插槽  | node: TreeNodeData |



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
`uni_modules/belay-unix/components/bl-tree/README.md`
