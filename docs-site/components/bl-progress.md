# BlProgress 进度条

进度条组件，用于进度条场景。

## 📦 引入

```typescript
import { BlProgress } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-progress></bl-progress>
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
| type | 进度条类型  | `'circle' \| 'line' \| 'dashboard'` | `line` | 否 |
| percent | 进度百分比  | `number` | `0` | 否 |
| activeColor | 进度条颜色  | `string` | `#09BB07` | 否 |
| backgroundColor | 进度条背景色  | `string` | `#EBEBEB` | 否 |
| width | 进度条宽度（线性）或大小（圆形）  | `number \| string \| null` | `null` | 否 |
| strokeWidth | 进度条高度（仅线性）  | `number` | `6` | 否 |
| strokeLinecap | 进度条显示弧形（仅圆形）  | `string` | `round` | 否 |
| showInfo | 是否显示进度文字  | `boolean` | `true` | 否 |
| contentClassName | 显示进度内容类名  | `string` | - | 否 |
| contentStyle | 显示进度内容样式  | `string` | - | 否 |
| fontSize | 字体大小  | `number` | `16` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，进度文字内容  | - |



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
`uni_modules/belay-unix/components/bl-progress/README.md`
