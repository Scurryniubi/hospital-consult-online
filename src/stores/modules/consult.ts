import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IllnessData, PartialConsult } from '@/types/consult'
import { ConsultType } from '@/enums/index'

export const useConsultStore = defineStore(
  'consult',
  () => {
    // 定义用于存储的consult
    const consult = ref<PartialConsult>({})

    // 定义用于修改consult的方法
    // 1.设置问诊类型
    const setConsultType = (type: ConsultType) => {
      consult.value.type = type
    }
    // 2.设置问诊级别（普通/三甲）
    const setIllnessType = (type: 0 | 1) => {
      consult.value.illnessType = type
    }
    // 3.设置科室
    const setDepId = (id: string) => {
      consult.value.depId = id
    }
    // 4.设置病情描述
    const setIllness = (illness: IllnessData) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    // 5.设置患者档案
    const setPatient = (id: string | undefined) => {
      consult.value.patientId = id
    }
    // 6.设置优惠券(未实现)
    const setCouponId = (id: string) => {
      consult.value.couponId = id
    }
    // 7.设置清空方法
    const clear = () => {
      consult.value = {}
    }

    return {
      consult,
      setConsultType,
      setIllnessType,
      setDepId,
      setIllness,
      setPatient,
      setCouponId,
      clear
    }
  },
  {
    persist: true
  }
)
