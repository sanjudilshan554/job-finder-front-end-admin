import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard/index.vue'
import Profile from '../views/Profile/index.vue'
import Category from '../views/Category/index.vue'
import Jobs from '../views/Jobs/index.vue'
import EditJob from '../views/Jobs/edit.vue'
import Blogs from '../views/Blogs/index.vue'
import BlogCategories from '../views/BlogCategory/index.vue'

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
    {
      path: '/jobs',
      name: 'jobs',
      component: Jobs
    }, 
    {
      path: '/jobs/edit-job/:job_id',
      name: 'edit-job',
      component: EditJob
    }, 
    {
      path: '/blogs',
      name: 'blogs',
      component: Blogs
    }, 
    {
      path: '/blogs/category',
      name: 'blog-categories',
      component: BlogCategories
    }, 
  ]
})

export default router
