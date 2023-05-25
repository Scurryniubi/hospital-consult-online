export type User = {
  token: string
  id: string
  account: string // 用户名
  mobile: string // 脱敏手机号，带星号的手机号
  avatar: string
}