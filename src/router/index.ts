import { createRouter, createWebHistory } from 'vue-router'
import Test from '../views/test/index.vue'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/test',
      component: Test
    },
    {
      path: '/login',
      component: () => import('../views/login/index.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/article',
          component: () => import('@/views/article/index.vue'),
          meta: { title: '健康百科' }
        },
        {
          path: '/notify',
          component: () => import('@/views/notify/index.vue'),
          meta: { title: '消息通知' }
        },
        {
          path: '/user',
          component: () => import('@/views/user/index.vue'),
          meta: { title: '个人中心' }
        }
      ]
    },
    {
      path: '/user/patient',
      component: () => import('@/views/user/PatientInfo.vue'),
      meta: { title: '家庭档案' }
    },
    {
      path: '/consult/fast',
      component: () => import('@/views/consult/ConsultFast.vue'),
      meta: { title: '选择问诊类型' }
    },
    {
      path: '/consult/dep',
      component: () => import('@/views/consult/ConsultDep.vue'),
      meta: { title: '选择科室' }
    },
    {
      path: '/consult/illness',
      component: () => import('@/views/consult/ConsultIllness.vue'),
      meta: { title: '病情描述' }
    },
    {
      path: '/consult/ConsultPay',
      component: () => import('@/views/consult/ConsultPay.vue'),
      meta: { title: '支付订单' }
    },
    {
      path: '/consult/patient',
      component: () => import('@/views/user/PatientInfo.vue'),
      meta: { title: '家庭档案' }
    },
    {
      path: '/room',
      component: () => import('@/views/room/index.vue'),
      meta: { title: '问诊室' }
    }
  ]
})

router.beforeEach((to) => {
  // 设置标题
  document.title = `优医在线问诊-${to.meta.title || ''}`
  // 用户仓库
  const store = useUserStore()
  // 不需要登录的页面，白名单
  const wihteList = ['/login', 'register']
  // 如果没有登录且不在白名单内，去登录
  if (!store.user?.token && !wihteList.includes(to.path)) return '/login'
  // 否则不做任何处理
})

export default router
