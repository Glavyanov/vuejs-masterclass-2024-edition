import { supabase } from '@/lib/supabaseClient'
import { profileQuery } from '@/utils/supaQueries'
import type { Session, User } from '@supabase/supabase-js'
import type { Tables } from 'database/types'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>(null)
  const profile = ref<null | Tables<'profiles'>>(null)
  const isTrackingAuthChanges = ref<boolean>(false)

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

      profile.value = data || null
    }
  }

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()
    if (data.session?.user) {
      await setAuth(data.session)
    }
  }

  const authTrackChanges = () => {
    if (isTrackingAuthChanges.value) return false

    isTrackingAuthChanges.value = true
    supabase.auth.onAuthStateChange((_, session) => {
      setTimeout(async () => {
        await setAuth(session)
      }, 0)
    })
  }

  return {
    user,
    profile,
    setAuth,
    getSession,
    authTrackChanges
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
