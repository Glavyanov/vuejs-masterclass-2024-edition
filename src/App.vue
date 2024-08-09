<template>
  <!-- <MockComponent /> -->
  <AuthLayout>
    <RouterView v-slot="{Component, route}">
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
