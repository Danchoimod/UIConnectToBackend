<template>
  <div>
    <AdminPanel>
      <div class="container-fluid">
        <h3 class="mb-4">Danh sách người dùng</h3>

        <!-- Users Table -->
        <div class="card shadow-sm">
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead class="table-dark">
                  <tr>
                    <th scope="col" style="width: 5%">#</th>
                    <th scope="col" style="width: 10%">Avatar</th>
                    <th scope="col" style="width: 20%">Tên</th>
                    <th scope="col" style="width: 20%">Email</th>
                    <th scope="col" style="width: 15%">Vai trò</th>
                    <th scope="col" style="width: 15%">Trạng thái</th>
                    <th scope="col" style="width: 15%">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="users.length === 0">
                    <td colspan="7" class="text-center py-4 text-muted">
                      <i class="bi bi-inbox fs-1 d-block mb-2"></i>
                      Chưa có người dùng nào
                    </td>
                  </tr>
                  <tr v-for="(user, index) in users" :key="user.id || index">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <div class="avatar-wrapper">
                        <img
                          v-if="user.avatar"
                          :src="user.avatar"
                          :alt="user.name"
                          class="user-avatar"
                        />
                        <div v-else class="avatar-placeholder">
                          {{ user.name?.charAt(0).toUpperCase() || 'U' }}
                        </div>
                      </div>
                    </td>
                    <td>
                      <strong>{{ user.name }}</strong>
                    </td>
                    <td>{{ user.email }}</td>
                    <td>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :checked="!!user.isAdmin"
                          @change="toggleRole(user, 'isAdmin', $event.target.checked)"
                          :id="'adminSwitch-' + user.id"
                          :disabled="user.email === 'admin@gmail.com'"
                        />
                        <label class="form-check-label" :for="'adminSwitch-' + user.id">
                          <span v-if="user.isAdmin" class="badge bg-danger">Admin</span>
                          <span v-else class="badge bg-secondary">User</span>
                        </label>
                      </div>
                    </td>
                    <td>
                      <span v-if="user.suspended" class="badge bg-danger">
                        <i class="bi bi-x-circle me-1"></i>Đã dừng
                      </span>
                      <span v-else class="badge bg-success">
                        <i class="bi bi-check-circle me-1"></i>Hoạt động
                      </span>
                    </td>
                    <td>
                      <div class="d-flex gap-2">
                        <!-- <button
                          class="btn btn-sm btn-outline-primary"
                          @click="editUser(user.id)"
                          title="Sửa"
                          :disabled="user.email === 'admin@gmail.com'"
                        >
                          <i class="bi bi-pencil"></i>
                        </button> -->
                        <button
                          v-if="user.suspended"
                          class="btn btn-sm btn-outline-success"
                          @click="toggleSuspend(user.id, false)"
                          title="Kích hoạt"
                          :disabled="user.email === 'admin@gmail.com'"
                        >
                          <i class="bi bi-play-circle"></i>
                        </button>
                        <button
                          v-else
                          class="btn btn-sm btn-outline-warning"
                          @click="toggleSuspend(user.id, true)"
                          title="Tạm dừng"
                          :disabled="user.email === 'admin@gmail.com'"
                        >
                          <i class="bi bi-pause-circle"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminPanel>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { getUsers } from '@/api/Userservice'
import AdminPanel from '@/layout/Sidebar.vue'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const toast = useToast()
const users = ref([])

async function fetchUsers() {
  const data = await getUsers()
  // Sắp xếp theo ID giảm dần (mới nhất trên cùng)
  users.value = data.sort((a, b) => b.id - a.id)
}

onMounted(fetchUsers)

function editUser(id) {
  const user = users.value.find((u) => u.id === id)
  if (user && user.email === 'admin@gmail.com') {
    toast.error('Không thể chỉnh sửa tài khoản Admin chính!')
    return
  }
  router.push({ name: 'EditUser', params: { id } })
}

async function toggleRole(user, role, value) {
  if (user.email === 'admin@gmail.com') {
    toast.error('Không thể thay đổi vai trò của tài khoản Admin chính!')
    return
  }
  const updated = { ...user, [role]: value }
  try {
    await axios.put(`http://localhost:3000/users/${user.id}`, updated)
    await fetchUsers()
  } catch (e) {
    toast.error('Cập nhật quyền thất bại!')
  }
}

async function toggleSuspend(id, suspend) {
  const user = users.value.find((u) => u.id === id)
  if (user && user.email === 'admin@gmail.com') {
    toast.error('Không thể tạm dừng tài khoản Admin chính!')
    return
  }

  const action = suspend ? 'tạm dừng' : 'kích hoạt lại'
  if (confirm(`Bạn có chắc muốn ${action} tài khoản này?`)) {
    try {
      await axios.patch(`http://localhost:3000/users/${id}`, {
        suspended: suspend,
      })
      await fetchUsers()
      toast.success(`Đã ${action} tài khoản!`)
    } catch (e) {
      toast.error(`${action} thất bại!`)
    }
  }
}
</script>

<style scoped>
.card {
  border: none;
  border-radius: 10px;
  overflow: hidden;
}

.table thead th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #dee2e6;
}

.table tbody tr {
  transition: background-color 0.2s ease;
}

.table tbody tr:hover {
  background-color: #f8f9fa;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e9ecef;
}

.avatar-placeholder {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  border: 2px solid #e9ecef;
}

.btn-sm {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
}

.btn-sm:hover::after {
  content: attr(title);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 5px;
  padding: 5px 10px;
  background-color: #333;
  color: white;
  font-size: 0.75rem;
  white-space: nowrap;
  border-radius: 4px;
  z-index: 1000;
  pointer-events: none;
}

.btn-sm:hover::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #333;
  z-index: 1000;
  pointer-events: none;
}

.btn-outline-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(13, 110, 253, 0.3);
}

.btn-outline-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
}

.btn-outline-warning:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(255, 193, 7, 0.3);
}

.btn-outline-success:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(25, 135, 84, 0.3);
}

.badge {
  padding: 0.4rem 0.65rem;
  font-weight: 500;
  border-radius: 6px;
  font-size: 0.75rem;
}

.form-check-input {
  cursor: pointer;
}

.form-check-input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.btn-sm:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.modal-body {
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .table {
    font-size: 0.85rem;
  }

  .btn-sm {
    padding: 0.2rem 0.5rem;
    font-size: 0.75rem;
  }

  .user-avatar,
  .avatar-placeholder {
    width: 40px;
    height: 40px;
  }
}
</style>
