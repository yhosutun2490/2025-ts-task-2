import { type ProductItem } from '@/types/product'
import { type CouponData } from '@/types/coupon'

export type GetCartResponse = {
  success: boolean
  data: {
    carts: {
      coupon: CouponData | null
      final_total: number
      id: string
      product: ProductItem
      product_id: string
      qty: number
      total: number
    }[]
    total: number
    final_total: number
  }
  messages: unknown[]
}


export type AddCartItemResponse = {
  success: boolean
  message: string
  data: {
    product_id: string
    qty: number
    id: string
    total: number
    final_total: number
    product: ProductItem
  }
}

export type UpdateCartItemResponse = {
  success: boolean
  message: string
  data: {
    product_id: string
    qty: number
  }
}

export type DeleteCartItemResponse = {
  success: boolean
  message: string
}


