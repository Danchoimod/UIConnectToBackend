<template>
  <div class="desktop">
    <TaskBar />
  </div>
</template>

<script>
import TaskBar from '@/components/taskbar.vue'

export default {
  name: 'Dekstop',
  components: {
    TaskBar,
  },
}
</script>
<style>
.desktop {
  background-image: url('../assets/img/wallpaper.jpg');
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  pointer-events: none;
}
</style>
<style lang="scss" scoped></style>
