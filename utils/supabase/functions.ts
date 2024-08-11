import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export const createClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  return createSupabaseClient(supabaseUrl, supabaseKey);
};
