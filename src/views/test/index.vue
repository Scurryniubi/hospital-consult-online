<template>
  <div>
    <h1>laozhanniubi!!!hhh</h1>
    <p>这是user：{{ store.user }}</p>
    <p>
      <button @click="changeUser">点击修改user</button>
    </p>
    <hr />
    <van-button type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
const store = useUserStore()
const changeUser = () => {
  store.setUser({
    token: '111',
    id: '1',
    account: 'hahha',
    mobile: '13688889999',
    avatar: 'hi'
  })
}
</script>

<style scoped></style>
