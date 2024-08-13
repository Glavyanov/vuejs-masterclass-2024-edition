<template>
  <div>
    <h1>Tasks page</h1>
  </div>
  <div v-if="tasks && tasks.length">
    <DataTable :columns="columns" :data="tasks" />
  </div>
</template>

<script  lang="ts" setup>
import { supabase } from '@/lib/supabaseClient'
import type { ColumnDef } from '@tanstack/vue-table';
import { type Tables } from 'database/types'
import { RouterLink } from 'vue-router';

usePageStore().pageData.title = "Tasks"
const tasks = ref<Tables<'tasks'>[] | null>(null);

const loadTasks = async () => {
  const { data, error } = await supabase.from('tasks')
    .select(`
      *, 
      projects(
        id, name, slug)
    `);
  if (data) tasks.value = [...data]
  if (error) console.log(error)
};

await loadTasks();

const columns: ColumnDef<Tables<'tasks'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => h(RouterLink, { to: `/tasks/${row.original?.id}`, class: 'text-left font-medium hover:bg-muted block w-full'}, () => row.getValue('name')),
  },
  {
    accessorKey: 'created_at',
    header: () => h('div', { class: 'text-left' }, 'Created at'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('created_at')),
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due date'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('due_date')),
  },
  {
    accessorKey: 'description',
    header: () => h('div', { class: 'text-left' }, 'Description'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('description')),
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('status')),
  },
  {
     accessorKey: 'projects',
    header: () => h('div', { class: 'text-left' }, 'Project'),
    cell: ({ row }: { row: any }) => h(RouterLink, { to: `/projects/${ row.original?.projects.slug }`, class: 'text-left font-medium hover:bg-muted block w-full'}, () => row.getValue('projects').slug),
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, JSON.stringify(row.getValue('collaborators'))),
  },
]
</script>
