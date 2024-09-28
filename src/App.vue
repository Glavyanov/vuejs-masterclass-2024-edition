<template>
  <!-- <MockComponent /> -->
  <AuthLayout>
    <AppErrorPage v-if="errorStore.activeError" />
    <RouterView   v-else v-slot="{Component, route}">
      <Suspense v-if="Component" :timeout="0">
        <Component  :is="Component" :key="route.name"/>
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
  
</template>

<script setup lang="ts">
import { supabase } from './lib/supabaseClient';

const errorStore = useErrorStore();
const authStore = useAuthStore();

onErrorCaptured((error) => {
  errorStore.setError({ error });
});

onMounted(async () => {
  const { data, error } = await supabase.auth.getSession()
  if(data.session?.user) {
   await authStore.setAuth(data.session);
  }
});

// mocking component
// const MockComponent = defineComponent(async () => {
//   const greeting = ref('From VueJS with Love')

//   await new Promise((resolve) => {
//     greeting.value = `Hello From VueJS with Deep Love`

//     setTimeout(() => {
//       resolve(greeting.value)
//     }, 1000)
//   })

//   return () => h('p', greeting.value)
// })
</script>
