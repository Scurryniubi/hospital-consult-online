import type {
  KnowledgePage,
  KnowledgeParams,
  DoctorPage,
  PageParams,
  FollowType,
  TopDep,
  Image,
  ConsultOrderPreData,
  ConsultOrderPreParams,
  PartialConsult,
  ConsultOrderItem
} from '@/types/consult'

import { request } from '@/utils/request'

// 首页-查询推荐/减脂/饮食健康/关注页面--百科文章列表
export const getKnowledgePage = (params: KnowledgeParams) =>
  request.get<KnowledgePage>('/patient/home/knowledge', { params })

export const getDoctorPage = (params: PageParams) =>
  request.get<DoctorPage>('/home/page/doc', { params })

export const followDoctor = (id: string, type: FollowType = 'doc') =>
  request.post('/like', { id, type })

// 找医生--查询所有科室-层级
export const getAllDep = () => request.get<TopDep[]>('dep/all')

// 上传病情描述图片
export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request.post<Image>('/upload', fd)
}

// 拉取预支付订单信息
export const getConsultOrderPre = (params: ConsultOrderPreParams) =>
  request.get<ConsultOrderPreData>('/patient/consult/order/pre', { params })

// 生成订单
export const createConsultOrder = (data: PartialConsult) =>
  request.post<{ id: string }>('/patient/consult/order', data)

// 获取支付地址  0 是微信  1 支付宝
export const getConsultOrderPayUrl = (data: {
  paymentMethod: 0 | 1 | undefined
  orderId: string | undefined
  payCallback: string | undefined
}) => request.post<{ payUrl: string }>('/patient/consult/pay', data)

export const getConsultOrderDetail = (orderId: string) =>
  request.get<ConsultOrderItem>('/patient/consult/order/detail', { params: { orderId } })

// 查看处方
export const getPrescriptionPic = (id: string) =>
  request.get<{ url: string }>(`/patient/consult/prescription/${id}`)

// 评价问诊
export const evaluateConsultOrder = (data: {
  docId: string // 医生ID
  orderId: string // 订单ID
  score: number
  content: string
  anonymousFlag: 0 | 1
}) => request.post<{ id: string }>('/patient/order/evaluate', data)
