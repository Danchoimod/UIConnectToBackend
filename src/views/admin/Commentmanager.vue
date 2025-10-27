<template>
  <Sidebar>
    <div class="comment-manager">
      <div class="header mb-4">
        <h2 class="mb-3">Quản lý đánh giá</h2>
        <p class="text-muted">Tổng số đánh giá: {{ comments.length }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-danger" role="alert">
        <i class="bi bi-exclamation-triangle me-2"></i>
        {{ error }}
      </div>

      <!-- Comments Table -->
      <div v-else class="card shadow-sm">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-dark">
                <tr>
                  <th scope="col" style="width: 5%">#</th>
                  <th scope="col" style="width: 15%">Người dùng</th>
                  <th scope="col" style="width: 15%">Ứng dụng</th>
                  <th scope="col" style="width: 35%">Nội dung</th>
                  <th scope="col" style="width: 10%">Ngày</th>
                  <th scope="col" style="width: 10%">Lượt thích</th>
                  <th scope="col" style="width: 10%">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="comments.length === 0">
                  <td colspan="7" class="text-center py-4 text-muted">
                    <i class="bi bi-inbox fs-1 d-block mb-2"></i>
                    Chưa có đánh giá nào
                  </td>
                </tr>
                <tr v-for="(comment, index) in comments" :key="comment.id">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="avatar-circle me-2">
                        {{ comment.userName?.charAt(0).toUpperCase() || 'U' }}
                      </div>
                      <span>{{ comment.userName || 'Ẩn danh' }}</span>
                    </div>
                  </td>
                  <td>
                    <span class="badge bg-info text-dark">
                      {{ getAppName(comment.appId) }}
                    </span>
                  </td>
                  <td>
                    <div class="text-truncate" style="max-width: 300px" :title="comment.text">
                      <template v-if="!comment.violated">
                        {{ comment.text }}
                      </template>
                      <template v-else>
                        <span class="text-danger fw-semibold"
                          >Bình luận đã bị đánh dấu vi phạm</span
                        >
                      </template>
                    </div>
                  </td>
                  <td>
                    <small class="text-muted">
                      <i class="bi bi-calendar3 me-1"></i>
                      {{ formatDate(comment.date) }}
                    </small>
                  </td>
                  <td>
                    <span class="badge bg-primary">
                      <i class="bi bi-hand-thumbs-up me-1"></i>
                      {{ comment.likes || 0 }}
                    </span>
                  </td>
                  <td>
                    <button
                      v-if="!comment.violated"
                      class="btn btn-sm btn-warning"
                      @click="setViolation(comment.id, true)"
                      :disabled="processing === comment.id"
                      title="Đánh dấu vi phạm"
                    >
                      <i
                        :class="
                          processing === comment.id
                            ? 'spinner-border spinner-border-sm'
                            : 'bi bi-flag'
                        "
                      ></i>
                    </button>
                    <button
                      v-else
                      class="btn btn-sm btn-outline-success"
                      @click="setViolation(comment.id, false)"
                      :disabled="processing === comment.id"
                      title="Bỏ đánh dấu vi phạm"
                    >
                      <i
                        :class="
                          processing === comment.id
                            ? 'spinner-border spinner-border-sm'
                            : 'bi bi-arrow-counterclockwise'
                        "
                      ></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from '@/layout/Sidebar.vue'
import { useToast } from '@/composables/useToast'

const comments = ref([])
const apps = ref([])
const loading = ref(false)
const error = ref(null)
const processing = ref(null)
const toast = useToast()

const API_URL = 'http://localhost:3000'

// Lấy danh sách comments
const fetchComments = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch(`${API_URL}/comments`)
    if (!response.ok) {
      throw new Error('Không thể tải danh sách đánh giá')
    }
    const data = await response.json()

    comments.value = data.sort((a, b) => b.id - a.id)
  } catch (err) {
    error.value = err.message
    console.error('Error fetching comments:', err)
  } finally {
    loading.value = false
  }
}

// Lấy danh sách apps để hiển thị tên app
const fetchApps = async () => {
  try {
    const response = await fetch(`${API_URL}/apps`)
    if (!response.ok) {
      throw new Error('Không thể tải danh sách ứng dụng')
    }
    apps.value = await response.json()
  } catch (err) {
    console.error('Error fetching apps:', err)
  }
}

// Thiết lập trạng thái vi phạm (có thể hoàn tác nhiều lần)
const setViolation = async (id, violated) => {
  const msg = violated ? 'Đánh dấu bình luận này là vi phạm?' : 'Bỏ vi phạm bình luận này?'
  if (!confirm(msg)) return
  processing.value = id
  try {
    const response = await fetch(`${API_URL}/comments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ violated }),
    })
    if (!response.ok) throw new Error('Không thể cập nhật trạng thái bình luận')

    // Cập nhật tại chỗ
    comments.value = comments.value.map((c) => (c.id === id ? { ...c, violated } : c))
    toast.success(violated ? 'Đã đánh dấu bình luận vi phạm!' : 'Đã bỏ vi phạm bình luận!')
  } catch (err) {
    toast.error('Lỗi: ' + err.message)
    console.error('Error updating violation:', err)
  } finally {
    processing.value = null
  }
}

// Lấy tên app theo ID
const getAppName = (appId) => {
  const app = apps.value.find((a) => a.id === appId)
  return app ? app.name : `App #${appId}`
}

// Format ngày
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN')
}

// Load dữ liệu khi component được mount
onMounted(() => {
  fetchComments()
  fetchApps()
})
</script>

<style scoped>
.comment-manager {
  max-width: 1400px;
  margin: 0 auto;
}

.header h2 {
  color: #2c3e50;
  font-weight: 600;
}

.card {
  border: none;
  border-radius: 10px;
  overflow: hidden;
}

.table {
  margin-bottom: 0;
}

.table thead th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #dee2e6;
}

.table tbody tr {
  transition: background-color 0.2s ease;
}

.table tbody tr:hover {
  background-color: #f8f9fa;
}

.avatar-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.85rem;
}

.btn-sm {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
}

.btn-sm:hover::after {
  content: attr(title);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 5px;
  padding: 5px 10px;
  background-color: #333;
  color: white;
  font-size: 0.75rem;
  white-space: nowrap;
  border-radius: 4px;
  z-index: 1000;
  pointer-events: none;
}

.btn-sm:hover::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #333;
  z-index: 1000;
  pointer-events: none;
}

.btn-danger:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.badge {
  padding: 0.4rem 0.65rem;
  font-weight: 500;
  border-radius: 6px;
}

.spinner-border {
  width: 2rem;
  height: 2rem;
}

@media (max-width: 768px) {
  .table {
    font-size: 0.85rem;
  }

  .btn-sm {
    padding: 0.2rem 0.5rem;
    font-size: 0.75rem;
  }
}
</style>
