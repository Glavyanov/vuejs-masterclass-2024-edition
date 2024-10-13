import type { AuthError } from "@supabase/supabase-js";

export const useFormErrors = () => {
    const serverError = ref('');
    const handleServerError = (error: AuthError) => {
        serverError.value = error.message === 'Invalid login credentials' ? 'Incorrect password or email' : error.message;
    };
    return { serverError, handleServerError };
}