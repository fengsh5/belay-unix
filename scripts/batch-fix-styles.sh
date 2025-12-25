#!/bin/bash

# 批量修复组件样式：移除内联样式，只保留 scss 导入
# 使用方法: bash scripts/batch-fix-styles.sh

echo "开始批量修复组件样式..."

# 定义需要处理的文件列表
files=(
  "uni_modules/belay-unix/components/bl-uploader/index.vue"
  "uni_modules/belay-unix/components/bl-uploader/index.uvue"
  "uni_modules/belay-unix/components/bl-image/index.vue"
  "uni_modules/belay-unix/components/bl-step/index.vue"
  "uni_modules/belay-unix/components/bl-list-view/index.vue"
  "uni_modules/belay-unix/components/bl-share-dialog/index.vue"
  "uni_modules/belay-unix/components/bl-share-dialog/BlSharePoster.uvue"
  "uni_modules/belay-unix/components/bl-custom-navigation-bar/index.vue"
  "uni_modules/belay-unix/components/bl-page/index.vue"
  "uni_modules/belay-unix/components/bl-col/index.vue"
)

# 备份计数
count=0

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "处理: $file"
    # 这里需要手动处理每个文件，因为每个文件的内联样式不同
    ((count++))
  fi
done

echo "完成！共需要处理 $count 个文件"
echo "注意：由于每个文件的内联样式不同，建议手动逐个处理"

