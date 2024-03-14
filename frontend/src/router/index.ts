import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import WeaponsView from '@/views/WeaponsView.vue'
import KnightsView from '@/views/KnightsView.vue'
import HallOfFameView from '@/views/HallOfFameView.vue'
import LoginView from '@/views/LoginView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Knights',
    component: KnightsView
  },
  {
    path: '/weapons',
    name: 'Weapons',
    component: WeaponsView
  },
  {
    path: '/hall-of-fame',
    name: 'Hall of Fame',
    component: HallOfFameView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
