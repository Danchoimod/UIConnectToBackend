<template>
  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title">Tạo bài viết mới</h5>
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label">Tiêu đề</label>
          <input v-model="form.title" type="text" class="form-control" placeholder="Nhập tiêu đề" />
        </div>
        <div class="col-md-4">
          <label class="form-label">Tác giả</label>
          <input
            v-model="form.author"
            type="text"
            class="form-control"
            placeholder="Nhập tác giả"
          />
        </div>
        <div class="col-12">
          <label class="form-label">Nội dung</label>
          <textarea
            v-model="form.content"
            rows="3"
            class="form-control"
            placeholder="Nhập nội dung"
          ></textarea>
        </div>
      </div>
      <div class="mt-3 d-flex gap-2">
        <button class="btn btn-primary" @click="submit">Đăng bài</button>
        <button class="btn btn-outline-secondary" @click="reset" type="button">Làm mới</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['create-post'])

const form = reactive({
  title: '',
  author: '',
  content: '',
})

const reset = () => {
  form.title = ''
  form.author = ''
  form.content = ''
}

const submit = () => {
  if (!form.title || !form.author || !form.content) return
  emit('create-post', { title: form.title, author: form.author, content: form.content })
  reset()
}
</script>

<style scoped></style>
