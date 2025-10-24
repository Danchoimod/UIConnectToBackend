<template>
  <navbar />
  <div class="bg-light">
    <div class="container py-5">
      <div class="row align-items-center">
        <div class="col-md-8">
          <h1 v-if="app.name" class="display-4 fw-bold mb-2">{{ app.name }}</h1>
          <div v-if="app.description" class="mb-2 text-muted">{{ app.description }}</div>
          <div class="d-flex gap-4 mb-3">
            <div>
              <div class="fw-bold">{{ app.rating }}★</div>
              <div class="small text-muted">{{ ratingCountDisplay }} bài đánh giá</div>
            </div>
            <div>
              <div class="fw-bold">{{ app.downloads }}</div>
              <div class="small text-muted">Lượt tải xuống</div>
            </div>
            <div>
              <div class="fw-bold">{{ app.age }}</div>
              <div class="small text-muted">{{ app.age }} tuổi trở lên</div>
            </div>
          </div>
          <div class="d-flex gap-3 mb-4">
            <a href="#" class="btn btn-success px-4 py-2 fw-semibold">Cài đặt</a>
            <button class="btn btn-outline-secondary px-4 py-2">Chia sẻ</button>
            <button class="btn btn-outline-secondary px-4 py-2">
              Thêm vào danh sách yêu thích
            </button>
          </div>
          <div class="text-muted mb-3">
            <i class="bi bi-laptop"></i> Ứng dụng này dùng được trên mọi thiết bị của bạn
          </div>
        </div>
        <div class="col-md-4 text-center">
          <img
            v-if="app.image"
            :src="app.image"
            alt="App Image"
            class="rounded-4 shadow"
            style="width: 180px; height: 180px; object-fit: cover"
          />
        </div>
      </div>

      <hr class="my-5" />

      <div class="row">
        <div class="col-md-7">
          <h4 class="fw-semibold mb-3">Xếp hạng và đánh giá</h4>
          <div class="d-flex align-items-center gap-4 mb-3">
            <span class="display-3 fw-bold">{{ app.rating }}</span>
            <div class="d-flex flex-column gap-1">
              <div class="d-flex align-items-center gap-2">
                <span class="text-success">★★★★★</span>
                <span class="small text-muted">{{ ratingCountDisplay }} bài đánh giá</span>
              </div>
              <div class="progress" style="height: 8px; width: 200px">
                <div class="progress-bar bg-success" style="width: 95%"></div>
              </div>
              <div class="progress" style="height: 8px; width: 200px">
                <div class="progress-bar bg-success" style="width: 80%"></div>
              </div>
              <div class="progress" style="height: 8px; width: 200px">
                <div class="progress-bar bg-success" style="width: 60%"></div>
              </div>
              <div class="progress" style="height: 8px; width: 200px">
                <div class="progress-bar bg-success" style="width: 30%"></div>
              </div>
              <div class="progress" style="height: 8px; width: 200px">
                <div class="progress-bar bg-success" style="width: 10%"></div>
              </div>
            </div>
          </div>
          <!-- Input bình luận -->
          <form @submit.prevent="addComment" class="mt-4">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                v-model="commentInput"
                placeholder="Nhập bình luận của bạn..."
                required
              />
              <button class="btn btn-success" type="submit">Gửi</button>
            </div>
          </form>
          <div class="mt-3">
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="mb-3 p-3 bg-white rounded shadow-sm"
            >
              <div class="d-flex align-items-center gap-2 mb-2">
                <img
                  v-if="comment.userAvatar"
                  :src="comment.userAvatar"
                  :alt="comment.userName"
                  class="user-avatar"
                  :class="{ 'opacity-50': comment.userSuspended }"
                />
                <span
                  v-else
                  class="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center fw-semibold"
                  :class="{ 'opacity-50': comment.userSuspended }"
                  style="width: 40px; height: 40px"
                  >{{ comment.userName[0] }}</span
                >
                <div>
                  <div class="fw-semibold">
                    {{ comment.userName }}
                    <span v-if="comment.userSuspended" class="badge bg-danger ms-2">
                      Tài khoản bị dừng
                    </span>
                  </div>
                  <div class="small text-muted">{{ comment.date }}</div>
                </div>
              </div>
              <template v-if="!comment.violated">
                <div class="mb-2">{{ comment.text }}</div>
                <div class="small text-muted mb-2">
                  {{ comment.likes }} người thấy bài đánh giá này hữu ích
                </div>
                <div class="d-flex gap-2">
                  <button
                    class="btn btn-sm rounded-pill"
                    :class="
                      getUserLikeStatus(comment.id) === 'like'
                        ? 'btn-success'
                        : 'btn-outline-secondary'
                    "
                    @click="likeComment(comment.id)"
                    :disabled="!currentUser || comment.violated"
                  >
                    <i class="bi bi-hand-thumbs-up me-1"></i>Có
                    <span v-if="getUserLikeStatus(comment.id) === 'like'">✓</span>
                  </button>
                  <button
                    class="btn btn-sm rounded-pill"
                    :class="
                      getUserLikeStatus(comment.id) === 'dislike'
                        ? 'btn-danger'
                        : 'btn-outline-secondary'
                    "
                    @click="dislikeComment(comment.id)"
                    :disabled="!currentUser || comment.violated"
                  >
                    <i class="bi bi-hand-thumbs-down me-1"></i>Không
                    <span v-if="getUserLikeStatus(comment.id) === 'dislike'">✓</span>
                  </button>
                </div>
              </template>
              <template v-else>
                <div class="alert alert-warning py-2 mb-0">
                  Bình luận này đã bị đánh dấu vi phạm bởi quản trị viên.
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <!-- Có thể thêm thông tin mô tả, ảnh, video, ... -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import navbar from '@/components/common/navbar.vue'
import footer from '@/components/common/footer.vue'

const route = useRoute()
const app = ref({})
const commentInput = ref('')
const comments = ref([])
const currentUser = ref(null)
const users = ref([])
const commentLikes = ref([]) // Lưu trạng thái like/dislike của user

onMounted(async () => {
  const id = route.params.id
  if (id) {
    try {
      // Lấy thông tin app
      const res = await axios.get('http://localhost:3000/apps/' + id)
      app.value = res.data

      // Lấy danh sách users để lấy avatar
      await fetchUsers()

      // Lấy comments của app này
      await fetchComments()

      // Lấy trạng thái like/dislike
      await fetchCommentLikes()
    } catch (e) {
      app.value = {}
    }
  }

  // Lấy thông tin user từ localStorage
  const user = localStorage.getItem('user')
  if (user) {
    currentUser.value = JSON.parse(user)
  }
})

async function fetchUsers() {
  try {
    const res = await axios.get('http://localhost:3000/users')
    users.value = res.data
  } catch (e) {
    users.value = []
  }
}

async function fetchComments() {
  try {
    const res = await axios.get(
      `http://localhost:3000/comments?appId=${route.params.id}&_sort=id&_order=desc`,
    )
    // Thêm avatar và suspended status cho từng comment
    comments.value = res.data.map((comment) => {
      const user = users.value.find((u) => u.id === comment.userId)
      return {
        ...comment,
        userAvatar: user?.avatar || null,
        userSuspended: user?.suspended || false,
      }
    })
  } catch (e) {
    comments.value = []
  }
}

async function fetchCommentLikes() {
  try {
    const res = await axios.get('http://localhost:3000/commentLikes')
    commentLikes.value = res.data
  } catch (e) {
    commentLikes.value = []
  }
}

// Kiểm tra trạng thái like/dislike của user cho comment
function getUserLikeStatus(commentId) {
  if (!currentUser.value) return null
  const like = commentLikes.value.find(
    (l) => l.commentId === commentId && l.userId === currentUser.value.id,
  )
  return like ? like.type : null
}

async function likeComment(commentId) {
  if (!currentUser.value) {
    alert('Bạn cần đăng nhập để đánh giá!')
    return
  }

  const currentStatus = getUserLikeStatus(commentId)
  const comment = comments.value.find((c) => c.id === commentId)
  if (!comment) return

  try {
    let newLikes = comment.likes

    // Tìm bản ghi like hiện tại của user
    const existingLike = commentLikes.value.find(
      (l) => l.commentId === commentId && l.userId === currentUser.value.id,
    )

    if (currentStatus === 'like') {
      // Đã like rồi, bỏ like
      newLikes = Math.max(0, comment.likes - 1)
      if (existingLike) {
        await axios.delete(`http://localhost:3000/commentLikes/${existingLike.id}`)
      }
    } else if (currentStatus === 'dislike') {
      // Đang dislike, chuyển sang like
      newLikes = comment.likes + 1
      if (existingLike) {
        await axios.patch(`http://localhost:3000/commentLikes/${existingLike.id}`, {
          type: 'like',
        })
      }
    } else {
      // Chưa có action, thêm like mới
      newLikes = comment.likes + 1
      await axios.post('http://localhost:3000/commentLikes', {
        commentId: commentId,
        userId: currentUser.value.id,
        type: 'like',
      })
    }

    // Cập nhật số likes của comment
    await axios.patch(`http://localhost:3000/comments/${commentId}`, {
      likes: newLikes,
    })

    // Refresh dữ liệu
    await fetchComments()
    await fetchCommentLikes()
  } catch (e) {
    console.error('Like error:', e)
    alert('Thao tác thất bại!')
  }
}

async function dislikeComment(commentId) {
  if (!currentUser.value) {
    alert('Bạn cần đăng nhập để đánh giá!')
    return
  }

  const currentStatus = getUserLikeStatus(commentId)
  const comment = comments.value.find((c) => c.id === commentId)
  if (!comment) return

  try {
    let newLikes = comment.likes

    // Tìm bản ghi like hiện tại của user
    const existingLike = commentLikes.value.find(
      (l) => l.commentId === commentId && l.userId === currentUser.value.id,
    )

    if (currentStatus === 'dislike') {
      // Đã dislike rồi, bỏ dislike
      if (existingLike) {
        await axios.delete(`http://localhost:3000/commentLikes/${existingLike.id}`)
      }
    } else if (currentStatus === 'like') {
      // Đang like, chuyển sang dislike
      newLikes = Math.max(0, comment.likes - 1)
      if (existingLike) {
        await axios.patch(`http://localhost:3000/commentLikes/${existingLike.id}`, {
          type: 'dislike',
        })
      }
    } else {
      // Chưa có action, thêm dislike mới
      await axios.post('http://localhost:3000/commentLikes', {
        commentId: commentId,
        userId: currentUser.value.id,
        type: 'dislike',
      })
    }

    // Cập nhật số likes của comment
    await axios.patch(`http://localhost:3000/comments/${commentId}`, {
      likes: newLikes,
    })

    // Refresh dữ liệu
    await fetchComments()
    await fetchCommentLikes()
  } catch (e) {
    console.error('Dislike error:', e)
    alert('Thao tác thất bại!')
  }
}

async function addComment() {
  if (!currentUser.value) {
    alert('Bạn cần đăng nhập để bình luận!')
    return
  }

  if (!commentInput.value.trim()) {
    alert('Vui lòng nhập nội dung bình luận!')
    return
  }

  const newComment = {
    appId: route.params.id,
    userId: currentUser.value.id,
    userName: currentUser.value.name,
    text: commentInput.value,
    date: new Date().toISOString().split('T')[0],
    likes: 0,
  }

  try {
    await axios.post('http://localhost:3000/comments', newComment)
    commentInput.value = ''
    // Refresh users trước để lấy thông tin mới nhất
    await fetchUsers()
    // Sau đó refresh comments
    await fetchComments()
    alert('Đã thêm bình luận!')
  } catch (e) {
    alert('Thêm bình luận thất bại!')
  }
}
</script>

<style scoped>
.bg-light {
  background-color: #f8f9fa;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e9ecef;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
  color: white;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.opacity-50 {
  opacity: 0.5;
}
</style>
