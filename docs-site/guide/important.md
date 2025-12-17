# ⚠️ 重要提示

在使用 Belay-Unix 组件库之前，请务必阅读以下重要提示。

## 📌 适用项目类型

### ✅ 支持的项目类型

- **uni-app x 项目**（推荐）
  - 使用 `.uvue` 文件
  - 使用 UTS 语言
  - 支持原生性能优化

- **uni-app 项目**
  - Vue2 项目（`.vue` 文件）
  - Vue3 项目（`.vue` 文件）

### ❌ 不支持的项目类型

- **纯 Web 项目**（Vite/Webpack）
- **纯 Vue 项目**（不使用 uni-app 框架）
- **React 项目**
- **其他非 uni-app 框架项目**

## 🚫 为什么不能在纯 Web 项目中使用？

### 1. `.uts` 文件支持

组件库使用了 **UTS 语言**（`.uts` 文件），这是 uni-app x 特有的语言，需要 uni-app x 编译器处理。

- ❌ Vite/Webpack 等纯 Web 构建工具无法处理 `.uts` 文件
- ✅ 只能在 uni-app x 项目中使用

### 2. `.uvue` 文件支持

组件使用了 **`.uvue` 文件格式**，这是 uni-app x 特有的组件格式。

- ❌ 纯 Web 构建工具无法处理 `.uvue` 文件
- ✅ 只能在 uni-app x 项目中使用

### 3. `.vue` 文件依赖

虽然组件同时提供了 `.vue` 文件，但这些文件：

- 依赖 uni-app 框架提供的 API（如 `uni.showToast`、`uni.request` 等）
- 使用了 uni-app 特有的组件（如 `<view>`、`<text>` 等）
- 需要 uni-app 编译器处理

### 4. 编译器支持

- **uni-app x 编译器**：可以处理 `.uts`、`.uvue` 文件
- **uni-app 编译器**：可以处理 `.vue` 文件，并提供 uni-app API
- **Vite/Webpack**：无法处理 `.uts`、`.uvue` 文件，也无法提供 uni-app API

### 5. 框架依赖

组件库依赖 uni-app 框架提供的功能：

- `uni.showToast` - 消息提示
- `uni.request` - 网络请求
- `uni.getSystemInfo` - 系统信息
- `uni.setStorageSync` - 本地存储
- 等等...

这些 API 在纯 Web 项目中不可用。

## 📦 安装位置要求

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

## 🔧 环境要求

### HBuilderX 版本

- **最低版本**：HBuilderX 3.9.0
- **推荐版本**：最新版本

### uni-app 版本

- **uni-app**：^3.6.15
- **uni-app x**：^3.6.15

### Node.js 版本

- **最低版本**：Node.js 16.0.0
- **推荐版本**：Node.js 18+ 或 20+

### Vue 版本

- **Vue2**：^2.6.0
- **Vue3**：^3.0.0

## ⚡ 性能注意事项

### uni-app x 项目

- 使用 `.uvue` 文件可以获得原生性能
- 使用 UTS 语言可以获得更好的性能
- 推荐使用按需导入，减少打包体积

### uni-app 项目

- 使用 `.vue` 文件
- 支持 Vue2 和 Vue3
- 推荐使用按需导入，减少打包体积

## 🎨 样式注意事项

### ucss 规范

在 uni-app x 项目中，样式需要遵循 **ucss 规范**：

- ✅ 仅支持 flex 布局或绝对定位
- ✅ 仅支持基本的类选择器
- ✅ 文字内容需放置在 `<text>` 或 `<button>` 中
- ✅ 仅支持 px、rpx、百分比单位
- ❌ 不支持浮动、网格布局
- ❌ 不支持复杂的 CSS 选择器

详细规范请参考 [uni-app x 样式规范](https://doc.dcloud.net.cn/uni-app-x/ucss.html)

## 🔄 版本兼容性

### 组件库版本

- 当前版本：**1.0.0**
- 查看更新日志：[changelog.md](../changelog.md)

### 平台兼容性

组件库支持以下平台：

- ✅ App（Android、iOS、HarmonyOS）
- ✅ H5（Web）
- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ 百度小程序
- ✅ 字节跳动小程序
- ✅ QQ 小程序
- ✅ 快手小程序
- ✅ 京东小程序
- ✅ 小红书小程序

## 📚 相关文档

- [组件导入说明](./IMPORT.md) - 如何导入组件
- [组件使用说明](./COMPONENT_USAGE.md) - 如何使用组件
- [组件索引](./COMPONENTS.md) - 所有组件列表
- [主题系统使用指南](./THEME.md) - 主题系统使用
- [Easycom 配置](./EASYCOM_GUIDE.md) - Easycom 配置

## 🆘 获取帮助

如果遇到问题：

1. 查看 [故障排除文档](./SOLUTION.md)
2. 查看 [组件库 README](../README.md)
3. 提交 [Issue](https://github.com/belay-unix/belay-unix/issues)

