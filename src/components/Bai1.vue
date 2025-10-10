<template>
  <div class="p-4">
    <h2 class="mb-3">Bài 1: Sự kiện và binding động</h2>
    <p class="mb-2">{{ message }}</p>
    <button class="btn btn-dark" @click="updateMessage">Thay đổi thông điệp</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Thông điệp ban đầu')

const updateMessage = () => {
  message.value = 'Thông điệp đã được thay đổi!'
}
</script>

<style scoped></style>
