<template>
  <aside class="sidebar bg-dark text-white min-vh-100">
    <div class="sidebar-header p-4 border-bottom border-secondary">
      <h2 class="fs-4 fw-semibold mb-0">Dashboard</h2>
    </div>
    <nav class="sidebar-nav">
      <router-link
        to="/"
        class="nav-item d-block px-4 py-3 text-decoration-none text-white-50 border-start border-4 border-transparent"
        :class="{ active: $route.path === '/' }"
      >
        <i class="bi bi-house-door me-2"></i>Trang chủ
      </router-link>
      <router-link
        to="/posts"
        class="nav-item d-block px-4 py-3 text-decoration-none text-white-50 border-start border-4 border-transparent"
        :class="{ active: $route.path.includes('/posts') }"
      >
        <i class="bi bi-file-text me-2"></i>Bài viết
      </router-link>
      <router-link
        to="/products"
        class="nav-item d-block px-4 py-3 text-decoration-none text-white-50 border-start border-4 border-transparent"
        :class="{ active: $route.path === '/products' }"
      >
        <i class="bi bi-box me-2"></i>Sản phẩm
      </router-link>
    </nav>
  </aside>
</template>

<script setup></script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #2c3e50 !important;
}

.nav-item {
  transition: all 0.3s ease;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
}

.nav-item.active {
  background-color: #ff6b35 !important;
  color: white !important;
  border-left-color: #ff8c42 !important;
}
</style>
