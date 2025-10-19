<template>
  <div class="d-flex w-100 vh-100">
    <!-- Sidebar -->
    <aside class="sidebar bg-dark text-light p-3 d-flex flex-column" style="flex: 0 0 20%">
      <div class="sidebar-header mb-4">
        <h4 class="mb-0">Admin Panel</h4>
      </div>

      <!-- Menu -->
      <nav class="flex-grow-1">
        <ul class="nav nav-pills flex-column">
          <li class="nav-item mb-2">
            <router-link class="nav-link text-light" active-class="active" to="/admin/">
              <i class="bi bi-speedometer2 me-2"></i> Dashboard
            </router-link>
          </li>
          <li class="nav-item mb-2">
            <a
              class="nav-link text-light d-flex justify-content-between align-items-center"
              data-bs-toggle="collapse"
              href="#userMenu"
              role="button"
              aria-expanded="false"
              aria-controls="userMenu"
            >
              <span><i class="bi bi-people me-2"></i> Quản lý người dùng</span>
              <i class="bi bi-chevron-down"></i>
            </a>
            <div class="collapse" id="userMenu">
              <ul class="nav flex-column ms-3">
                <li class="nav-item mb-1">
                  <router-link
                    class="nav-link text-light"
                    active-class="active"
                    to="/admin/users/add"
                  >
                    <i class="bi bi-person-plus me-2"></i> Thêm người dùng
                  </router-link>
                </li>
                <li class="nav-item mb-1">
                  <router-link
                    class="nav-link text-light"
                    active-class="active"
                    to="/admin/users/list"
                  >
                    <i class="bi bi-list-ul me-2"></i> Danh sách người dùng
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item mb-2">
            <a
              class="nav-link text-light d-flex justify-content-between align-items-center"
              data-bs-toggle="collapse"
              href="#appMenu"
              role="button"
              aria-expanded="false"
              aria-controls="appMenu"
            >
              <span><i class="bi bi-box me-2"></i> Quản lý ứng dụng</span>
              <i class="bi bi-chevron-down"></i>
            </a>
            <div class="collapse" id="appMenu">
              <ul class="nav flex-column ms-3">
                <li class="nav-item mb-1">
                  <router-link
                    class="nav-link text-light"
                    active-class="active"
                    to="/admin/apps/add"
                  >
                    <i class="bi bi-plus-square me-2"></i> Thêm ứng dụng
                  </router-link>
                </li>
                <li class="nav-item mb-1">
                  <router-link
                    class="nav-link text-light"
                    active-class="active"
                    to="/admin/apps/list"
                  >
                    <i class="bi bi-list-ul me-2"></i> Danh sách ứng dụng
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item mb-2">
            <router-link class="nav-link text-light" active-class="active" to="/admin/comments">
              <i class="bi bi-bag me-2"></i> Quản lý đánh giá
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Logout Button -->
      <div class="sidebar-footer mt-4">
        <button class="btn btn-danger w-100">
          <i class="bi bi-box-arrow-right me-2"></i> Đăng xuất
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-grow-1 d-flex flex-column" style="flex: 0 0 70%">
      <!-- Navbar -->
      <AdminNavbar />

      <!-- Content Area -->
      <main class="flex-grow-1 p-4 bg-light" style="overflow: auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script>
import AdminNavbar from '@/components/admin/AdminNavbar.vue'

export default {
  name: 'AdminPanel',
  components: {
    AdminNavbar,
  },
}
</script>

<style scoped>
.sidebar {
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

.nav-link {
  transition: all 0.3s ease;
  border-radius: 6px;
  padding: 10px 12px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  background-color: #0d6efd;
  font-weight: bold;
}
</style>
