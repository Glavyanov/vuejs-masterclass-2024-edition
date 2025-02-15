<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new task</SheetTitle>
      </SheetHeader>

      <FormKit
        type="form"
        @submit="submitHandler"
        submit-label="Create Task"
        :config="{ validationVisibility: 'submit' }"
      >
        <FormKit
          type="text"
          name="name"
          id="name"
          label="Name"
          placeholder="New Task"
          validation="required|length:2,255"
        />
        <FormKit
          type="select"
          name="collaborators"
          id="collaborators"
          label="Users"
          placeholder="Select a user"
          :options="selectOptions.profiles"
          multiple
          validation="required"
        />
        <FormKit
          type="select"
          name="project_id"
          id="project_id"
          label="Project"
          placeholder="Select a project"
          :options="selectOptions.projects"
          validation="required"
        />
        <FormKit
          type="date"
          name="due_date"
          id="due_date"
          label="Due Date"
          help="Enter your due date"
        />
        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          placeholder="Task description"
          validation="length:0,500"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>
<script setup lang="ts">
import type { CreateNewTask, SelectOption } from '@/types/CreateNewTaskForm'
import { createTaskQuery, profilesQuery, projectsQuery } from '@/utils/supaQueries'

const sheetOpen = defineModel<boolean>()

const submitHandler = async (formdata: CreateNewTask) => {
  const { error, status } = await createTaskQuery({ ...formdata })
  if (error) {
    useErrorStore().setError({ error, customCode: status })
  }

  sheetOpen.value = false // close the sheet
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

<style>
[role='dialog'] {
  overflow: auto;
}
</style>
