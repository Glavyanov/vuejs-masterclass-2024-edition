<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new task</SheetTitle>
      </SheetHeader>

      <FormKit type="form" @submit="submitHandler" submit-label="Create Task">
        <FormKit type="text" name="name" id="name" label="Name" placeholder="New Task" />
        <FormKit
          type="select"
          name="for"
          id="for"
          label="For"
          placeholder="Select a user"
          :options="selectOptions.profiles"
        />
        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          placeholder="Task description"
        />
        <FormKit
          type="select"
          name="project"
          id="project"
          label="Project"
          placeholder="Select a project"
          :options="selectOptions.projects"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>
<script setup lang="ts">
import type { CreateNewTask, SelectOption } from '@/types/CreateNewTaskForm'
import { profilesQuery, projectsQuery } from '@/utils/supaQueries'

const sheetOpen = defineModel<boolean>()

const submitHandler = async (formdata: CreateNewTask) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log(formdata))
    }, 2000)
  })
}

const selectOptions = ref({
  projects: [] as SelectOption[],
  profiles: [] as SelectOption[]
})

const getProjects = async () => {
  const { data: allProjects } = await projectsQuery

  if (!allProjects) return

  for (const project of allProjects) {
    selectOptions.value.projects.push({
      value: project.id,
      label: project.name
    })
  }
}

const getProfiles = async () => {
  const { data: allProfiles } = await profilesQuery

  if (!allProfiles) return

  for (const profile of allProfiles) {
    selectOptions.value.profiles.push({
      value: profile.id,
      label: profile.full_name
    })
  }
}

const loadOptions = async () => {
  await Promise.all([getProjects(), getProfiles()])
}

loadOptions()
</script>
