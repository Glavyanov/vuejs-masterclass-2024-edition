<template>
    <div>
        <h1>Projects page</h1>
    </div>
    <div v-if="projects && projects.length">
        <p v-for="project in projects" :key="project.id">
            {{ project.name }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import { ref } from 'vue';
import { type Tables } from 'database/types';

const projects = ref<Tables<'projects'>[] | null>();
( async () => {
    const { data, error} = await supabase.from('projects').select();
    if(data) projects.value = [...data]
    if(error) console.log(error)
})()
</script>
