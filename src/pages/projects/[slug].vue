<template>
  <Table v-if="project">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell>
        <AppInPlaceEditText v-model="project.name" @commit="updateProject" />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        <AppInPlaceEditTextarea v-model="project" @commit="updateProject" />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell>
        <AppInPlaceEditStatus v-model="project.status" @commit="updateProject" />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="collab in collabs"
            :key="collab.id"
          >
            <RouterLink
              class="w-full h-full flex items-center justify-center"
              :to="{ name: '/users/[username]', params: { username: collab.username } }"
            >
              <AvatarImage :src="collab.avatar_url ?? ''" :alt="collab.full_name" />
              <AvatarFallback> </AvatarFallback>
            </RouterLink>
          </Avatar>
        </div>
      </TableCell>
    </TableRow>
  </Table>

  <section v-if="project" class="mt-10 flex flex-col md:flex-row gap-5 justify-between grow">
    <div class="flex-1">
      <h2>Tasks</h2>
      <div class="table-container">
        <Table v-if="project.tasks.length">
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Status </TableHead>
              <TableHead> Due Date </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="task in project.tasks" :key="task.id">
              <TableCell class="p-0">
                <RouterLink
                  :to="{ name: '/tasks/[id]', params: { id: task.id } }"
                  class="text-left block hover:bg-muted p-4"
                >
                  {{ task.name }}
                </RouterLink>
              </TableCell>
              <TableCell>
                <AppInPlaceEditStatus :modelValue="task.status" readonly />
              </TableCell>
              <TableCell> {{ task.due_date }} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p v-else class="text-muted-foreground text-sm font-semibold px-4 py-3">
          This project doesn't have tasks yet...
        </p>
      </div>
    </div>
    <div class="flex-1">
      <h2>Documents</h2>
      <div class="table-container">
        <p class="text-muted-foreground text-sm font-semibold px-4 py-3">
          This project doesn't have documents yet...
        </p>
        <!-- <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Visibility </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> Private </TableCell>
            </TableRow>
          </TableBody>
        </Table> -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { slug } = useRoute('/projects/[slug]').params
// const route = useRoute(); => alternative way
// const slug = ("slug" in route.params) ? route.params.slug : ""; => alternative way
const pageStore = usePageStore()
const projectLoader = useProjectsStore()
const { project } = storeToRefs(projectLoader)
const { getProject, updateProject } = projectLoader
const { getProfilesByIds } = useCollabs()

watch(
  () => project.value?.name,
  (val) => {
    pageStore.pageData.title = `Project ${val || ''}`
  },
  { immediate: true }
)

await getProject(slug)

const collabs = project.value?.collaborators
  ? await getProfilesByIds(project.value?.collaborators)
  : []
</script>

<style>
th {
  @apply w-[100px];
}

h2 {
  @apply mb-4 text-lg font-semibold w-fit;
}

.table-container {
  @apply overflow-hidden overflow-y-auto rounded-md bg-slate-900 h-80;
}
</style>
