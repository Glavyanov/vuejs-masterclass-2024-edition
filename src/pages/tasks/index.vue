<template>
  <div>
    <h1>Tasks page</h1>
  </div>
  <div v-if="tasks && tasks.length">
    <DataTable :columns="columnsWithCollabs" :data="tasks" />
  </div>
</template>

<script lang="ts" setup>
import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import type { TasksWithProjects } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'Tasks'

const tasks = ref<TasksWithProjects | null>(null)

const loadTasks = async () => {
  const { data, error, status } = await tasksWithProjectsQuery
  if (data) tasks.value = [...data]
  if (error) {
    useErrorStore().setError({ error, customCode: status })
  }
}

await loadTasks()

const { getGroupedCollabs, groupedCollabs } = useCollabs()

getGroupedCollabs(tasks.value ?? [])
const columnsWithCollabs = columns(groupedCollabs)
</script>
