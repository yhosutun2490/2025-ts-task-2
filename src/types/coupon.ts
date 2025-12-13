/**
 * 優惠券相關型別定義
 * @description 定義與優惠券相關基本結構
 * @property {due_date} number - 優惠券到期日的時間戳 為時間戳數字
 */
export type CouponData = {
  id: string,
  title: string,
  is_enabled: number,
  percent: number,
  due_date: number,
  code: string,
}

/**
 * 建立優惠券參數型別
 * @property {CouponData} - 要建立的優惠券資料
 * - duce_date 為時間戳數字
 */
export type CreateCouponParams = CouponData

/**
* 編輯優惠券參數型別
* @property {data} CouponData - 要更新的優惠券資料
* - duce_date 為時間戳數字
*/
export type EditCouponParams = {
  id: CouponData['id']
  data: Omit<CouponData, 'id'>
}

// 分頁資訊型別
export type Pagination = {
  total_pages: number
  current_page: number
  has_pre: boolean
  has_next: boolean
  category: string
}

// API 回應型別
export type GetCouponsResponse = {
  success: boolean
  coupons: CouponData[]
  pagination: Pagination
  messages: unknown[]
}

// 訊息回應型別
type MessageResponse = {
  success: boolean
  message: string
}

export type CreateCouponResponse = MessageResponse
export type EditCouponResponse = MessageResponse
export type DeleteCouponResponse = MessageResponse
