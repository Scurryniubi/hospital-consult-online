<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
// 1. 已有的功能：返回图标，返回效果，固定定位（组件内部实现）
// 2. 使用组件时候才能确定的功能：标题，右侧文字，点击右侧文字行为（props传入）
const onClickLeft = () => {
  if (closeDialog) {
    return closeDialog()
  }
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}
const {
  left = true,
  closeDialog,
  title,
  clickRight
} = defineProps<{
  closeDialog?: () => void
  title?: string
  left?: boolean
  clickRight?: () => void
}>()

// const emits = defineEmits<{
//   (e: 'onClickRight'): void
// }>()
const onClickRight = () => {
  if (clickRight) {
    return clickRight()
  }
}
</script>

<template>
  <van-nav-bar
    :left-arrow="left"
    @click-left="onClickLeft"
    fixed
    :title="title"
    right-text=""
    @click-right="onClickRight"
  ></van-nav-bar>
</template>

<style lang="scss" scoped>
::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
