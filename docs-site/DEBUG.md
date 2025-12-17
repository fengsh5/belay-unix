# 调试页面

测试组件是否正常工作。

<script setup>
const testCode = `<template>
  <div style="padding: 20px; background: #f0f0f0;">
    <h3>测试组件</h3>
    <p>如果这个组件显示，说明组件注册成功</p>
  </div>
<\/template>`
</script>

## 测试 1: 不使用 ClientOnly

<ExamplePreview 
  title="测试（无 ClientOnly）"
  :code="testCode"
  :editable="true"
/>

## 测试 2: 使用 ClientOnly

<ClientOnly>
  <ExamplePreview 
    title="测试（有 ClientOnly）"
    :code="testCode"
    :editable="true"
  />
</ClientOnly>
