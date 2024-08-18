<template>
    <div>
        <h1>Projects page</h1>
    </div>
    <div v-if="projects && projects.length">
        <DataTable :columns="columns" :data="projects" />
    </div>
</template>

<script lang="ts" setup>
import { projectsQueries } from '@/utils/supaQueries';
import { columns } from '@/utils/tableColumns/projectsColumns';
import type { Projects } from '@/utils/supaQueries';

usePageStore().pageData.title = "Projects"
const projects = ref<Projects | null>(null);

const loadProjects = async () => {
    const { data, error} = await projectsQueries;
    if(data) projects.value = [...data]
    if(error) console.log(error)
};

await loadProjects();
</script>
