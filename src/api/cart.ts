import axios from 'axios'
import type {
  AddCartItemResponse,
  DeleteCartItemResponse,
  GetCartResponse,
  UpdateCartItemResponse,
} from '@/types/cart.ts'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_PATH = import.meta.env.VITE_API_PATH

// 建立 axios 實例
const cartApi = axios.create({
  baseURL: BASE_URL,
})

cartApi.interceptors.request.use(
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

cartApi.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error.response.data)
  },
)

/**
 * 取得使用者購物車資料
 * @returns
 */
export const apiGetCart = () => cartApi.get<GetCartResponse>(`/v2/api/${API_PATH}/cart`)

/**
 * 使用者新增購物車資料
 * @param params
 * @returns
 */
export const apiAddCartItem = (params: { product_id: string; qty: number }) =>
  cartApi.post<AddCartItemResponse>(`/v2/api/${API_PATH}/cart`, { data: params })

/**
 * 使用者編輯購物車資料
 * @param params
 * @returns
 */
export const apiUpdateCartItem = (params: { id: string; product_id: string; qty: number }) => {
  const { id: cartId, ...data } = params

  return cartApi.put<UpdateCartItemResponse>(`/v2/api/${API_PATH}/cart/${cartId}`, {
    data,
  })
}

/**
 * 使用者刪除購物車資料
 * @param cartId 購物車id
 * @returns
 */
export const apiDeleteCartItem = (cartId: string) =>
  cartApi.delete<DeleteCartItemResponse>(`/v2/api/${API_PATH}/cart/${cartId}`)
