<template>
  <AdminPanel>
    <div class="container-fluid">
      <div class="row mb-4">
        <div class="col">
          <h2>Dashboard</h2>
          <p class="text-muted">Chào mừng đến bảng điều khiển quản trị</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="row mb-4">
        <div class="col-md-4 mb-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <p class="card-text text-muted mb-1">Tổng người dùng</p>
                  <h3 class="card-title mb-0">
                    {{ (users && users.length) || 'Users not found' }}
                  </h3>
                </div>
                <i class="bi bi-people text-primary" style="font-size: 2rem"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <p class="card-text text-muted mb-1">Tổng số lượng ứng dụng</p>
                  <h3 class="card-title mb-0">
                    {{ (apps && apps.length) || 'Apps not found' }}
                  </h3>
                </div>
                <i class="bi bi-box text-success" style="font-size: 2rem"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <p class="card-text text-muted mb-1">Số lượng comment</p>
                  <h3 class="card-title mb-0">
                    {{ (comments && comments.length) || 'Comments not found' }}
                  </h3>
                </div>
                <i class="bi bi-chat-dots text-warning" style="font-size: 2rem"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminPanel>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUsers } from '@/api/Userservice.js'
import AdminPanel from '@/layout/Sidebar.vue'
import axios from 'axios'

const users = ref([]) // Tạo mảng chứa thông tin người dùng
const apps = ref([]) // Tạo mảng chứa thông tin ứng dụng
const comments = ref([]) // Tạo mảng chứa thông tin comments

const API_URL = 'http://localhost:3000'

// Lấy danh sách ứng dụng
const getApps = async () => {
  try {
    const response = await axios.get(`${API_URL}/apps`)
    apps.value = response.data
  } catch (error) {
    console.error('Error fetching apps:', error)
  }
}

// Lấy danh sách comments
const getComments = async () => {
  try {
    const response = await axios.get(`${API_URL}/comments`)
    comments.value = response.data
  } catch (error) {
    console.error('Error fetching comments:', error)
  }
}

onMounted(async () => {
  users.value = await getUsers()
  await getApps()
  await getComments()
})
</script>

<style scoped>
.card {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

.timeline-item {
  padding-left: 20px;
  border-left: 2px solid #dee2e6;
}

.timeline-item:first-child {
  border-left-color: #0d6efd;
}
</style>
