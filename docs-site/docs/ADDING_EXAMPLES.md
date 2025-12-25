# 添加组件示例指南

本文档说明如何为组件库中的组件添加预览示例。

## 步骤

### 1. 创建示例组件文件

在 `components/examples/[组件名]/` 目录下创建示例组件文件，例如：

```
components/examples/bl-button/basic.uvue
components/examples/bl-button/types.uvue
components/examples/bl-button/sizes.uvue
```

示例组件文件格式：

```vue
<template>
  <view class="example-basic">
    <!-- 你的组件示例代码 -->
    <bl-button>按钮</bl-button>
  </view>
</template>

<style lang="scss">
.example-basic {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

### 2. 更新 README.md

在组件的 `README.md` 文件中，为示例代码块添加 `example:` 标记：

**修改前：**
````markdown
```vue
<template>
  <view>
    <bl-button>按钮</bl-button>
  </view>
</template>
```
````

**修改后：**
````markdown
```vue example:bl-button/basic
<template>
  <view class="example-basic">
    <bl-button>按钮</bl-button>
  </view>
</template>
```
````

### 3. 注册示例组件

在 `components/preview-renderer-simple.uvue` 中：

1. **导入组件**：
```typescript
import BlButtonBasic from '@/components/examples/bl-button/basic.uvue'
```

2. **添加到映射表**：
```typescript
const componentMap: Record<string, any> = {
  'bl-button/basic': BlButtonBasic,
  // ...
}
```

## 命名规范

- 示例文件名：使用小写字母和连字符，如 `basic.uvue`, `types.uvue`, `sizes.uvue`
- 示例路径格式：`[组件名]/[示例名]`，如 `bl-button/basic`
- 第一个示例通常命名为 `basic`

## 示例命名建议

- `basic` - 基础用法
- `types` - 不同类型/样式
- `sizes` - 不同尺寸
- `variants` - 变体
- `custom` - 自定义样式
- `interactive` - 交互示例

## 注意事项

1. 确保示例组件文件路径正确
2. 示例组件中的样式类名应该唯一，避免冲突
3. 如果组件需要外部资源（如图片），确保 URL 可访问
4. 示例代码应该简洁明了，展示组件的核心功能

## 批量处理

对于需要批量处理的组件，可以参考 `scripts/process-examples.uts` 中的组件列表。

