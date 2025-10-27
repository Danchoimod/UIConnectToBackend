<template>
  <div>
    <AdminPanel>
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3>Chỉnh sửa người dùng</h3>
          <button class="btn btn-secondary" @click="goBack">
            <i class="bi bi-arrow-left me-2"></i>Quay lại
          </button>
        </div>

        <div class="card shadow-sm">
          <div class="card-body">
            <form @submit.prevent="updateUser">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Tên</label>
                  <input v-model="editForm.name" type="text" class="form-control" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Email</label>
                  <input
                    v-model="editForm.email"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': emailError }"
                    required
                  />
                  <div v-if="emailError" class="invalid-feedback d-block">
                    {{ emailError }}
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Password (để trống nếu không muốn thay đổi)</label>
                <input
                  v-model="editForm.password"
                  type="password"
                  class="form-control"
                  placeholder="Nhập mật khẩu mới (nếu muốn thay đổi)"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Avatar</label>
                <div class="mb-2">
                  <label class="btn btn-outline-primary">
                    <i class="bi bi-upload me-2"></i>Tải ảnh lên
                    <input type="file" class="d-none" @change="onFileChange" accept="image/*" />
                  </label>
                  <span v-if="uploading" class="ms-2">
                    <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                    Đang tải lên...
                  </span>
                </div>
                <small class="text-muted d-block mb-2"
                  >Chọn ảnh đại diện mới (để trống nếu không muốn thay đổi)</small
                >
                <div v-if="editForm.avatar" class="mt-2">
                  <img :src="editForm.avatar" alt="Avatar Preview" class="avatar-preview" />
                </div>
              </div>

              <div class="mb-4">
                <div class="form-check form-switch">
                  <input
                    v-model="editForm.isAdmin"
                    class="form-check-input"
                    type="checkbox"
                    id="editAdminCheck"
                  />
                  <label class="form-check-label" for="editAdminCheck">
                    <span class="badge" :class="editForm.isAdmin ? 'bg-danger' : 'bg-secondary'">
                      {{ editForm.isAdmin ? 'Admin' : 'User' }}
                    </span>
                    <span class="ms-2">Là quản trị viên</span>
                  </label>
                </div>
              </div>

              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary" :disabled="uploading">
                  <span v-if="uploading">
                    <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                    Đang xử lý...
                  </span>
                  <span v-else> <i class="bi bi-save me-2"></i>Lưu thay đổi </span>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import AdminPanel from '@/layout/Sidebar.vue'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const editForm = ref({ id: '', name: '', email: '', password: '', avatar: '', isAdmin: false })
const originalPassword = ref('')
const originalEmail = ref('')
const uploading = ref(false)
const emailError = ref('')

async function fetchUser() {
  try {
    const id = route.params.id
    const res = await axios.get(`http://localhost:3000/users/${id}`)
    editForm.value = { ...res.data, password: '' }
    originalPassword.value = res.data.password
    originalEmail.value = res.data.email
  } catch (e) {
    toast.error('Không thể tải thông tin người dùng!')
    goBack()
  }
}

onMounted(fetchUser)

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
    editForm.value.avatar = res.data.secure_url
    toast.success('Upload avatar thành công!')
  } catch (err) {
    console.error('Upload error:', err)
    toast.error('Upload ảnh thất bại!')
  } finally {
    uploading.value = false
  }
}

async function updateUser() {
  emailError.value = ''

  if (uploading.value) {
    toast.error('Vui lòng đợi upload ảnh hoàn tất!')
    return
  }

  try {
    // Kiểm tra email trùng nếu email đã thay đổi
    if (editForm.value.email !== originalEmail.value) {
      const checkEmail = await axios.get(
        `http://localhost:3000/users?email=${editForm.value.email}`,
      )
      // Lọc bỏ user hiện tại khỏi kết quả tìm kiếm
      const duplicateEmail = checkEmail.data.filter((u) => u.id !== editForm.value.id)
      if (duplicateEmail.length > 0) {
        emailError.value = 'Email này đã được sử dụng!'
        return
      }
    }

    // Tạo object để update, nếu password rỗng thì giữ password cũ
    const updateData = { ...editForm.value }
    if (!updateData.password || updateData.password.trim() === '') {
      updateData.password = originalPassword.value
    }

    await axios.put(`http://localhost:3000/users/${editForm.value.id}`, updateData)
    toast.success('Cập nhật thành công!')
    goBack()
  } catch (e) {
    console.error('Update error:', e)
    toast.error('Cập nhật thất bại!')
  }
}

function goBack() {
  router.push({ name: 'UserManager' })
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
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.avatar-preview {
  max-width: 150px;
  max-height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #dee2e6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.badge {
  padding: 0.4rem 0.65rem;
  font-weight: 500;
  border-radius: 6px;
  font-size: 0.75rem;
}

.form-check-input {
  cursor: pointer;
  width: 3rem;
  height: 1.5rem;
}

.form-check-input:checked {
  background-color: #dc3545;
  border-color: #dc3545;
}

@media (max-width: 768px) {
  .avatar-preview {
    max-width: 120px;
    max-height: 120px;
  }
}
</style>
