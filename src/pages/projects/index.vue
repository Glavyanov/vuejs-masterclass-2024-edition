<template>
    <div>
        <h1>Projects page</h1>
    </div>
    <div v-if="projects && projects.length">
        <DataTable :columns="columns" :data="projects" />
    </div>
</template>

<script lang="ts" setup>
import { supabase } from '@/lib/supabaseClient';
import { type Tables } from 'database/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { RouterLink } from 'vue-router';

const projects = ref<Tables<'projects'>[] | null>(null);

const loadProjects = async () => {
    const { data, error} = await supabase.from('projects').select();
    if(data) projects.value = [...data]
    if(error) console.log(error)
};

await loadProjects();

const columns: ColumnDef<Tables<'projects'>>[] = [
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
