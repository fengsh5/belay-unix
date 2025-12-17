# BlDialog 对话框

对话框组件，用于对话框场景。

## 📦 引入

```typescript
import { BlDialog } from '@/uni_modules/belay-unix'
```

或者使用全局注册：

```typescript
// main.uts 或 main.js
import BelayUnix from '@/uni_modules/belay-unix'
app.use(BelayUnix)
```

## 💡 示例

<script setup>
const basicCode = `<template>
  <view>
    <bl-button @click="showDialog = true">打开对话框</bl-button>
    <bl-dialog 
      :visible="showDialog" 
      title="提示" 
      message="这是一个对话框"
      @close="showDialog = false"
      @confirm="handleConfirm"
    ></bl-dialog>
  </view>
<\/template>

<script lang="uts">
export default {
  data() {
    return {
      showDialog: false
    }
  },
  methods: {
    handleConfirm(): void {
      uni.showToast({
        title: '确认',
        icon: 'success'
      })
      this.showDialog = false
    }
  }
}
<\/script>`

const example2Code = `<template>
  <view>
    <bl-button @click="showDialog = true">自定义内容</bl-button>
    <bl-dialog :visible="showDialog" title="自定义" @close="showDialog = false">
      <view>这是自定义内容</view>
    </bl-dialog>
  </view>
<\/template>`
</script>

### 基础用法

<ClientOnly>
  <ExamplePreview 
    title="基础用法"
    :code="basicCode"
    :editable="true"
  />
</ClientOnly>

### 自定义内容

<ClientOnly>
  <ExamplePreview 
    title="自定义内容"
    :code="example2Code"
    :editable="true"
  />
</ClientOnly>

## 📋 Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| visible | 是否显示 | `boolean` | `false` | 否 |
| width | 弹窗容器宽度 | `number \| string` | `'327px'` | 否 |
| title | 标题 | `string` | - | 否 |
| titleStyle | 标题样式 | `string` | - | 否 |
| message | 内容 | `string` | - | 否 |
| messageStyle | 内容样式 | `string` | - | 否 |
| theme | 按钮主题 | `'default' \| 'round-button'` | `'default'` | 否 |
| showCloseIcon | 是否显示关闭图标 | `boolean` | `false` | 否 |
| showCancelButton | 是否显示取消按钮 | `boolean` | `false` | 否 |
| showConfirmButton | 是否显示确认按钮 | `boolean` | `true` | 否 |
| footer | 底部显示区域 | `string \| null` | `null` | 否 |
| confirmText | 底部确认按钮内容 | `string` | - | 否 |
| cancelText | 底部取消按钮内容 | `string` | - | 否 |
| overlayClosable | 点击遮罩层是否可关闭 | `boolean` | `false` | 否 |
| customStyle | 自定义样式 | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭事件 | `(action: DialogAction) => void` | - |
| cancel | 取消事件 | `() => void` | - |
| confirm | 确认事件 | `() => void` | - |
| clickOverlay | 点击遮罩层事件 | `() => void` | - |
| beforeClose | 关闭前事件 | `(action: DialogAction, done: () => void, cancel: () => void) => void` | - |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，对话框内容 | - |
| footer | 底部插槽 | - |

### 自定义内容

<script setup>
const Code = `<template>
  <view style="padding: 20px;">
    <bl-button @click="showDialog = true">自定义内容</bl-button>
    <bl-dialog :visible="showDialog" title="自定义" @close="showDialog = false">
      <view style="padding: 20px;">
        <text>这是自定义内容</text>
        <text style="display: block; margin-top: 10px; color: #666;">你可以在这里放置任何内容</text>
      </view>
    </bl-dialog>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false
    }
  }
}
</script>`
</script>

<ClientOnly>
  <ExamplePreview 
  title="自定义内容"
  :code="Code"
  :editable="true"
/>
</ClientOnly>

### 带取消按钮

<script setup>
const Code = `<template>
  <view style="padding: 20px;">
    <bl-button @click="showDialog = true">打开对话框</bl-button>
    <bl-dialog 
      :visible="showDialog" 
      title="确认操作" 
      message="确定要执行此操作吗？"
      :show-cancel-button="true"
      cancel-text="取消"
      confirm-text="确定"
      @close="showDialog = false"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    ></bl-dialog>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false
    }
  },
  methods: {
    handleCancel() {
      uni.showToast({
        title: '已取消',
        icon: 'none'
      })
      this.showDialog = false
    },
    handleConfirm() {
      uni.showToast({
        title: '已确认',
        icon: 'success'
      })
      this.showDialog = false
    }
  }
}
</script>`
</script>

<ClientOnly>
  <ExamplePreview 
  title="带取消按钮"
  :code="Code"
  :editable="true"
/>
</ClientOnly>

## 📝 注意事项

- 此组件支持 uni-app x 和 uni-app 项目
- 使用前请确保已正确引入组件库
- 更多用法请参考组件库文档

## 🔗 相关链接

- [组件库文档](/guide/)
- [主题系统](/theme/)
- [组件索引](/components/)

## 🔗 相关链接

- [组件索引](/components/) - 查看所有组件
- [组件导入说明](/guide/import) - 如何导入组件
- [组件使用说明](/guide/usage) - 如何使用组件

## 📚 完整文档

组件的完整文档请查看组件库源码中的 README 文件：
`uni_modules/belay-unix/components/bl-dialog/README.md`
