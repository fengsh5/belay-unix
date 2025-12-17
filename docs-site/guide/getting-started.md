# 快速开始

本指南将帮助你在几分钟内开始使用 Belay-Unix 组件库。

## 安装

### 方式一：通过插件市场安装（推荐）

1. 打开 [uni-app 插件市场](https://ext.dcloud.net.cn/)
2. 搜索 `belay-unix`
3. 点击"使用 HBuilderX 导入插件"
4. 组件库会自动安装到项目的 `uni_modules/belay-unix/` 目录

### 方式二：通过 npm 安装

```bash
npm install belay-unix
# 或
pnpm install belay-unix
# 或
yarn add belay-unix
```

**⚠️ 重要提示**：通过 npm 安装后，需要手动复制到 `uni_modules/` 目录：

```bash
mkdir -p uni_modules
cp -r node_modules/belay-unix uni_modules/
```

## 使用方式

### 方式一：全局注册（推荐用于快速开发）

在 `main.uts`（uni-app x）或 `main.js`（uni-app）中：

```typescript
import { createSSRApp } from 'vue'
import App from './App.uvue'
import BelayUnix from '@/uni_modules/belay-unix'

export function createApp() {
  const app = createSSRApp(App)
  app.use(BelayUnix)
  return { app }
}
```

然后在模板中直接使用：

```vue
<template>
  <view>
    <bl-button type="primary">按钮</bl-button>
    <bl-input v-model="value" placeholder="请输入" />
  </view>
</template>
```

### 方式二：按需导入（推荐用于生产环境）

```vue
<template>
  <view>
    <BlButton type="primary">按钮</BlButton>
    <BlInput v-model="value" placeholder="请输入" />
  </view>
</template>

<script lang="uts">
import { BlButton, BlInput } from '@/uni_modules/belay-unix'

export default {
  components: {
    BlButton,
    BlInput
  },
  data() {
    return {
      value: ''
    }
  }
}
</script>
```

## 第一个示例

创建一个简单的页面：

```vue
<template>
  <view class="container">
    <bl-button type="primary" @click="handleClick">
      点击我
    </bl-button>
    <bl-input v-model="inputValue" placeholder="请输入内容" />
    <text>输入的值：{{ inputValue }}</text>
  </view>
</template>

<script lang="uts">
import { BlButton, BlInput } from '@/uni_modules/belay-unix'

export default {
  components: {
    BlButton,
    BlInput
  },
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    handleClick(): void {
      uni.showToast({
        title: '按钮被点击',
        icon: 'none'
      })
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
}
</style>
```

## 下一步

- [组件导入说明](./import.md) - 了解不同的导入方式
- [组件使用说明](./usage.md) - 学习如何使用组件
- [查看所有组件](/components/) - 浏览组件库中的所有组件

