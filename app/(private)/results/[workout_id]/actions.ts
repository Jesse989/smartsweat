'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const deleteWorkout = async (workout: Workout) => {
  const supabase = createClient();

  const { error: deleteWorkoutError } = await supabase
    .from('workouts')
    .delete()
    .eq('id', workout.id);

  if (deleteWorkoutError) {
    throw new Error(deleteWorkoutError.message);
  }

  const fileName = workout.video_url?.split('/').pop() ?? '';

  const { error: deleteVideoError } = await supabase.storage
    .from('videos')
    .remove([`${workout.user_id}/${fileName}`]);

  if (deleteVideoError) {
    throw new Error(deleteVideoError.message);
  }

  revalidatePath('/workouts');
  return redirect('/workouts');
};
