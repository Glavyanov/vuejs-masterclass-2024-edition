<template>
  <!-- Special cases to use slug like id's to fetch project from db  -->
  <div>
    <h1>Home page</h1>
    <div>
      <RouterLink
        :to="{
          name: '/projects/[slug]',
          params: { slug: '1' },
          query: { isById: true } as unknown as LocationQueryRaw
        }"
      >
        Go to Project 1
      </RouterLink>
    </div>
    <div>
      <RouterLink
        :to="{
          name: '/projects/[slug]',
          params: { slug: '2' },
          query: { isById: true } as unknown as LocationQueryRaw
        }"
      >
        Go to Project 2
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LocationQueryRaw } from 'vue-router'
usePageStore().pageData.title = 'Dashboard'
</script>
