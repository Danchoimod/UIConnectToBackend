<template>
  <AdminPanel>
    <div class="container">
      <h3 class="mb-4">Danh sách ứng dụng</h3>
      <ul class="list-group">
        <li
          v-for="app in apps"
          :key="app.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <div class="d-flex align-items-center gap-3">
            <img
              v-if="app.image"
              :src="app.image"
              alt="app"
              style="width: 48px; height: 48px; object-fit: cover; border-radius: 8px"
            />
            <span>{{ app.name }} - {{ app.description }}</span>
          </div>
          <div>
            <button
              class="btn btn-sm btn-outline-info me-2"
              @click="viewDetail(app.id)"
              title="Xem chi tiết"
            >
              <i class="bi bi-eye"></i>
            </button>
            <button
              class="btn btn-sm btn-outline-primary me-2"
              @click="editApp(app.id)"
              title="Sửa"
            >
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="deleteApp(app.id)" title="Xóa">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </AdminPanel>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import AdminPanel from '@/layout/Sidebar.vue'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const toast = useToast()
const apps = ref([])

async function fetchApps() {
  try {
    const res = await axios.get('http://localhost:3000/apps')
    // Đảo ngược mảng để app mới nhất lên trên
    apps.value = res.data.reverse()
  } catch (e) {
    apps.value = []
  }
}
onMounted(fetchApps)

function viewDetail(id) {
  router.push({ name: 'EditApp', params: { id }, query: { mode: 'view' } })
}

function editApp(id) {
  router.push({ name: 'EditApp', params: { id } })
}

async function deleteApp(id) {
  if (confirm('Bạn có chắc muốn xóa ứng dụng này?')) {
    try {
      await axios.delete(`http://localhost:3000/apps/${id}`)
      await fetchApps()
      toast.success('Đã xóa ứng dụng!')
    } catch (e) {
      toast.error('Xóa thất bại!')
    }
  }
}
</script>

<style scoped>
.list-group-item img {
  border: 1px solid #eee;
}

.btn-sm {
  position: relative;
  transition: all 0.3s ease;
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
</style>
