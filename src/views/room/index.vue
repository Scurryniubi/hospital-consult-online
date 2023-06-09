<script setup lang="ts">
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import { onMounted, onUnmounted, ref, nextTick, provide } from 'vue'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import { io, type Socket } from 'socket.io-client'
import { baseURL } from '@/utils/request'
import { MsgType, OrderType } from '@/enums'
import type { Message, TimeMessages } from '@/types/room'
import type { ConsultOrderItem } from '@/types/consult'
import { getConsultOrderDetail } from '@/api/consult'
import type { Image } from '@/types/consult'
// 1. 获取订单详情
const consult = ref<ConsultOrderItem>()

const list = ref<Message[]>([])

const store = useUserStore()
const route = useRoute()
provide('consult', consult)

let socket: Socket

const sendText = (text: string) => {
  // 发送信息需要数据：发送人、收消息人、消息类型、消息内容
  socket.emit('sendChatMsg', {
    from: store.user?.id, // 发送人
    to: consult.value?.docInfo?.id, // 收消息人
    msgType: MsgType.MsgText, // 消息类型
    msg: { content: text } // 消息内容
  })
}

const sendImage = (img: Image) => {
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgImage,
    msg: { picture: img }
  })
}

// 评价成功，修改评价消息状态和数据，切换卡片展示
const completeEva = (score: number) => {
  // 获取评价信息数据
  const item = list.value.find((item) => item.msgType === MsgType.CardEvaForm)
  if (item) {
    item.msg.evaluateDoc = { score }
    item.msgType = MsgType.CardEva
  }
}
provide('completeEva', completeEva)

// 组件销毁时关闭连接
onUnmounted(() => {
  socket.close()
})

// 组件挂载建立连接
onMounted(async () => {
  // 建立链接，创建 socket.io 实例
  socket = io(baseURL, {
    auth: {
      token: `Bearer ${store.user?.token}`
    },
    query: {
      orderId: route.query.orderId
    }
  })

  // 如果连接建立成功就会执行这个函数
  socket.on('connect', () => {
    // 建立连接成功
    console.log('connect')
  })

  // 捕捉错误
  socket.on('error', (event) => {
    // 错误异常消息
    console.log('error')
  })

  // 断开连接时执行这里
  socket.on('disconnect', () => {
    // 已经断开连接
    console.log('disconnect')
  })

  // 聊天记录		({ data }: { data: TimeMessages[] }) 给解构的数据指定类型
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    // 准备转换常规消息列表
    const arr: Message[] = []
    data.forEach((item, i) => {
      // 1. 处理消息时间
      arr.push({
        msgType: MsgType.Notify,
        msg: { content: item.createTime },
        createTime: item.createTime,
        id: item.createTime
      })
      // 2. 其它消息
      arr.push(...item.items)
    })
    // 追加到聊天消息列表
    list.value.unshift(...arr)
    console.log(list.value)
  })

  // 接收消息
  socket.on('receiveChatMsg', async (msg) => {
    list.value.push(msg)
    await nextTick()
    window.scrollTo(0, document.body.scrollHeight)
  })

  // 3. 监听医生订单状态变更，更新订单状态（必须）
  socket.on('statusChange', async () => {
    const res = await getConsultOrderDetail(route.query.orderId as string)
    consult.value = res.data
    console.log('订单状态更新了：', consult.value)
  })
})

onMounted(async () => {
  const res = await getConsultOrderDetail(route.query.orderId as string)
  consult.value = res.data
})
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室" />
    <!-- 1. 问诊状态-->
    <room-status :status="consult?.status" :countdown="consult?.countdown" />
    <!-- 2. 问诊聊天列表消息 -->
    <room-message :list="list" />
    <!-- 3. 底部操作栏：发消息 -->
    <room-action
      :disabled="consult?.status !== OrderType.ConsultChat"
      @send-text="sendText"
      @send-image="sendImage"
    />
  </div>
</template>
<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>
