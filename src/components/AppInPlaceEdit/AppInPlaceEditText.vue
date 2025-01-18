<script setup lang="ts">
const model = defineModel<string>({ required: true })
const emit = defineEmits(['commit'])
const oldModel = ref(model.value)
const previousModel = ref(model.value)

watch(model, (_, oldValue) => {
  previousModel.value = oldValue
})

const onUpdate = () => {
  if (model.value === previousModel.value || model.value === oldModel.value) return
  emit('commit')
}
</script>

<template>
  <input
    class="p-1 w-full bg-transparent focus:outline-none focus:border-none focus:bg-gray-800 focus:rounded-md"
    type="text"
    v-model="model"
    @blur="onUpdate"
    @keyup.enter="($event.target as HTMLInputElement).blur()"
  />
</template>
