# BlForm 表单

表单组件，用于表单场景。

## 📦 引入

```typescript
import { BlForm } from '@/uni_modules/belay-unix'
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
    <bl-form :model="formData" :rules="rules" @submit="handleSubmit">
      <bl-input v-model="formData.username" placeholder="用户名"></bl-input>
      <bl-input v-model="formData.password" type="password" placeholder="密码"></bl-input>
      <bl-button form-type="submit">提交</bl-button>
    </bl-form>
  </view>
<\/template>

<script lang="uts">
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    handleSubmit(model: Record<string, any>): void {
      console.log('表单数据:', model)
    }
  }
}
<\/script>`
</script>

### 基础用法

<ClientOnly>
  <ExamplePreview 
    title="基础用法"
    :code="basicCode"
    :editable="true"
  />
</ClientOnly>

## 📋 Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| model | 表单数据对象 | `Record<string, any>` | `{}` | 否 |
| rules | 表单验证规则 | `Record<string, any>` | `{}` | 否 |
| labelWidth | 表单标签宽度  | `number \| string` | `0` | 否 |
| showRequired | 是否显示必填标识  | `boolean` | `false` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| submit | 表单提交事件 | `(model: Record<string, any>) => void` | - |
| reset | 表单重置事件 | `(event: any) => void` | - |
| validate | 表单验证事件 | `(valid: boolean, errors: string[]) => void` | - |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，表单项组件  | - |



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
`uni_modules/belay-unix/components/bl-form/README.md`
