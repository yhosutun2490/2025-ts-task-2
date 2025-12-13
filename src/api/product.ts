import axios from 'axios'
import type {
  GetAllProductsResponse,
  GetProductDetailResponse,
  GetProductsResponse,
} from '@/types/product'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_PATH = import.meta.env.VITE_API_PATH

const productApi = axios.create({
  baseURL: BASE_URL,
})

productApi.interceptors.request.use(
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

productApi.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error.response.data)
  },
)

// 前台商品 API
/**
 * 取得特定分類商品列表
 * @param params
 * @returns
 */
export const apiGetProducts = (params?: { category?: string; page?: string }) =>
  productApi.get<GetProductsResponse>(`/v2/api/${API_PATH}/products`, { params })

/**
 * 取得所有商品列表
 * @returns
 */
export const apiGetAllProducts = () =>
  productApi.get<GetAllProductsResponse>(`/v2/api/${API_PATH}/products/all`)

/**
 * 根據id 取得特定商品詳細資訊
 * @param id 商品id
 * @returns
 */
export const apiGetProductDetail = (id: string) =>
  productApi.get<GetProductDetailResponse>(`/v2/api/${API_PATH}/product/${id}`)
