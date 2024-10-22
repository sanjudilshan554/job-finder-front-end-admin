import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard/index.vue'
import Profile from '../views/Profile/index.vue'
import JobCategory from '../views/Jobs/components/Category/index.vue'
import Jobs from '../views/Jobs/index.vue'
import JobCompany from '../views/Jobs/components/Company/index.vue'
import DeletedJob from '../views/Jobs/components/DeletedList/index.vue'
import EditJob from '../views/Jobs/edit.vue'
import Blogs from '../views/Blogs/index.vue'
import BlogCategories from '../views/Blogs/components/BlogCategory/index.vue'
import EditBLog from '../views/Blogs/edit.vue'
import BlogTag from '../views/Blogs/components/BlogTag/index.vue'
import DeletedBlog from '../views/Blogs/components/DeletedList/index.vue'
import Login from '../views/Login/index.vue'
import Register from '../views/Register/index.vue'
import User from '../views/User/index.vue'
import UserPermission from '../views/User/permission.vue'

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
      path: '/jobs/category',
      name: 'job-category',
      component: JobCategory
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
      path: '/jobs/company',
      name: 'job-company',
      component: JobCompany
    }, 
    {
      path: '/jobs/deleted-list',
      name: 'deleted-job',
      component: DeletedJob
    }, 
    {
      path: '/blogs',
      name: 'blogs',
      component: Blogs
    }, 
    {
      path: '/blogs/category',
      name: 'blog-category',
      component: BlogCategories
    }, 
    {
      path: '/blogs/edit-blog/:blog_id',
      name: 'edit-blog',
      component: EditBLog
    }, 
    {
      path: '/blogs/tag',
      name: 'blog-tag',
      component: BlogTag
    }, 
    {
      path: '/blogs/deleted-list',
      name: 'deleted-blog',
      component: DeletedBlog
    }, 
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {hideLayout: true}
    }, 
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {hideLayout: true}
    }, 
    {
      path: '/user',
      name: 'user',
      component: User, 
    }, 
    {
      path: '/user/permission/:user_id',
      name: 'user-permission',
      component: UserPermission, 
    }, 
  ]
})

export default router
