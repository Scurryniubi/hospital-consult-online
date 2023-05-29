<template>
  <son v-model="sports" v-model:games="games"></son>
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
    <hr />
    <van-button @click="getUserInfo" type="primary">获取用户信息</van-button>
    <cp-icon name="consult-alipay"></cp-icon>
    <svg aria-hidden="true">
      <!-- #icon-文件夹名称-图片名称 -->
      <use href="#icon-login-eye-off" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
import { request } from '@/utils/request'
import { onMounted, ref } from 'vue'
import son from './son.vue'
const store = useUserStore()
const sports = ref('篮球')
const games = ref('赛车游戏')
const changeUser = () => {
  store.setUser({
    token: '111',
    id: '1',
    account: 'hahha',
    mobile: '13688889999',
    avatar: 'hi'
  })
}
const getUserInfoAPI = () => {
  return request.get('/patient/myUser')
}

const getUserInfo = async () => {
  const res = await getUserInfoAPI()
  console.log(res)
}

const loginAPI = (mobile: string, password: string) => {
  return request.post('login/password', {
    mobile,
    password
  })
}

const login = async () => {
  const res = await loginAPI('13211112222', 'abc12345')
  console.log(res)
}

onMounted(() => {
  // getUserInfo(),
  // login()
})
</script>

<style scoped></style>
