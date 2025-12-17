# BlImage 图片

图片组件，用于图片场景。

## 📦 引入

```typescript
import { BlImage } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-image></bl-image>
  </view>
<\/template>`

const eventCode = `<template>
  <view>
    <bl-image @click="handleClick">点击我</bl-image>
  </view>
<\/template>

<script>
export default {
  methods: {
    handleClick() {
      uni.showToast({
        title: '图片被点击',
        icon: 'none'
      })
    }
  }
}
<\/script>`
</script>

### 基础用法

<ClientOnly>
  <ExamplePreview 
    title="基础用法"
    :code="basicCode"
    :editable="true"
  />
</ClientOnly>

### 点击事件

<ClientOnly>
  <ExamplePreview 
    title="点击事件"
    :code="eventCode"
    :editable="true"
  />
</ClientOnly>

## 📋 Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| src | 图片资源地址  | `string` | - | 否 |
| mode | 图片裁剪、缩放的模式  | `'scaleToFill' \| 'aspectFit' \| 'aspectFill' \| 'widthFix' \| 'heightFix' \| 'top' \| 'bottom' \| 'center' \| 'left' \| 'right' \| 'top left' \| 'top right' \| 'bottom left' \| 'bottom right'` | `scaleToFill` | 否 |
| lazyLoad | 图片懒加载，在即将进入一定范围（上下三屏）时才开始加载  | `boolean` | `false` | 否 |
| fadeShow | 是否开启淡入效果  | `boolean` | `true` | 否 |
| webp | 是否开启 WebP 格式支持  | `boolean` | `false` | 否 |
| showMenuByLongpress | 是否开启长按图片显示识别小程序码菜单  | `boolean` | `false` | 否 |
| draggable | 是否允许拖拽  | `boolean` | `true` | 否 |
| referrerPolicy | 图片的引用地址策略  | `string` | `no-referrer` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| error | 错误事件  | `\(event: any\) =\> void` |
| load | 加载完成事件  | `\(event: any\) =\> void` |
| click | 点击事件  | `\(event: any\) =\> void` |



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
`uni_modules/belay-unix/components/bl-image/README.md`
