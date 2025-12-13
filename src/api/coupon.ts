import axios from 'axios'
import type {
  GetCouponsResponse,
  CreateCouponParams,
  CreateCouponResponse,
  EditCouponParams,
  EditCouponResponse,
  DeleteCouponResponse,
} from '@/types/coupon'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_PATH = import.meta.env.VITE_API_PATH

// 建立 axios 實例
const couponApi = axios.create({
  baseURL: BASE_URL,
})

couponApi.interceptors.request.use(
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

couponApi.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error.response.data)
  },
)
// 取得優惠券列表
export const apiGetCoupons = (params: { page: number }) => {
  return couponApi.get<GetCouponsResponse>(`/v2/api/${API_PATH}/admin/coupons`, {
    params,
  })
}

// 建立優惠券
export const apiCreateCoupon = (params: CreateCouponParams) => {
  return couponApi.post<CreateCouponResponse>(`/v2/api/${API_PATH}/admin/coupon`, {
    data: params,
  })
}

// 編輯優惠券
export const apiEditCoupon = ({ id, ...params }: EditCouponParams) => {
  return couponApi.put<EditCouponResponse>(`/v2/api/${API_PATH}/admin/coupon/${id}`, {
    params,
  })
}

// 刪除優惠券
export const apiDeleteCoupon = (couponId: string) => {
  return couponApi.delete<DeleteCouponResponse>(`/v2/api/${API_PATH}/admin/coupon/${couponId}`)
}
