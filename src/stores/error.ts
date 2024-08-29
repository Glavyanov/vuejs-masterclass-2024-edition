import type { CustomError, CustomPostgrestError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | CustomPostgrestError>(null)

  const setError = ({
    error,
    customCode
  }: {
    error: string | PostgrestError
    customCode: number
  }) => {
    if (typeof error === 'string') {
      activeError.value = Error(error)
      activeError.value.customCode = customCode

      return false;
    }

    activeError.value = error;
    activeError.value.statusCode = customCode;
  }

  return {
    activeError,
    setError
  }
})
