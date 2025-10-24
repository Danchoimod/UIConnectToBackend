<template>
  <div class="custom-carousel row g-3">
    <!-- Left: Main Slider -->
    <div class="col-lg-8 col-md-12">
      <div
        class="main-slider position-relative rounded overflow-hidden"
        style="height: 350px; background: #222"
      >
        <img
          src="https://kamikey.com/wp-content/uploads/2025/10/The-Outer-Worlds-2-Premium-Edition.jpg"
          class="w-100 h-100 object-fit-cover"
          alt="Main App"
        />
        <div
          class="slider-content position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-4"
          style="
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0.7) 100%);
          "
        >
          <h2 class="text-white mb-2">The Outer Worlds 2</h2>
          <p class="text-white-50 mb-3">The universe needs a hero. You'll have to do.</p>
          <button class="btn btn-light btn-sm w-auto">See details</button>
        </div>
      </div>
    </div>
    <!-- Right: 2 Cards -->
    <div class="col-lg-4 col-md-12 d-flex flex-column gap-3">
      <div
        class="side-card rounded overflow-hidden position-relative"
        style="height: 170px; background: #333"
      >
        <img
          src="https://www.diyphotography.net/wp-content/uploads/2025/10/PEPE-Primary-2026-1920x1080-1.jpg"
          class="w-100 h-100 object-fit-cover"
          alt="Adobe"
        />
        <div
          class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3"
          style="
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.7) 100%);
          "
        >
          <h5 class="text-white mb-2">Adobe Photoshop Elements 2026</h5>
          <button class="btn btn-primary btn-sm w-auto">Install</button>
        </div>
      </div>
      <div
        class="side-card rounded overflow-hidden position-relative"
        style="height: 170px; background: #333"
      >
        <img src="/images/dragon.jpg" class="w-100 h-100 object-fit-cover" alt="Sale" />
        <div
          class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3"
          style="
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.7) 100%);
          "
        >
          <h5 class="text-white mb-2">99 Cents Sale</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Carousel component
</script>

<style scoped>
.custom-carousel {
  margin-top: 24px;
}
.main-slider img,
.side-card img {
  object-fit: cover;
}
.main-slider {
  min-height: 300px;
}
.side-card {
  min-height: 120px;
}
</style>
