<template>
  <div>
    <admin-panel>
      <div class="container">
        <h3 class="mb-4">Thêm người dùng mới</h3>
        <form @submit.prevent="addUser">
          <div class="form-group col-md-6">
            <label for="inputUsername">Username</label>
            <input
              v-model="form.name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': submitted && !form.name }"
              id="inputUsername"
              placeholder="Username"
            />
            <div v-if="submitted && !form.name" class="invalid-feedback d-block">
              Vui lòng nhập tên người dùng
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Email</label>
              <input
                v-model="form.email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': submitted && !form.email }"
                id="inputEmail4"
                placeholder="Email"
              />
              <div v-if="submitted && !form.email" class="invalid-feedback d-block">
                Vui lòng nhập email
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Password</label>
              <input
                v-model="form.password"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': submitted && !form.password }"
                id="inputPassword4"
                placeholder="Password"
              />
              <div v-if="submitted && !form.password" class="invalid-feedback d-block">
                Vui lòng nhập mật khẩu
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Avatar</label>
            <input type="file" class="form-control" @change="onFileChange" accept="image/*" />
            <small class="text-muted">Chọn ảnh đại diện cho người dùng</small>
            <div v-if="uploading" class="mt-2">
              <div class="spinner-border spinner-border-sm text-primary" role="status">
                <span class="visually-hidden">Uploading...</span>
              </div>
              <span class="ms-2">Đang tải lên...</span>
            </div>
            <div v-if="form.avatar" class="mt-2">
              <img
                :src="form.avatar"
                alt="Avatar Preview"
                style="max-width: 120px; max-height: 120px; border-radius: 50%; object-fit: cover"
              />
            </div>
          </div>

          <div class="form-row"></div>
          <div class="form-group">
            <div class="form-check">
              <input
                v-model="form.isAdmin"
                class="form-check-input"
                type="checkbox"
                id="gridCheck"
              />
              <label class="form-check-label" for="gridCheck"> Là quản trị viên </label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="uploading">
            <span v-if="uploading">
              <span class="spinner-border spinner-border-sm me-2" role="status"></span>
              Đang xử lý...
            </span>
            <span v-else>Thêm người dùng</span>
          </button>
        </form>
      </div>
    </admin-panel>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import AdminPanel from '@/layout/Sidebar.vue'
import { useRouter } from 'vue-router'

const form = ref({ name: '', email: '', password: '', isAdmin: false, avatar: '' })
const router = useRouter()
const uploading = ref(false)
const submitted = ref(false)

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
    form.value.avatar = res.data.secure_url
    alert('Upload avatar thành công!')
  } catch (err) {
    console.error('Upload error:', err)
    alert('Upload ảnh thất bại!')
  } finally {
    uploading.value = false
  }
}

async function addUser() {
  submitted.value = true
  if (!form.value.name || !form.value.email || !form.value.password) {
    return
  }
  if (uploading.value) {
    alert('Vui lòng đợi upload ảnh hoàn tất!')
    return
  }

  try {
    const res = await axios.post('http://localhost:3000/users/', form.value)
    alert('Thêm người dùng thành công!')
    form.value = { name: '', email: '', password: '', isAdmin: false, avatar: '' }
    router.push('/admin/users/list')
  } catch (error) {
    console.error('Add user error:', error)
    alert('Thêm người dùng thất bại!')
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.form-row .form-group {
  flex: 1;
  min-width: 250px;
}
</style>
