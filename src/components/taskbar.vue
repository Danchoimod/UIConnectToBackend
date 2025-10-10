<template>
  <div
    class="task-bar w-100 bg-light bg-opacity-75 d-flex justify-content-center position-fixed bottom-0 start-0"
  >
    <div class="navbaritem d-flex gap-2 p-1">
      <button
        v-for="value in navitem"
        type="button"
        class="btn btn-sm d-flex align-items-center rounded-1"
      >
        <img :src="value.icon" :alt="value.name" width="34" class="p-1" />
      </button>
    </div>

    <div class="d-none d-md-flex position-absolute end-0 bottom-0 h-100 align-items-center pe-2">
      <div class="d-inline-flex justify-content-center align-items-center px-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          style="width: 10px; height: 10px"
        >
          <path
            fill="currentColor"
            d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
          />
        </svg>
      </div>

      <div class="d-inline-flex justify-content-center align-items-center px-2">
        <img width="16" src="@/assets/ui/battery.png" />
      </div>

      <div class="d-inline-flex justify-content-center align-items-center px-2">
        <img width="22" src="@/assets/ui/audio.png" />
      </div>

      <div class="d-flex flex-column text-muted small px-2 mx-1 rounded" style="cursor: default">
        <span>12:00 PM</span>
        <span>Jan 1, 2020</span>
      </div>

      <div
        class="d-inline-flex justify-content-center align-items-center px-2"
        style="cursor: default"
      >
        <img width="16" src="@/assets/ui/notification-center.png" />
      </div>

      <div class="h-100 border-start ms-2 ps-2"></div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const navitem = ref(null)
try {
  onMounted(async () => {
    const response = await axios.get('http://localhost:3000/navitem')
    navitem.value = response.data
  })
} catch (error) {
  console.log(error)
}
</script>

<style scoped>
.task-bar {
  height: 48px;
  /* keep the bar fixed to the bottom (like Windows / macOS) */
  z-index: 1050;
  /* respect device safe area (iPhone notch / home indicator) */
  padding-bottom: env(safe-area-inset-bottom);
  backdrop-filter: blur(4px);
}

/* small helper to invert images when in dark mode */
.invert-image {
  filter: invert(1);
}

/* spacing tweak to mimic original compact look */
.gap-2 {
  gap: 0.375rem;
}
.navbaritem button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
