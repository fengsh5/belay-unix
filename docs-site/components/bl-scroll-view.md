# BlScrollView BlScrollView

BlScrollView组件，用于blscrollview场景。

## 📦 引入

```typescript
import { BlScrollView } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-scroll-view></bl-scroll-view>
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
| customStyle | 自定义样式  | `string` | - | 否 |
| scrollX | 允许横向滚动  | `boolean` | `false` | 否 |
| scrollY | 允许纵向滚动  | `boolean` | `false` | 否 |
| upperThreshold | 距顶部/左边多远时，触发 scrolltoupper 事件  | `number` | `50` | 否 |
| lowerThreshold | 距底部/右边多远时，触发 scrolltolower 事件  | `number` | `50` | 否 |
| scrollTop | 设置竖向滚动条位置  | `number` | `0` | 否 |
| scrollLeft | 设置横向滚动条位置  | `number` | `0` | 否 |
| scrollIntoView | 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素  | `string` | - | 否 |
| scrollWithAnimation | 在设置滚动条位置时使用动画过渡  | `boolean` | `false` | 否 |
| enableBackToTop | iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向  | `boolean` | `false` | 否 |
| enableFlex | 启用 flexbox 布局。开启后，当前节点声明了 display: flex 就会成为 flex container，并作用于其孩子节点。  | `boolean` | `false` | 否 |
| scrollAnchoring | 开启 scroll anchoring 特性，即控制滚动位置不随内容变化而抖动，仅在 iOS 下生效，安卓下可参考 CSS overflow-anchor 属性  | `boolean` | `false` | 否 |
| refresherEnabled | 开启自定义下拉刷新  | `boolean` | `false` | 否 |
| refresherThreshold | 设置自定义下拉刷新阈值  | `number` | `45` | 否 |
| refresherDefaultStyle | 设置自定义下拉刷新默认样式，支持设置 black | white | none， none 表示不使用默认样式  | `'black' \| 'white' \| 'none'` | `black` | 否 |
| refresherBackground | 设置自定义下拉刷新区域背景颜色  | `string` | `#FFF` | 否 |
| refresherTriggered | 设置当前下拉刷新状态，true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发  | `boolean` | `false` | 否 |
| enhanced | 启用增强特性  | `boolean` | `false` | 否 |
| bounces | iOS 下支持，是否回弹  | `boolean` | `true` | 否 |
| showScrollbar | 是否显示滚动条  | `boolean` | `true` | 否 |
| pagingEnabled | 是否开启分页模式  | `boolean` | `false` | 否 |
| fastDeceleration | 是否开启快速滑动  | `boolean` | `false` | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| scroll | 滚动事件  | `\(event: any\) =\> void` |
| scrollToUpper | 滚动到顶部/左边事件  | `\(event: any\) =\> void` |
| scrollToLower | 滚动到底部/右边事件  | `\(event: any\) =\> void` |
| refresherRefresh | 下拉刷新事件  | `\(event: any\) =\> void` |
| refresherRestore | 下拉刷新恢复事件  | `\(event: any\) =\> void` |
| refresherAbort | 下拉刷新中止事件  | `\(event: any\) =\> void` |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，滚动内容  | - |



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
`uni_modules/belay-unix/components/bl-scroll-view/README.md`
