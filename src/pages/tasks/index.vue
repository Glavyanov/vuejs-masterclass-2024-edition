<template>
  <div>
    <h1>Tasks page</h1>
  </div>
  <div v-if="tasks && tasks.length">
    <DataTable :columns="columns" :data="tasks" />
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { ColumnDef } from '@tanstack/vue-table';
import { type Tables } from 'database/types'
import DataTable from '@/components/ui/data-table/DataTable.vue';

const tasks = ref<Tables<'tasks'>[] | null>();

(async () => {
  const { data, error } = await supabase.from('tasks').select()
  if (data) tasks.value = [...data]
  if (error) console.log(error)
})()

const columns: ColumnDef<Tables<'tasks'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('name')),
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
    accessorKey: 'project_id',
    header: () => h('div', { class: 'text-left' }, 'Project id'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('project_id')),
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, JSON.stringify(row.getValue('collaborators'))),
  },
]
</script>
