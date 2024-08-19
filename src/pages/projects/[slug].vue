<template>
  <div>
    <h1>Project:   {{ project?.name }}</h1>
    <h2>status:   {{ project?.status }}</h2>
    <h3>collaborators:   {{ JSON.stringify(project?.collaborators) }}</h3>
    <RouterLink :to="{ name: '/' }"> Go to Home</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { projectQuery } from '@/utils/supaQueries'
import type { Project } from '@/utils/supaQueries'

usePageStore().pageData.title = "Project"

const project = ref<Project | null>(null)
const route = useRoute();
const slug = ("slug" in route.params) ? route.params.slug : "";

const loadProject = async () => {
  const { data, error } = await projectQuery(slug);
  if (data) project.value = { ...data }
  if (error) console.log(error)
};

await loadProject();
</script>
