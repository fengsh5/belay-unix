<template>
  <div class="code-editor-wrapper">
    <div class="code-editor-header">
      <span class="editor-title">代码编辑器</span>
      <div class="editor-actions">
        <button class="action-btn" @click="handleFormat" title="格式化">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2h8v1H4V2zm0 3h8v1H4V5zm0 3h8v1H4V8zm0 3h5v1H4v-1z"/>
          </svg>
        </button>
        <button class="action-btn" @click="handleCopy" title="复制代码">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2V2zM6 4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H6z"/>
          </svg>
        </button>
        <button class="action-btn" @click="handleReset" title="重置代码">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
          </svg>
        </button>
      </div>
    </div>
    <div ref="editorContainer" class="code-editor-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

// 动态加载 Monaco Editor
let loader: any = null
async function loadMonaco() {
  if (!loader) {
    loader = (await import('@monaco-editor/loader')).default
  }
  return loader
}

const props = defineProps<{
  modelValue: string
  language?: string
  readonly?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string]
}>()

const editorContainer = ref<HTMLElement>()
let editor: any = null
const originalCode = ref(props.modelValue)

onMounted(async () => {
  if (!editorContainer.value) return
  
  // 动态加载 Monaco Editor
  const monacoLoader = await loadMonaco()
  const monaco = await monacoLoader.init()
  
  // 创建 Monaco Editor 实例
  editor = monaco.editor.create(editorContainer.value, {
    value: props.modelValue,
    language: props.language || 'vue',
    theme: 'vs-dark',
    readOnly: props.readonly || false,
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'on',
    formatOnPaste: true,
    formatOnType: true
  })
  
  // 监听内容变化
  editor?.onDidChangeModelContent(() => {
    const value = editor?.getValue() || ''
    emit('update:modelValue', value)
    emit('change', value)
  })
  
  // 保存原始代码
  originalCode.value = props.modelValue
})

watch(() => props.modelValue, (newValue) => {
  if (editor && editor.getValue() !== newValue) {
    editor.setValue(newValue)
  }
})

onBeforeUnmount(() => {
  if (editor) {
    editor.dispose()
  }
})

const handleFormat = () => {
  if (editor) {
    editor.getAction('editor.action.formatDocument')?.run()
  }
}

const handleCopy = async () => {
  const code = editor?.getValue() || ''
  try {
    await navigator.clipboard.writeText(code)
    // 可以显示复制成功的提示
    console.log('代码已复制')
  } catch (e) {
    console.error('复制失败', e)
  }
}

const handleReset = () => {
  if (editor) {
    editor.setValue(originalCode.value)
    emit('update:modelValue', originalCode.value)
    emit('change', originalCode.value)
  }
}

defineExpose({
  getValue: () => editor?.getValue() || '',
  setValue: (value: string) => editor?.setValue(value),
  format: handleFormat
})
</script>

<style scoped>
.code-editor-wrapper {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.code-editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.editor-title {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.editor-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.action-btn:hover {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.code-editor-container {
  height: 400px;
  width: 100%;
}
</style>

