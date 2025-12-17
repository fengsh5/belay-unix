# 主题系统使用指南

Belay-Unix 组件库提供了完整的主题系统，支持动态主题切换、自定义主题配置等功能。

## 📋 目录

- [主题系统概述](#主题系统概述)
- [快速开始](#快速开始)
- [主题配置](#主题配置)
- [主题切换](#主题切换)
- [自定义主题](#自定义主题)
- [CSS 变量](#css-变量)
- [SCSS 变量](#scss-变量)
- [最佳实践](#最佳实践)

## 🎨 主题系统概述

Belay-Unix 主题系统提供了两套变量系统：

1. **SCSS 变量**（编译时）：用于生成基础样式和 mixins
2. **CSS 变量**（运行时）：用于动态主题切换

### 为什么需要两套系统？

- **SCSS 变量**：编译时处理，性能更好，用于 mixins 和静态样式
- **CSS 变量**：运行时切换，支持动态主题切换和用户自定义

## 🚀 快速开始

### 方式一：使用 BlThemeProvider 组件（推荐）

类似 Ant Design 的 `ConfigProvider`，通过组件包裹应用并传递主题配置：

```vue
<template>
  <bl-theme-provider :theme="themeConfig">
    <view class="app">
      <text class="title">我的应用</text>
      <bl-button type="primary">按钮</bl-button>
    </view>
  </bl-theme-provider>
</template>

<script lang="uts">
import type { ThemeConfig } from '@/uni_modules/belay-unix/utils/BlTheme/index.uts'

export default {
  data() {
    return {
      themeConfig: {
        'primary-color': '#409eff',
        'background-color': '#ffffff',
        'text-color': '#333333'
      } as ThemeConfig
    }
  }
}
</script>

<style>
.app {
  background-color: var(--bl-background-color);
  padding: var(--bl-spacing-md);
}

.title {
  color: var(--bl-text-color);
  font-size: var(--bl-font-size-lg);
}
</style>
```

### 方式二：使用 BlTheme 工具类（推荐）

通过全局配置方法动态切换主题：

```typescript
import { BlTheme } from '@/uni_modules/belay-unix/utils/BlTheme/index.uts'

// 配置主题
BlTheme.config({
  theme: {
    'primary-color': '#25b864',
    'background-color': '#ffffff',
    'text-color': '#333333'
  }
})

// 获取当前主题配置
const currentTheme = BlTheme.getTheme()

// 切换预设主题
BlTheme.setPresetTheme('light') // 或 'dark'

// 重置主题
BlTheme.resetTheme('light')
```

## ⚙️ 主题配置

### 主题配置对象

```typescript
type ThemeConfig = {
  'primary-color': string
  'success-color': string
  'warning-color': string
  'danger-color': string
  'background-color': string
  'text-color': string
  'text-color-secondary': string
  'border-color': string
  'border-radius': string
  'font-size-sm': string
  'font-size-md': string
  'font-size-lg': string
  'spacing-xs': string
  'spacing-sm': string
  'spacing-md': string
  'spacing-lg': string
  'spacing-xl': string
  // ... 更多变量
}
```

### 预设主题

组件库提供了两个预设主题：

- **light**：浅色主题（默认）
- **dark**：深色主题

```typescript
import { BlTheme } from '@/uni_modules/belay-unix/utils/BlTheme/index.uts'

// 切换到浅色主题
BlTheme.setPresetTheme('light')

// 切换到深色主题
BlTheme.setPresetTheme('dark')
```

## 🔄 主题切换

### 动态切换主题

```vue
<template>
  <view>
    <bl-button @click="switchToLight">浅色主题</bl-button>
    <bl-button @click="switchToDark">深色主题</bl-button>
    <bl-button @click="switchToCustom">自定义主题</bl-button>
  </view>
</template>

<script lang="uts">
import { BlTheme } from '@/uni_modules/belay-unix/utils/BlTheme/index.uts'

export default {
  methods: {
    switchToLight(): void {
      BlTheme.setPresetTheme('light')
    },
    switchToDark(): void {
      BlTheme.setPresetTheme('dark')
    },
    switchToCustom(): void {
      BlTheme.config({
        theme: {
          'primary-color': '#ff6b6b',
          'background-color': '#f8f9fa',
          'text-color': '#212529'
        }
      })
    }
  }
}
</script>
```

### 监听主题变更

```typescript
import { BlTheme } from '@/uni_modules/belay-unix/utils/BlTheme/index.uts'

// 添加主题变更监听器
BlTheme.onThemeChange((themeConfig) => {
  console.log('主题已变更', themeConfig)
  // 执行主题变更后的操作
})

// 移除监听器
const listener = (themeConfig: ThemeConfig) => {
  console.log('主题变更', themeConfig)
}
BlTheme.onThemeChange(listener)
BlTheme.offThemeChange(listener)
```

## 🎨 自定义主题

### 自定义主题颜色

```typescript
import { BlTheme } from '@/uni_modules/belay-unix/utils/BlTheme/index.uts'

// 自定义主题
BlTheme.config({
  theme: {
    'primary-color': '#1890ff',
    'success-color': '#52c41a',
    'warning-color': '#faad14',
    'danger-color': '#f5222d',
    'background-color': '#ffffff',
    'text-color': '#000000'
  }
})
```

### 自定义主题变量

```typescript
import { BlTheme } from '@/uni_modules/belay-unix/utils/BlTheme/index.uts'

// 自定义所有主题变量
BlTheme.config({
  theme: {
    'primary-color': '#409eff',
    'background-color': '#f5f5f5',
    'text-color': '#333333',
    'border-color': '#e4e7ed',
    'border-radius': '4px',
    'font-size-sm': '12px',
    'font-size-md': '14px',
    'font-size-lg': '16px',
    'spacing-xs': '4px',
    'spacing-sm': '8px',
    'spacing-md': '16px',
    'spacing-lg': '24px',
    'spacing-xl': '32px'
  }
})
```

## 🎯 CSS 变量

### 使用 CSS 变量

组件库会自动将主题配置转换为 CSS 变量，你可以在样式中直接使用：

```vue
<template>
  <view class="container">
    <text class="title">标题</text>
    <bl-button type="primary">按钮</bl-button>
  </view>
</template>

<style>
.container {
  background-color: var(--bl-background-color);
  padding: var(--bl-spacing-md);
  border-radius: var(--bl-border-radius);
}

.title {
  color: var(--bl-text-color);
  font-size: var(--bl-font-size-lg);
}
</style>
```

### 可用的 CSS 变量

```css
/* 颜色变量 */
--bl-primary-color
--bl-success-color
--bl-warning-color
--bl-danger-color
--bl-background-color
--bl-text-color
--bl-text-color-secondary
--bl-border-color

/* 尺寸变量 */
--bl-border-radius
--bl-font-size-sm
--bl-font-size-md
--bl-font-size-lg
--bl-spacing-xs
--bl-spacing-sm
--bl-spacing-md
--bl-spacing-lg
--bl-spacing-xl

/* ... 更多变量 */
```

## 📦 SCSS 变量

### 导入 SCSS 变量

```scss
@import '@/uni_modules/belay-unix/styles/variables.scss';

// 使用 SCSS 变量
.my-component {
  background-color: $background-color;
  color: $text-color;
  border-radius: $border-radius;
}
```

### 混合使用 CSS 变量和 SCSS 变量

```scss
@import '@/uni_modules/belay-unix/styles/variables.scss';

.my-component {
  // CSS 变量（运行时）+ SCSS 变量（后备）
  color: var(--bl-text-color, $text-color);
  background-color: var(--bl-background-color, $background-color);
  padding: var(--bl-spacing-md, $spacing-md);
}
```

## 💡 最佳实践

### 1. 使用 CSS 变量进行主题切换

```css
/* ✅ 推荐：使用 CSS 变量 */
.my-component {
  color: var(--bl-text-color);
  background-color: var(--bl-background-color);
}

/* ❌ 不推荐：直接使用固定颜色 */
.my-component {
  color: #333333;
  background-color: #ffffff;
}
```

### 2. 使用 SCSS 变量作为后备值

```scss
/* ✅ 推荐：CSS 变量 + SCSS 变量后备 */
.my-component {
  color: var(--bl-text-color, $text-color);
}

/* ❌ 不推荐：只使用 CSS 变量，没有后备 */
.my-component {
  color: var(--bl-text-color);
}
```

### 3. 在组件初始化时配置主题

```typescript
// main.uts 或 App.vue
import { BlTheme } from '@/uni_modules/belay-unix/utils/BlTheme/index.uts'

// 应用启动时配置主题
BlTheme.config({
  theme: {
    'primary-color': '#409eff'
  }
})
```

### 4. 保存用户主题偏好

```typescript
import { BlTheme } from '@/uni_modules/belay-unix/utils/BlTheme/index.uts'

// 监听主题变更并保存
BlTheme.onThemeChange((themeConfig) => {
  // 保存到本地存储
  uni.setStorageSync('user-theme', themeConfig)
})

// 应用启动时恢复用户主题
const savedTheme = uni.getStorageSync('user-theme')
if (savedTheme) {
  BlTheme.config({ theme: savedTheme })
}
```

### 5. 使用 BlThemeProvider 包裹应用

```vue
<template>
  <bl-theme-provider :theme="themeConfig" @theme-change="handleThemeChange">
    <view class="app">
      <!-- 应用内容 -->
    </view>
  </bl-theme-provider>
</template>

<script lang="uts">
export default {
  data() {
    return {
      themeConfig: {
        'primary-color': '#409eff'
      }
    }
  },
  methods: {
    handleThemeChange(themeName: string): void {
      console.log('主题已切换为：', themeName)
    }
  }
}
</script>
```

## 🔗 相关文档

- [组件使用说明](./COMPONENT_USAGE.md) - 如何使用组件
- [组件索引](./COMPONENTS.md) - 所有组件列表
- [重要提示](./IMPORTANT.md) - 使用前必读

## 📚 参考资源

- [BlTheme 工具文档](../utils/BlTheme/README.md)
- [样式系统文档](../styles/README.md)
- [SCSS 变量文件](../styles/variables.scss)

