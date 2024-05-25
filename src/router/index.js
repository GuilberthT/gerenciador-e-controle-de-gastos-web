import { createRouter, createWebHistory } from 'vue-router'
// import HomePage from '../pages/HomePage.vue';
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import HomeView from '@/pages/HomeView.vue'
// import ProfilePage from '../pages/ProfilePage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   component: ProfilePage
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
