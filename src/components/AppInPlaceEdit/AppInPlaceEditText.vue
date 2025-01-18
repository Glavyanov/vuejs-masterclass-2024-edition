<template>
  <input
    class="p-1 w-full bg-transparent focus:outline-none focus:border-none focus:bg-gray-800 focus:rounded-md"
    type="text"
    v-model="value"
    @blur="onUpdate"
    @keyup.enter="($event.target as HTMLInputElement).blur()"
  />
</template>
<script setup lang="ts">
const value = defineModel()
const emit = defineEmits(['commit'])
const onUpdate = () => {
  emit('commit')
}
</script>
