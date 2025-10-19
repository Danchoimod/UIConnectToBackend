<template>
  <AdminPanel>
    <div class="container">
      <h3 class="mb-4">Thêm ứng dụng mới</h3>
      <form @submit.prevent="addApp">
        <div class="mb-3">
          <label class="form-label">Tên ứng dụng</label>
          <input v-model="form.name" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Mô tả</label>
          <textarea v-model="form.description" class="form-control" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Thêm ứng dụng</button>
      </form>
    </div>
  </AdminPanel>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import AdminPanel from '@/layout/Sidebar.vue'
import { useRouter } from 'vue-router'

const form = ref({ name: '', description: '' })
const router = useRouter()

async function addApp() {
  try {
    await axios.post('http://localhost:3000/apps', form.value) // Gửi yêu cầu POST để thêm ứng dụng mới
    alert('Thêm ứng dụng thành công!')
    form.value = { name: '', description: '' }
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
