<template>
    <div>
        <h1>Tasks page</h1>
    </div>
    <div v-if="tasks && tasks.length">
        <p v-for="task in tasks" :key="task.id">
            {{ task.name }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import { ref } from 'vue';
import { type Tables } from 'database/types';

const tasks = ref<Tables<'tasks'>[] | null>();

( async () => {
    const { data, error} = await supabase.from('tasks').select();
    if(data) tasks.value = [...data]
    if(error) console.log(error)
})()
</script>
