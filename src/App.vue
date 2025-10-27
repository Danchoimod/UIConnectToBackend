<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ToastNotification from '@/components/common/ToastNotification.vue'
import { ref, onMounted } from 'vue'
import { setToastInstance } from '@/composables/useToast'

const toastRef = ref(null)

onMounted(() => {
  if (toastRef.value) {
    setToastInstance(toastRef.value)
  }
})
</script>

<template>
  <RouterView />
  <router-link></router-link>
  <ToastNotification ref="toastRef" />
</template>

<style scoped></style>
