import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/HomePage.vue')
const Bai3 = () => import('@/components/Bai3.vue')
const Bai4 = () => import('@/components/Bai4.vue')

const routes = [
  { path: '/', name: 'HomePage', component: Home },
  { path: '/bai3', name: 'Bai3', component: Bai3 },
  { path: '/bai4', name: 'Bai4', component: Bai4 },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
