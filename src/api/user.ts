import type { User, CodeType, UserInfo, PatientList } from '@/types/User'
import { request } from '@/utils/request'

// 密码登录
export const loginByPassword = (mobile: string, password: string) =>
  request.post<User>('/login/password', { mobile, password })

export const sendMobileCode = (mobile: string, type: CodeType) =>
  request.get('/code', { params: { mobile, type } })

export const loginByMobile = (mobile: string, code: string) =>
  request.post<User>('/login', { mobile, code })

export const getUserInfo = () => request.get<UserInfo>('/patient/myUser')

export const getPatientList = () => request.get<PatientList>('/patient/mylist')
