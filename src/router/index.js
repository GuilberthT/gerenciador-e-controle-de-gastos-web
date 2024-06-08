import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import LoginPage from '../pages/login/LoginPage.vue'
import RegisterPage from '../pages/register/RegisterPage.vue'
import HomeView from '@/pages/home/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: {
      requiresAuth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    const token = Cookies.get('token')

    if (token)
      next()
    else next({ name: 'Login' })
  }
  else if (to.name === 'Login') {
    Cookies.remove('token')

    next()
  }
  else {
    next()
  }
  // else if (to.matched.some(record => record.meta.requiresVisitor)) {
  //   const user = firebase.auth().currentUser
  //   if (user)
  //     next({ name: 'home' })
  //   else
  //     next()
  // }
  // else {
  //   next()
  // }
})

export default router
