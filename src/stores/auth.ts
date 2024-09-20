import { profileQuery } from '@/utils/supaQueries'
import type { Session, User } from '@supabase/supabase-js'
import type { Tables } from 'database/types'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>(null)
  const profile = ref<null | Tables<'profiles'>>(null)

  const setAuth = async (userSession: null | Session = null) => {
    user.value = userSession?.user ?? null
    await setProfile()
  }

  const setProfile = async () => {
    if (!user.value) {
      profile.value = null
      return false
    }

    if (!profile.value || profile.value.id !== user.value.id) {
      const { data } = await profileQuery(user.value.id)

      profile.value = data || null;
    }
  }
  return {
    user,
    profile,
    setAuth
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}