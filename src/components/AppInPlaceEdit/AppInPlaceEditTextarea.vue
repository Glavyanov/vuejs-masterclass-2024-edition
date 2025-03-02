<script setup lang="ts">
import type { Project, Task } from '@/utils/supaQueries'

const project = defineModel<Project | null>('project', { default: null })
const task = defineModel<Task | null>('task', { default: null })
const model = defineModel<Project | Task | null>()
const emit = defineEmits(['commit'])
const oldModel = ref(model.value?.description)
const previousModel = ref(model.value?.description)

if (project.value) {
  model.value = project.value
} else {
  model.value = task.value
}

watch(
  () => model.value?.description,
  (_, oldValue) => {
    previousModel.value = oldValue
  }
)

const onUpdate = () => {
  if (
    model.value?.description === previousModel.value ||
    model.value?.description === oldModel.value
  )
    return
  emit('commit')
}
</script>

<template>
  <template v-if="model">
    <textarea
      class="p-1 w-full bg-transparent focus:outline-none focus:border-none focus:bg-gray-800 focus:rounded-md"
      type="text"
      rows="5"
      v-model="model.description"
      @blur="onUpdate"
    />
  </template>
</template>
