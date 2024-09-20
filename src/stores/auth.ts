import type { Session, User } from "@supabase/supabase-js";
import type { Tables } from "database/types";

export const useAuthStore = defineStore('auth-store',() => {
    const user = ref<null | User>(null);
    const profile = ref<null | Tables<'profiles'>>(null);

    const setAuth = (userSession: null | Session = null) => {
        user.value = userSession?.user ?? null;
    }

    return {
        user,
        profile,
        setAuth
    }
});