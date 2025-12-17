# BlCountDown 倒计时

倒计时组件，用于倒计时场景。

## 📦 引入

```typescript
import { BlCountDown } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-count-down></bl-count-down>
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
| itemClassName | 组件中item的类名  | `string` | - | 否 |
| itemStyle | 组件中item的样式  | `string` | - | 否 |
| delimiterClassName | 组件中分割线的类名  | `string` | - | 否 |
| delimiterStyle | 组件中分割线的样式  | `string` | - | 否 |
| duration | 延时多久执行一次定时操作（单位：ms）  | `number` | `1000` | 否 |
| separateData | 自定义分隔符  | `CountDownSeparateData` | `({
					dayUnit: ' ` | 否 |
| isRemainTime | 表示 futureTime 为毫秒形式的剩余时间  | `boolean` | `false` | 否 |
| futureTime | 目标时间  | `number \| string \| Date \| null` | `null` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| finish | 倒计时结束事件  | `\(\) =\> void` |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，自定义倒计时显示内容  | - |



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
`uni_modules/belay-unix/components/bl-count-down/README.md`
