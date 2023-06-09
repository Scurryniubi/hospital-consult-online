import type { User, CodeType, UserInfo, PatientList, Patient } from '@/types/User'
import { request } from '@/utils/request'

// 密码登录
export const loginByPassword = (mobile: string, password: string) =>
  request.post<User>('/login/password', { mobile, password })

// 获取验证码
export const sendMobileCode = (mobile: string, type: CodeType) =>
  request.get('/code', { params: { mobile, type } })

// 验证码登录
export const loginByMobile = (mobile: string, code: string) =>
  request.post<User>('/login', { mobile, code })

// 获取用户信息
export const getUserInfo = () => request.get<UserInfo>('/patient/myUser')

// 获取患者列表
export const getPatientList = () => request.get<PatientList>('/patient/mylist')

// 添加患者
export const addPatient = (patient: Patient) => request.post('patient/add', patient)

// 编辑患者
export const editPatient = (patient: Patient) => request.put('/patient/update', patient)

// 删除患者信息
export const delPatient = (id: string) => request.delete(`/patient/del/${id}`)

// 查询患者详情
export const getPatientDetail = (id: string | undefined) =>
  request.get<Patient>(`/patient/info/${id}`)
