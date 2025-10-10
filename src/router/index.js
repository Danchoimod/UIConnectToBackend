import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/HomePage.vue')
const Bai1 = () => import('@/components/Bai1.vue')
const Bai2 = () => import('@/components/Bai2.vue')
const Bai3 = () => import('@/components/Bai3.vue')
const Bai4 = () => import('@/components/Bai4.vue')
const Desktop = () => import('@/views/dekstop.vue')

const routes = [
  { path: '/', name: 'HomePage', component: Home },
  { path: '/bai1', name: 'Bai1', component: Bai1 },
  { path: '/bai2', name: 'Bai2', component: Bai2 },
  { path: '/bai3', name: 'Bai3', component: Bai3 },
  { path: '/bai4', name: 'Bai4', component: Bai4 },
  { path: '/desktop', name: 'desktop', component: Desktop },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
