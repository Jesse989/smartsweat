import { createClient } from '@/utils/supabase/functions';

const WORKOUT_ID_COLUMN = '5104';
const EXERCISE_NAME_COLUMN = 'a250';
const ISSUES_COLUMN = '1fcc';
const ALT_EXERCISE_COLUMN = 'bc26';
const RECOMMENDATIONS_COLUMN = '47a4';

export async function POST(request: Request) {
  const body = await request.json();

  const { data: form, event_type } = body;

  if (event_type === 'forms:updated') {
    const supabase = createClient();

    try {
      const {
        [WORKOUT_ID_COLUMN]: workoutId,
        [EXERCISE_NAME_COLUMN]: exerciseName,
        [ISSUES_COLUMN]: issues,
        [ALT_EXERCISE_COLUMN]: altExercise,
        [RECOMMENDATIONS_COLUMN]: recommendations,
      } = form.data;

      // If any are null then return early
      if (
        !workoutId ||
        !exerciseName ||
        !issues ||
        !altExercise ||
        !recommendations
      ) {
        return Response.json({ message: 'incomplete form' });
      }

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
      return Response.json({ message: 'error' }, { status: 500 });
    }
  }

  return Response.json({ message: 'ok' });
}
