<template>
  <div>
    <h5 class="mb-3">Danh sách bài viết ({{ posts.length }})</h5>
    <div v-if="!posts.length" class="alert alert-info">Chưa có bài viết nào.</div>

    <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-12 col-md-6 col-lg-4">
        <div
          class="card h-100"
          :class="{ 'border-2 border-primary': post.isHighlighted }"
          :style="{ backgroundColor: post.bg }"
        >
          <div class="card-body">
            <h5 class="card-title mb-1" :style="{ color: post.color }">{{ post.title }}</h5>
            <div class="text-muted mb-2" style="font-size: 0.9rem">Tác giả: {{ post.author }}</div>
            <p class="card-text" :style="{ color: post.color }">{{ post.content }}</p>

            <div class="mt-3">
              <label class="form-label me-2">Màu chữ</label>
              <input
                type="color"
                :value="post.color"
                @input="onStyleChange(post.id, { color: $event.target.value })"
              />
            </div>

            <div class="mt-2">
              <label class="form-label me-2">Màu nền</label>
              <input
                type="color"
                :value="post.bg"
                @input="onStyleChange(post.id, { bg: $event.target.value })"
              />
            </div>

            <div class="form-check form-switch mt-3">
              <input
                class="form-check-input"
                type="checkbox"
                :checked="post.isHighlighted"
                @change="onStyleChange(post.id, { isHighlighted: $event.target.checked })"
                :id="`hl-${post.id}`"
              />
              <label class="form-check-label" :for="`hl-${post.id}`">Viền nổi bật</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  posts: { type: Array, default: () => [] },
})

const emit = defineEmits(['update-style'])

const onStyleChange = (id, patch) => {
  emit('update-style', { id, patch })
}
</script>

<style scoped></style>
