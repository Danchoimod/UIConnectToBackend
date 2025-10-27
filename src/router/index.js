import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/user/HomePage.vue')

const routes = [
  { path: '/', name: 'HomePage', component: Home },
  { path: '/admin', name: 'Admin', component: () => import('@/views/admin/Dashboard.vue') },
  {
    path: '/admin/users/list',
    name: 'UserManager',
    component: () => import('@/views/admin/Usermanager/Userlist.vue'),
  },
  {
    path: '/admin/apps/add',
    name: 'AddApp',
    component: () => import('@/views/admin/Appmanager/AddApp.vue'),
  },
  {
    path: '/admin/apps/list',
    name: 'AppList',
    component: () => import('@/views/admin/Appmanager/AppList.vue'),
  },
  {
    path: '/admin/apps/edit/:id',
    name: 'EditApp',
    component: () => import('@/views/admin/Appmanager/EditApp.vue'),
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/Auth.vue'),
  },
  {
    path: '/admin/comments',
    name: 'CommentManager',
    component: () => import('@/views/admin/Commentmanager.vue'),
  },
  {
    path: '/admin/users/add',
    name: 'AddUser',
    component: () => import('@/views/admin/Usermanager/Adduser.vue'),
  },
  {
    path: '/admin/users/edit/:id',
    name: 'EditUser',
    component: () => import('@/views/admin/Usermanager/EditUser.vue'),
  },
  {
    path: '/app/:id',
    name: 'AppDetail',
    component: () => import('@/views/AppDetail.vue'),
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: () => import('@/views/user/UserProfile.vue'),
  },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
