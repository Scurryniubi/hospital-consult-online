import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LocationQueryValue } from 'vue-router'

export const useOrderStore = defineStore(
  'order',
  () => {
    const orderIdMapArr = ref<
      {
        orderID?: string
        preOrderID?: string | LocationQueryValue | LocationQueryValue[]
      }[]
    >([])
    const setOrderIdMap = (idMap: {
      orderID?: string
      preOrderID?: string | LocationQueryValue | LocationQueryValue[]
    }) => {
      orderIdMapArr.value.push(idMap)
    }

    return { orderIdMapArr, setOrderIdMap }
  },
  {
    persist: true
  }
)
