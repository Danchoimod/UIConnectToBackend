<template>
  <div>
    <admin-panel>
      <form @submit.prevent="addUser">
        <div class="form-group col-md-6">
          <label for="inputUsername">Username</label>
          <input
            v-model="form.name"
            type="text"
            class="form-control"
            id="inputUsername"
            placeholder="Username"
          />
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="Email"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">Password</label>
            <input
              v-model="form.password"
              type="password"
              class="form-control"
              id="inputPassword4"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="form-row"></div>
        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck" />
            <label class="form-check-label" for="gridCheck"> agree to create </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Sign in</button>
      </form>
    </admin-panel>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import AdminPanel from '@/layout/Sidebar.vue'

const form = ref({ name: '', email: '', password: '', isAdmin: false })

async function addUser() {
  try {
    const res = await axios.post('http://localhost:3000/users/', form.value)
    alert('Thêm người dùng thành công!')
    form.value = { name: '', email: '', password: '', isAdmin: false }
  } catch (error) {
    alert('Thêm người dùng thất bại!')
  }
}
</script>

<style lang="scss" scoped></style>
