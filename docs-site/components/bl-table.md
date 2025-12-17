# BlTable 表格

表格组件，用于表格场景。

## 📦 引入

```typescript
import { BlTable } from '@/uni_modules/belay-unix'
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
    <bl-table :columns="columns" :data-source="dataSource"></bl-table>
  </view>
<\/template>

<script lang="uts">
export default {
  data() {
    return {
      columns: [
        { title: '姓名', dataIndex: 'name' },
        { title: '年龄', dataIndex: 'age' },
        { title: '地址', dataIndex: 'address' }
      ],
      dataSource: [
        { name: '张三', age: 20, address: '北京市' },
        { name: '李四', age: 25, address: '上海市' }
      ]
    }
  }
}
<\/script>`

const disabledCode = `<template>
  <view>
    <bl-table disabled>禁用状态</bl-table>
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

### 禁用状态

<ClientOnly>
  <ExamplePreview 
    title="禁用状态"
    :code="disabledCode"
    :editable="true"
  />
</ClientOnly>

## 📋 Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| columns | 表格列配置 | `Array<TableColumn>` | `[]` | 否 |
| dataSource | 数据源 | `Array<Record<string, any>>` | `[]` | 否 |
| bordered | 是否显示边框  | `boolean` | `true` | 否 |
| showHeader | 是否显示表头  | `boolean` | `true` | 否 |
| striped | 是否显示斑马纹  | `boolean` | `false` | 否 |
| size | 尺寸  | `'default' \| 'middle' \| 'small'` | `default` | 否 |
| disabled | 是否禁用  | `boolean` | `false` | 否 |
| customStyle | 自定义样式  | `string` | - | 否 |
| customClass | 自定义类名  | `string` | - | 否 |

## 📡 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| rowClick | 行点击事件 | `(record: Record<string, any>, index: number) => void` | - |

## 🎨 Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽，自定义表格内容  | - |



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
`uni_modules/belay-unix/components/bl-table/README.md`
