import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard/index.vue'
import Profile from '../views/Profile/index.vue'
import Category from '../views/Category/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    }, 
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }, 
    {
      path: '/category',
      name: 'category',
      component: Category
    }, 
  ]
})

export default router
