import type {
  KnowledgePage,
  KnowledgeParams,
  DoctorPage,
  PageParams,
  FollowType
} from '@/types/consult'
import { request } from '@/utils/request'

// 首页-查询推荐/减脂/饮食健康/关注页面--百科文章列表
export const getKnowledgePage = (params: KnowledgeParams) =>
  request.get<KnowledgePage>('/patient/home/knowledge', { params })

export const getDoctorPage = (params: PageParams) =>
  request.get<DoctorPage>('/home/page/doc', { params })

export const followDoctor = (id: string, type: FollowType = 'doc') =>
  request.post('/like', { id, type })
