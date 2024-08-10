import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import ExerciseResults from './ExerciseResults';

export default async function ResultsPage({
  params,
}: {
  params: { workout_id: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/');
  }

  const { data } = await supabase
    .from('workouts')
    .select('*')
    .eq('id', params.workout_id);

  if (!data) {
    throw new Error('Workout not found');
  }

  // workout is data[0]
  const workout = data[0];

  return <ExerciseResults workout={workout} />;
}
