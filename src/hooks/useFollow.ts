import type { Doctor, FollowType, Knowledge } from '@/types/consult'
import { followDoctor } from '@/api/consult'
import { ref } from 'vue'
import { showSuccessToast } from 'vant'

export const useFollow = (type: FollowType) => {
  const loading = ref(false)
  const follow = async (doc: Doctor | Knowledge) => {
    // 防止重复点击
    loading.value = true
    try {
      await followDoctor(doc.id, type)
      doc.likeFlag = doc.likeFlag === 1 ? 0 : 1
      doc.likeFlag === 1 ? showSuccessToast('关注成功') : showSuccessToast('取关成功')
    } finally {
      // 无论 try / catch 结果如何都会执行的代码块
      loading.value = false
    }
  }

  return { loading, follow }
}
