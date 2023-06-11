<script setup lang="ts">
import {
  getConsultOrderPre,
  getPatientDetail,
  createConsultOrder,
  getConsultOrderPayUrl
} from '@/api'
import { useConsultStore } from '@/stores'
import { onMounted, ref } from 'vue'
import type { Patient } from '@/types/User'
import type { ConsultOrderPreData } from '@/types/consult'
import { showConfirmDialog, showFailToast, showToast } from 'vant'
import { useRouter } from 'vue-router'
import { onBeforeRouteLeave } from 'vue-router'
import CpPaySheet from '@/components/cp-pay-sheet.vue'

const router = useRouter()
const store = useConsultStore()
const patientDetail = ref({} as Patient) // 接收患者信息
const consultOrderPre = ref({} as ConsultOrderPreData) // 接收预支付信息
const agree = ref(false) // 控制是否同意支付协议
const show = ref(false) // 控制支付弹层是否出现
const paymentMethod = ref<0 | 1>() // 支付方式（0:微信，1:支付宝）
const orderId = ref('')
const loading = ref(false)
// const payCallback = ref('http://127.0.0.1:5173/room')

// 第一次点立即支付
const pay = async () => {
  if (!agree.value) return showFailToast('请勾选我已同意支付协议')
  loading.value = true // 在发送请求的前一个时刻启动submit的加载状态
  const res = await createConsultOrder(store.consult)
  console.log(res.data)
  orderId.value = res.data.id
  loading.value = false // 在收到响应的后一个时刻关闭submit的加载状态
  show.value = true
}
// 第二次点立即支付 -- 在弹窗里点
// const next = async () => {
//   if (paymentMethod.value === undefined) return showFailToast('请选择支付方式')
//   if (paymentMethod.value === 0)
//     return showFailToast('非常抱歉,微信支付暂时无法使用，请换一种支付方式')
//   showToast('跳转支付中...')
//   const res = await getConsultOrderPayUrl({
//     paymentMethod: paymentMethod.value,
//     orderId: orderId.value,
//     payCallback: 'http://127.0.0.1:5173/room'
//   })
//   window.location.href = res.data.payUrl
// }

const onClose = () => {
  return showConfirmDialog({
    title: '关闭支付',
    message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
    cancelButtonText: '仍要关闭',
    confirmButtonText: '继续支付',
    confirmButtonColor: 'var(--cp-primary)'
  })
    .then(() => {
      return false
    })
    .catch(() => {
      orderId.value = '' // 清空后才能跳转页面
      router.push('/user/consult')
      return true
    })
}

const getPatientDetailApi = async () => {
  const res = await getPatientDetail(store.consult.patientId)
  patientDetail.value = res.data
}
const getConsultOrderPreApi = async () => {
  const res = await getConsultOrderPre({
    type: store.consult.type,
    illnessType: store.consult.illnessType
  })
  consultOrderPre.value = res.data
}

onMounted(() => {
  getPatientDetailApi(), getConsultOrderPreApi()
})
onBeforeRouteLeave(() => {
  if (orderId.value) return false // 如果已生成订单，则不允许回退
})
</script>

<template>
  <div class="consult-pay-page">
    <cp-nav-bar title="支付" />
    <!-- 1. 支付信息 -->
    <div class="pay-info">
      <p class="tit">图文问诊 {{ consultOrderPre.payment }} 元</p>
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>
    <van-cell-group>
      <van-cell
        title="优惠券"
        :value="`-¥${consultOrderPre.couponId ? consultOrderPre.couponId : 0}.00`"
      />
      <van-cell
        title="积分抵扣"
        :value="`-¥${consultOrderPre.pointDeduction ? consultOrderPre.pointDeduction : 0}.00`"
      />
      <van-cell
        title="实付款"
        :value="`-¥${consultOrderPre.actualPayment ? consultOrderPre.actualPayment : 0}.00`"
        class="pay-price"
      />
    </van-cell-group>
    <div class="pay-space"></div>
    <!-- 2. 患者信息  -->
    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${patientDetail.name} | ${patientDetail.gender === 1 ? '男' : '女'} | ${
          patientDetail.age
        }岁`"
      ></van-cell>
      <van-cell title="病情描述" label="头痛，头晕，恶心"></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="agree">我已同意 <span class="text">支付协议</span></van-checkbox>
    </div>
    <!-- 3. 打开支付弹层并创建问诊订单 -->
    <van-submit-bar
      :loading="loading"
      @click="pay"
      button-type="primary"
      :price="consultOrderPre.actualPayment * 100"
      button-text="立即支付"
      text-align="left"
    />

    <cp-pay-sheet
      v-model:show="show"
      :order-id="orderId"
      :actualPayment="consultOrderPre.actualPayment"
      :onClose="onClose"
    />
  </div>
</template>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 46px 0 50px 0;
  .pay-info {
    display: flex;
    padding: 15px;
    flex-wrap: wrap;
    align-items: center;
    .tit {
      width: 100%;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .img {
      margin-right: 10px;
      width: 38px;
      height: 38px;
      border-radius: 4px;
      overflow: hidden;
    }
    .desc {
      flex: 1;
      > span {
        display: block;
        color: var(--cp-tag);
        &:first-child {
          font-size: 16px;
          color: var(--cp-text2);
        }
      }
    }
  }
  .pay-price {
    ::v-deep() {
      .vam-cell__title {
        font-size: 16px;
      }
      .van-cell__value {
        font-size: 16px;
        color: var(--cp-price);
      }
    }
  }
  .pay-space {
    height: 12px;
    background-color: var(--cp-bg);
  }
  .pay-schema {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      color: var(--cp-primary);
    }
  }
  ::v-deep() {
    .van-submit-bar__button {
      font-weight: normal;
      width: 160px;
    }
  }
}
// 支付弹层样式
.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .btn {
    padding: 15px;
  }
  .van-cell {
    align-items: center;
    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>
