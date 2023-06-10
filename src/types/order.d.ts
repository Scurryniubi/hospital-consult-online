import { OrderStatus } from '@/enums'

export interface OrderList {
  /**
   * 总页数
   */
  pageTotal: number
  rows: OrderRow[]
  /**
   * 总条数
   */
  total: number
}

/**
 * 评价数据
 */
export interface OrderRow {
  [x: string]: OrderStatus
  /**
   * 实际支付
   */
  actualPayment?: number
  /**
   * 订单地址信息
   */
  address?: Address
  /**
   * 优惠券抵扣，不使用优惠券为0
   */
  couponDeduction?: number
  /**
   * 使用的优惠券id
   */
  couponId?: string
  /**
   * 运费
   */
  expressFee?: number
  /**
   * 订单id
   */
  id: string
  /**
   * 药品信息
   */
  medicines?: Medicine[]
  /**
   * 订单编号
   */
  orderNo?: string
  /**
   * 药品金额
   */
  payment?: number
  /**
   * 支付方式0微信支付，1支付宝2云闪付
   */
  paymentMethod?: string
  /**
   * 药品订单状态：'10': '待支付',   '11': '待发货',   '12': '待收货',  '13': '已完成', '14': '已取消',
   */
  OrderStatus?: OrderStatus
  /**
   * 药品订单状态：'10': '待支付',   '11': '待发货',   '12': '待收货',  '13': '已完成', '14': '已取消',
   */
  'statusValue\t'?: string
}

/**
 * 订单地址信息
 */
export interface Address {
  /**
   * 收货人
   */
  receiver?: string
  /**
   * 收货人省份+市
   */
  receiverAddress?: string
  /**
   * 收货人详细地址
   */
  receiverAddressDetail?: string
  /**
   * 收货人手机号
   */
  receiverMobile?: string
}

export interface Medicine {
  /**
   * 药品价格
   */
  amount: number
  /**
   * 药品图片
   */
  avatar?: string
  /**
   * 主键id
   */
  id?: string
  /**
   * 药品名称
   */
  name?: string
  /**
   * 是否是处方药0不是1是
   */
  prescriptionFlag?: string
  /**
   * 选择的药品数量
   */
  quantity: number
  /**
   * 药品规格
   */
  specs?: string
  /**
   * 药品用法用量
   */
  usageDosag?: string
}

/**
 * 查询订单列表参数
 * current当前页  pageSize每次请求页数  status药品订单的状态
 */
export type OrderParams = {
  current: number
  pageSize: number
  status: OrderStatus
}

/**
 * CancelOrderMsg
 */
export interface CancelOrderMsg {
  /**
   * code
   */
  code: number
  /**
   * 确认收货
   */
  data: { [key: string]: any }
  /**
   * 信息
   */
  msg: string
  /**
   * 成功标志
   */
  success: boolean
}
