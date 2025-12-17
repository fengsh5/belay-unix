# BlTransfer 穿梭框

穿梭框组件，用于穿梭框场景。

## 📦 引入

```typescript
import { BlTransfer } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-transfer></bl-transfer>
  </view>
<\/template>`

const disabledCode = `<template>
  <view>
    <bl-transfer disabled>禁用状态</bl-transfer>
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
| dataSource | 数据源  | `Array\<TransferItem\>` | `[]` | 否 |
| targetKeys | 已选中的 key 列表  | `Array\<string \| number\>` | `null` | 否 |
| defaultTargetKeys | 默认已选中的 key 列表  | `Array\<string \| number\>` | `[]` | 否 |
| titles | 左侧标题  | `[string` | `[]'源列表` | 否 |
| operations | 操作按钮文案  | `[string` | `[]'` | 否 |
| showSearch | 是否显示搜索框  | `boolean` | `false` | 否 |
| searchPlaceholder | 搜索框占位符  | `[string` | `[]'请输入搜索内容` | 否 |
| disabled | 是否禁用  | `boolean` | `false` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 选中项改变事件  | `\(targetKeys: Array\<string \| number\>` |
| search | 搜索事件  | `\(direction: 'left' \| 'right'` |
| selectChange | 选中项改变事件  | `\(sourceSelectedKeys: Array\<string \| number\>` |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，自定义穿梭框内容  | - |
| item | 自定义列表项内容  | item: TransferItem |



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
`uni_modules/belay-unix/components/bl-transfer/README.md`
