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
        <div class="col-md-3 mb-3">
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

        <div class="col-md-3 mb-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <p class="card-text text-muted mb-1">Tổng số lương ứng dụng</p>
                  <h3 class="card-title mb-0">567</h3>
                </div>
                <i class="bi bi-box text-success" style="font-size: 2rem"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3 mb-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <p class="card-text text-muted mb-1">Đơn hàng hôm nay</p>
                  <h3 class="card-title mb-0">89</h3>
                </div>
                <i class="bi bi-bag text-warning" style="font-size: 2rem"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3 mb-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <p class="card-text text-muted mb-1">Doanh thu</p>
                  <h3 class="card-title mb-0">$12.5k</h3>
                </div>
                <i class="bi bi-currency-dollar text-danger" style="font-size: 2rem"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts & Tables -->
      <div class="row">
        <div class="col-lg-8 mb-4">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-bottom">
              <h5 class="mb-0">Đơn hàng gần đây</h5>
            </div>
            <div class="card-body">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Khách hàng</th>
                    <th>Trạng thái</th>
                    <th>Ngày</th>
                    <th>Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#001</td>
                    <td>Nguyễn Văn A</td>
                    <td><span class="badge bg-success">Thành công</span></td>
                    <td>2025-10-15</td>
                    <td>$500</td>
                  </tr>
                  <tr>
                    <td>#002</td>
                    <td>Trần Thị B</td>
                    <td><span class="badge bg-warning text-dark">Đang xử lý</span></td>
                    <td>2025-10-14</td>
                    <td>$750</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-lg-4 mb-4">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-bottom">
              <h5 class="mb-0">Hoạt động gần đây</h5>
            </div>
            <div class="card-body">
              <div class="timeline">
                <div class="timeline-item mb-3">
                  <p class="mb-1"><small class="text-muted">10:30 AM</small></p>
                  <p class="mb-0">Người dùng mới đã đăng ký</p>
                </div>
                <div class="timeline-item mb-3">
                  <p class="mb-1"><small class="text-muted">09:15 AM</small></p>
                  <p class="mb-0">Sản phẩm mới được thêm vào</p>
                </div>
                <div class="timeline-item">
                  <p class="mb-1"><small class="text-muted">08:00 AM</small></p>
                  <p class="mb-0">Đơn hàng được hoàn thành</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminPanel>
</template>

<script setup>
const users = ref([]) //tạo mảng chưa thông tin người dùng

import { getUsers } from '@/api/Userservice.js'
import AdminPanel from '@/layout/Sidebar.vue'
import { onMounted } from 'vue'
import axios from 'axios'
import { ref } from 'vue'

onMounted(async () => {
  users.value = await getUsers()
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
