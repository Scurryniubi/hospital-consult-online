import { ConsultType, ConsultTime } from '@/enums'
// 文章类型
export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'

// 文章信息类型
export type Knowledge = {
  id: string
  title: string
  coverUrl: string[]
  topics: string[]
  collectionNumber: number
  commentNumber: number
  creatorName: string
  creatorAvatar: string
  creatorHospatalName: string
  likeFlag: 0 | 1
  content: string
  creatorDep: string
  creatorTitles: string
  creatorId: string
}

// 文章列表
export type KnowledgeList = Knowledge[]

// 文章列表带分页
export type KnowledgePage = {
  pageTotal: number
  total: number
  rows: KnowledgeList
}

// 文章列表查询参数
export type KnowledgeParams = {
  type: KnowledgeType
  current: number
  pageSize: number
}

// 通用的分页查询参数
export type PageParams = {
  current: number
  pageSize: number
}

// 医生卡片
export type Doctor = {
  id: string
  name: string
  avatar: string
  hospitalName: string
  gradeName: string
  depName: string
  positionalTitles: string
  likeFlag: 0 | 1
  serviceFee: number
  consultationNum: number
  score: number
  major: string
}

// 医生列表
export type DoctorList = Doctor[]

// 医生分页
export type DoctorPage = {
  pageTotal: number
  total: number
  rows: DoctorList
}

// 关注的类型
export type FollowType = 'doc' | 'knowledge' | 'topic' | 'disease'

// 上传的图片
export type Image = {
  url: string
  id: string
}

// 问诊记录
export type Consult = {
  id: string
  type: ConsultType // 问诊类型：1找医生 2极速问诊 3开药问诊
  illnessType: 0 | 1 // 问诊级别：0普通  1三甲
  depId: string // 问诊科室id
  illnessDesc: string // 病情描述
  illnessTime: ConsultTime // 患病时间
  consultFlag: 0 | 1 // 是否问诊过：0未问诊1问诊过
  pictures: Image[] // 病例信息-图片集合
  patientId: string // 患者id
  couponId: string // 优惠卷id
}

// 将问诊记录全部转换成可选
export type PartialConsult = Partial<Consult>

export type SubDep = {
  id: string
  name: string
  avatar: string // 科室的图标
}

export type TopDep = {
  id: string
  name: string
  child: SubDep[]
}

export type IllnessData = Pick<
  PartialConsult,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>

// 问诊订单预支付传参
export type ConsultOrderPreParams = Pick<PartialConsult, 'type' | 'illnessType'>

// 问诊订单预支付信息
export type ConsultOrderPreData = {
  pointDeduction: number
  couponDeduction: number
  couponId: string
  payment: number // 应付
  couponId: number
  actualPayment: number // 实付
}

// 问诊订单详情类型
export type ConsultOrderItem = Consult & {
  createTime: string
  docInfo?: Doctor
  patientInfo: Patient
  orderNo: string
  statusValue: string
  typeValue: string
  status: OrderType
  countdown: number
  prescriptionId?: string
  evaluateId: number
  payment: number
  couponDeduction: number
  pointDeduction: number
  actualPayment: number
}
