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
          <textarea
            v-model="form.description"
            class="form-control"
            rows="3"
            :class="{ 'is-invalid': submitted && !form.description }"
          ></textarea>
          <div v-if="submitted && !form.description" class="invalid-feedback d-block">
            Vui lòng nhập mô tả ứng dụng
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Hình ảnh</label>
          <input
            type="file"
            class="form-control"
            @change="onFileChange"
            accept="image/*"
            :class="{ 'is-invalid': submitted && !form.image }"
          />
          <div v-if="submitted && !form.image" class="invalid-feedback d-block">
            Vui lòng chọn hình ảnh
          </div>
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
import { useToast } from '@/composables/useToast'

const form = ref({ name: '', description: '', image: '', categoryId: '' })
const categories = ref([])
const router = useRouter()
const toast = useToast()
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
  const preset = 'unsigned_upload'
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', preset)
  try {
    const res = await axios.post(url, formData)
    form.value.image = res.data.secure_url
  } catch (err) {
    toast.error('Upload ảnh thất bại!')
  } finally {
    uploading.value = false
  }
}

async function addApp() {
  submitted.value = true
  if (!form.value.name || !form.value.categoryId || !form.value.description || !form.value.image) {
    toast.error('Vui lòng điền đầy đủ thông tin!')
    return
  }
  if (uploading.value) {
    toast.error('Vui lòng đợi upload ảnh hoàn tất!')
    return
  }
  try {
    await axios.post('http://localhost:3000/apps', form.value)
    toast.success('Thêm ứng dụng thành công!')
    form.value = { name: '', description: '', image: '', categoryId: '' }
    router.push('/admin/apps/list')
  } catch (e) {
    toast.error('Thêm ứng dụng thất bại!')
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
