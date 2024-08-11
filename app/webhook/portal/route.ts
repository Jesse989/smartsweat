import { createClient } from '@/utils/supabase/functions';
import { NextResponse } from 'next/server';

const WORKOUT_ID_COLUMN = '5104';
const EXERCISE_NAME_COLUMN = 'a250';
const ISSUES_COLUMN = '1fcc';
const ALT_EXERCISE_COLUMN = 'bc26';
const RECOMMENDATIONS_COLUMN = '47a4';

export async function POST(request: Request) {
  const body = await request.json();
  console.log('Received webhook:', body);

  const { data: form, event_type } = body;

  if (event_type === 'forms:updated') {
    const supabase = createClient();

    try {
      const workoutId = form.data[WORKOUT_ID_COLUMN];
      const exerciseName = form.data[EXERCISE_NAME_COLUMN];
      const issues = form.data[ISSUES_COLUMN];
      const altExercise = form.data[ALT_EXERCISE_COLUMN];
      const recommendations = form.data[RECOMMENDATIONS_COLUMN];
      // Save the form data to the database
      const { error } = await supabase
        .from('workouts')
        .update({
          status: 'completed',
          portal_form_id: form.id,
          exercise_type: exerciseName,
          alt_exercise: altExercise,
          recommendations: recommendations,
          issues_with_form: issues,
        })
        .eq('id', workoutId);

      if (error) {
        console.error(error);
        throw new Error('Failed to update workout');
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ status: 'error' });
    }
  }

  return NextResponse.json({ status: 'ok' });
}
