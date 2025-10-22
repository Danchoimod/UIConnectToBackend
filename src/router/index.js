import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue')
const PostList = () => import('@/views/PostList.vue')
const AddPost = () => import('@/views/AddPost.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/posts',
    name: 'PostList',
    component: PostList,
  },
  {
    path: '/posts/add',
    name: 'AddPost',
    component: AddPost,
  },
  {
    path: '/posts/edit/:id',
    name: 'EditPost',
    component: AddPost,
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/ProductList.vue'),
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/UserList.vue'),
  },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
