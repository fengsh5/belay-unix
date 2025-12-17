# 安装

Belay-Unix 组件库可以通过多种方式安装。

## 安装方式

### 方式一：通过插件市场安装（推荐）

1. 打开 [uni-app 插件市场](https://ext.dcloud.net.cn/)
2. 搜索 `belay-unix`
3. 点击"使用 HBuilderX 导入插件"
4. 组件库会自动安装到项目的 `uni_modules/belay-unix/` 目录

### 方式二：通过 npm 安装

在 uni-app x 或 uni-app 项目中安装：

```bash
# 使用 npm
npm install belay-unix

# 使用 pnpm
pnpm install belay-unix

# 使用 yarn
yarn add belay-unix
```

**⚠️ 重要提示**：通过 npm 安装后，需要手动复制到 `uni_modules/` 目录：

```bash
# 在项目根目录执行
mkdir -p uni_modules
cp -r node_modules/belay-unix uni_modules/
```

### 方式三：通过 Git 安装

```bash
# 克隆仓库
git clone https://github.com/belay-unix/belay-unix.git

# 复制到项目
cp -r belay-unix/uni_modules/belay-unix your-project/uni_modules/
```

## 安装位置

### ✅ 正确位置

```
项目根目录/
  └── uni_modules/
      └── belay-unix/
          ├── components/
          ├── utils/
          ├── styles/
          └── ...
```

### ❌ 错误位置

```
❌ 项目根目录/components/belay-unix/
❌ node_modules/belay-unix/（需要复制到 uni_modules）
❌ src/components/belay-unix/
```

## 验证安装

安装完成后，可以通过以下方式验证：

### 1. 检查文件结构

确认 `uni_modules/belay-unix/` 目录存在，并且包含以下文件：

- `package.json`
- `index.js`
- `index.ts`
- `components/` 目录
- `utils/` 目录
- `styles/` 目录

### 2. 测试导入

在项目中测试导入组件：

```typescript
// main.uts 或 main.js
import BelayUnix from '@/uni_modules/belay-unix'
console.log('Belay-Unix 已安装', BelayUnix)
```

### 3. 使用组件

在页面中使用组件：

```vue
<template>
  <view>
    <bl-button type="primary">测试按钮</bl-button>
  </view>
</template>
```

如果组件正常显示，说明安装成功。

## 环境要求

在安装之前，请确保你的环境满足以下要求：

- **HBuilderX**：^3.9.0
- **uni-app**：^3.6.15
- **uni-app x**：^3.6.15
- **Node.js**：>=16.0.0
- **Vue2**：^2.6.0（如果使用 Vue2）
- **Vue3**：^3.0.0（如果使用 Vue3）

## 常见问题

### 1. 组件未找到

**问题**：使用组件时提示组件未找到

**解决方案**：
- 检查组件是否安装在 `uni_modules/belay-unix/` 目录
- 检查 `pages.json` 中是否配置了 Easycom
- 检查组件导入路径是否正确

### 2. 样式未生效

**问题**：组件显示但样式不正确

**解决方案**：
- 检查是否引入了样式文件
- 检查主题配置是否正确
- 检查 CSS 变量是否可用

### 3. 类型提示不工作

**问题**：TypeScript 类型提示不工作

**解决方案**：
- 检查 `index.ts` 文件是否存在
- 检查 TypeScript 配置是否正确
- 重启 IDE 或重新加载项目

## 下一步

- [快速开始](./getting-started.md) - 开始使用组件库
- [组件导入说明](./import.md) - 了解如何导入组件
- [重要提示](./important.md) - 使用前必读

