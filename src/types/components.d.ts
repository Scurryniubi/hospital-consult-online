import CpNavBar from '@/components/cp-nav-bar.vue'
import CpIcon from '@/components/CpIcon.vue'
import CpRadioBtn from '@/components/cp-radio-btn.vue'
import CpPaySheet from '@/components/cp-pay-sheet.vue'
import ConsultOrder from '@/views/user/ConsultOrder.vue'

declare module 'vue' {
  interface GlobalComponents {
    CpNavBar: typeof CpNavBar
    CpIcon: typeof CpIcon
    CpRadioBtn: typeof CpRadioBtn
    CpPaySheet: typeof CpPaySheet
    ConsultOrder: typeof ConsultOrder
  }
}
