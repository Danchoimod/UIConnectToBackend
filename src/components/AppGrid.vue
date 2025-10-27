<template>
  <div>
    <!-- Hiển thị thông báo khi có tìm kiếm -->
    <div v-if="route.query.search" class="alert alert-info mt-3">
      <i class="bi bi-search me-2"></i>
      Kết quả tìm kiếm cho: <strong>"{{ route.query.search }}"</strong>
      <span class="ms-2">({{ filteredApps.length }} sản phẩm)</span>
    </div>

    <!-- Thông báo không tìm thấy -->
    <div v-if="filteredApps.length === 0" class="alert alert-warning mt-3 text-center">
      <i class="bi bi-exclamation-circle me-2"></i>
      Không tìm thấy sản phẩm nào!
    </div>

    <div class="app-list row g-3 mt-4">
      <div v-for="app in paginatedApps" :key="app.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <router-link :to="`/app/${app.id}`" class="text-decoration-none w-100 h-100">
          <div class="app-card p-3 rounded shadow-sm h-100 d-flex flex-column align-items-center">
            <img :src="app.image" alt="app" class="mb-2 app-thumb" />
            <h6 class="mb-1 text-center app-title">{{ app.name }}</h6>
            <div class="text-muted small mb-1 text-center">
              {{ getCategoryName(app.categoryId) }}
            </div>
            <div class="d-flex align-items-center mb-2">
              <span class="star-rating me-1">4.0</span>
              <i class="bi bi-star-fill text-warning"></i>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Pagination -->
    <nav v-if="totalPages > 1" class="mt-4" aria-label="Phân trang">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button
            class="page-link"
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
          >
            <i class="bi bi-chevron-left"></i>
          </button>
        </li>
        <li
          v-for="page in visiblePages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button
            class="page-link"
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
          >
            <i class="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const apps = ref([])
const categories = ref([])
const currentPage = ref(1)
const itemsPerPage = 8

async function fetchApps() {
  try {
    const res = await axios.get('http://localhost:3000/apps')

    apps.value = res.data.reverse()
  } catch (e) {
    apps.value = []
  }
}

async function fetchCategories() {
  try {
    const res = await axios.get('http://localhost:3000/categories')
    categories.value = res.data
  } catch (e) {
    categories.value = []
  }
}

// Lọc app theo category và search từ query parameter
const filteredApps = computed(() => {
  const categoryId = route.query.category
  const searchText = route.query.search

  let result = apps.value

  // Lọc theo category
  if (categoryId) {
    result = result.filter((app) => app.categoryId === categoryId)
  }

  // Lọc theo search
  if (searchText) {
    const search = searchText.toLowerCase()
    result = result.filter(
      (app) =>
        app.name.toLowerCase().includes(search) || app.description?.toLowerCase().includes(search),
    )
  }

  return result
})

// Tính tổng số trang dựa trên danh sách đã lọc
const totalPages = computed(() => Math.ceil(filteredApps.value.length / itemsPerPage))

// Lấy danh sách app cho trang hiện tại
const paginatedApps = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredApps.value.slice(start, end)
})

// Tính các trang hiển thị (hiển thị tối đa 5 số trang)
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Lấy tên category từ categoryId
function getCategoryName(categoryId) {
  const category = categories.value.find((cat) => cat.id === categoryId)
  return category ? category.name : 'Danh mục'
}

// Chuyển trang
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Scroll lên đầu trang
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Reset về trang 1 khi đổi category hoặc search
watch(
  () => [route.query.category, route.query.search],
  () => {
    currentPage.value = 1
  },
)

onMounted(() => {
  fetchApps()
  fetchCategories()
})
</script>

<style scoped>
.app-list {
  margin-left: 0;
  margin-right: 0;
}
.app-card {
  background: #fff;
  border: 1px solid #eee;
  min-height: 220px;
  transition: box-shadow 0.2s;
}
.app-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
.app-thumb {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 12px;
  background: #f5f5f5;
}
.app-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.app-badge {
  font-size: 0.9rem;
  border-radius: 6px;
  padding: 2px 10px;
}

/* Pagination styles */
.pagination {
  margin-top: 2rem;
}

.page-link {
  color: #0d6efd;
  border: 1px solid #dee2e6;
  padding: 0.5rem 0.75rem;
  transition: all 0.3s ease;
}

.page-link:hover {
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: white;
  font-weight: 600;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  background-color: #fff;
  border-color: #dee2e6;
  opacity: 0.5;
}
</style>
