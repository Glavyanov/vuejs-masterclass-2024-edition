<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 class="error__code">{{ error.code }}</h1>
    <p class="error__msg">{{ error.msg }}</p>
    <div class="error-footer">
      <p class="error-footer__text">You'll find lots to explore on the home page.</p>
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { message, customCode, isCustomError, statusCode } = defineProps<{
  message: string
  customCode: number
  statusCode: number
  isCustomError: boolean
}>()

const error = ref({
  msg: 'Something went wrong!',
  code: 500
})

if (isCustomError) {
  error.value.code = customCode
  error.value.msg = message
}

if (statusCode === 406) {
  error.value.code = 404
  error.value.msg = "Sorry, we couldn't find this page!"
}
</script>
