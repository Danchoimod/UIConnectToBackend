<script setup></script>

<template>
  <header class="p-3">
    <RouterLink :to="{ name: 'Bai1' }" class="btn btn-success me-2">Bài 1</RouterLink>
    <RouterLink :to="{ name: 'Bai2' }" class="btn btn-success me-2">Bài 2</RouterLink>
    <RouterLink :to="{ name: 'Bai3' }" class="btn btn-success me-2">Bài 3</RouterLink>
    <RouterLink :to="{ name: 'Bai4' }" class="btn btn-success">Bài 4</RouterLink>
    <RouterLink :to="{ name: 'desktop' }" class="btn btn-secondary ms-2">Desktop</RouterLink>
  </header>
</template>
