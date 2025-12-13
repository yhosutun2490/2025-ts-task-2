import { createApp } from 'vue'
import './assets/styles/all.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import 'bootstrap/js/dist/collapse'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)

app.mount('#app')
