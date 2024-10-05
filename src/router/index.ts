import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import LoginPage from '../pages/login/LoginPage.vue'
import RegisterPage from '../pages/register/RegisterPage.vue'
import HomeView from '@/pages/home/HomeView.vue'
import ExpensesPage from '@/pages/expenses/components/ExpensesPage.vue'
import IncomePage from '@/pages/incomes/components/IncomePage.vue'

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
  {
    path: '/expenses',
    name: 'Expenses',
    component: ExpensesPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/incomes',
    name: 'Incomes',
    component: IncomePage,
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    const token = Cookies.get('token')
    if (token) {
      next()
    }
    else {
      next({ name: 'Login' })
    }
  }
  else if (to.name === 'Login') {
    Cookies.remove('token')
    next()
  }
  else {
    next()
  }
})

export default router
