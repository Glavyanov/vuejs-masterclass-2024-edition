import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'
import type { Projects } from '../supaQueries'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import type { GroupedCollabs } from '@/types/GroupedCollabs'
import type { Ref } from 'vue'

export const columns = (collabs: Ref<GroupedCollabs>): ColumnDef<Projects[0]>[] => [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/projects/${row.original?.slug}`,
          class: 'text-left font-medium hover:bg-muted block w-full'
        },
        () => row.getValue('name')
      )
    }
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Same'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
    }
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        collabs.value[row.original?.id]?.map((collab) =>
          h(RouterLink, { to: `/users/${collab.username}` }, () =>
            h(Avatar, { class: 'hover:scale-110 transition-transform' }, () =>
              h(AvatarImage, { src: collab.avatar_url || '', alt: collab.username || '' })
            )
          )
        )
      )
    }
  },
  {
    accessorKey: 'created_at',
    header: () => h('div', { class: 'text-left' }, 'Created at'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('created_at'))
  }
]
