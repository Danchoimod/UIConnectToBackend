<template>
  <div class="container py-5">
    <h1 class="text-center text-success mb-4">
      {{ isEditing ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới' }}
    </h1>

    <form @submit.prevent="handleSubmit" class="card shadow p-4">
      <div class="mb-3">
        <label for="title" class="form-label fw-semibold">Tiêu đề</label>
        <input
          type="text"
          id="title"
          v-model="form.title"
          placeholder="Nhập tiêu đề bài viết"
          :class="['form-control', { 'is-invalid': errors.title }]"
        />
        <div v-if="errors.title" class="invalid-feedback">{{ errors.title }}</div>
      </div>

      <div class="mb-3">
        <label for="image" class="form-label fw-semibold">Hình ảnh</label>
        <input
          type="file"
          id="image"
          @change="handleFileChange"
          accept="image/*"
          ref="fileInput"
          :class="['form-control', { 'is-invalid': errors.image }]"
        />
        <div v-if="errors.image" class="invalid-feedback">{{ errors.image }}</div>

        <div v-if="imagePreview" class="mt-3 text-center">
          <img
            :src="imagePreview"
            alt="Preview"
            class="img-thumbnail"
            style="max-width: 400px; max-height: 300px"
          />
        </div>

        <div v-if="uploading" class="text-primary fw-semibold mt-2">
          <div class="spinner-border spinner-border-sm me-2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          Đang upload ảnh...
        </div>
      </div>

      <div class="mb-3">
        <label for="author" class="form-label fw-semibold">Tác giả</label>
        <input
          type="text"
          id="author"
          v-model="form.author"
          placeholder="Nhập tên tác giả"
          :class="['form-control', { 'is-invalid': errors.author }]"
        />
        <div v-if="errors.author" class="invalid-feedback">{{ errors.author }}</div>
      </div>

      <div class="mb-3">
        <label for="content" class="form-label fw-semibold">Nội dung</label>
        <textarea
          id="content"
          v-model="form.content"
          placeholder="Nhập nội dung bài viết"
          rows="6"
          :class="['form-control', { 'is-invalid': errors.content }]"
        ></textarea>
        <div v-if="errors.content" class="invalid-feedback">{{ errors.content }}</div>
      </div>

      <div class="d-flex justify-content-center gap-3 mt-4">
        <button type="submit" class="btn btn-primary px-4" :disabled="uploading">
          {{ isEditing ? 'Cập nhật' : 'Lưu' }}
        </button>
        <button type="button" class="btn btn-secondary px-4" @click="goBack">Quay lại</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const form = ref({
  title: '',
  author: '',
  content: '',
  image: '',
})

const errors = ref({})
const imagePreview = ref('')
const uploading = ref(false)
const isEditing = ref(false)
const fileInput = ref(null)

// Backend API (JSON Server)
const BACKEND_URL = 'http://localhost:3001'

// Cloudinary config (unsigned preset like AddApp.vue)
const CLOUDINARY_CLOUD_NAME = 'dhdke5ku8' // Thay bằng cloud name của bạn nếu khác
const CLOUDINARY_UPLOAD_PRESET = 'unsigned_upload' // Thay bằng upload preset của bạn nếu khác

// Nếu bạn chưa có Cloudinary, tạo account tại https://cloudinary.com
// Sau đó vào Settings > Upload > Add upload preset (unsigned)

onMounted(async () => {
  const postId = route.params.id
  if (postId) {
    isEditing.value = true
    await fetchPost(postId)
  }
})

const fetchPost = async (id) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/posts/${id}`)
    form.value = response.data
    imagePreview.value = response.data.image
  } catch (error) {
    console.error('Error fetching post:', error)
    alert('Không thể tải thông tin bài viết!')
  }
}

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Hiển thị preview ngay lập tức
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)

  // Upload lên Cloudinary
  await uploadToCloudinary(file)
}

const uploadToCloudinary = async (file) => {
  uploading.value = true
  errors.value.image = ''

  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
    )

    form.value.image = response.data.secure_url
    console.log('Image uploaded:', response.data.secure_url)
  } catch (error) {
    console.error('Error uploading image:', error)
    errors.value.image = 'Không thể upload ảnh. Vui lòng thử lại!'
    imagePreview.value = ''
  } finally {
    uploading.value = false
  }
}

const validateForm = () => {
  errors.value = {}

  if (!form.value.title.trim()) {
    errors.value.title = 'Tiêu đề không được để trống'
  }

  if (!form.value.author.trim()) {
    errors.value.author = 'Tác giả không được để trống'
  }

  if (!form.value.content.trim()) {
    errors.value.content = 'Nội dung không được để trống'
  }

  if (!form.value.image) {
    errors.value.image = 'Vui lòng chọn hình ảnh'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  try {
    if (isEditing.value) {
      // Update existing post
      await axios.put(`${BACKEND_URL}/posts/${route.params.id}`, form.value)
      alert('Cập nhật bài viết thành công!')
    } else {
      // Create new post
      await axios.post(`${BACKEND_URL}/posts`, form.value)
      alert('Thêm bài viết thành công!')
    }

    router.push('/posts')
  } catch (error) {
    console.error('Error saving post:', error)
    alert('Không thể lưu bài viết!')
  }
}

const goBack = () => {
  router.push('/posts')
}
</script>

<style scoped>
.container {
  max-width: 900px;
}
</style>
