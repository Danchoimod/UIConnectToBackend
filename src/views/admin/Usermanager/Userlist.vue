<template>
  <div>
    <AdminPanel>
      <ul class="list-group">
        <li
          v-for="(user, index) in users"
          :key="user.id || index"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>{{ user.name }} - {{ user.email }}</span>
          <div class="d-flex align-items-center gap-2">
            <div class="form-check form-switch me-2">
              <input
                class="form-check-input"
                type="checkbox"
                :checked="!!user.isAdmin"
                @change="toggleRole(user, 'isAdmin', $event.target.checked)"
                id="adminSwitch-{{user.id}}"
              />
              <label class="form-check-label" :for="'adminSwitch-' + user.id">Admin</label>
            </div>
            <button class="btn btn-sm btn-outline-primary me-2" @click="openEditModal(user)">
              Edit
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="deleteUser(user.id)">
              Delete
            </button>
          </div>
        </li>
      </ul>

      <!-- Edit User Modal -->
      <div
        class="modal fade"
        id="editUserModal"
        tabindex="-1"
        aria-labelledby="editUserModalLabel"
        aria-hidden="true"
        ref="editModal"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editUserModalLabel">Chỉnh sửa người dùng</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="updateUser">
                <div class="mb-3">
                  <label class="form-label">Tên</label>
                  <input v-model="editForm.name" type="text" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input v-model="editForm.email" type="email" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input v-model="editForm.password" type="password" class="form-control" />
                </div>
                <button type="submit" class="btn btn-primary">Lưu thay đổi</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminPanel>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'
import { getUsers } from '@/api/Userservice'
import AdminPanel from '@/layout/Sidebar.vue'

const users = ref([])
const editForm = ref({ id: '', name: '', email: '', password: '' })
const editModal = ref(null)

async function fetchUsers() {
  users.value = await getUsers()
}

onMounted(fetchUsers)

function openEditModal(user) {
  editForm.value = { ...user, password: '' }
  nextTick(() => {
    if (window.bootstrap && window.bootstrap.Modal) {
      const modal = new window.bootstrap.Modal(editModal.value)
      modal.show()
    } else {
      alert('Bootstrap JS chưa được import. Vui lòng thêm bootstrap.bundle.min.js vào index.html!')
    }
  })
}

async function updateUser() {
  try {
    await axios.put(`http://localhost:3000/users/${editForm.value.id}`, editForm.value)
    await fetchUsers()
    window.bootstrap.Modal.getInstance(editModal.value).hide()
    alert('Cập nhật thành công!')
  } catch (e) {
    alert('Cập nhật thất bại!')
  }
}

async function toggleRole(user, role, value) {
  const updated = { ...user, [role]: value }
  try {
    await axios.put(`http://localhost:3000/users/${user.id}`, updated)
    await fetchUsers()
  } catch (e) {
    alert('Cập nhật quyền thất bại!')
  }
}

async function deleteUser(id) {
  if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`)
      await fetchUsers()
      alert('Đã xóa người dùng!')
    } catch (e) {
      alert('Xóa thất bại!')
    }
  }
}
</script>

<style scoped>
.list-group-item {
  font-size: 1rem;
}
</style>
