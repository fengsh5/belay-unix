# BlSearchBar 搜索栏

搜索栏组件，用于搜索栏场景。

## 📦 引入

```typescript
import { BlSearchBar } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-search-bar></bl-search-bar>
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
| value | 当前值  | `string` | - | 否 |
| placeholder | 占位符  | `string` | - | 否 |
| before | 搜索框外左侧插槽  | `string \| null` | `null` | 否 |
| after | 搜索框外右侧插槽  | `string \| null` | `null` | 否 |
| searchIcon | 自定义搜索图标  | `string \| null` | `null` | 否 |
| clearable | 清空按钮  | `boolean` | `true` | 否 |
| align | 文字对齐方式  | `'left' \| 'center' \| 'right'` | `left` | 否 |
| debounceTime | 防抖时间，单位ms  | `number` | `1000` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值变化事件  | `\(value: string\) =\> void` |
| search | 搜索事件（防抖后触发）  | `\(value: string\) =\> void` |
| clear | 清空事件  | `\(\) =\> void` |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| before | 搜索框外左侧插槽  | - |
| after | 搜索框外右侧插槽  | - |
| searchIcon | 自定义搜索图标插槽  | - |



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
`uni_modules/belay-unix/components/bl-search-bar/README.md`
