# 组件导入说明

Belay-Unix 组件库提供了多种组件导入方式，你可以根据项目需求选择合适的方式。

## 📦 导入方式概览

| 导入方式 | 优点 | 缺点 | 适用场景 |
|---------|------|------|---------|
| 全局注册 | 使用简单，无需导入 | 打包体积较大 | 快速开发、小型项目 |
| 按需导入 | 打包体积小，支持 Tree Shaking | 需要手动导入 | 生产环境、大型项目 |
| Easycom | 自动导入，无需配置 | 需要配置 easycom | 推荐方式 |

## 🚀 方式一：全局注册（推荐用于快速开发）

### uni-app x 项目

在 `main.uts` 中注册所有组件：

```typescript
import { createSSRApp } from 'vue'
import App from './App.uvue'
import BelayUnix from '@/uni_modules/belay-unix'

export function createApp() {
  const app = createSSRApp(App)
  app.use(BelayUnix) // 注册所有组件为 kebab-case
  return {
    app
  }
}
```

### uni-app 项目

在 `main.js` 或 `main.ts` 中注册所有组件：

```javascript
import { createSSRApp } from 'vue'
import App from './App.vue'
import BelayUnix from '@/uni_modules/belay-unix'

export function createApp() {
  const app = createSSRApp(App)
  app.use(BelayUnix) // 注册所有组件为 kebab-case
  return {
    app
  }
}
```

### 使用方式

全局注册后，可以直接在模板中使用，无需导入：

```vue
<template>
  <view>
    <bl-button type="primary">按钮</bl-button>
    <bl-input v-model="value" placeholder="请输入" />
    <bl-dialog v-model="visible" title="标题">内容</bl-dialog>
  </view>
</template>

<script lang="uts">
export default {
  data() {
    return {
      value: '',
      visible: false
    }
  }
}
</script>
```

**注意**：全局注册后，组件名使用 **kebab-case**（如 `bl-button`）。

## 📥 方式二：按需导入（推荐用于生产环境）

### 基础用法

在组件中按需导入：

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

### 导入类型定义

如果需要使用组件的类型定义：

```typescript
import type { 
  BlButtonProps, 
  BlButtonEvents,
  BlDialogProps,
  DialogAction 
} from '@/uni_modules/belay-unix/components'
```

### 使用方式

按需导入时，模板中使用的是 **PascalCase**（如 `BlButton`）。

**优点**：
- ✅ 只导入使用的组件，减少打包体积
- ✅ 支持 Tree Shaking
- ✅ 类型提示完整

## 🔧 方式三：Easycom 自动导入（推荐）

### 配置 Easycom

组件库已经配置了 `easycom-config.json`，如果你的项目支持自动扫描，组件会自动导入。

### 手动配置 Easycom

如果需要在 `pages.json` 中手动配置：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^bl-tree-node$": "@/uni_modules/belay-unix/components/bl-tree/node.uvue",
      "^bl-(.+)$": "@/uni_modules/belay-unix/components/bl-$1/index.uvue"
    }
  }
}
```

### 使用方式

配置 Easycom 后，可以直接使用组件，无需导入：

```vue
<template>
  <view>
    <bl-button type="primary">按钮</bl-button>
    <bl-input v-model="value" />
  </view>
</template>
```

**注意**：Easycom 配置后，组件名使用 **kebab-case**（如 `bl-button`）。

详细配置请参考 [Easycom 配置指南](./EASYCOM_GUIDE.md)

## 📋 组件命名规则

### 全局注册 / Easycom

- 组件名：**kebab-case**
- 示例：`bl-button`、`bl-input`、`bl-dialog`

### 按需导入

- 组件名：**PascalCase**
- 示例：`BlButton`、`BlInput`、`BlDialog`

## 🎯 导入方式选择建议

### 小型项目 / 快速开发

推荐使用 **全局注册** 或 **Easycom**：

- ✅ 使用简单，无需导入
- ✅ 快速开发
- ⚠️ 打包体积较大

### 生产环境 / 大型项目

推荐使用 **按需导入**：

- ✅ 打包体积小
- ✅ 支持 Tree Shaking
- ✅ 更好的性能

### 混合使用

也可以混合使用：

```vue
<template>
  <!-- 常用组件使用全局注册 -->
  <bl-button>按钮</bl-button>
  
  <!-- 特殊组件按需导入 -->
  <BlComplexComponent />
</template>

<script lang="uts">
// 只导入特殊组件
import { BlComplexComponent } from '@/uni_modules/belay-unix'

export default {
  components: {
    BlComplexComponent
  }
}
</script>
```

## 📚 所有可导入的组件

### 基础组件

```typescript
import { 
  BlAlert,
  BlAmount,
  BlAvatar,
  BlBadge,
  BlButton,
  BlCell,
  BlDivider,
  BlFlex,
  BlGap,
  BlHairline,
  BlIcon,
  BlImage,
  BlMessage,
  BlRate,
  BlSegmented,
  BlText,
  BlView
} from '@/uni_modules/belay-unix'
```

### 表单组件

```typescript
import {
  BlAutoComplete,
  BlCheckbox,
  BlCheckboxGroup,
  BlCheckboxPopup,
  BlChecker,
  BlCheckerPopup,
  BlForm,
  BlInput,
  BlNumberInput,
  BlRadio,
  BlRadioGroup,
  BlRadioPopup,
  BlSearchBar,
  BlSlider,
  BlSwitch,
  BlTextarea,
  BlTreeSelect,
  BlUploader
} from '@/uni_modules/belay-unix'
```

### 反馈组件

```typescript
import {
  BlDialog,
  BlDrawer,
  BlEmpty,
  BlErrorCapture,
  BlLoading,
  BlModal,
  BlNoticeBar,
  BlNotification,
  BlPopconfirm,
  BlPopup,
  BlProgress,
  BlSpinner,
  BlTour
} from '@/uni_modules/belay-unix'
```

### 展示组件

```typescript
import {
  BlCalendar,
  BlCardLayout,
  BlCollapse,
  BlCountDown,
  BlDescriptions,
  BlFloatButton,
  BlQRCode,
  BlResult,
  BlSkeleton,
  BlStatistic,
  BlTable,
  BlTag,
  BlCheckTag,
  BlSortTag,
  BlTimeline,
  BlTransfer,
  BlTree,
  BlWatermark
} from '@/uni_modules/belay-unix'
```

### 导航组件

```typescript
import {
  BlBackTop,
  BlCustomNavigationBar,
  BlMenu,
  BlPagination,
  BlTabbar,
  BlTabButton,
  BlTabPanel,
  BlTabs,
  BlMPCustomTabbar
} from '@/uni_modules/belay-unix'
```

### 布局组件

```typescript
import {
  BlBottomBar,
  BlCol,
  BlFilter,
  BlFlex,
  BlGrid,
  BlGridItem,
  BlPage,
  BlPageStyle,
  BlRow,
  BlScrollView,
  BlListView,
  BlSpace
} from '@/uni_modules/belay-unix'
```

### 其他组件

```typescript
import {
  BlPickerCascaderSelector,
  BlPickerDate,
  BlPickerMultiSelector,
  BlPickerSelector,
  BlPickerTime,
  BlPortal,
  BlPosterPainter,
  BlPreviewContext,
  BlShareAppMessage,
  BlShareDialog,
  BlStep,
  BlSteps,
  BlSwiper,
  BlTheme,
  BlThemeProvider,
  BlThemeRoot,
  BlI18nProvider,
  BlVideo
} from '@/uni_modules/belay-unix'
```

## 🔗 相关文档

- [重要提示](./IMPORTANT.md) - 使用前必读
- [组件使用说明](./COMPONENT_USAGE.md) - 如何使用组件
- [组件索引](./COMPONENTS.md) - 所有组件列表
- [Easycom 配置指南](./EASYCOM_GUIDE.md) - Easycom 配置

