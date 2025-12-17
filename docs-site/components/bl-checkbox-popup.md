# BlCheckboxPopup BlCheckboxPopup

BlCheckboxPopup组件，用于blcheckboxpopup场景。

## 📦 引入

```typescript
import { BlCheckboxPopup } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-checkbox-popup></bl-checkbox-popup>
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

## 📋 Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| visible | 是否显示  | `boolean` | `false` | 否 |
| title | 标题  | `string` | - | 否 |
| options | 选项列表  | `Array\<CheckboxOption\>` | `[]` | 否 |
| value | 当前选中的值数组  | `Array\<string \| number\>` | `[]` | 否 |
| round | 是否显示圆角  | `boolean` | `true` | 否 |
| showConfirm | 是否显示确认按钮  | `boolean` | `true` | 否 |
| confirmText | 确认按钮文本  | `string` | `确定` | 否 |
| overlayClosable | 点击遮罩层是否可关闭  | `boolean` | `true` | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭事件  | `\(\) =\> void` |
| change | 值变化事件  | `\(value: Array\<string \| number\>\) =\> void` |
| confirm | 确认事件  | `\(value: Array\<string \| number\>\) =\> void` |



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
`uni_modules/belay-unix/components/bl-checkbox-popup/README.md`
