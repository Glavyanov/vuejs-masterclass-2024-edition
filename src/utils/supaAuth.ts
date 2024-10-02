import { supabase } from '@/lib/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/AuthForm'

const errorStore = useErrorStore();
const authStore = useAuthStore();

export const register = async (formData: RegisterForm) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password
  })
  if (error) {
    errorStore.setError({error, customCode: 400});
    return false
  }
  console.log('Success:', data)

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.username,
      full_name: `${formData.firstName} ${formData.lastName}`
    })

    if (error) {
      errorStore.setError({error, customCode: 400});
    }
  }

  await authStore.setAuth(data.session);

  return !error
}

export const login = async (formData: LoginForm) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  })

  if (error){
    errorStore.setError({error, customCode: 400});
  }

  await authStore.setAuth(data.session);

  return !error;
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error){
    errorStore.setError({error, customCode: 400});
    return false;
  }

  await authStore.setAuth(null);

  return true;
}
