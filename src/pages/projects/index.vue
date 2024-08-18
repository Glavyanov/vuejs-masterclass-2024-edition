<template>
    <div>
        <h1>Projects page</h1>
    </div>
    <div v-if="projects && projects.length">
        <DataTable :columns="columns" :data="projects" />
    </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import { projectsQueries } from '@/utils/supaQueries';
import type { ColumnDef } from '@tanstack/vue-table';
import type { Projects } from '@/utils/supaQueries';

usePageStore().pageData.title = "Projects"
const projects = ref<Projects | null>(null);

const loadProjects = async () => {
    const { data, error} = await projectsQueries;
    if(data) projects.value = [...data]
    if(error) console.log(error)
};

await loadProjects();

const columns: ColumnDef<Projects[0]>[] = [
    {
        accessorKey: 'name',
        header: () => h('div', {class: 'text-left'}, 'Name'),
        cell: ({row}) => {
            return h(RouterLink, { to: `/projects/${row.original?.slug}`, class: 'text-left font-medium hover:bg-muted block w-full'}, () => row.getValue('name'))
        }
    },
    {
        accessorKey: 'status',
        header: () => h('div', {class: 'text-left'}, 'Same'),
        cell: ({row}) => {
            return h('div', {class: 'text-left font-medium'}, row.getValue('status'))
        }
    },
    {
        accessorKey: 'collaborators',
        header: () => h('div', {class: 'text-left'}, 'Collaborators'),
        cell: ({row}) => {
            return h('div', {class: 'text-left font-medium'}, JSON.stringify(row.getValue('collaborators')))
        }
    },
    {
        accessorKey: 'created_at',
        header: () => h('div', { class: 'text-left' }, 'Created at'),
        cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('created_at')),
    },
    
];
</script>
