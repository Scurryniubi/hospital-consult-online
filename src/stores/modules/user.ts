// import pinia from "../index"
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/User'

export const useUserStore = defineStore(
  'User',
  () => {
    const user = ref({} as User)

    const setUser = (val: User) => {
      user.value = val
    }

    const delUser = () => {
      user.value = {} as User
    }

    return { user, setUser, delUser }
  },
  {
    persist: true
  }
)
