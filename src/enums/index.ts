export enum ConsultType {
  Doctor = 1,
  Fast,
  Medication
}

export enum ConsultTime {
  week = 1,
  Month,
  HalfYear,
  More
}

// 消息类型
export enum MsgType {
  // 文字
  MsgText = 1,
  // 图片
  MsgImage = 4,
  // 患者
  CardPat = 21,
  // 处方
  CardPre = 22,
  // 未评价
  CardEvaForm = 23,
  // 已评价
  CardEva = 24,
  // 通用系统
  Notify = 31,
  // 温馨提示
  NotifyTip = 32,
  // 取消订单
  NotifyCancel = 33
}

// 处方状态
export enum PrescriptionStatus {
  // 未支付
  NotPayment = 1,
  // 已支付
  Payment = 2,
  // 无效
  Invalid = 3
}

// 问诊订单状态
export enum OrderType {
  // ----------------问诊订单------------------
  // 待支付
  ConsultPay = 1,
  // 待接诊
  ConsultWait = 2,
  // 咨询中
  ConsultChat = 3,
  // 已完成
  ConsultComplete = 4,
  // 已取消
  ConsultCancel = 5,
  // ----------------药品订单------------------
  // 待支付
  MedicinePay = 10,
  // 待发货
  MedicineSend = 11,
  // 待收货
  MedicineTake = 12,
  // 已完成
  MedicineComplete = 13,
  // 已取消
  MedicineCancel = 14
}
