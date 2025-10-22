<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="flex-grow-1 me-3" style="max-width: 400px">
        <input
          type="text"
          placeholder="Tìm bài viết..."
          v-model="searchQuery"
          class="form-control"
        />
      </div>
      <button class="btn btn-success" @click="goToAddPost">
        <i class="bi bi-plus-circle me-2"></i>Thêm bài viết
      </button>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Đang tải...</span>
      </div>
    </div>

    <div v-else-if="filteredPosts.length === 0" class="alert alert-info text-center">
      Không có bài viết nào
    </div>

    <div v-else class="table-responsive">
      <table class="table table-hover table-striped">
        <thead class="table-primary">
          <tr>
            <th>#</th>
            <th>Tiêu đề</th>
            <th>Tác giả</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in filteredPosts" :key="post.id">
            <td>{{ index + 1 }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.author }}</td>
            <td>
              <img
                :src="post.image"
                :alt="post.title"
                class="img-thumbnail"
                style="width: 80px; height: 60px; object-fit: cover"
              />
            </td>
            <td>
              <div class="btn-group" role="group">
                <button class="btn btn-sm btn-info text-white" @click="viewPost(post.id)">
                  <i class="bi bi-eye"></i> Xem
                </button>
                <button class="btn btn-sm btn-warning text-white" @click="editPost(post.id)">
                  <i class="bi bi-pencil"></i> Sửa
                </button>
                <button class="btn btn-sm btn-danger" @click="deletePost(post.id)">
                  <i class="bi bi-trash"></i> Xóa
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const posts = ref([])
const searchQuery = ref('')
const loading = ref(false)

const API_URL = 'http://localhost:3001'

const filteredPosts = computed(() => {
  if (!searchQuery.value) return posts.value

  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query),
  )
})

const fetchPosts = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_URL}/posts`)
    posts.value = response.data
  } catch (error) {
    console.error('Error fetching posts:', error)
    alert('Không thể tải danh sách bài viết. Vui lòng kiểm tra JSON Server!')
  } finally {
    loading.value = false
  }
}

const goToAddPost = () => {
  router.push('/posts/add')
}

const viewPost = (id) => {
  router.push(`/posts/${id}`)
}

const editPost = (id) => {
  router.push(`/posts/edit/${id}`)
}

const deletePost = async (id) => {
  if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
    return
  }

  try {
    await axios.delete(`${API_URL}/posts/${id}`)
    posts.value = posts.value.filter((post) => post.id !== id)
    alert('Xóa bài viết thành công!')
  } catch (error) {
    console.error('Error deleting post:', error)
    alert('Không thể xóa bài viết!')
  }
}

onMounted(() => {
  fetchPosts()
})
</script>

<style scoped>
/* Custom styles if needed */
</style>
