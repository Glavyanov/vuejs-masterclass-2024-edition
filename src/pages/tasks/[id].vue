<template>
  <div class="flex flex-col justify-center items-center">
    <Table v-if="task">
      <TableRow>
        <TableHead> Name </TableHead>
        <TableCell>
          <AppInPlaceEditText v-model="task!.name" @commit="updateTask" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Description </TableHead>
        <TableCell>
          <AppInPlaceEditTextarea v-model:task="task" @commit="updateTask" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Assignee </TableHead>
        <TableCell>Lorem ipsum</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Project </TableHead>
        <TableCell> {{ task.projects?.name }} </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Status </TableHead>
        <TableCell>
          <AppInPlaceEditStatus v-model="task!.status" @commit="updateTask" />
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
      <TableRow class="hover:bg-transparent">
        <TableHead class="align-top pt-4"> Comments </TableHead>

        <TableCell>
          Comments cards goes in here..

          <div class="flex flex-col justify-between p-3 bg-muted my-2 rounded-md">
            <textarea
              placeholder="Add your comment.."
              class="w-full max-w-full overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted p-3"
            >
            </textarea>
            <div class="flex justify-between mt-3">
              <Button> Comment </Button>
              <div class="flex gap-4">
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:paperclip"></iconify-icon>
                  <span class="sr-only">Attach file</span>
                </button>
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:image-up"></iconify-icon>

                  <span class="sr-only">Upload image</span>
                </button>
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </Table>
    <Button @click="triggerDeleteTask" class="self-end mt-3 w-full max-w-40" variant="destructive">
      <Transition name="scale" mode="out-in">
        <iconify-icon
          v-if="deleteLoading"
          icon="lucide:loader-circle"
          class="mr-1 animate-spin"
        ></iconify-icon>
        <iconify-icon v-else icon="lucide:trash-2" class="mr-1"></iconify-icon>
      </Transition>
      Delete Task
    </Button>
  </div>
</template>

<script setup lang="ts">
import AppInPlaceEditText from '@/components/AppInPlaceEdit/AppInPlaceEditText.vue'

const route = useRoute('/tasks/[id]')
const id = route.params?.id
const pageStore = usePageStore()
const tasksStore = useTasksStore()
const { task } = storeToRefs(tasksStore)
const { getTask, updateTask, deleteTask } = tasksStore
const { getProfilesByIds } = useCollabs()
const router = useRouter()
const deleteLoading = ref(false)

const triggerDeleteTask = async () => {
  deleteLoading.value = true
  await deleteTask()
  deleteLoading.value = false
  router.push({ name: '/tasks/' })
}

await getTask(id)

const collabs = task.value?.collaborators ? await getProfilesByIds(task.value?.collaborators) : []
watch(
  () => task.value?.name,
  (val) => {
    pageStore.pageData.title = `Task ${val ?? ''}`
  },
  { immediate: true }
)
</script>
