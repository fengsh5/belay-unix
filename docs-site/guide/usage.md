# 组件使用说明

本文档介绍如何使用 Belay-Unix 组件库中的组件。

## 📋 目录

- [基础用法](#基础用法)
- [组件属性](#组件属性)
- [组件事件](#组件事件)
- [组件插槽](#组件插槽)
- [组件方法](#组件方法)
- [样式定制](#样式定制)
- [主题支持](#主题支持)
- [平台差异](#平台差异)

## 🎯 基础用法

### 最简单的使用

```vue
<template>
  <view>
    <bl-button>按钮</bl-button>
  </view>
</template>
```

### 使用属性

```vue
<template>
  <view>
    <bl-button type="primary" size="mini">主要按钮</bl-button>
  </view>
</template>
```

### 使用事件

```vue
<template>
  <view>
    <bl-button @click="handleClick">点击我</bl-button>
  </view>
</template>

<script lang="uts">
export default {
  methods: {
    handleClick(): void {
      uni.showToast({
        title: '按钮被点击',
        icon: 'none'
      })
    }
  }
}
</script>
```

### 使用 v-model

```vue
<template>
  <view>
    <bl-input v-model="value" placeholder="请输入内容" />
    <text>输入的值：{{ value }}</text>
  </view>
</template>

<script lang="uts">
export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>
```

## 📋 组件属性

### 属性类型

组件属性支持以下类型：

- `String` - 字符串
- `Number` - 数字
- `Boolean` - 布尔值
- `Array` - 数组
- `Object` - 对象
- `Function` - 函数

### 属性示例

```vue
<template>
  <view>
    <!-- 字符串属性 -->
    <bl-button type="primary">按钮</bl-button>
    
    <!-- 数字属性 -->
    <bl-rate :value="4" :count="5" />
    
    <!-- 布尔属性 -->
    <bl-button :disabled="true">禁用按钮</bl-button>
    
    <!-- 数组属性 -->
    <bl-tabs :tabs="['标签1', '标签2', '标签3']" />
    
    <!-- 对象属性 -->
    <bl-avatar :src="avatarUrl" :size="50" />
  </view>
</template>

<script lang="uts">
export default {
  data() {
    return {
      avatarUrl: 'https://example.com/avatar.jpg'
    }
  }
}
</script>
```

### 动态属性

```vue
<template>
  <view>
    <bl-button :type="buttonType" :disabled="isDisabled">
      动态按钮
    </bl-button>
  </view>
</template>

<script lang="uts">
export default {
  data() {
    return {
      buttonType: 'primary',
      isDisabled: false
    }
  }
}
</script>
```

## 📡 组件事件

### 事件监听

```vue
<template>
  <view>
    <bl-button @click="handleClick">点击事件</bl-button>
    <bl-input @input="handleInput" @focus="handleFocus" />
  </view>
</template>

<script lang="uts">
export default {
  methods: {
    handleClick(event: any): void {
      console.log('按钮被点击', event)
    },
    handleInput(event: any): void {
      console.log('输入值变化', event.detail.value)
    },
    handleFocus(event: any): void {
      console.log('输入框获得焦点', event)
    }
  }
}
</script>
```

### 事件参数

大多数事件会传递事件对象，可以通过 `event.detail` 获取详细信息：

```vue
<template>
  <view>
    <bl-input @input="handleInput" />
  </view>
</template>

<script lang="uts">
export default {
  methods: {
    handleInput(event: any): void {
      const value = event.detail.value
      console.log('输入值：', value)
    }
  }
}
</script>
```

## 🎨 组件插槽

### 默认插槽

```vue
<template>
  <view>
    <bl-button>
      <text>按钮内容</text>
    </bl-button>
  </view>
</template>
```

### 具名插槽

```vue
<template>
  <view>
    <bl-dialog v-model="visible" title="标题">
      <template #default>
        <text>对话框内容</text>
      </template>
      <template #footer>
        <bl-button @click="visible = false">取消</bl-button>
        <bl-button type="primary" @click="handleConfirm">确认</bl-button>
      </template>
    </bl-dialog>
  </view>
</template>

<script lang="uts">
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleConfirm(): void {
      this.visible = false
      uni.showToast({ title: '已确认' })
    }
  }
}
</script>
```

### 作用域插槽

```vue
<template>
  <view>
    <bl-table :data="tableData">
      <template #default="{ row, index }">
        <text>第 {{ index + 1 }} 行：{{ row.name }}</text>
      </template>
    </bl-table>
  </view>
</template>

<script lang="uts">
export default {
  data() {
    return {
      tableData: [
        { name: '张三', age: 20 },
        { name: '李四', age: 25 }
      ]
    }
  }
}
</script>
```

## 🔧 组件方法

### 使用 ref 调用组件方法

```vue
<template>
  <view>
    <bl-dialog ref="dialogRef" title="标题">内容</bl-dialog>
    <bl-button @click="openDialog">打开对话框</bl-button>
  </view>
</template>

<script lang="uts">
export default {
  methods: {
    openDialog(): void {
      // 通过 ref 调用组件方法
      const dialog = this.$refs.dialogRef as any
      if (dialog != null) {
        dialog.open()
      }
    }
  }
}
</script>
```

### 组件实例方法

不同组件提供不同的方法，请参考各组件的 README 文档。

## 🎨 样式定制

### 使用 customStyle

```vue
<template>
  <view>
    <bl-button custom-style="background-color: #ff0000; color: #ffffff;">
      自定义样式按钮
    </bl-button>
  </view>
</template>
```

### 使用 customClass

```vue
<template>
  <view>
    <bl-button custom-class="my-button">自定义类名按钮</bl-button>
  </view>
</template>

<style>
.my-button {
  border-radius: 20px;
  padding: 20px;
}
</style>
```

### 使用 CSS 变量

```vue
<template>
  <view>
    <bl-button class="theme-button">主题按钮</bl-button>
  </view>
</template>

<style>
.theme-button {
  background-color: var(--bl-primary-color);
  color: var(--bl-text-color);
}
</style>
```

## 🌈 主题支持

### 使用主题变量

组件库支持主题系统，可以使用 CSS 变量：

```vue
<template>
  <view class="container">
    <bl-button type="primary">主题按钮</bl-button>
  </view>
</template>

<style>
.container {
  background-color: var(--bl-background-color);
  padding: var(--bl-spacing-md);
}
</style>
```

### 主题切换

使用 `BlTheme` 工具进行主题切换：

```typescript
import { BlTheme } from '@/uni_modules/belay-unix/utils/BlTheme/index.uts'

// 切换主题
BlTheme.config({
  theme: {
    'primary-color': '#409eff',
    'background-color': '#ffffff'
  }
})
```

详细说明请参考 [主题系统使用指南](./THEME.md)

## 📱 平台差异

### 条件编译

某些组件在不同平台上有不同的表现，可以使用条件编译：

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

### 平台特定属性

某些属性只在特定平台有效：

```vue
<template>
  <view>
    <!-- openType 只在微信小程序有效 -->
    <bl-button open-type="getUserInfo">获取用户信息</bl-button>
  </view>
</template>
```

## 💡 最佳实践

### 1. 按需导入

生产环境推荐使用按需导入：

```typescript
import { BlButton, BlInput } from '@/uni_modules/belay-unix'
```

### 2. 使用 TypeScript 类型

```typescript
import type { BlButtonProps } from '@/uni_modules/belay-unix/components'
```

### 3. 统一使用主题变量

```css
.my-component {
  color: var(--bl-text-color);
  background-color: var(--bl-background-color);
}
```

### 4. 处理平台差异

```vue
<!-- #ifdef APP -->
<bl-custom-navigation-bar />
<!-- #endif -->
```

### 5. 合理使用事件

```vue
<bl-input 
  @input="handleInput" 
  @focus="handleFocus"
  @blur="handleBlur"
/>
```

## 🔗 相关文档

- [组件导入说明](./IMPORT.md) - 如何导入组件
- [组件索引](./COMPONENTS.md) - 所有组件列表
- [主题系统使用指南](./THEME.md) - 主题系统使用
- [重要提示](./IMPORTANT.md) - 使用前必读

