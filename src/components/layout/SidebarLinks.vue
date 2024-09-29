<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink
      v-if="link.to"
      :to="link.to"
      exactActiveClass="text-primary bg-muted"
      class="nav-link"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </RouterLink>
    <div v-else class="nav-link cursor-pointer">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </div>
  </template>
</template>

<script lang="ts" setup>
interface LinkProp {
  title: string
  to?: string
  icon: string
}

defineProps<{
  links: LinkProp[]
}>()
// const { links } = defineProps<{
//   links: LinkProp[]
// }>()
// //links with to property
// const filteredLinks = computed(() => links.filter((link): link is LinkProp & { to: string} => !!link.to))
</script>

<style scoped>
.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground;
}
</style>
