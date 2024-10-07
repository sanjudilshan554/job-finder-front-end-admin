import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard/index.vue'
import Profile from '../views/Profile/index.vue'

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
  ]
})

export default router
