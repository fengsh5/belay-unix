# 部署指南

本文档介绍如何将 Belay-Unix 文档网站部署到各种平台。

## 部署前准备

### 1. 构建文档网站

```bash
cd docs-site
npm install
npm run build
```

构建产物将输出到 `.vitepress/dist` 目录。

### 2. 配置 base 路径

在 `.vitepress/config.js` 中配置正确的 `base` 路径：

- **GitHub Pages**：如果仓库名为 `belay-unix`，则 `base: '/belay-unix/'`
- **自定义域名**：`base: '/'`
- **Vercel/Netlify**：通常使用 `base: '/'`

## 部署方式

### 方式一：GitHub Pages（推荐）

#### 使用 GitHub Actions 自动部署

1. 确保 `.github/workflows/deploy.yml` 文件存在（已创建）

2. 在 GitHub 仓库设置中启用 Pages：
   - 进入仓库 Settings → Pages
   - Source 选择 "GitHub Actions"

3. 推送代码到 `main` 分支，GitHub Actions 会自动构建并部署

#### 手动部署

```bash
# 构建
cd docs-site
npm install
npm run build

# 使用 gh-pages 部署
npm install -g gh-pages
gh-pages -d .vitepress/dist
```

### 方式二：Vercel

#### 使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 在 docs-site 目录下部署
cd docs-site
vercel
```

#### 使用 Vercel Dashboard

1. 访问 [Vercel](https://vercel.com/)
2. 导入 GitHub 仓库
3. 配置：
   - Framework Preset: Other
   - Root Directory: `docs-site`
   - Build Command: `npm install && npm run build`
   - Output Directory: `.vitepress/dist`

### 方式三：Netlify

#### 使用 Netlify CLI

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 在项目根目录部署
netlify deploy --dir=docs-site/.vitepress/dist --prod
```

#### 使用 Netlify Dashboard

1. 访问 [Netlify](https://www.netlify.com/)
2. 导入 GitHub 仓库
3. 配置（`netlify.toml` 已创建）：
   - Build command: `cd docs-site && npm install && npm run build`
   - Publish directory: `docs-site/.vitepress/dist`

### 方式四：Cloudflare Pages

1. 访问 [Cloudflare Pages](https://pages.cloudflare.com/)
2. 连接 GitHub 仓库
3. 配置：
   - Framework preset: None
   - Build command: `cd docs-site && npm install && npm run build`
   - Build output directory: `docs-site/.vitepress/dist`

### 方式五：阿里云 OSS / 腾讯云 COS

#### 使用 CLI 工具

```bash
# 构建
cd docs-site
npm install
npm run build

# 使用 ossutil 或 coscmd 上传
ossutil cp -r .vitepress/dist oss://your-bucket-name/
# 或
coscmd upload -rs .vitepress/dist /your-path/
```

#### 使用控制台

1. 在 OSS/COS 控制台创建存储桶
2. 开启静态网站托管
3. 上传 `.vitepress/dist` 目录下的所有文件
4. 配置默认首页为 `index.html`

## 自定义域名

### GitHub Pages

1. 在仓库 Settings → Pages 中配置自定义域名
2. 在域名 DNS 中添加 CNAME 记录指向 `your-username.github.io`

### Vercel

1. 在 Vercel 项目设置中添加自定义域名
2. 按照提示配置 DNS 记录

### Netlify

1. 在 Netlify 站点设置中添加自定义域名
2. 按照提示配置 DNS 记录

## 环境变量

如果需要使用环境变量，可以在部署平台配置：

- **Vercel**：项目设置 → Environment Variables
- **Netlify**：站点设置 → Environment variables
- **GitHub Actions**：仓库设置 → Secrets

## 持续集成

### GitHub Actions

已配置 `.github/workflows/deploy.yml`，每次推送到 `main` 分支时会自动部署。

### 手动触发

```bash
# 本地构建并提交
cd docs-site
npm run build
git add .
git commit -m "docs: update documentation"
git push
```

## 故障排除

### 构建失败

1. 检查 Node.js 版本（需要 >= 16）
2. 检查依赖是否正确安装
3. 查看构建日志中的错误信息

### 页面 404

1. 检查 `base` 路径配置是否正确
2. 检查部署路径是否正确
3. 检查路由配置

### 样式丢失

1. 检查静态资源路径
2. 检查 `base` 配置
3. 检查构建输出目录

## 相关链接

- [VitePress 部署文档](https://vitepress.dev/guide/deploy)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Vercel 文档](https://vercel.com/docs)
- [Netlify 文档](https://docs.netlify.com/)

