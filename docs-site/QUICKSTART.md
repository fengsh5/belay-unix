# 快速开始

## 5 分钟快速部署文档网站

### 步骤 1：安装依赖

```bash
cd docs-site
npm install
```

### 步骤 2：本地预览

```bash
npm run dev
```

访问 http://localhost:5173 查看文档网站。

### 步骤 3：构建

```bash
npm run build
```

构建产物在 `.vitepress/dist` 目录。

### 步骤 4：部署

选择一种部署方式：

#### GitHub Pages（推荐）

1. 推送代码到 GitHub
2. 在仓库 Settings → Pages 中启用 GitHub Actions
3. 自动部署完成

#### Vercel

```bash
npm i -g vercel
vercel
```

#### Netlify

```bash
npm i -g netlify-cli
netlify deploy --dir=.vitepress/dist --prod
```

## 自定义配置

### 修改网站标题

编辑 `.vitepress/config.js`：

```javascript
export default defineConfig({
  title: '你的网站标题',
  // ...
})
```

### 修改 base 路径

如果部署到 GitHub Pages 子目录：

```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

如果部署到根域名：

```javascript
export default defineConfig({
  base: '/',
  // ...
})
```

## 更新文档

1. 修改对应的 Markdown 文件
2. 本地预览：`npm run dev`
3. 确认无误后提交代码
4. 自动部署（如果配置了 CI/CD）

## 需要帮助？

查看详细文档：
- [README.md](./README.md) - 完整文档
- [DEPLOY.md](./DEPLOY.md) - 部署指南

