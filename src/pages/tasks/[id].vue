<!-- <template>
  <div>
    <h1>Project:   {{ task?.name }}</h1>
    <h2>Status:   {{ task?.status }}</h2>
    <h3>Description:   {{ task?.description }}</h3>
    <h4>Collaborators:   {{ JSON.stringify(task?.collaborators) }}</h4>
    <h4>Created at:   {{ task?.created_at }}</h4>
    <RouterLink :to="{ name: '/' }"> Go to Home</RouterLink>
  </div>
</template> -->
<template>
  <Table v-if="task">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> {{ task.name }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        {{  task.description }}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Assignee </TableHead>
      <TableCell>Lorem ipsum</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Project </TableHead>
      <TableCell> {{task.projects?.name}} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell> {{task.status}}   </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="(collab, index) in task.collaborators"
            :key="collab + index"
          >
            <RouterLink class="w-full h-full flex items-center justify-center" to="">
              <AvatarImage src="" alt="" />
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
</template>


<script setup lang="ts">
import { taskQuery } from '@/utils/supaQueries';
import type { Task } from '@/utils/supaQueries';

const task = ref<Task | null>(null)
const route = useRoute('/tasks/[id]')
const id = route.params?.id;
const pageStore = usePageStore();

const loadTask = async () => {
  const { data, error } = await taskQuery(id);
  if (data) task.value = { ...data }
  if (error) console.log(error)
}

await loadTask();

watch(() => task.value?.name,
  (val) => {
    pageStore.pageData.title = `Task ${val ?? ''}`;
  },
  {immediate: true}
)
</script>
