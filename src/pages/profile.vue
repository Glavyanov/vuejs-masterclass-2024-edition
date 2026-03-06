<template>
  <div class="mx-auto max-w-lg w-full p-6">
    <Card>
      <CardHeader>
        <CardTitle class="text-2xl">Edit Profile</CardTitle>
        <CardDescription>Update your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex justify-center mb-6">
          <Avatar size="lg">
            <AvatarImage v-if="formData.avatar_url" :src="formData.avatar_url" />
            <AvatarFallback>{{ initials }}</AvatarFallback>
          </Avatar>
        </div>

        <form class="grid gap-4" @submit.prevent="saveProfile">
          <div class="grid gap-2">
            <Label for="full_name" class="text-left">Full Name</Label>
            <Input v-model="formData.full_name" id="full_name" type="text" placeholder="John Doe" required @keydown.enter.prevent />
          </div>

          <div class="grid gap-2">
            <Label for="username" class="text-left">Username</Label>
            <Input v-model="formData.username" id="username" type="text" placeholder="johndoe19" required @keydown.enter.prevent />
          </div>

          <div class="grid gap-2">
            <Label for="bio" class="text-left">Bio</Label>
            <textarea v-model="formData.bio" id="bio" rows="3" placeholder="Tell us about yourself..."
              class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>

          <div class="grid gap-2">
            <Label for="avatar_url" class="text-left">Avatar URL</Label>
            <Input v-model="formData.avatar_url" id="avatar_url" type="url"
              placeholder="https://example.com/avatar.png" @keydown.enter.prevent />
          </div>

          <p v-if="successMessage" class="text-sm text-green-600">{{ successMessage }}</p>
          <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>

          <Button type="submit" class="w-full" :disabled="saving">
            {{ saving ? 'Saving...' : 'Save' }}
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { updateProfileQuery } from '@/utils/supaQueries'

const authStore = useAuthStore()

const saving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const formData = ref({
  full_name: '',
  username: '',
  bio: '',
  avatar_url: ''
})

watchEffect(() => {
  if (authStore.profile) {
    formData.value = {
      full_name: authStore.profile.full_name || '',
      username: authStore.profile.username || '',
      bio: authStore.profile.bio || '',
      avatar_url: authStore.profile.avatar_url || ''
    }
  }
})

const initials = computed(() => {
  const name = formData.value.full_name.trim()
  if (!name) return '?'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const saveProfile = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  if (!formData.value.full_name.trim() || !formData.value.username.trim()) {
    errorMessage.value = 'Full name and username are required.'
    return
  }

  if (!authStore.user) return

  saving.value = true

  const { error } = await updateProfileQuery(authStore.user.id, {
    full_name: formData.value.full_name.trim(),
    username: formData.value.username.trim(),
    bio: formData.value.bio.trim() || null,
    avatar_url: formData.value.avatar_url.trim() || null
  })

  if (error) {
    if (error.code === '23505') {
      errorMessage.value = 'This username is already taken.'
    } else {
      errorMessage.value = error.message
    }
  } else {
    successMessage.value = 'Profile updated successfully.'
    await authStore.refreshProfile()
  }

  saving.value = false
}
</script>
