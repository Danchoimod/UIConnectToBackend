<template>
  <div>
    <CommonNavbar />
    <div class="container py-5" style="max-width: 960px">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="card shadow-sm">
            <div class="card-body p-4 p-md-5">
              <ul class="nav nav-tabs mb-4" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    :class="{ active: activeTab === 'login' }"
                    type="button"
                    role="tab"
                    @click="activeTab = 'login'"
                  >
                    Đăng nhập
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    :class="{ active: activeTab === 'register' }"
                    type="button"
                    role="tab"
                    @click="activeTab = 'register'"
                  >
                    Đăng ký
                  </button>
                </li>
              </ul>

              <!-- Login -->
              <div v-if="activeTab === 'login'">
                <h4 class="mb-3">Chào mừng quay lại</h4>
                <form @submit.prevent="handleLogin">
                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input
                      v-model="loginEmail"
                      type="email"
                      class="form-control"
                      :class="{ 'is-invalid': loginSubmitted && !loginEmail }"
                    />
                    <div v-if="loginSubmitted && !loginEmail" class="invalid-feedback d-block">
                      Vui lòng nhập email
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Mật khẩu</label>
                    <input
                      v-model="loginPassword"
                      type="password"
                      class="form-control"
                      :class="{ 'is-invalid': loginSubmitted && !loginPassword }"
                    />
                    <div v-if="loginSubmitted && !loginPassword" class="invalid-feedback d-block">
                      Vui lòng nhập mật khẩu
                    </div>
                  </div>
                  <div v-if="loginError" class="alert alert-danger py-2">{{ loginError }}</div>
                  <button type="submit" class="btn btn-primary">
                    <span
                      v-if="loggingIn"
                      class="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                    Đăng nhập
                  </button>
                </form>
              </div>

              <!-- Register -->
              <div v-else>
                <h4 class="mb-3">Tạo tài khoản mới</h4>
                <form @submit.prevent="handleRegister">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Tên</label>
                      <input
                        v-model="reg.name"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': registerSubmitted && !reg.name }"
                      />
                      <div v-if="registerSubmitted && !reg.name" class="invalid-feedback d-block">
                        Vui lòng nhập tên
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Email</label>
                      <input
                        v-model="reg.email"
                        type="email"
                        class="form-control"
                        :class="{ 'is-invalid': registerSubmitted && !reg.email }"
                      />
                      <div v-if="registerSubmitted && !reg.email" class="invalid-feedback d-block">
                        Vui lòng nhập email
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Mật khẩu</label>
                      <input
                        v-model="reg.password"
                        type="password"
                        class="form-control"
                        :class="{ 'is-invalid': registerSubmitted && !reg.password }"
                      />
                      <div
                        v-if="registerSubmitted && !reg.password"
                        class="invalid-feedback d-block"
                      >
                        Vui lòng nhập mật khẩu
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Avatar (tùy chọn)</label>
                      <div>
                        <label class="btn btn-outline-secondary">
                          <i class="bi bi-upload me-2"></i>Chọn ảnh
                          <input
                            type="file"
                            class="d-none"
                            accept="image/*"
                            @change="onAvatarChange"
                          />
                        </label>
                        <span v-if="uploading" class="ms-2">
                          <span class="spinner-border spinner-border-sm me-1" role="status"></span
                          >Đang tải...
                        </span>
                      </div>
                      <div v-if="reg.avatar" class="mt-2">
                        <img
                          :src="reg.avatar"
                          class="rounded"
                          style="width: 80px; height: 80px; object-fit: cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div v-if="registerError" class="alert alert-danger py-2">
                    {{ registerError }}
                  </div>
                  <button type="submit" class="btn btn-success" :disabled="uploading">
                    <span
                      v-if="registering"
                      class="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                    Đăng ký
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import CommonNavbar from '@/components/common/navbar.vue'
import AppFooter from '@/components/common/footer.vue'

const router = useRouter()
const route = useRoute()

const activeTab = ref('login')

// Login state
const loginEmail = ref('')
const loginPassword = ref('')
const loginError = ref('')
const loggingIn = ref(false)
const loginSubmitted = ref(false)

// Register state
const reg = ref({ name: '', email: '', password: '', avatar: '', isAdmin: false })
const registerError = ref('')
const registering = ref(false)
const registerSubmitted = ref(false)
const uploading = ref(false)

onMounted(() => {
  const tab = route.query.tab
  if (tab === 'register') activeTab.value = 'register'
})

async function handleLogin() {
  if (loggingIn.value) return
  loginSubmitted.value = true
  loginError.value = ''
  // Validate required fields
  if (!loginEmail.value || !loginPassword.value) {
    return
  }
  loggingIn.value = true
  try {
    const res = await axios.get(
      `http://localhost:3000/users?email=${encodeURIComponent(loginEmail.value)}&password=${encodeURIComponent(loginPassword.value)}`,
    )
    if (res.data && res.data.length > 0) {
      const user = res.data[0]
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: !!user.isAdmin,
          avatar: user.avatar || '/images/person-loggedin.svg',
        }),
      )
      const redirect = route.query.redirect
      if (redirect) {
        router.push(String(redirect))
      } else if (user.isAdmin) {
        router.push('/admin')
      } else {
        router.push('/')
      }
    } else {
      loginError.value = 'Email hoặc mật khẩu không đúng!'
    }
  } catch (e) {
    loginError.value = 'Lỗi kết nối server!'
  } finally {
    loggingIn.value = false
  }
}

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
    reg.value.avatar = res.data.secure_url
  } catch (e) {
    registerError.value = 'Upload ảnh thất bại!'
  } finally {
    uploading.value = false
  }
}

async function handleRegister() {
  if (registering.value || uploading.value) return
  registerSubmitted.value = true
  registerError.value = ''
  // Validate required fields
  if (!reg.value.name || !reg.value.email || !reg.value.password) {
    return
  }
  registering.value = true
  try {
    // Check email exists
    const existed = await axios.get(
      `http://localhost:3000/users?email=${encodeURIComponent(reg.value.email)}`,
    )
    if (Array.isArray(existed.data) && existed.data.length > 0) {
      registerError.value = 'Email đã tồn tại!'
      registering.value = false
      return
    }
    // Create user
    const payload = { ...reg.value }
    const res = await axios.post('http://localhost:3000/users', payload)
    // Auto login after register
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        isAdmin: !!res.data.isAdmin,
        avatar: res.data.avatar || '/images/person-loggedin.svg',
      }),
    )
    router.push('/')
  } catch (e) {
    registerError.value = 'Đăng ký thất bại!'
  } finally {
    registering.value = false
  }
}
</script>

<style scoped>
.card {
  border: none;
  border-radius: 12px;
}
.nav-tabs .nav-link {
  border: none;
}
.nav-tabs .nav-link.active {
  border-bottom: 2px solid #0d6efd;
  font-weight: 600;
}
</style>
