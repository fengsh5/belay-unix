/**
 * uni-app API Mock
 * 模拟 uni-app 环境，用于文档预览
 */

// 创建全局 uni 对象
const uni = {} as any

// Mock uni.showToast
uni.showToast = (options: any) => {
  const message = options?.title || options?.message || '提示'
  const icon = options?.icon || 'none'
  const duration = options?.duration || 2000
  
  console.log(`[uni.showToast] ${icon}: ${message}`)
  
  // 在浏览器中显示提示（可以使用自定义的提示组件）
  if (typeof window !== 'undefined') {
    // 简单的 alert 实现，实际可以使用更好的 UI 组件
    const toast = document.createElement('div')
    toast.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 10000;
      font-size: 14px;
      pointer-events: none;
    `
    toast.textContent = message
    document.body.appendChild(toast)
    
    setTimeout(() => {
      document.body.removeChild(toast)
    }, duration)
  }
}

// Mock uni.showModal
uni.showModal = (options: any) => {
  const title = options?.title || '提示'
  const content = options?.content || ''
  const showCancel = options?.showCancel !== false
  const confirmText = options?.confirmText || '确定'
  const cancelText = options?.cancelText || '取消'
  
  return new Promise((resolve) => {
    if (typeof window !== 'undefined') {
      const result = window.confirm(`${title}\n\n${content}`)
      resolve({
        confirm: result,
        cancel: !result
      })
    } else {
      resolve({
        confirm: false,
        cancel: true
      })
    }
  })
}

// Mock uni.request
uni.request = (options: any) => {
  console.log('[uni.request]', options)
  return new Promise((resolve, reject) => {
    // 模拟网络请求
    setTimeout(() => {
      if (options?.url) {
        resolve({
          data: { message: 'Mock data' },
          statusCode: 200,
          header: {}
        })
      } else {
        reject(new Error('Request failed'))
      }
    }, 500)
  })
}

// Mock uni.getSystemInfo
uni.getSystemInfo = () => {
  if (typeof window !== 'undefined') {
    return {
      platform: 'web',
      system: navigator.platform,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      pixelRatio: window.devicePixelRatio || 1
    }
  }
  return {
    platform: 'web',
    system: '',
    windowWidth: 375,
    windowHeight: 667,
    pixelRatio: 1
  }
}

// Mock uni.getSystemInfoSync
uni.getSystemInfoSync = () => {
  return uni.getSystemInfo()
}

// Mock uni.setStorageSync
uni.setStorageSync = (key: string, value: any) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error('[uni.setStorageSync]', e)
    }
  }
}

// Mock uni.getStorageSync
uni.getStorageSync = (key: string) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const value = window.localStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (e) {
      console.error('[uni.getStorageSync]', e)
      return null
    }
  }
  return null
}

// Mock uni.removeStorageSync
uni.removeStorageSync = (key: string) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.removeItem(key)
    } catch (e) {
      console.error('[uni.removeStorageSync]', e)
    }
  }
}

// Mock uni.navigateTo
uni.navigateTo = (options: any) => {
  console.log('[uni.navigateTo]', options)
  if (options?.url) {
    // 在文档环境中，可以显示提示
    uni.showToast({
      title: `导航到: ${options.url}`,
      icon: 'none'
    })
  }
}

// Mock uni.redirectTo
uni.redirectTo = (options: any) => {
  console.log('[uni.redirectTo]', options)
  uni.navigateTo(options)
}

// Mock uni.switchTab
uni.switchTab = (options: any) => {
  console.log('[uni.switchTab]', options)
  uni.navigateTo(options)
}

// Mock uni.navigateBack
uni.navigateBack = (options?: any) => {
  console.log('[uni.navigateBack]', options)
  if (typeof window !== 'undefined' && window.history) {
    window.history.back()
  }
}

// Mock uni.showLoading
uni.showLoading = (options?: any) => {
  const title = options?.title || '加载中...'
  console.log('[uni.showLoading]', title)
  
  if (typeof window !== 'undefined') {
    const loading = document.createElement('div')
    loading.id = 'uni-loading'
    loading.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    `
    loading.innerHTML = `
      <div style="background: white; padding: 20px; border-radius: 8px;">
        <div style="margin-bottom: 10px;">${title}</div>
        <div style="width: 40px; height: 40px; border: 3px solid #f3f3f3; border-top: 3px solid #409eff; border-radius: 50%; animation: spin 1s linear infinite;"></div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `
    document.body.appendChild(loading)
  }
}

// Mock uni.hideLoading
uni.hideLoading = () => {
  if (typeof window !== 'undefined') {
    const loading = document.getElementById('uni-loading')
    if (loading) {
      document.body.removeChild(loading)
    }
  }
}

// Mock uni.showActionSheet
uni.showActionSheet = (options: any) => {
  const itemList = options?.itemList || []
  
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && itemList.length > 0) {
      const selected = window.prompt(`请选择:\n${itemList.map((item: string, index: number) => `${index + 1}. ${item}`).join('\n')}`)
      if (selected) {
        const index = parseInt(selected) - 1
        if (index >= 0 && index < itemList.length) {
          resolve({ tapIndex: index })
        } else {
          reject(new Error('Invalid selection'))
        }
      } else {
        reject(new Error('Cancelled'))
      }
    } else {
      reject(new Error('No items'))
    }
  })
}

// 导出 uni 对象
export { uni }

// 在浏览器环境中挂载到全局
if (typeof window !== 'undefined') {
  (window as any).uni = uni
}

