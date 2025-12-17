# BlPickerMultiSelector BlPickerMultiSelector

BlPickerMultiSelector组件，用于blpickermultiselector场景。

## 📦 引入

```typescript
import { BlPickerMultiSelector } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-picker-multi-selector></bl-picker-multi-selector>
  </view>
<\/template>`

const disabledCode = `<template>
  <view>
    <bl-picker-multi-selector disabled>禁用状态</bl-picker-multi-selector>
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
| value | 当前选中的值，数组形式  | `Array\<any\>` | `[]` | 否 |
| range | 选项数组，二维数组  | `Array\<Array\<any\>\>` | `[]` | 否 |
| rangeKey | 当 range 是一个 Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容  | `string` | - | 否 |
| disabled | 是否禁用  | `boolean` | `false` | 否 |
| placeholder | 占位符  | `string` | `请选择` | 否 |
| showArrow | 是否显示箭头  | `boolean` | `true` | 否 |
| formatter | 显示文本格式化函数  | `\(\(texts: string[]` | `null` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值变化事件  | `\(value: Array\<any\>` |
| columnChange | 列变化事件  | `\(event: \{ column: number` |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，自定义触发元素  | - |



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
`uni_modules/belay-unix/components/bl-picker-multi-selector/README.md`
