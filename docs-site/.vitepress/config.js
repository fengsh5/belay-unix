import { defineConfig } from 'vitepress'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件的目录路径（ES 模块中 __dirname 的替代方案）
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  // 使用主题扩展方式注册组件（在 .vitepress/theme/index.ts 中）
  title: 'Belay-Unix 组件库',
  description: '支持 uni-app 和 uni-app x 的跨平台组件库，提供 107+ 个高质量组件',
  // 本地开发时 base 为 '/'，生产环境通过构建脚本设置
  base: process.env.VITE_BASE || '/',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: 'uni-app, uni-app x, 组件库, Vue, 跨平台' }]
  ],

  // Vite 配置
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 为 SCSS 文件添加额外的导入路径
          additionalData: `@import "${resolve(__dirname, '../../uni_modules/belay-unix/styles/variables.scss')}";`
        }
      }
    }
  },

  themeConfig: {
    logo: '/logo.png',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/' },
      { text: '主题', link: '/theme/' },
      { text: 'GitHub', link: 'https://github.com/fengsh5/belay-unix' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/installation' }
          ]
        },
        {
          text: '基础',
          items: [
            { text: '重要提示', link: '/guide/important' },
            { text: '组件导入', link: '/guide/import' },
            { text: '组件使用', link: '/guide/usage' },
            { text: 'Easycom 配置', link: '/guide/easycom' }
          ]
        }
      ],
      '/components/': [
        {
          text: '组件索引',
          items: [
            { text: '所有组件', link: '/components/' }
          ]
        },
        {
          text: '基础组件',
          items: [
            { text: 'Alert', link: '/components/bl-alert' },
            { text: 'Amount', link: '/components/bl-amount' },
            { text: 'Avatar 头像', link: '/components/bl-avatar' },
            { text: 'Badge 徽标', link: '/components/bl-badge' },
            { text: 'Button 按钮', link: '/components/bl-button' },
            { text: 'Cell 单元格', link: '/components/bl-cell' },
            { text: 'Divider 分割线', link: '/components/bl-divider' },
            { text: 'Flex', link: '/components/bl-flex' },
            { text: 'Gap', link: '/components/bl-gap' },
            { text: 'Hairline', link: '/components/bl-hairline' },
            { text: 'Icon 图标', link: '/components/bl-icon' },
            { text: 'Image 图片', link: '/components/bl-image' },
            { text: 'Message 消息提示', link: '/components/bl-message' },
            { text: 'Rate 评分', link: '/components/bl-rate' },
            { text: 'Segmented 分段控制器', link: '/components/bl-segmented' },
            { text: 'Text 文本', link: '/components/bl-text' },
            { text: 'View 视图容器', link: '/components/bl-view' },
          ]
        },
        {
          text: '表单组件',
          items: [
            { text: 'Autocomplete', link: '/components/bl-autocomplete' },
            { text: 'Checkbox 复选框', link: '/components/bl-checkbox' },
            { text: 'Checkbox Group', link: '/components/bl-checkbox-group' },
            { text: 'Checkbox Popup', link: '/components/bl-checkbox-popup' },
            { text: 'Checker', link: '/components/bl-checker' },
            { text: 'Checker Popup', link: '/components/bl-checker-popup' },
            { text: 'Form 表单', link: '/components/bl-form' },
            { text: 'Input 输入框', link: '/components/bl-input' },
            { text: 'Number Input', link: '/components/bl-number-input' },
            { text: 'Radio 单选框', link: '/components/bl-radio' },
            { text: 'Radio Group', link: '/components/bl-radio-group' },
            { text: 'Radio Popup', link: '/components/bl-radio-popup' },
            { text: 'Search Bar 搜索栏', link: '/components/bl-search-bar' },
            { text: 'Slider 滑块', link: '/components/bl-slider' },
            { text: 'Switch 开关', link: '/components/bl-switch' },
            { text: 'Textarea', link: '/components/bl-textarea' },
            { text: 'Treeselect', link: '/components/bl-treeselect' },
            { text: 'Uploader 文件上传', link: '/components/bl-uploader' },
          ]
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Dialog 对话框', link: '/components/bl-dialog' },
            { text: 'Drawer 抽屉', link: '/components/bl-drawer' },
            { text: 'Empty 空状态', link: '/components/bl-empty' },
            { text: 'Error Capture 错误捕获', link: '/components/bl-error-capture' },
            { text: 'Loading 加载中', link: '/components/bl-loading' },
            { text: 'Modal 模态框', link: '/components/bl-modal' },
            { text: 'Notice Bar 通告栏', link: '/components/bl-notice-bar' },
            { text: 'Notification 通知', link: '/components/bl-notification' },
            { text: 'Popconfirm 气泡确认框', link: '/components/bl-popconfirm' },
            { text: 'Popup 弹出层', link: '/components/bl-popup' },
            { text: 'Popover 气泡弹出框', link: '/components/bl-popover' },
            { text: 'Progress 进度条', link: '/components/bl-progress' },
            { text: 'Spinner', link: '/components/bl-spinner' },
            { text: 'Tour 漫游式引导', link: '/components/bl-tour' },
          ]
        },
        {
          text: '展示组件',
          items: [
            { text: 'Calendar 日历', link: '/components/bl-calendar' },
            { text: 'Card Layout 卡片布局', link: '/components/bl-card-layout' },
            { text: 'Collapse 折叠面板', link: '/components/bl-collapse' },
            { text: 'Count Down 倒计时', link: '/components/bl-count-down' },
            { text: 'Descriptions 描述列表', link: '/components/bl-descriptions' },
            { text: 'Float Button 悬浮按钮', link: '/components/bl-float-button' },
            { text: 'Qrcode', link: '/components/bl-qrcode' },
            { text: 'Result 结果页', link: '/components/bl-result' },
            { text: 'Skeleton 骨架屏', link: '/components/bl-skeleton' },
            { text: 'Statistic 统计数值', link: '/components/bl-statistic' },
            { text: 'Table 表格', link: '/components/bl-table' },
            { text: 'Tag 标签', link: '/components/bl-tag' },
            { text: 'Check Tag 可选择标签', link: '/components/bl-check-tag' },
            { text: 'Sort Tag 排序标签', link: '/components/bl-sort-tag' },
            { text: 'Timeline 时间轴', link: '/components/bl-timeline' },
            { text: 'Transfer 穿梭框', link: '/components/bl-transfer' },
            { text: 'Tree 树形控件', link: '/components/bl-tree' },
            { text: 'Watermark 水印', link: '/components/bl-watermark' },
          ]
        },
        {
          text: '导航组件',
          items: [
            { text: 'Back Top 回到顶部', link: '/components/bl-back-top' },
            { text: 'Custom Navigation Bar', link: '/components/bl-custom-navigation-bar' },
            { text: 'Menu 菜单', link: '/components/bl-menu' },
            { text: 'Pagination 分页', link: '/components/bl-pagination' },
            { text: 'Tabbar', link: '/components/bl-tabbar' },
            { text: 'Tab Button', link: '/components/bl-tab-button' },
            { text: 'Tab Panel', link: '/components/bl-tab-panel' },
            { text: 'Tabs 标签页', link: '/components/bl-tabs' },
            { text: 'Mp Custom Tabbar', link: '/components/bl-mp-custom-tabbar' },
          ]
        },
        {
          text: '布局组件',
          items: [
            { text: 'Bottom Bar', link: '/components/bl-bottom-bar' },
            { text: 'Col', link: '/components/bl-col' },
            { text: 'Filter', link: '/components/bl-filter' },
            { text: 'Flex', link: '/components/bl-flex' },
            { text: 'Grid 宫格', link: '/components/bl-grid' },
            { text: 'Grid Item', link: '/components/bl-grid-item' },
            { text: 'Page', link: '/components/bl-page' },
            { text: 'Page Style', link: '/components/bl-page-style' },
            { text: 'Row', link: '/components/bl-row' },
            { text: 'Scroll View', link: '/components/bl-scroll-view' },
            { text: 'List View 列表', link: '/components/bl-list-view' },
            { text: 'Space 间距', link: '/components/bl-space' },
          ]
        },
        {
          text: '其他组件',
          items: [
            { text: 'Picker Cascader Selector 级联选择器', link: '/components/bl-picker-cascader-selector' },
            { text: 'Picker Date 日期选择器', link: '/components/bl-picker-date' },
            { text: 'Picker Multi Selector', link: '/components/bl-picker-multi-selector' },
            { text: 'Picker Selector 选择器', link: '/components/bl-picker-selector' },
            { text: 'Picker Time 时间选择器', link: '/components/bl-picker-time' },
            { text: 'Portal', link: '/components/bl-portal' },
            { text: 'Poster Painter', link: '/components/bl-poster-painter' },
            { text: 'Preview Context', link: '/components/bl-preview-context' },
            { text: 'Share App Message', link: '/components/bl-share-app-message' },
            { text: 'Share Dialog', link: '/components/bl-share-dialog' },
            { text: 'Share Poster 分享海报', link: '/components/bl-share-poster' },
            { text: 'Step', link: '/components/bl-step' },
            { text: 'Steps 步骤条', link: '/components/bl-steps' },
            { text: 'Swiper 轮播图', link: '/components/bl-swiper' },
            { text: 'Theme', link: '/components/bl-theme' },
            { text: 'Theme Provider 主题提供者', link: '/components/bl-theme-provider' },
            { text: 'Theme Root', link: '/components/bl-theme-root' },
            { text: 'I18n Provider 国际化提供者', link: '/components/bl-i18n-provider' },
            { text: 'Video', link: '/components/bl-video' },
            { text: 'Tooltip 文字提示', link: '/components/bl-tooltip' },
            { text: 'Noop', link: '/components/bl-noop' },
          ]
        },
      ],


      '/theme/': [
        {
          text: '主题系统',
          items: [
            { text: '主题指南', link: '/theme/' },
            { text: '主题配置', link: '/theme/config' },
            { text: '主题切换', link: '/theme/switch' },
            { text: '自定义主题', link: '/theme/custom' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fengsh5/belay-unix' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Belay-Unix'
    },

    search: {
      provider: 'local'
    }
  }
})

