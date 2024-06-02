import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home-view" */"@/views/HomeView.vue"),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import(/* webpackChunkName: "projects-view" */"@/views/ProjectsView.vue"),
    },
    {
      path: '/projects/:id',
      name: 'single-projct',
      component: () => import(/* webpackChunkName: "single-project" */"@/views/SingleProjectView.vue"),
    },
  ]
})

export default router
