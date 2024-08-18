<template>
  <div>
    <h1>Tasks page</h1>
  </div>
  <div v-if="tasks && tasks.length">
    <DataTable :columns="columns" :data="tasks" />
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import type { TasksWithProjects } from '@/utils/supaQueries'
import type { ColumnDef } from '@tanstack/vue-table'

usePageStore().pageData.title = 'Tasks'

const tasks = ref<TasksWithProjects | null>(null)

const loadTasks = async () => {
  const { data, error } = await tasksWithProjectsQuery
  if (data) tasks.value = [...data]
  if (error) console.log(error)
}

await loadTasks()

const columns: ColumnDef<TasksWithProjects[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) =>
      h(
        RouterLink,
        {
          to: `/tasks/${row.original?.id}`,
          class: 'text-left font-medium hover:bg-muted block w-full'
        },
        () => row.getValue('name')
      )
  },
  {
    accessorKey: 'created_at',
    header: () => h('div', { class: 'text-left' }, 'Created at'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('created_at'))
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due date'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('due_date'))
  },
  {
    accessorKey: 'description',
    header: () => h('div', { class: 'text-left' }, 'Description'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('description'))
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('status'))
  },
  {
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-left' }, 'Project'),
    cell: ({ row }) =>
      row.original.projects
        ? h(
            RouterLink,
            {
              to: `/projects/${row.original.projects.slug}`,
              class: 'text-left font-medium hover:bg-muted block w-full'
            },
            () => row.original.projects?.name
          )
        : ''
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) =>
      h('div', { class: 'text-left font-medium' }, JSON.stringify(row.getValue('collaborators')))
  }
]
</script>
