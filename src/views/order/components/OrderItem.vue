<script setup lang="ts">
import { cancelOrder } from '@/api/consult'
import { OrderStatus } from '@/enums'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { showSuccessToast, showFailToast } from 'vant'
import type { OrderRow } from '@/types/order'
import { useOrderStore } from '@/stores/modules/order'

const store = useOrderStore()

const router = useRouter()
defineProps<{ item: OrderRow }>()

// 取消订单
const loading = ref(false)
const cancelConsultOrder = async (item: OrderRow) => {
  loading.value = true
  try {
    await cancelOrder(item.id)
    // 修改订单的状态
    item.OrderStatus = OrderStatus.Cancel
    // item.statusValue = '已取消'
    item['statusValue\t'] = '14'
    showSuccessToast('取消成功')
  } catch (e) {
    showFailToast('取消失败')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-for="medicine in item.medicines" :key="medicine.id" class="consult-item">
    <div class="head van-hairline--bottom">
      <img class="img" :src="medicine.avatar" />
      <p>{{ medicine.name }}</p>
      <span> × {{ medicine.quantity }}</span>
    </div>
    <div class="body" @click="router.push(`/medicine/${item.id}`)">
      <div class="body-row">
        <div class="body-label">订单编号</div>
        <div class="body-value">{{ item.id }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">单价</div>
        <div class="body-value">¥ {{ medicine.amount }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">价格</div>
        <div class="body-value">¥ {{ medicine.quantity * medicine.amount }}.00</div>
      </div>
      <div class="body-row">
        <div class="body-label">备注</div>
        <div class="body-value tip">{{ medicine.specs }}</div>
      </div>
    </div>

    <!-- 1. 待支付：取消问诊+去支付 -->
    <div class="foot" v-if="item.status === OrderStatus.UnPay">
      <van-button
        :loading="loading"
        @click="cancelConsultOrder(item)"
        class="gray"
        plain
        size="small"
        round
        >取消订单</van-button
      >
      <van-button
        type="primary"
        plain
        size="small"
        round
        :to="`/medicine/pay?id=${
          store.orderIdMapArr.find((itm) => itm.orderID === item.id)?.preOrderID
        }`"
      >
        去支付
      </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-item {
  border-radius: 4px;
  box-shadow: 0px 0px 22px 0px rgba(245, 245, 245, 0.1);
  background-color: #fff;
  margin-bottom: 10px;
  .head {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 15px;
    .img {
      width: 50px;
      height: 40px;
    }
    > p {
      flex: 1;
      font-size: 15px;
      padding-left: 10px;
    }
    > span {
      color: var(--cp-tag);
      &.orange {
        color: #f2994a;
      }
      &.green {
        color: var(--cp-primary);
      }
    }
  }
  .body {
    padding: 15px 15px 8px 15px;
    .body-row {
      display: flex;
      margin-bottom: 7px;
    }
    .body-label {
      width: 62px;
      font-size: 13px;
      color: var(--cp-tip);
    }
    .body-value {
      width: 250px;
      &.tip {
        color: var(--cp-tip);
      }
    }
  }
  .foot {
    padding: 0 15px 15px 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .van-button {
      margin-left: 10px;
      padding: 0 16px;
      &.gray {
        color: var(--cp-text3);
        background-color: var(--cp-bg);
      }
    }
    .more {
      color: var(--cp-tag);
      flex: 1;
      font-size: 13px;
    }
  }
}
</style>
