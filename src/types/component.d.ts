import cpNavBar from '@/components/cp-nav-bar.vue'
import cpIcons from '@/components/cp-icons.vue'
import CpRadioBtn from '@/components/cp-radio-btn.vue'
import CpConsultMore from '@/components/cp-consult-more.vue'
declare module 'vue' {
  interface GlobalComponents {
    cpNavBar: typeof cpNavBar
    cpIcons: typeof cpIcons
    CpRadioBtn: typeof CpRadioBtn
    CpConsultMore: typeof CpConsultMore
  }
}
