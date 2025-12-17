# Belay-Unix 文档网站

这是 Belay-Unix 组件库的文档网站，基于 [VitePress](https://vitepress.dev/) 构建。

## 本地开发

### 安装依赖

```bash
npm install
# 或
pnpm install
# 或
yarn install
```

### 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
# 或
yarn dev
```

开发服务器将在 `http://localhost:5173` 启动。

**注意**：本地开发时，base 路径为 `/`，所以访问地址是：
- 首页：`http://localhost:5173/`
- 组件：`http://localhost:5173/components/`
- 指南：`http://localhost:5173/guide/`

### 构建

```bash
# 生产环境构建（base 路径为 /belay-unix/）
npm run build

# 本地构建（base 路径为 /）
npm run build:local
```

构建产物将输出到 `.vitepress/dist` 目录。

### 预览构建结果

```bash
npm run preview
# 或
pnpm preview
# 或
yarn preview
```

## 部署

### 部署到 GitHub Pages

1. 使用 `npm run build` 构建（会自动设置 base 为 `/belay-unix/`）

2. 在项目根目录创建 `.github/workflows/deploy.yml`（已创建）

3. 在 GitHub 仓库设置中启用 Pages：
   - 进入仓库 Settings → Pages
   - Source 选择 "GitHub Actions"

4. 推送代码到 GitHub，GitHub Actions 会自动部署。

### 部署到 Vercel

1. 安装 Vercel CLI：

```bash
npm i -g vercel
```

2. 在 `docs-site` 目录下运行：

```bash
vercel
```

3. 按照提示完成部署。

### 部署到 Netlify

1. 在项目根目录创建 `netlify.toml`（已创建）

2. 在 Netlify 控制台连接 GitHub 仓库并部署。

### 部署到其他平台

构建产物在 `.vitepress/dist` 目录，可以部署到任何静态网站托管服务：

- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages
- 阿里云 OSS
- 腾讯云 COS
- 等等...

## 目录结构

```
docs-site/
├── .vitepress/
│   └── config.js          # VitePress 配置
├── guide/                 # 指南文档
│   ├── index.md
│   ├── getting-started.md
│   ├── installation.md
│   ├── important.md
│   ├── import.md
│   ├── usage.md
│   └── easycom.md
├── components/            # 组件文档
│   └── index.md
├── theme/                 # 主题文档
│   └── index.md
├── index.md               # 首页
├── package.json
└── README.md
```

## 自定义配置

### 修改网站信息

编辑 `.vitepress/config.js`：

```javascript
export default defineConfig({
  title: '你的网站标题',
  description: '网站描述',
  base: '/', // 本地开发时使用 '/'
  // ...
})
```

### 修改导航

在 `.vitepress/config.js` 的 `themeConfig.nav` 中修改导航菜单。

### 修改侧边栏

在 `.vitepress/config.js` 的 `themeConfig.sidebar` 中修改侧边栏配置。

## 更新文档

1. 修改对应的 Markdown 文件
2. 本地预览：`npm run dev`
3. 确认无误后提交代码
4. 自动部署（如果配置了 CI/CD）

## 相关链接

- [VitePress 文档](https://vitepress.dev/)
- [Belay-Unix 组件库](../uni_modules/belay-unix/)
- [GitHub 仓库](https://github.com/belay-unix/belay-unix)
