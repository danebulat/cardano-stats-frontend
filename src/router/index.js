import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'

const routes =  [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    // 404 catch all route
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
