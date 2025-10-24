<template>
  <AdminPanel>
    <div class="container">
      <h3 class="mb-4">Thêm ứng dụng mới</h3>
      <form @submit.prevent="addApp">
        <div class="mb-3">
          <label class="form-label">Tên ứng dụng</label>
          <input
            v-model="form.name"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': submitted && !form.name }"
          />
          <div v-if="submitted && !form.name" class="invalid-feedback d-block">
            Vui lòng nhập tên ứng dụng
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Danh mục</label>
          <select
            v-model="form.categoryId"
            class="form-select"
            :class="{ 'is-invalid': submitted && !form.categoryId }"
          >
            <option value="">-- Chọn danh mục --</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
          <div v-if="submitted && !form.categoryId" class="invalid-feedback d-block">
            Vui lòng chọn danh mục
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Mô tả</label>
          <textarea v-model="form.description" class="form-control" rows="3"></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Hình ảnh</label>
          <input type="file" class="form-control" @change="onFileChange" accept="image/*" />
          <div v-if="form.image" class="mt-2">
            <img :src="form.image" alt="Preview" style="max-width: 200px; max-height: 120px" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="uploading">
          <span v-if="uploading" class="spinner-border spinner-border-sm me-2" role="status" />
          Thêm ứng dụng
        </button>
      </form>
    </div>
  </AdminPanel>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AdminPanel from '@/layout/Sidebar.vue'
import { useRouter } from 'vue-router'

const form = ref({ name: '', description: '', image: '', categoryId: '' })
const categories = ref([])
const router = useRouter()
const uploading = ref(false)
const submitted = ref(false)

async function fetchCategories() {
  try {
    const res = await axios.get('http://localhost:3000/categories')
    categories.value = res.data
  } catch (e) {
    categories.value = []
  }
}

onMounted(fetchCategories)

async function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  uploading.value = true
  const url = 'https://api.cloudinary.com/v1_1/dhdke5ku8/image/upload'
  const preset = 'unsigned_upload' // Đổi thành tên preset unsigned bạn đã tạo trên Cloudinary
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', preset)
  try {
    const res = await axios.post(url, formData)
    form.value.image = res.data.secure_url
  } catch (err) {
    alert('Upload ảnh thất bại!')
  } finally {
    uploading.value = false
  }
}

async function addApp() {
  submitted.value = true
  if (!form.value.name || !form.value.categoryId) {
    return
  }
  if (uploading.value) {
    alert('Vui lòng đợi upload ảnh hoàn tất!')
    return
  }
  try {
    await axios.post('http://localhost:3000/apps', form.value)
    alert('Thêm ứng dụng thành công!')
    form.value = { name: '', description: '', image: '', categoryId: '' }
    router.push('/admin/apps/list')
  } catch (e) {
    alert('Thêm ứng dụng thất bại!')
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
