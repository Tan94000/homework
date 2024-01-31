import { createRouter, createWebHistory } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import("../views/index.vue")
    },
    {
      path: '/reg',
      name: 'reg',
      component: () => import('../views/reg.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("../views/login.vue")
    },
    {
      path: '/my',
      name: 'my',
      component: () => import("../views/my.vue")
    },
    {
      path: '/test',
      name: 'test',
      component: () => import("../views/test.vue")
    },
    {
      path: '/address',
      name: 'address',
      component: () => import("../views/address.vue")
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import("../views/shop.vue")
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import("../views/detail.vue")
    },
    {
      path: '/shopcar',
      name: 'shopcar',
      component: () => import("../views/shopcar.vue")
    }
  ]
})

export default router
