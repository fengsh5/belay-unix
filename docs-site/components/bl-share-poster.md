# BlSharePoster 分享海报

分享海报组件，用于生成和展示分享海报。

## 📦 引入

```typescript
import { BlSharePoster } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
// main.uts 或 main.js
import BelayUnix from '@/uni_modules/belay-unix'
app.use(BelayUnix)
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-share-poster 
      :value="posterDescription"
      @imageReady="handleImageReady"
      @imageError="handleError"
    ></bl-share-poster>
  </view>
<\/template>

<script lang="uts">
import type { BlPosterDescription } from '@/uni_modules/belay-unix/components/bl-share-dialog/type.uts'

export default {
  data() {
    return {
      posterDescription: {
        background: '#409eff',
        // 其他海报配置...
      } as BlPosterDescription
    }
  },
  methods: {
    handleImageReady(img: string): void {
      console.log('海报生成成功:', img)
      // 可以保存图片或进行其他操作
    },
    handleError(err: any): void {
      console.error('海报生成失败:', err)
    }
  }
}
<\/script>`

const example2Code = `<template>
  <view>
    <bl-share-poster 
      :value="getPosterDescription"
      @imageReady="handleImageReady"
    ></bl-share-poster>
  </view>
<\/template>

<script lang="uts">
import type { BlPosterDescription } from '@/uni_modules/belay-unix/components/bl-share-dialog/type.uts'

export default {
  methods: {
    async getPosterDescription(): Promise<BlPosterDescription> {
      // 异步获取海报配置
      const config = await this.fetchPosterConfig()
      return {
        background: config.background,
        // 其他配置...
      } as BlPosterDescription
    },
    async fetchPosterConfig(): Promise<any> {
      // 从服务器获取配置
      return {}
    },
    handleImageReady(img: string): void {
      console.log('海报生成成功:', img)
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

### 使用函数返回海报描述

<ClientOnly>
  <ExamplePreview 
    title="使用函数返回海报描述"
    :code="example2Code"
    :editable="true"
  />
</ClientOnly>

## 📋 Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 海报描述，可以是对象或返回对象的函数 | `BlPosterDescription \| (() => BlPosterDescription \| Promise<BlPosterDescription>)` | - | 是 |

### BlPosterDescription 类型

海报描述对象，定义海报的配置信息。详细类型定义请参考 `bl-share-dialog/type.uts`。

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| imageReady | 海报图片生成成功事件 | `(img: string) => void` |
| imageError | 海报图片生成失败事件 | `(err: any) => void` |

## 🎨 Slots

此组件没有插槽。



### 使用函数返回海报描述

```vue
<template>
  <view>
    <bl-share-poster 
      :value="getPosterDescription"
      @imageReady="handleImageReady"
    ></bl-share-poster>
  </view>
</template>

<script lang="uts">
import type { BlPosterDescription } from '@/uni_modules/belay-unix/components/bl-share-dialog/type.uts'

export default {
  methods: {
    async getPosterDescription(): Promise<BlPosterDescription> {
      // 异步获取海报配置
      const config = await this.fetchPosterConfig()
      return {
        background: config.background,
        // 其他配置...
      } as BlPosterDescription
    },
    async fetchPosterConfig(): Promise<any> {
      // 从服务器获取配置
      return {}
    },
    handleImageReady(img: string): void {
      console.log('海报生成成功:', img)
    }
  }
}
</script>
```

## 📝 注意事项

- 此组件支持 uni-app x 和 uni-app 项目
- 使用前请确保已正确引入组件库
- `value` 属性是必填的，可以是对象或返回对象的函数
- 如果 `value` 是函数，它可以是同步或异步的
- 组件内部使用 `bl-poster-painter` 来绘制海报
- 海报默认尺寸为 290px × 430px，缩放比例为 2
- 更多用法请参考组件库文档

## 🔗 相关链接

- [组件库文档](/guide/)
- [BlShareDialog 组件](../bl-share-dialog/README.md)
- [BlPosterPainter 组件](../bl-poster-painter/README.md)
- [主题系统](/theme/)
- [组件索引](/components/)

## 🔗 相关链接

- [组件索引](/components/) - 查看所有组件
- [组件导入说明](/guide/import) - 如何导入组件
- [组件使用说明](/guide/usage) - 如何使用组件

## 📚 完整文档

组件的完整文档请查看组件库源码中的 README 文件：
`uni_modules/belay-unix/components/bl-share-poster/README.md`
