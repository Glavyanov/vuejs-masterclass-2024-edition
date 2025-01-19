<script setup lang="ts">
import type { Project } from '@/utils/supaQueries'

const model = defineModel<Project>({ required: true })
const emit = defineEmits(['commit'])
const oldModel = ref(model.value.description)
const previousModel = ref(model.value.description)

watch(
  () => model.value.description,
  (_, oldValue) => {
    previousModel.value = oldValue
  }
)

const onUpdate = () => {
  if (model.value.description === previousModel.value || model.value.description === oldModel.value)
    return
  emit('commit')
}
</script>

<template>
  <textarea
    class="p-1 w-full bg-transparent focus:outline-none focus:border-none focus:bg-gray-800 focus:rounded-md"
    type="text"
    rows="5"
    v-model="model.description"
    @blur="onUpdate"
  />
</template>
