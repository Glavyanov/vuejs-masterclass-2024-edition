<template>
  <div>
    <h1>Project {{ project?.name }}</h1>
    <h2>status: {{ project?.status }}</h2>
    <RouterLink :to="{ name: '/' }"> Go to Home</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import { type Tables } from 'database/types';

const project = ref<Tables<'projects'> | null>(null)
const route = useRoute();

(async () => {
  const { data, error } = await supabase.from('projects').select().match({ id: route.params?.id })
  if (data) project.value = { ...data[0] }
  if (error) console.log(error)
})()
</script>
