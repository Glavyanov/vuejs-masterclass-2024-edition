<template>
  <div>
    <h1>Projects page</h1>
  </div>
  <div v-if="projects && projects.length">
    <DataTable :columns="columnsWithCollabs" :data="projects" />
  </div>
</template>

<script lang="ts" setup>
import { columns } from '@/utils/tableColumns/projectsColumns'
import { useProjectsStore } from '@/stores/loaders/projects'

usePageStore().pageData.title = 'Projects'

const projectsLoader = useProjectsStore()

const { getProjects } = projectsLoader
const { projects } = storeToRefs(projectsLoader)

await getProjects()

const { getGroupedCollabs, groupedCollabs } = useCollabs()

await getGroupedCollabs(projects.value)
const columnsWithCollabs = columns(groupedCollabs)
</script>
