<template>
    <div>
        <h1>Home page</h1>
        <div>
            <RouterLink :to="{ name: '/projects/[slug]', params: { slug: 'cito-tergeo-concido' } }"> Go to Project 1</RouterLink>
        </div>
        <div>
            <RouterLink :to="{ name: '/projects/[slug]', params: { slug: 'alias-bellum-curriculum' } }"> Go to Project 2</RouterLink>
        </div>
    </div>
</template>

<script  lang="ts" setup>
usePageStore().pageData.title = "Dashboard"
</script>