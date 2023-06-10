import type { OrderList, OrderParams } from '@/types/order'
import { request } from '@/utils/request'

export const getOrderListAPI = (params: OrderParams) => {
  return request.get<OrderList>(`patient/medicine/order/mylist`, { params })
}

export const CancelOrderAPI = (id: string) => {
  return request.put(`patient/order/cancel/${id}`)
}
