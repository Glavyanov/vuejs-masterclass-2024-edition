<template>
  <div>
    <h1>Project:   {{ project?.name }}</h1>
    <h2>status:   {{ project?.status }}</h2>
    <h3>collaborators:   {{ JSON.stringify(project?.collaborators) }}</h3>
    <RouterLink :to="{ name: '/' }"> Go to Home</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { type Tables } from 'database/types';
usePageStore().pageData.title = "Project"

const project = ref<Tables<'projects'> | null>(null)
const route = useRoute();
const slug = ("slug" in route.params) ? route.params.slug : "";

const loadProject = async () => {
  const { data, error } = await supabase.from('projects').select().match({ slug })
  if (data) project.value = { ...data[0] }
  if (error) console.log(error)
};

await loadProject();
</script>
