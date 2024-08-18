<template>
  <div>
    <h1>Project:   {{ task?.name }}</h1>
    <h2>Status:   {{ task?.status }}</h2>
    <h3>Description:   {{ task?.description }}</h3>
    <h4>Collaborators:   {{ JSON.stringify(task?.collaborators) }}</h4>
    <h4>Created at:   {{ task?.created_at }}</h4>
    <RouterLink :to="{ name: '/' }"> Go to Home</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { type Tables } from 'database/types'
usePageStore().pageData.title = 'Task'

const task = ref<Tables<'tasks'> | null>(null)
const route = useRoute()
const id = 'id' in route.params ? route.params.id : ''

const loadTask = async () => {
  const { data, error } = await supabase.from('tasks').select().match({ id })
  if (data) task.value = { ...data[0] }
  if (error) console.log(error)
}

await loadTask();
</script>
