---
layout: home

hero:
  name: Belay-Unix
  text: 组件库
  tagline: 支持 uni-app 和 uni-app x 的跨平台组件库
  image:
    src: /logo.png
    alt: Belay-Unix
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 查看组件
      link: /components/

features:
  - icon: 🚀
    title: 跨平台支持
    details: 支持 uni-app 和 uni-app x，覆盖 App、H5、小程序等多个平台
  - icon: 📦
    title: 107+ 组件
    details: 提供丰富的组件生态，覆盖基础、表单、反馈、展示、导航等场景
  - icon: 🎨
    title: 主题系统
    details: 支持动态主题切换、自定义主题配置，提供浅色和深色主题
  - icon: ⚡
    title: 高性能
    details: 使用 UTS 语言和 .uvue 文件，获得原生性能体验
  - icon: 🔧
    title: 易于使用
    details: 支持全局注册、按需导入、Easycom 自动导入等多种方式
  - icon: 📱
    title: 类型支持
    details: 完整的 TypeScript 类型定义，提供良好的开发体验

---

## 快速开始

### 安装

```bash
# 通过 npm 安装
npm install belay-unix

# 或通过 pnpm
pnpm install belay-unix

# 或通过 yarn
yarn add belay-unix
```

### 使用

```vue
<template>
  <view>
    <bl-button type="primary">按钮</bl-button>
    <bl-input v-model="value" placeholder="请输入" />
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

## 组件分类

<div class="component-grid">
  <div class="component-card">
    <h3>基础组件</h3>
    <p>按钮、输入框、图标、图片等基础 UI 组件</p>
    <a href="/components/">查看组件 →</a>
  </div>
  <div class="component-card">
    <h3>表单组件</h3>
    <p>表单、复选框、单选框、开关等表单相关组件</p>
    <a href="/components/">查看组件 →</a>
  </div>
  <div class="component-card">
    <h3>反馈组件</h3>
    <p>对话框、消息提示、加载中、通知等反馈组件</p>
    <a href="/components/">查看组件 →</a>
  </div>
  <div class="component-card">
    <h3>展示组件</h3>
    <p>表格、标签、卡片、日历等数据展示组件</p>
    <a href="/components/">查看组件 →</a>
  </div>
  <div class="component-card">
    <h3>导航组件</h3>
    <p>标签页、菜单、分页、标签栏等导航组件</p>
    <a href="/components/">查看组件 →</a>
  </div>
  <div class="component-card">
    <h3>布局组件</h3>
    <p>行、列、弹性布局、宫格等布局组件</p>
    <a href="/components/">查看组件 →</a>
  </div>
</div>

<style scoped>
.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.component-card {
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.3s;
}

.component-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.component-card h3 {
  margin-top: 0;
  color: var(--vp-c-text-1);
}

.component-card p {
  color: var(--vp-c-text-2);
  margin: 0.5rem 0;
}

.component-card a {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
}

.component-card a:hover {
  text-decoration: underline;
}
</style>

