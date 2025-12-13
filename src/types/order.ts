export type Order = {
  create_at: number
  id: string
  is_paid: boolean
  message?: string
  paid_date?: number
  products: {
    [key: string]: {
      final_total: number
      id: string
      product_id: string
      qty: number
      total: number
      product: {
        category: string
        content: string
        description: string
        id: string
        imageUrl: string
        imagesUrl: string[]
        is_enabled: number
        origin_price: number
        price: number
        title: string
        unit: string
      }
    }
  }
  total: number
  user: {
    address: string
    email: string
    name: string
    tel: string
  }
  num: number
}

export type Pagination = {
  total_pages: number
  current_page: number
  has_pre: boolean
  has_next: boolean
  category: string
}

export type GetOrdersResponse = {
  success: boolean
  orders: Order[]
  pagination: {
    total_pages: number
    current_page: number
    has_pre: boolean
    has_next: boolean
    category: string
  }
  messages: unknown[]
}

export type DeleteOrderResponse = {
  success: boolean
  message: string
}

export type ApplyCouponResponse = {
  success: boolean
  message: string
  data: {
    final_total: number
  }
}

export type CreateOrderParams = {
  user: {
    name: string
    email: string
    tel: string
    address: string
  }
  message: string
}

type MessageResponse = {
  success: boolean
  message: string
}
/**
 * 顧客輸入結帳資訊回應型別
 */
export type CreateOrderResponse = MessageResponse & {
  total: number
  create_at: number
  orderId: string
}

/**
 * 顧客付款後回應型別
 */
export type PayOrderResponse = MessageResponse
