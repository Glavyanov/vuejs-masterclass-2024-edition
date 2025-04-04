import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, _, next) => {
  await useAuthStore().getSession();
  const { user } = storeToRefs(useAuthStore());

  if(!user.value && !["/login", "/register"].includes(to.path)) {
    next("/login")
  } else if (user.value && ["/login", "/register"].includes(to.path)) {
    next("/")
  } else {
    next()
  }
})

export default router