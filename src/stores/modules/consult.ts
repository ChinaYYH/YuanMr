import { ConsultType } from '@/enums'
import type { PartialConsult, ConsultIllness } from '@/types/consult'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    const consult = ref<PartialConsult>({})
    const setType = (type: ConsultType) => (consult.value.type = type)
    const setIllnessType = (type: 0 | 1) => (consult.value.illnessType = type)
    const setDep = (id: string) => (consult.value.depId = id)
    const setIllness = (
      illness: Pick<PartialConsult, 'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'>
    ) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    // 设置患者
    const setPatient = (id: string) => (consult.value.patientId = id)
    // 设置优惠券
    const setCoupon = (id?: string) => (consult.value.couponId = id)
    // 清空记录
    const clear = () => (consult.value = {})
    return { consult, setType, setIllnessType, setDep, setIllness, setPatient, setCoupon, clear }
  },
  {
    persist: true
  }
)
