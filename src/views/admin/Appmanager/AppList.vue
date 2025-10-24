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
            <button class="btn btn-sm btn-outline-primary me-2" @click="editApp(app.id)">
              <i class="bi bi-pencil me-1"></i>Sửa
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="deleteApp(app.id)">
              <i class="bi bi-trash me-1"></i>Xóa
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

const router = useRouter()
const apps = ref([])

async function fetchApps() {
  try {
    const res = await axios.get('http://localhost:3000/apps')
    // Sắp xếp theo ID giảm dần (mới nhất trên cùng)
    apps.value = res.data.sort((a, b) => b.id - a.id)
  } catch (e) {
    apps.value = []
  }
}
onMounted(fetchApps)

function editApp(id) {
  router.push({ name: 'EditApp', params: { id } })
}

async function deleteApp(id) {
  if (confirm('Bạn có chắc muốn xóa ứng dụng này?')) {
    try {
      await axios.delete(`http://localhost:3000/apps/${id}`)
      await fetchApps()
      alert('Đã xóa ứng dụng!')
    } catch (e) {
      alert('Xóa thất bại!')
    }
  }
}
</script>

<style scoped>
.list-group-item img {
  border: 1px solid #eee;
}
</style>
