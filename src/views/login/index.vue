<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { showSuccessToast, showFailToast, type FormInstance } from 'vant'
import { loginByPassword, sendMobileCode, loginByMobile } from '@/api'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const store = useUserStore()

const isPass = ref(true)
const agree = ref(false)
const mobile = ref<string>('')
const password = ref<string>('')
const code = ref('')
const isShowPassword = ref(false)
const time = ref(0)
const form = ref<FormInstance>()
let timeId: number

const onClickRight = () => {
  console.log('点击了注册')
}
const send = async () => {
  if (time.value > 0) return
  // 验证不通过报错，阻止程序继续执行
  await form.value?.validate('mobile')
  const res = await sendMobileCode(mobile.value, 'login')
  console.log(res)
  showSuccessToast('发送成功')
  time.value = 60
  // 倒计时
  timeId = window.setInterval(() => {
    time.value--
    if (time.value <= 0) window.clearInterval(timeId)
  }, 1000)
}

onUnmounted(() => {
  window.clearInterval(timeId)
})

const login = async () => {
  if (agree.value === false) {
    showFailToast('请先勾选用户协议')
  } else {
    try {
      const res = isPass.value
        ? await loginByPassword(mobile.value, password.value)
        : await loginByMobile(mobile.value, code.value)
      console.log(res)
      store.setUser(res.data)
      showSuccessToast('登录成功')
      router.push((route.query.returnUrl as string) || '/user')
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<template>
  <cp-nav-bar title="登录" @onClickRight="onClickRight"></cp-nav-bar>
  <div class="login">
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;">
        <span @click="isPass = !isPass">{{ !isPass ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- == form 表单 == -->
    <div class="login">
      <!-- ... -->
      <!-- 表单 -->
      <van-form ref="form" autocomplete="off" @submit="login">
        <van-field
          name="mobile"
          v-model="mobile"
          :rules="mobileRules"
          placeholder="请输入手机号"
          type="tel"
        ></van-field>
        <van-field
          v-if="isPass"
          v-model="password"
          :rules="passwordRules"
          placeholder="请输入密码"
          :type="isShowPassword ? `text` : `password`"
        >
          <template #button>
            <cp-icon
              @click="isShowPassword = !isShowPassword"
              :name="isShowPassword ? `login-eye-on` : `login-eye-off`"
            ></cp-icon>
          </template>
        </van-field>
        <van-field v-else v-model="code" :rules="codeRules" placeholder="短信验证码">
          <template #button>
            <span :class="{ active: time > 0 }" @click="send">
              {{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}
            </span>
          </template>
        </van-field>
        <div class="cp-cell">
          <van-checkbox v-model="agree">
            <span>我已同意</span>
            <a href="javascript:;">用户协议</a>
            <span>及</span>
            <a href="javascript:;">隐私条款</a>
          </van-checkbox>
        </div>
        <div class="cp-cell">
          <van-button native-type="submit" block round type="primary">登 录</van-button>
        </div>
        <div class="cp-cell">
          <a href="javascript:;">忘记密码？</a>
        </div>
      </van-form>
      <!-- ... -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.active {
  color: red;
}
.login {
  padding-top: 46px;
  &-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  .van-form {
    padding: 0 14px;
    .cp-cell {
      height: 52px;
      padding: 14px 16px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .van-checkbox {
        a {
          color: var(--cp-primary);
          padding: 0 5px;
        }
      }
    }
  }
}
</style>
