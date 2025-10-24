<script setup>
import { RouterLink } from 'vue-router'
import navbar from '@/components/common/navbar.vue'
import carousel from '@/components/Carousel.vue'
import AppGrid from '@/components/AppGrid.vue'
import Footer from '@/components/common/footer.vue'
</script>

<template>
  <header>
    <navbar />
    <carousel />
  </header>
  <main>
    <AppGrid />
  </main>
  <Footer></Footer>
</template>
