<template>
  <div>
    <admin-panel>
      <div class="container">
        <h3 class="mb-4">Thêm Nhân viên</h3>
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
                :class="{ 'is-invalid': (submitted && !form.email) || emailError }"
                id="inputEmail4"
                placeholder="Email"
              />
              <div v-if="submitted && !form.email" class="invalid-feedback d-block">
                Vui lòng nhập email
              </div>
              <div v-if="emailError" class="invalid-feedback d-block">
                {{ emailError }}
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
            <div class="form-group col-md-6">
              <label for="inputConfirmPassword">Xác nhận mật khẩu</label>
              <input
                v-model="confirmPassword"
                type="password"
                class="form-control"
                :class="{
                  'is-invalid':
                    submitted && (!confirmPassword || form.password !== confirmPassword),
                }"
                id="inputConfirmPassword"
                placeholder="Xác nhận mật khẩu"
              />
              <div v-if="submitted && !confirmPassword" class="invalid-feedback d-block">
                Vui lòng xác nhận mật khẩu
              </div>
              <div
                v-if="submitted && confirmPassword && form.password !== confirmPassword"
                class="invalid-feedback d-block"
              >
                Mật khẩu xác nhận không giống!
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
            <div v-if="submitted && !form.avatar" class="invalid-feedback d-block">
              Vui lòng chọn ảnh đại diện
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
import { useToast } from '@/composables/useToast'

const form = ref({ name: '', email: '', password: '', isAdmin: false, avatar: '' })
const confirmPassword = ref('')
const router = useRouter()
const toast = useToast()
const uploading = ref(false)
const submitted = ref(false)
const emailError = ref('')

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
    form.value.avatar = res.data.secure_url
    toast.success('Upload avatar thành công!')
  } catch (err) {
    console.error('Upload error:', err)
    toast.error('Upload ảnh thất bại!')
  } finally {
    uploading.value = false
  }
}

async function addUser() {
  submitted.value = true
  emailError.value = ''

  if (
    !form.value.name ||
    !form.value.email ||
    !form.value.password ||
    !confirmPassword.value ||
    !form.value.avatar
  ) {
    if (!form.value.avatar) {
      toast.error('Vui lòng chọn ảnh đại diện!')
    }
    return
  }
  if (form.value.password !== confirmPassword.value) {
    toast.error('Mật khẩu xác nhận không giống!')
    return
  }
  if (uploading.value) {
    toast.error('Vui lòng đợi upload ảnh hoàn tất!')
    return
  }

  try {
    // Kiểm tra email đã tồn tại chưa
    const checkEmail = await axios.get(`http://localhost:3000/users?email=${form.value.email}`)
    if (checkEmail.data.length > 0) {
      emailError.value = 'Email này đã được sử dụng!'
      return
    }

    const res = await axios.post('http://localhost:3000/users/', form.value)
    toast.success('Thêm người dùng thành công!')
    form.value = { name: '', email: '', password: '', isAdmin: false, avatar: '' }
    confirmPassword.value = ''
    submitted.value = false
    emailError.value = ''
    router.push('/admin/users/list')
  } catch (error) {
    console.error('Add user error:', error)
    toast.error('Thêm người dùng thất bại!')
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
