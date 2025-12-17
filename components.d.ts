/**
 * 全局组件类型声明
 * 
 * 此文件用于在模板中提供组件的类型提示
 * uni-app x 项目会自动识别此文件
 */

import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    // Belay-Unix 组件库组件
    'bl-alert': typeof import('@/uni_modules/belay-unix').BlAlert
    'bl-amount': typeof import('@/uni_modules/belay-unix').BlAmount
    'bl-avatar': typeof import('@/uni_modules/belay-unix').BlAvatar
    'bl-badge': typeof import('@/uni_modules/belay-unix').BlBadge
    'bl-button': typeof import('@/uni_modules/belay-unix').BlButton
    'bl-cell': typeof import('@/uni_modules/belay-unix').BlCell
    'bl-divider': typeof import('@/uni_modules/belay-unix').BlDivider
    'bl-flex': typeof import('@/uni_modules/belay-unix').BlFlex
    'bl-gap': typeof import('@/uni_modules/belay-unix').BlGap
    'bl-hairline': typeof import('@/uni_modules/belay-unix').BlHairline
    'bl-icon': typeof import('@/uni_modules/belay-unix').BlIcon
    'bl-image': typeof import('@/uni_modules/belay-unix').BlImage
    'bl-message': typeof import('@/uni_modules/belay-unix').BlMessage
    'bl-rate': typeof import('@/uni_modules/belay-unix').BlRate
    'bl-segmented': typeof import('@/uni_modules/belay-unix').BlSegmented
    'bl-text': typeof import('@/uni_modules/belay-unix').BlText
    'bl-view': typeof import('@/uni_modules/belay-unix').BlView
    'bl-autocomplete': typeof import('@/uni_modules/belay-unix').BlAutocomplete
    'bl-checkbox': typeof import('@/uni_modules/belay-unix').BlCheckbox
    'bl-checkbox-group': typeof import('@/uni_modules/belay-unix').BlCheckboxGroup
    'bl-checkbox-popup': typeof import('@/uni_modules/belay-unix').BlCheckboxPopup
    'bl-checker': typeof import('@/uni_modules/belay-unix').BlChecker
    'bl-checker-popup': typeof import('@/uni_modules/belay-unix').BlCheckerPopup
    'bl-form': typeof import('@/uni_modules/belay-unix').BlForm
    'bl-input': typeof import('@/uni_modules/belay-unix').BlInput
    'bl-number-input': typeof import('@/uni_modules/belay-unix').BlNumberInput
    'bl-radio': typeof import('@/uni_modules/belay-unix').BlRadio
    'bl-radio-group': typeof import('@/uni_modules/belay-unix').BlRadioGroup
    'bl-radio-popup': typeof import('@/uni_modules/belay-unix').BlRadioPopup
    'bl-search-bar': typeof import('@/uni_modules/belay-unix').BlSearchBar
    'bl-slider': typeof import('@/uni_modules/belay-unix').BlSlider
    'bl-switch': typeof import('@/uni_modules/belay-unix').BlSwitch
    'bl-textarea': typeof import('@/uni_modules/belay-unix').BlTextarea
    'bl-treeselect': typeof import('@/uni_modules/belay-unix').BlTreeselect
    'bl-uploader': typeof import('@/uni_modules/belay-unix').BlUploader
    'bl-dialog': typeof import('@/uni_modules/belay-unix').BlDialog
    'bl-drawer': typeof import('@/uni_modules/belay-unix').BlDrawer
    'bl-empty': typeof import('@/uni_modules/belay-unix').BlEmpty
    'bl-error-capture': typeof import('@/uni_modules/belay-unix').BlErrorCapture
    'bl-loading': typeof import('@/uni_modules/belay-unix').BlLoading
    'bl-modal': typeof import('@/uni_modules/belay-unix').BlModal
    'bl-notice-bar': typeof import('@/uni_modules/belay-unix').BlNoticeBar
    'bl-notification': typeof import('@/uni_modules/belay-unix').BlNotification
    'bl-popconfirm': typeof import('@/uni_modules/belay-unix').BlPopconfirm
    'bl-popup': typeof import('@/uni_modules/belay-unix').BlPopup
    'bl-progress': typeof import('@/uni_modules/belay-unix').BlProgress
    'bl-spinner': typeof import('@/uni_modules/belay-unix').BlSpinner
    'bl-tour': typeof import('@/uni_modules/belay-unix').BlTour
    'bl-popover': typeof import('@/uni_modules/belay-unix').BlPopover
    'bl-tooltip': typeof import('@/uni_modules/belay-unix').BlTooltip
    'bl-calendar': typeof import('@/uni_modules/belay-unix').BlCalendar
    'bl-card-layout': typeof import('@/uni_modules/belay-unix').BlCardLayout
    'bl-collapse': typeof import('@/uni_modules/belay-unix').BlCollapse
    'bl-count-down': typeof import('@/uni_modules/belay-unix').BlCountDown
    'bl-descriptions': typeof import('@/uni_modules/belay-unix').BlDescriptions
    'bl-float-button': typeof import('@/uni_modules/belay-unix').BlFloatButton
    'bl-tag': typeof import('@/uni_modules/belay-unix').BlTag
    'bl-check-tag': typeof import('@/uni_modules/belay-unix').BlCheckTag
    'bl-sort-tag': typeof import('@/uni_modules/belay-unix').BlSortTag
    'bl-qrcode': typeof import('@/uni_modules/belay-unix').BlQrcode
    'bl-result': typeof import('@/uni_modules/belay-unix').BlResult
    'bl-skeleton': typeof import('@/uni_modules/belay-unix').BlSkeleton
    'bl-statistic': typeof import('@/uni_modules/belay-unix').BlStatistic
    'bl-table': typeof import('@/uni_modules/belay-unix').BlTable
    'bl-timeline': typeof import('@/uni_modules/belay-unix').BlTimeline
    'bl-transfer': typeof import('@/uni_modules/belay-unix').BlTransfer
    'bl-tree': typeof import('@/uni_modules/belay-unix').BlTree
    'bl-watermark': typeof import('@/uni_modules/belay-unix').BlWatermark
    'bl-swiper': typeof import('@/uni_modules/belay-unix').BlSwiper
    'bl-steps': typeof import('@/uni_modules/belay-unix').BlSteps
    'bl-step': typeof import('@/uni_modules/belay-unix').BlStep
    'bl-back-top': typeof import('@/uni_modules/belay-unix').BlBackTop
    'bl-custom-navigation-bar': typeof import('@/uni_modules/belay-unix').BlCustomNavigationBar
    'bl-menu': typeof import('@/uni_modules/belay-unix').BlMenu
    'bl-pagination': typeof import('@/uni_modules/belay-unix').BlPagination
    'bl-tabbar': typeof import('@/uni_modules/belay-unix').BlTabbar
    'bl-tab-button': typeof import('@/uni_modules/belay-unix').BlTabButton
    'bl-tab-panel': typeof import('@/uni_modules/belay-unix').BlTabPanel
    'bl-tabs': typeof import('@/uni_modules/belay-unix').BlTabs
    'bl-mp-custom-tabbar': typeof import('@/uni_modules/belay-unix').BlMpCustomTabbar
    'bl-bottom-bar': typeof import('@/uni_modules/belay-unix').BlBottomBar
    'bl-filter': typeof import('@/uni_modules/belay-unix').BlFilter
    'bl-col': typeof import('@/uni_modules/belay-unix').BlCol
    'bl-grid': typeof import('@/uni_modules/belay-unix').BlGrid
    'bl-grid-item': typeof import('@/uni_modules/belay-unix').BlGridItem
    'bl-page': typeof import('@/uni_modules/belay-unix').BlPage
    'bl-page-style': typeof import('@/uni_modules/belay-unix').BlPageStyle
    'bl-row': typeof import('@/uni_modules/belay-unix').BlRow
    'bl-scroll-view': typeof import('@/uni_modules/belay-unix').BlScrollView
    'bl-list-view': typeof import('@/uni_modules/belay-unix').BlListView
    'bl-space': typeof import('@/uni_modules/belay-unix').BlSpace
    'bl-noop': typeof import('@/uni_modules/belay-unix').BlNoop
    'bl-picker-cascader-selector': typeof import('@/uni_modules/belay-unix').BlPickerCascaderSelector
    'bl-picker-date': typeof import('@/uni_modules/belay-unix').BlPickerDate
    'bl-picker-multi-selector': typeof import('@/uni_modules/belay-unix').BlPickerMultiSelector
    'bl-picker-selector': typeof import('@/uni_modules/belay-unix').BlPickerSelector
    'bl-picker-time': typeof import('@/uni_modules/belay-unix').BlPickerTime
    'bl-portal': typeof import('@/uni_modules/belay-unix').BlPortal
    'bl-poster-painter': typeof import('@/uni_modules/belay-unix').BlPosterPainter
    'bl-preview-context': typeof import('@/uni_modules/belay-unix').BlPreviewContext
    'bl-share-app-message': typeof import('@/uni_modules/belay-unix').BlShareAppMessage
    'bl-share-dialog': typeof import('@/uni_modules/belay-unix').BlShareDialog
    'bl-theme': typeof import('@/uni_modules/belay-unix').BlTheme
    'bl-theme-provider': typeof import('@/uni_modules/belay-unix').BlThemeProvider
    'bl-theme-root': typeof import('@/uni_modules/belay-unix').BlThemeRoot
    'bl-i18n-provider': typeof import('@/uni_modules/belay-unix').BlI18nProvider
    'bl-video': typeof import('@/uni_modules/belay-unix').BlVideo
  }
}

