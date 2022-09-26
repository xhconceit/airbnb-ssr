// import home from '@/views/home/index.vue'
// import mine from '@/views/mine/index.vue'
// import login from '@/views/login/index.vue'

import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

const home = () => import('@/views/home/HomeIndex.vue')
const mine = () => import('@/views/mine/MineIndex.vue')
const login = () => import('@/views/login/LoginIndex.vue')
const roomDetail = () => import('@/views/detail/detailIndex.vue')
const record = () => import('@/views/record/RecordIndex.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    meta: {
      title: '爱此迎-全球特色民宿',
      keywords: '全球民宿，公寓，短租，住宿，预订平台',
      description: 'Airbnb爱此迎是全球民宿短租公寓预订平台,全球百万特色民宿、短租、酒店、公寓、客栈房源,价格优惠,更有树屋、海景别墅、花园洋房等多种特色住宿预订供您选择。',
      keepAlive: false
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: mine,
    meta: {
      title: '爱此迎-全球特色民宿',
      keywords: '',
      description: '',
      keepAlive: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '爱此迎-全球特色民宿',
      keywords: '',
      description: '',
      keepAlive: false
    }
  },
  {
    path: '/roomDetail/:id',
    name: 'roomDetail',
    component: roomDetail,
    meta: {
      title: '爱此迎-全球特色民宿',
      keywords: '',
      description: '',
      keepAlive: false
    }
  },
  {
    path: '/record',
    name: 'record',
    component: record,
    meta: {
      title: '爱此迎-全球特色民宿',
      keywords: '',
      description: '',
      keepAlive: false
    }
  }
]

// const router = createRouter({
//   history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
//   routes
// })

export function createSSRRouter () {
  return createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}
