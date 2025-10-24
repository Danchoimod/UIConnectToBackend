<template>
  <AdminPanel>
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3>Chỉnh sửa ứng dụng</h3>
        <button class="btn btn-secondary" @click="goBack">
          <i class="bi bi-arrow-left me-2"></i>Quay lại
        </button>
      </div>

      <div class="card shadow-sm">
        <div class="card-body">
          <form @submit.prevent="updateApp">
            <div class="mb-3">
              <label class="form-label">Tên ứng dụng</label>
              <input v-model="editForm.name" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Danh mục</label>
              <select v-model="editForm.categoryId" class="form-select" required>
                <option value="">-- Chọn danh mục --</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                  {{ cat.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Mô tả</label>
              <textarea v-model="editForm.description" class="form-control" rows="3"></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Hình ảnh</label>
              <div class="mb-2">
                <input
                  type="text"
                  v-model="editForm.image"
                  class="form-control"
                  placeholder="URL ảnh"
                />
              </div>
              <div>
                <label class="btn btn-outline-primary">
                  <i class="bi bi-upload me-2"></i>Tải ảnh lên
                  <input type="file" class="d-none" @change="onEditFileChange" accept="image/*" />
                </label>
                <span v-if="uploading" class="ms-2">
                  <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                  Đang tải lên...
                </span>
              </div>
              <div v-if="editForm.image" class="mt-3">
                <img
                  :src="editForm.image"
                  alt="Preview"
                  class="img-thumbnail"
                  style="max-width: 200px; max-height: 150px; object-fit: cover"
                />
              </div>
            </div>
            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-primary" :disabled="uploading">
                <i class="bi bi-save me-2"></i>Lưu thay đổi
              </button>
              <button type="button" class="btn btn-secondary" @click="goBack">
                <i class="bi bi-x-circle me-2"></i>Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminPanel>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import AdminPanel from '@/layout/Sidebar.vue'

const router = useRouter()
const route = useRoute()

const editForm = ref({ id: '', name: '', description: '', image: '', categoryId: '' })
const categories = ref([])
const uploading = ref(false)

async function fetchCategories() {
  try {
    const res = await axios.get('http://localhost:3000/categories')
    categories.value = res.data
  } catch (e) {
    categories.value = []
  }
}

async function fetchApp() {
  try {
    const id = route.params.id
    const res = await axios.get(`http://localhost:3000/apps/${id}`)
    editForm.value = res.data
  } catch (e) {
    alert('Không thể tải thông tin ứng dụng!')
    goBack()
  }
}

onMounted(async () => {
  await fetchCategories()
  await fetchApp()
})

async function onEditFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  uploading.value = true
  const url = 'https://api.cloudinary.com/v1_1/dhdke5ku8/image/upload'
  const preset = 'unsigned_upload'
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', preset)
  try {
    const res = await axios.post(url, formData)
    editForm.value.image = res.data.secure_url
    alert('Upload ảnh thành công!')
  } catch (err) {
    alert('Upload ảnh thất bại!')
  } finally {
    uploading.value = false
  }
}

async function updateApp() {
  if (uploading.value) {
    alert('Vui lòng đợi upload ảnh hoàn tất!')
    return
  }
  try {
    await axios.put(`http://localhost:3000/apps/${editForm.value.id}`, editForm.value)
    alert('Cập nhật thành công!')
    goBack()
  } catch (e) {
    alert('Cập nhật thất bại!')
  }
}

function goBack() {
  router.push({ name: 'AppList' })
}
</script>

<style scoped>
.card {
  border: none;
  border-radius: 10px;
}

.form-label {
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.5rem;
}

.form-control {
  border-radius: 8px;
  border: 1px solid #dee2e6;
  padding: 0.75rem;
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.btn {
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
}

.img-thumbnail {
  border-radius: 8px;
  border: 2px solid #dee2e6;
}
</style>
