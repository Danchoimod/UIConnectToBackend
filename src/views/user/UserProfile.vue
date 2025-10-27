<template>
  <div>
    <CommonNavbar />
    <div class="container py-5" style="margin-top: 80px; max-width: 800px">
      <div class="card shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="mb-0">Thông tin cá nhân</h3>
            <button @click="goBack" class="btn btn-outline-secondary">
              <i class="bi bi-arrow-left me-2"></i>Quay lại
            </button>
          </div>

          <form @submit.prevent="updateProfile">
            <!-- Avatar -->
            <div class="text-center mb-4">
              <div class="avatar-wrapper">
                <img
                  :src="form.avatar || '/images/person-loggedin.svg'"
                  alt="Avatar"
                  class="rounded-circle"
                  style="width: 120px; height: 120px; object-fit: cover; border: 3px solid #dee2e6"
                />
              </div>
              <div class="mt-3">
                <label class="btn btn-outline-primary btn-sm">
                  <i class="bi bi-camera me-2"></i>Thay đổi ảnh đại diện
                  <input type="file" class="d-none" accept="image/*" @change="onAvatarChange" />
                </label>
                <span v-if="uploading" class="ms-2">
                  <span class="spinner-border spinner-border-sm me-1" role="status"></span>Đang
                  tải...
                </span>
              </div>
            </div>

            <!-- Name -->
            <div class="mb-3">
              <label class="form-label fw-semibold">Tên hiển thị</label>
              <input
                v-model="form.name"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': submitted && !form.name }"
                placeholder="Nhập tên của bạn"
              />
              <div v-if="submitted && !form.name" class="invalid-feedback d-block">
                Vui lòng nhập tên
              </div>
            </div>

            <!-- Email (readonly) -->
            <div class="mb-3">
              <label class="form-label fw-semibold">Email</label>
              <input
                v-model="form.email"
                type="email"
                class="form-control"
                readonly
                disabled
                style="background-color: #e9ecef"
              />
              <small class="text-muted">Email không thể thay đổi</small>
            </div>

            <!-- Password -->
            <div class="mb-3">
              <label class="form-label fw-semibold">Mật khẩu mới (tùy chọn)</label>
              <input
                v-model="form.password"
                type="password"
                class="form-control"
                placeholder="Để trống nếu không muốn đổi mật khẩu"
              />
              <small class="text-muted"
                >Chỉ nhập nếu bạn muốn thay đổi mật khẩu, để trống để giữ mật khẩu cũ</small
              >
            </div>

            <!-- Confirm Password -->
            <div v-if="form.password" class="mb-3">
              <label class="form-label fw-semibold">Xác nhận mật khẩu mới</label>
              <input
                v-model="confirmPassword"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': submitted && form.password && passwordMismatch }"
                placeholder="Nhập lại mật khẩu mới"
              />
              <div v-if="submitted && passwordMismatch" class="invalid-feedback d-block">
                Mật khẩu xác nhận không khớp
              </div>
            </div>

            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-secondary" :disabled="uploading || saving">
                <span
                  v-if="saving"
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                <i v-else class="bi bi-save me-2"></i>
                Lưu thay đổi
              </button>
              <button type="button" @click="resetForm" class="btn btn-outline-secondary">
                <i class="bi bi-arrow-counterclockwise me-2"></i>Đặt lại
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import CommonNavbar from '@/components/common/navbar.vue'
import AppFooter from '@/components/common/footer.vue'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const toast = useToast()

const form = ref({
  id: '',
  name: '',
  email: '',
  password: '',
  avatar: '',
  isAdmin: false,
})

const confirmPassword = ref('')
const originalPassword = ref('')
const uploading = ref(false)
const saving = ref(false)
const submitted = ref(false)

const passwordMismatch = computed(() => {
  return form.value.password && form.value.password !== confirmPassword.value
})

onMounted(async () => {
  const user = sessionStorage.getItem('user')
  if (!user) {
    toast.error('Bạn cần đăng nhập để truy cập trang này!')
    router.push('/auth')
    return
  }

  const userData = JSON.parse(user)

  // Fetch full user data from server
  try {
    const res = await axios.get(`http://localhost:3000/users/${userData.id}`)
    form.value = {
      id: res.data.id,
      name: res.data.name,
      email: res.data.email,
      password: '',
      avatar: res.data.avatar || '/images/person-loggedin.svg',
      isAdmin: res.data.isAdmin || false,
    }
    originalPassword.value = res.data.password
  } catch (e) {
    toast.error('Không thể tải thông tin người dùng!')
    router.push('/')
  }
})

async function onAvatarChange(e) {
  const file = e.target.files?.[0]
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
    toast.success('Upload ảnh thành công!')
  } catch (err) {
    console.error('Upload error:', err)
    toast.error('Upload ảnh thất bại!')
  } finally {
    uploading.value = false
  }
}

async function updateProfile() {
  submitted.value = true

  // Validation
  if (!form.value.name) {
    return
  }

  if (uploading.value) {
    toast.error('Vui lòng đợi upload ảnh hoàn tất!')
    return
  }

  if (form.value.password && passwordMismatch.value) {
    return
  }

  saving.value = true

  try {
    // Prepare update data
    const updateData = {
      name: form.value.name,
      email: form.value.email,
      avatar: form.value.avatar,
      isAdmin: form.value.isAdmin,
      password: form.value.password ? form.value.password : originalPassword.value,
    }

    // Update user
    await axios.put(`http://localhost:3000/users/${form.value.id}`, updateData)

    // Update sessionStorage
    sessionStorage.setItem(
      'user',
      JSON.stringify({
        id: form.value.id,
        name: form.value.name,
        email: form.value.email,
        isAdmin: form.value.isAdmin,
        avatar: form.value.avatar,
      }),
    )

    toast.success('Cập nhật thông tin thành công!')

    // Reset password fields
    form.value.password = ''
    confirmPassword.value = ''
    submitted.value = false

    // Optional: reload page to update navbar
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  } catch (e) {
    console.error('Update error:', e)
    toast.error('Cập nhật thất bại!')
  } finally {
    saving.value = false
  }
}

function resetForm() {
  form.value.password = ''
  confirmPassword.value = ''
  submitted.value = false
}

function goBack() {
  router.push('/')
}
</script>

<style scoped>
.card {
  border: none;
  border-radius: 12px;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
}

.form-label {
  margin-bottom: 0.5rem;
  color: #495057;
}

.btn-outline-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(13, 110, 253, 0.2);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
</style>
