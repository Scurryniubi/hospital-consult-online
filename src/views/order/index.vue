<script setup lang="ts">
import OrderList from './components/OrderList.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeName = ref<string>('unReceive')
const { left = true } = defineProps<{
  left?: boolean
}>()

if (route.query.enterName) {
  // activeName.value = JSON.parse(route.query.enterName as any)
  activeName.value = route.query.enterName as string
}
</script>

<template>
  <div class="consult-page">
    <cp-nav-bar :left="left" title="订单详情" />
    <van-tabs v-model:active="activeName" sticky>
      <van-tab title="待支付" name="unPay"><order-list :type="10" /></van-tab>
      <van-tab title="待发货" name="unSend"><order-list :type="11" /></van-tab>
      <van-tab title="待收货" name="unReceive"><order-list :type="12" /></van-tab>
      <van-tab title="已完成" name="complete"><order-list :type="13" /></van-tab>
      <van-tab title="已取消" name="cancel"><order-list :type="14" /></van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.consult-page {
  padding-top: 46px;
  background-color: var(--cp-bg);
  min-height: calc(100vh - 46px);
}
</style>
