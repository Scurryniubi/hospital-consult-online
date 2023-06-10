<script setup lang="ts">
import type { OrderStatus } from '@/enums'
import type { OrderList, OrderParams, OrderRow } from '@/types/order'
import { ref } from 'vue'
import OrderItem from './OrderItem.vue'
import { getOrderListAPI } from '@/api/order'

const props = defineProps<{ type: OrderStatus }>()
const loading = ref(false)
const finished = ref(false)
const list = ref<OrderRow[]>([])

const onLoad = async () => {
  const res = await getOrderListAPI(params.value)
  console.log('订单', res.data)
  list.value.push(...res.data.rows)
  if (params.value.current < res.data.pageTotal) {
    params.value.current++
  } else {
    finished.value = true
  }
  loading.value = false
}

const params = ref<OrderParams>({
  current: 1,
  pageSize: 5,
  status: props.type
})

// const onLoad = async () => {
//   const res = await getConsultOrderList(params.value)
//   list.value.push(...res.data.rows)
//   if (params.value.current < res.data.pageTotal) {
//     params.value.current++
//   } else {
//     finished.value = true
//   }
//   loading.value = false
// }

// const onDelete = (id: string) => {
//   list.value = list.value.filter((item) => item.id !== id)
// }
</script>

<template>
  <div class="consult-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <order-item v-for="item in list" :key="item.id" :item="item" />
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.consult-list {
  padding: 10px 15px;
}
</style>
