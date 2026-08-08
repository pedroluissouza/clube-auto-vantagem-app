import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const env = import.meta.env as Record<string, string | undefined>;
const supabaseUrl =
  env["VITE_SUPABASE_URL"] ||
  env["VITE_SUPABASE_PROJECT_URL"] ||
  "https://ulbqluwwpmnjtydermnz.supabase.co";

const supabaseAnonKey =
  env["VITE_SUPABASE_ANON_KEY"] ||
  env["VITE_SUPABASE_PROJECT_ANON_KEY"] ||
  "sb_publishable_KGZpq1pMOFJZ285OyKfikw_uujuh63e";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});
