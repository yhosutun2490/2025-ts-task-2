import { apiAddCartItem, apiDeleteCartItem, apiGetCart, apiUpdateCartItem } from '@/api/cart'
import type { CartItem } from '@/types/cart'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<{ carts: CartItem[]; total: number; final_total: number }>({
    carts: [],
    total: 0,
    final_total: 0,
  })
  // update status
  const isUpdating = ref(false)
  const isDeleting = ref(false)

  const getCart = async () => {
    try {
      const res = await apiGetCart()
      cart.value = {
        carts: res.data.data.carts,
        total: res.data.data.total,
        final_total: res.data.data.final_total,
      }
    } catch  {
      alert('取得購物車失敗')
    }
  }

  const addCartItem = async (params: { product_id: string; qty: number }) => {
    try {
      await apiAddCartItem({
        product_id: params.product_id,
        qty: params.qty,
      })
      await getCart()
    } catch {
      alert('加入購物車失敗')
    }
  }

  const updataCartItem = async (params: { product_id: string; qty: number; id: string }) => {
    try {
      isUpdating.value = true

      await apiUpdateCartItem({
        id: params.id,
        product_id: params.product_id,
        qty: params.qty,
      })
      await getCart()
    } catch {
      alert('更新購物車失敗')
    } finally {
      isUpdating.value = false
    }
  }

  const deleteCartItem = async (cartId: string) => {
    try {
      isDeleting.value = true

      await apiDeleteCartItem(cartId)
      await getCart()
    } catch  {
      alert('刪除購物車項目失敗')
    } finally {
      isDeleting.value = false
    }
  }

  return { cart, isUpdating, isDeleting, getCart, addCartItem, updataCartItem, deleteCartItem }
})
