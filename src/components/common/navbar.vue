<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary custom-fixed-navbar">
      <div class="container-fluid">
        <img src="/images/msstore.png" alt="" style="width: 100px" />
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'HomePage', query: {} }">
                Tất cả
              </router-link>
            </li>
            <li v-for="cat in categories" :key="cat.id" class="nav-item">
              <router-link class="nav-link" :to="{ name: 'HomePage', query: { category: cat.id } }">
                <i :class="cat.icon" class="me-2"></i>{{ cat.name }}
              </router-link>
            </li>
          </ul>
          <form class="d-flex" role="search" @submit.prevent="handleSearch">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              aria-label="Search"
              v-model="searchQuery"
            />
            <button class="btn btn-outline-primary me-2" type="submit">
              <i class="bi bi-search"></i>
            </button>
            <router-link v-if="!isLoggedIn" class="btn btn-outline-success" :to="{ name: 'Auth' }">
              Login
            </router-link>
            <div v-if="isLoggedIn" class="user-dropdown position-relative">
              <img
                class="p-2 rounded-circle mx-3"
                :src="userAvatar"
                alt=""
                style="
                  width: 40px;
                  height: 40px;
                  object-fit: cover;
                  background-color: #eeeeee;
                  cursor: pointer;
                "
                @click.stop="toggleDropdown"
              />
              <ul class="dropdown-menu dropdown-menu-end" :class="{ show: showDropdown }">
                <li>
                  <a class="dropdown-item fw-semibold" href="#" @click.prevent="goToProfile">{{
                    userName
                  }}</a>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#" @click.prevent="logout">Logout</a></li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const isLoggedIn = ref(false)
const userName = ref('')
const userId = ref('')
const userAvatar = ref('')
const showDropdown = ref(false)
const isAdmin = ref(false)
const categories = ref([])
const searchQuery = ref('')

onMounted(() => {
  // Kiểm tra localStorage khi component được mount
  const user = localStorage.getItem('user')
  if (user) {
    const userData = JSON.parse(user)
    isLoggedIn.value = true
    userName.value = userData.name
    userId.value = userData.id
    userAvatar.value = userData.avatar || '/images/person-loggedin.svg'
    isAdmin.value = userData.isAdmin || false
  }

  // Fetch categories
  fetchCategories()

  // Đóng dropdown khi click bên ngoài
  document.addEventListener('click', handleClickOutside)
})

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:3000/categories')
    categories.value = response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event) => {
  const userDropdown = document.querySelector('.user-dropdown')
  if (userDropdown && !userDropdown.contains(event.target)) {
    showDropdown.value = false
  }
}

const toggleDropdown = (event) => {
  event.stopPropagation()
  showDropdown.value = !showDropdown.value
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'HomePage',
      query: { search: searchQuery.value.trim() },
    })
  } else {
    router.push({ name: 'HomePage', query: {} })
  }
}

const goToProfile = () => {
  showDropdown.value = false
  if (isAdmin.value) {
    router.push('/admin')
  } else {
    alert('Bạn không có quyền truy cập trang Admin!')
  }
}

const logout = () => {
  // Xóa localStorage
  localStorage.removeItem('user')
  isLoggedIn.value = false
  userName.value = ''
  userId.value = ''
  userAvatar.value = ''
  showDropdown.value = false
  isAdmin.value = false
  alert('Đã đăng xuất!')
}
</script>

<script>
// no-op default export to satisfy some tooling if needed
export default {}
</script>

<style lang="css" scoped>
.custom-fixed-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1050;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.btn-login {
  background: #198754;
}
.btn-social {
  background: #f5f5f5;
  color: #333;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.btn-social i {
  font-size: 1rem;
}
.divider {
  position: relative;
  text-align: center;
  margin: 1rem 0;
}
.divider span {
  background: #fff;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}
.divider:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: #ddd;
  z-index: 0;
}
</style>
