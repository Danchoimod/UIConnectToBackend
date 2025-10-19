<template>
  <AdminPanel>
    <div class="container">
      <h3 class="mb-4">Danh sách ứng dụng</h3>
      <ul class="list-group">
        <li
          v-for="app in apps"
          :key="app.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>{{ app.name }} - {{ app.description }}</span>
        </li>
      </ul>
    </div>
  </AdminPanel>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AdminPanel from '@/layout/Sidebar.vue'

const apps = ref([])

async function fetchApps() {
  try {
    const res = await axios.get('http://localhost:3000/apps')
    apps.value = res.data
  } catch (e) {
    apps.value = []
  }
}

onMounted(fetchApps)
</script>

<style scoped>
.container {
  max-width: 700px;
}
</style>
