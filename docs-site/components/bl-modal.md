# BlModal 模态框

模态框组件，用于模态框场景。

## 📦 引入

```typescript
import { BlModal } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-modal></bl-modal>
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
| visible | 是否显示Modal  | `boolean` | `false` | 否 |
| overlayClassName | 遮罩层类名  | `string` | - | 否 |
| overlayStyle | 遮罩层样式  | `string` | - | 否 |
| overlayClosable | 点击遮罩层是否可关闭  | `boolean` | `true` | 否 |
| contentClassName | 弹窗类名  | `string` | - | 否 |
| contentStyle | 弹窗样式  | `string` | - | 否 |
| destroyOnClose | 关闭弹窗时销毁子节点  | `boolean` | `false` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭事件  | `\(\) =\> void` |
| clickOverlay | 点击遮罩层事件  | `\(\) =\> void` |
| beforeClose | 关闭前事件  | `\(done: \(\) =\> void` |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，弹窗内容  | - |



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
`uni_modules/belay-unix/components/bl-modal/README.md`
