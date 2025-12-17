<template>
  <div class="example-preview">
    <div class="example-header" v-if="title">
      <h3 class="example-title">{{ title }}</h3>
      <p v-if="description" class="example-description">{{ description }}</p>
    </div>
    
    <div class="example-content">
      <div class="example-tabs">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'preview' }"
          @click="activeTab = 'preview'"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm1 0v12h12V2H2z"/>
            <path d="M4 4h8v8H4V4z"/>
          </svg>
          预览
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'code' }"
          @click="activeTab = 'code'"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5.854 4.146a.5.5 0 1 0-.708.708L7.293 7 5.146 9.146a.5.5 0 1 0 .708.708l2.5-2.5a.5.5 0 0 0 0-.708l-2.5-2.5z"/>
            <path d="M10.146 4.146a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L12.293 7l-2.147-2.146a.5.5 0 0 1 0-.708z"/>
          </svg>
          代码
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'both' }"
          @click="activeTab = 'both'"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm1 0v12h12V2H2z"/>
          </svg>
          分屏
        </button>
      </div>
      
      <div class="example-body" :class="'layout-' + activeTab">
        <div v-show="activeTab === 'code' || activeTab === 'both'" class="code-section">
          <CodeEditor 
            :model-value="currentCode"
            language="vue"
            :readonly="!editable"
            @update:model-value="handleCodeChange"
            @change="handleCodeChange"
          />
        </div>
        
        <div v-show="activeTab === 'preview' || activeTab === 'both'" class="preview-section">
          <PreviewContainer :code="currentCode" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import CodeEditor from './CodeEditor.vue'
import PreviewContainer from './PreviewContainer.vue'

const props = defineProps<{
  code: string | { template: string; script?: string; style?: string }
  title?: string
  description?: string
  editable?: boolean
}>()

const activeTab = ref<'preview' | 'code' | 'both'>('both')
const editable = ref(props.editable !== false)

// 将 code 转换为字符串格式
const codeString = computed(() => {
  if (typeof props.code === 'string') {
    return props.code
  }
  // 如果是对象，转换为完整的 Vue 单文件组件格式
  const { template, script = '', style = '' } = props.code
  return `<template>
${template}
</template>

<script>
${script}
<\/script>

<style>
${style}
<\/style>`
})

const currentCode = ref(codeString.value)

watch(() => props.code, () => {
  currentCode.value = codeString.value
}, { deep: true })

const handleCodeChange = (value: string) => {
  if (value) {
    currentCode.value = value
  }
}
</script>

<style scoped>
.example-preview {
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.example-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.example-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.example-description {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.example-content {
  display: flex;
  flex-direction: column;
}

.example-tabs {
  display: flex;
  gap: 4px;
  padding: 8px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  border-radius: 4px;
  font-size: 13px;
  transition: all 0.2s;
}

.tab-btn:hover {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
}

.example-body {
  display: flex;
  min-height: 400px;
}

.example-body.layout-preview,
.example-body.layout-code {
  flex-direction: column;
}

.example-body.layout-both {
  flex-direction: row;
}

@media (max-width: 768px) {
  .example-body.layout-both {
    flex-direction: column;
  }
}

.preview-section {
  flex: 1;
  min-height: 300px;
}

.code-section {
  flex: 1;
  min-height: 300px;
  border-top: 1px solid var(--vp-c-divider);
}

.example-body.layout-both .code-section {
  border-top: none;
  border-right: 1px solid var(--vp-c-divider);
}

.preview-section {
  flex: 1;
  min-height: 300px;
}

.example-body.layout-both .preview-section {
  border-top: none;
}

@media (max-width: 768px) {
  .example-body.layout-both .code-section {
    border-right: none;
    border-top: 1px solid var(--vp-c-divider);
  }
}
</style>

