# BlTour 漫游式引导

漫游式引导组件，用于漫游式引导场景。

## 📦 引入

```typescript
import { BlTour } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-tour></bl-tour>
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
| open | 是否显示引导  | `boolean` | `false` | 否 |
| steps | 引导步骤  | `Array\<TourStep\>` | `[]` | 否 |
| current | 当前步骤索引  | `number` | `null` | 否 |
| defaultCurrent | 默认当前步骤索引  | `number` | `0` | 否 |
| mask | 是否显示遮罩层  | `boolean` | `true` | 否 |
| maskStyle | 遮罩层样式  | `Record\<string` | `({` | 否 |
| closable | 是否显示关闭按钮  | `boolean` | `true` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭事件  | `\(\) =\> void` |
| change | 步骤改变事件  | `\(current: number\) =\> void` |
| finish | 完成事件  | `\(\) =\> void` |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，自定义引导内容  | - |
| step | 自定义步骤内容  | - |



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
`uni_modules/belay-unix/components/bl-tour/README.md`
