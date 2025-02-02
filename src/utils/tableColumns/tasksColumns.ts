import type { ColumnDef } from '@tanstack/vue-table'
import type { TasksWithProjects } from '../supaQueries'
import { RouterLink } from 'vue-router'
import type { Ref } from 'vue'
import type { GroupedCollabs } from '@/types/GroupedCollabs'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import { AvatarFallback } from 'radix-vue'
import AppInPlaceEditStatus from '@/components/AppInPlaceEdit/AppInPlaceEditStatus.vue'

export const columns = (collabs: Ref<GroupedCollabs>): ColumnDef<TasksWithProjects[0]>[] => [
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
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-left font-medium' },
        h(AppInPlaceEditStatus, { modelValue: row.original?.status, readonly: true })
      )
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
      h(
        'div',
        { class: 'text-left font-medium' },
        collabs.value[row.original?.id]
          ? collabs.value[row.original?.id]?.map((collab) =>
              h(RouterLink, { to: `/users/${collab.username}` }, () =>
                h(Avatar, { class: 'hover:scale-110 transition-transform' }, () =>
                  h(AvatarImage, { src: collab.avatar_url || '', alt: collab.username || '' })
                )
              )
            )
          : row.original?.collaborators.map(() =>
              h(Avatar, { class: 'animate-pulse' }, () => h(AvatarFallback))
            )
      )
  }
]
