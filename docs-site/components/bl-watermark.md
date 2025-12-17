# BlWatermark 水印

水印组件，用于水印场景。

## 📦 引入

```typescript
import { BlWatermark } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-watermark></bl-watermark>
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
| content | 水印内容  | `string \| Array\<string\>` | - | 否 |
| width | 水印宽度  | `number` | `120` | 否 |
| height | 水印高度  | `number` | `64` | 否 |
| image | 水印图片地址  | `string` | - | 否 |
| font | 水印文字样式  | `WatermarkFont` | `({
					color: 'rgba(0` | 否 |
| rotate | 水印旋转角度  | `number` | `-22` | 否 |
| opacity | 水印透明度  | `number` | `1` | 否 |
| gap | 水印间距  | `[number` | `[]100` | 否 |
| offset | 水印偏移量  | `[number` | `[]0` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，需要添加水印的内容  | - |



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
`uni_modules/belay-unix/components/bl-watermark/README.md`
