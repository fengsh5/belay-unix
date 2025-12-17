# BlEmpty 空状态

空状态组件，用于空状态场景。

## 📦 引入

```typescript
import { BlEmpty } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-empty></bl-empty>
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
| type | 类型  | `'error' \| 'network' \| 'empty' \| 'default' \| 'search' \| 'custom'` | `default` | 否 |
| url | 自定义图标  | `string` | - | 否 |
| showImg | 是否显示提示图  | `boolean` | `true` | 否 |
| desc | 描述  | `string` | - | 否 |
| detail | 详情  | `string` | - | 否 |
| retryText | 重试文本  | `string` | - | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| retry | 重试事件  | `\(\) =\> void` |



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
`uni_modules/belay-unix/components/bl-empty/README.md`
