<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
    <div class="container-fluid px-4">
      <div class="d-flex align-items-center flex-grow-1"></div>

      <div class="d-flex align-items-center gap-3">
        <div class="position-relative">
          <button class="btn btn-light btn-sm" type="button">
            <i class="bi bi-bell me-2"></i>
            <span class="badge bg-danger position-absolute top-0 start-100 translate-middle"
              >3</span
            >
          </button>
        </div>

        <!-- Messages -->
        <div class="position-relative">
          <button class="btn btn-light btn-sm" type="button">
            <i class="bi bi-envelope me-2"></i>
            <span class="badge bg-danger position-absolute top-0 start-100 translate-middle"
              >5</span
            >
          </button>
        </div>

        <!-- Divider -->
        <div class="vr"></div>

        <!-- User Profile Dropdown -->
        <div class="dropdown">
          <button
            class="btn btn-light btn-sm dropdown-toggle d-flex align-items-center"
            type="button"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="/images/dragon.jpg"
              alt="User"
              class="rounded-circle me-2"
              style="width: 32px; height: 32px"
            />
            <span>Admin User</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
              <a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>Hồ sơ</a>
            </li>
            <li>
              <a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Cài đặt</a>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a class="dropdown-item text-danger" href="#"
                ><i class="bi bi-box-arrow-right me-2"></i>Đăng xuất</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AdminNavbar',
  data() {
    return {
      searchQuery: '',
    }
  },
}
</script>

<style scoped>
.navbar {
  padding: 1rem 0;
}

.form-control-sm {
  border-radius: 6px;
  border: 1px solid #dee2e6;
}

.form-control-sm:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.btn-light:hover {
  background-color: #f0f0f0;
}

.dropdown-toggle::after {
  margin-left: 0.5rem;
}
</style>
