<template>
  <nav class="navbar navbar-light bg-white shadow-sm">
    <div class="container-fluid px-4">
      <span class="navbar-brand mb-0 h5">Xin chào, Admin</span>
      <div class="d-flex">
        <input
          type="text"
          class="form-control me-2"
          placeholder="Tìm kiếm..."
          v-model="searchQuery"
          @input="$emit('search', searchQuery)"
          style="width: 300px"
        />
        <button class="btn btn-outline-success">Tìm</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')

defineEmits(['search'])
</script>

<style scoped>
/* Custom styles if needed */
</style>
