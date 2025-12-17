# BlCalendar 日历

日历组件，用于日历场景。

## 📦 引入

```typescript
import { BlCalendar } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-calendar></bl-calendar>
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
| value | 当前日期  | `Date \| string` | `null` | 否 |
| defaultValue | 默认日期  | `Date \| string` | `null` | 否 |
| mode | 日历模式  | `CalendarMode` | `month` | 否 |
| fullscreen | 是否全屏显示  | `boolean` | `true` | 否 |
| dateCellRender | 自定义日期单元格内容  | `\(date: Date\) =\> any` | - | 否 |
| monthCellRender | 自定义月份单元格内容  | `\(date: Date\) =\> any` | - | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 日期选择事件  | `\(date: Date\) =\> void` |
| panelChange | 面板改变事件  | `\(date: Date` |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，自定义日历内容  | - |
| dateCell | 自定义日期单元格内容  | date: Date |
| monthCell | 自定义月份单元格内容  | date: Date |



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
`uni_modules/belay-unix/components/bl-calendar/README.md`
