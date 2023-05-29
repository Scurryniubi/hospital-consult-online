import { createApp } from 'vue'
import pinia from '@/stores'

import App from './App.vue'
import router from './router'
import '@/styles/main.scss'
import 'virtual:svg-icons-register'

// Toast
import 'vant/es/toast/style'
// Dialog
import 'vant/es/dialog/style'
// Notify
import 'vant/es/notify/style'
// ImagePreview
import 'vant/es/image-preview/style'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
