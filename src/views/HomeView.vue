<template>
  <div class="container py-5">
    <h1 class="text-center text-primary mb-5">Trang chủ hệ thống quản trị</h1>

    <div class="row g-4 mb-5">
      <div class="col-md-4">
        <div class="card shadow-sm h-100 hover-card">
          <div class="card-body text-center">
            <h3 class="card-title text-success mb-3">Bài viết</h3>
            <div class="display-3 fw-bold">{{ postsCount }}</div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow-sm h-100 hover-card">
          <div class="card-body text-center">
            <h3 class="card-title text-info mb-3">Sản phẩm</h3>
            <div class="display-3 fw-bold">{{ productsCount }}</div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow-sm h-100 hover-card">
          <div class="card-body text-center">
            <h3 class="card-title text-warning mb-3">Người dùng</h3>
            <div class="display-3 fw-bold">{{ usersCount }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <h2 class="mb-4">Chức năng nhanh</h2>
      <div class="d-flex justify-content-center gap-3 flex-wrap">
        <button class="btn btn-primary btn-lg" @click="goToPosts">
          <i class="bi bi-file-text me-2"></i>Quản lý bài viết
        </button>
        <button class="btn btn-success btn-lg" @click="goToProducts">
          <i class="bi bi-box me-2"></i>Quản lý sản phẩm
        </button>
        <button class="btn btn-secondary btn-lg" @click="goToUsers">
          <i class="bi bi-people me-2"></i>Quản lý người dùng
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const postsCount = ref(0)
const productsCount = ref(0)
const usersCount = ref(0)

const API_URL = 'http://localhost:3001'

onMounted(async () => {
  try {
    const [postsRes, productsRes, usersRes] = await Promise.all([
      axios.get(`${API_URL}/posts`),
      axios.get(`${API_URL}/products`),
      axios.get(`${API_URL}/users`),
    ])

    postsCount.value = postsRes.data.length
    productsCount.value = productsRes.data.length
    usersCount.value = usersRes.data.length
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
})

const goToPosts = () => router.push('/posts')
const goToProducts = () => router.push('/products')
const goToUsers = () => router.push('/users')
</script>

<style scoped>
.hover-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
</style>
