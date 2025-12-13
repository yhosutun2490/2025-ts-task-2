import axios from 'axios'

import type { DeleteOrderResponse, GetOrdersResponse, ApplyCouponResponse } from '@/types/order'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_PATH = import.meta.env.VITE_API_PATH

const orderApi = axios.create({
  baseURL: BASE_URL,
})

orderApi.interceptors.request.use(
  (request) => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')

    if (token) {
      request.headers['Authorization'] = token
    }

    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)

orderApi.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error.response.data)
  },
)

export const apiGetOrders = (params: {
  page?: string
}) =>
  orderApi.get<GetOrdersResponse>(`/v2/api/${API_PATH}/admin/orders`, { params })

export const apiDeleteOrder = (orderId: string) =>
  orderApi.delete<DeleteOrderResponse>(`/v2/api/${API_PATH}/admin/order/${orderId}`)

/**
 * 套用優惠卷
 * @param couponCode 優惠卷代碼
 * @returns
 */
export const apiApplyCoupon = (couponCode: string) =>
  orderApi.post<ApplyCouponResponse>(`/v2/api/${API_PATH}/coupon`, { data: { code: couponCode } })
