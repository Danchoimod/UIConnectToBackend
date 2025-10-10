<template>
  <div class="container py-4">
    <h2 class="text-center mb-4">Bài 4: Tạo và hiển thị danh sách bài viết</h2>
    <CreatePost @create-post="addPost" />
    <hr />
    <PostList :posts="posts" @update-style="updatePostStyle" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CreatePost from './CreatePost.vue'
import PostList from './PostList.vue'

const posts = ref([
  {
    id: 1,
    title: 'Bài viết mẫu',
    author: 'Admin',
    content: 'Đây là nội dung mẫu để minh hoạ.',
    color: '#212529',
    bg: '#f8f9fa',
    isHighlighted: false,
  },
])

const addPost = (post) => {
  posts.value.push({
    id: Date.now(),
    ...post,
    color: '#212529',
    bg: '#ffffff',
    isHighlighted: false,
  })
}

const updatePostStyle = ({ id, patch }) => {
  const idx = posts.value.findIndex((p) => p.id === id)
  if (idx !== -1) {
    posts.value[idx] = { ...posts.value[idx], ...patch }
  }
}
</script>

<style scoped></style>
