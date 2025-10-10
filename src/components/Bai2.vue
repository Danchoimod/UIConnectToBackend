<template>
  <div class="p-4">
    <h2 class="mb-3">Bài 2: Two-way Binding với v-model</h2>
    <input v-model="userInput" class="form-control mb-2" placeholder="Nhập dữ liệu vào đây" />
    <p>
      Giá trị bạn nhập: <strong>{{ userInput }}</strong>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userInput = ref('FPL')
</script>

<style scoped></style>
