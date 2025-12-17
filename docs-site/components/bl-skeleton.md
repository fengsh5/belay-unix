# BlSkeleton 骨架屏

骨架屏组件，用于骨架屏场景。

## 📦 引入

```typescript
import { BlSkeleton } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-skeleton></bl-skeleton>
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
| active | 是否显示动画效果  | `boolean` | `true` | 否 |
| avatar | 是否显示头像占位图  | `boolean` | `false` | 否 |
| avatarSize | 头像占位图大小  | `number \| 'large' \| 'small' \| 'default'` | `default` | 否 |
| avatarShape | 头像占位图形状  | `'circle' \| 'square'` | `circle` | 否 |
| title | 是否显示标题占位图  | `boolean` | `true` | 否 |
| titleWidth | 标题占位图宽度  | `number \| string` | `60%` | 否 |
| paragraph | 是否显示段落占位图  | `boolean` | `true` | 否 |
| paragraphRows | 段落占位图行数  | `number` | `3` | 否 |
| paragraphWidth | 段落占位图宽度  | `number \| string \| Array\<number \| string\>` | `null` | 否 |
| round | 是否显示圆角  | `boolean` | `false` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，自定义骨架屏内容  | - |



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
`uni_modules/belay-unix/components/bl-skeleton/README.md`
