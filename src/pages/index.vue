<script setup lang="ts">
</script>

<template>
    <div>
        <h1>Home page</h1>
        <div>
            <RouterLink :to="{ name: '/projects/[id]', params: { id: 1 } }"> Go to Project 1</RouterLink>
        </div>
        <div>
            <RouterLink :to="{ name: '/projects/[id]', params: { id: 2 } }"> Go to Project 2</RouterLink>
        </div>
        <div>
            <RouterLink :to="{ name: '/tasks/' }"> Go to Tasks page</RouterLink>
        </div>
    </div>
</template>