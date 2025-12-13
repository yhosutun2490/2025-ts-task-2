<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { cart } = storeToRefs(cartStore)

</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-white mt-n1 py-10 px-3 z-1"
  >
    <div class="container">
       <RouterLink class="navbar-brand" to="/">
      <img
        class="img-fluid"
        style="width: 3.75rem; height: 3.75rem"
        src="../assets/images/logo.webp"
        alt="logo"
      />
    </RouterLink>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <RouterLink class="nav-item nav-link me-4" to="/products">產品列表</RouterLink>
        <RouterLink class="d-md-none nav-item nav-link" to="/cart">購物車</RouterLink>
        <RouterLink class="d-none d-md-block nav-item nav-link" to="/cart"
          ><div className="position-relative">
            <i className="fas fa-shopping-cart"></i>
            <span
              class="position-absolute badge text-bg-dark rounded-circle"
              style="bottom: 12px; left: 12px"
              >{{ cart?.carts.length }}</span
            >
          </div></RouterLink
        >
      </div>
    </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
