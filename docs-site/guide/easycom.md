# Easycom 配置指南

Easycom 是 uni-app 提供的组件自动导入机制，可以让你无需手动导入组件，直接使用。

## 📋 目录

- [什么是 Easycom](#什么是-easycom)
- [自动配置](#自动配置)
- [手动配置](#手动配置)
- [配置说明](#配置说明)
- [使用方式](#使用方式)
- [常见问题](#常见问题)

## 🤔 什么是 Easycom

Easycom 是 uni-app 提供的组件自动导入机制，可以让你：

- ✅ 无需手动导入组件
- ✅ 无需在 `components` 中注册组件
- ✅ 直接使用组件，就像使用内置组件一样

## ⚙️ 自动配置

Belay-Unix 组件库已经配置了 `easycom-config.json`，如果你的项目支持自动扫描，组件会自动导入。

### 检查是否已启用

在 `pages.json` 中检查是否有 `easycom` 配置：

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

如果已经有配置，说明 Easycom 已启用，可以直接使用组件。

## 🔧 手动配置

如果项目没有自动配置，可以手动在 `pages.json` 中添加配置。

### uni-app x 项目

在 `pages.json` 中添加：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^bl-tree-node$": "@/uni_modules/belay-unix/components/bl-tree/node.uvue",
      "^bl-(.+)$": "@/uni_modules/belay-unix/components/bl-$1/index.uvue"
    }
  },
  "pages": [
    // ... 你的页面配置
  ]
}
```

### uni-app 项目（Vue2/Vue3）

在 `pages.json` 中添加：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^bl-tree-node$": "@/uni_modules/belay-unix/components/bl-tree/node.vue",
      "^bl-(.+)$": "@/uni_modules/belay-unix/components/bl-$1/index.vue"
    }
  },
  "pages": [
    // ... 你的页面配置
  ]
}
```

### 混合配置（同时支持 .uvue 和 .vue）

如果需要同时支持 uni-app x 和 uni-app 项目：

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

**注意**：uni-app 编译器会自动查找 `.vue` 文件，所以配置 `.uvue` 即可。

## 📝 配置说明

### autoscan

```json
{
  "easycom": {
    "autoscan": true
  }
}
```

- `true`：启用自动扫描，会自动扫描 `uni_modules` 目录下的 `easycom-config.json`
- `false`：禁用自动扫描，需要手动配置

### custom

```json
{
  "easycom": {
    "custom": {
      "^bl-tree-node$": "@/uni_modules/belay-unix/components/bl-tree/node.uvue",
      "^bl-(.+)$": "@/uni_modules/belay-unix/components/bl-$1/index.uvue"
    }
  }
}
```

自定义组件匹配规则：

- `^bl-tree-node$`：精确匹配 `bl-tree-node` 组件
- `^bl-(.+)$`：匹配所有以 `bl-` 开头的组件，如 `bl-button`、`bl-input` 等

### 路径说明

- `@/`：项目根目录的别名
- `@/uni_modules/belay-unix/components/bl-button/index.uvue`：组件文件路径

## 🎯 使用方式

配置 Easycom 后，可以直接使用组件，无需导入：

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

**注意**：使用 Easycom 时，组件名使用 **kebab-case**（如 `bl-button`）。

## 🔍 组件名规则

### 组件名格式

- **kebab-case**：`bl-button`、`bl-input`、`bl-dialog`
- **PascalCase**：`BlButton`、`BlInput`、`BlDialog`（不推荐，可能不工作）

### 组件名映射

| 组件目录 | 组件名 |
|---------|--------|
| `bl-button` | `bl-button` |
| `bl-input` | `bl-input` |
| `bl-dialog` | `bl-dialog` |
| `bl-tree/node` | `bl-tree-node` |

## ❓ 常见问题

### 1. 组件未找到

**问题**：使用组件时提示组件未找到

**解决方案**：

1. 检查 `pages.json` 中是否有 `easycom` 配置
2. 检查组件路径是否正确
3. 检查组件文件是否存在

### 2. 组件名不匹配

**问题**：组件名使用 PascalCase 不工作

**解决方案**：

使用 kebab-case 格式的组件名：

```vue
<!-- ✅ 正确 -->
<bl-button>按钮</bl-button>

<!-- ❌ 错误 -->
<BlButton>按钮</BlButton>
```

### 3. 自动扫描不工作

**问题**：设置了 `autoscan: true` 但组件未自动导入

**解决方案**：

1. 检查 `uni_modules/belay-unix/easycom-config.json` 文件是否存在
2. 检查文件内容是否正确
3. 尝试手动配置 `custom` 规则

### 4. 同时使用多个组件库

**问题**：项目中有多个组件库，Easycom 配置冲突

**解决方案**：

在 `custom` 中配置多个规则：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^bl-(.+)$": "@/uni_modules/belay-unix/components/bl-$1/index.uvue",
      "^other-(.+)$": "@/uni_modules/other-library/components/other-$1/index.uvue"
    }
  }
}
```

### 5. 条件编译支持

**问题**：某些组件只在特定平台可用

**解决方案**：

使用条件编译：

```vue
<template>
  <view>
    <!-- #ifdef APP -->
    <bl-custom-navigation-bar title="标题" />
    <!-- #endif -->
    
    <!-- #ifdef MP-WEIXIN -->
    <bl-mp-custom-tabbar :list="tabbarList" />
    <!-- #endif -->
  </view>
</template>
```

## 🔗 相关文档

- [组件导入说明](./IMPORT.md) - 如何导入组件
- [组件使用说明](./COMPONENT_USAGE.md) - 如何使用组件
- [重要提示](./IMPORTANT.md) - 使用前必读

## 📚 参考资源

- [uni-app Easycom 文档](https://uniapp.dcloud.net.cn/collocation/pages.html#easycom)
- [easycom-config.json 文件](../easycom-config.json)

