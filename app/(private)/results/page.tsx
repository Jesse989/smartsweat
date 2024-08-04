import { Markdown } from '@/components/Markdown';
import { createClient } from '@/utils/supabase/server';
import { Sheet, Stack, Typography } from '@mui/joy';
import { redirect } from 'next/navigation';

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: { workout_id: string };
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
    .eq('id', searchParams.workout_id);

  if (!data) {
    throw new Error('Workout not found');
  }

  // workout is data[0]
  const workout = data[0];

  console.log(workout);

  return (
    <Stack minHeight="100%" gap={2}>
      <Typography level="title-lg" pt={1}>
        Great job on your workout! Here are your personalized results to help
        you further refine and enhance your exercise routine.
      </Typography>
      <Sheet variant="outlined">
        {/* make the video not overflow */}
        <video
          src="https://ddgaipozxevgcgmsnvba.supabase.co/storage/v1/object/public/videos/downward-dog-2.mp4"
          style={{ width: '100%', height: '200px' }}
          controls
        />
      </Sheet>
      <Stack>
        <Typography level="title-lg" color="primary">
          Exercise
        </Typography>
        <Markdown>{workout.exercise_type}</Markdown>
      </Stack>
      <Stack gap={2}>
        <Stack>
          <Typography level="title-lg" color="primary">
            Issues
          </Typography>
          <Markdown>{workout.issues_with_form ?? 'None'}</Markdown>
        </Stack>

        <Stack>
          <Typography level="title-lg" color="primary">
            Recommendations
          </Typography>
          <Markdown>{workout.recommendations ?? 'None'}</Markdown>
        </Stack>

        <Stack>
          <Typography level="title-lg" color="primary">
            Alternate Excercise
          </Typography>
          <Markdown>{workout.alt_exercise ?? 'None'}</Markdown>
        </Stack>
      </Stack>
    </Stack>
  );
}
