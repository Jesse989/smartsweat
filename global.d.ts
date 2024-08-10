import { Tables } from '@/types/supabase';

declare global {
  type Workout = Tables<'workouts'>;
  type Profile = Tables<'profiles'>;
}
