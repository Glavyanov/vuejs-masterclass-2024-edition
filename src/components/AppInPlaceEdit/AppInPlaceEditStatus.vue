<template>
  <div class="text-2xl cursor-pointer" @click="updateStatus">
    <Transition name="scale" mode="out-in">
      <iconify-icon
        v-if="status === 'completed'"
        icon="lucide:circle-check"
        class="text-green-500"
      />
      <iconify-icon v-else icon="lucide:circle-dot" class="text-gray-500" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
const status = defineModel<'completed' | 'in-progress'>({ default: null })
const emit = defineEmits(['commit'])
const { readonly = false } = defineProps<{ readonly?: boolean }>()

const updateStatus = () => {
  if (readonly) return
  status.value = status.value === 'completed' ? 'in-progress' : 'completed'
  emit('commit')
}
</script>
