import { Markdown } from '@/components/Markdown';
import { createClient } from '@/utils/supabase/server';
import { AspectRatio, Sheet, Stack, Typography } from '@mui/joy';
import { redirect } from 'next/navigation';

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

  return (
    <Stack minHeight="100%" gap={2}>
      <Typography level="h3">Workout Results</Typography>
      <Sheet variant="outlined">
        <AspectRatio ratio={16 / 9} objectFit="contain">
          <video
            height="100%"
            width="100%"
            src={workout.video_url ?? ''}
            controls
            title={workout.exercise_type}
          />
        </AspectRatio>
      </Sheet>
      <Typography level="body-md">
        Great job on your workout! Here are your personalized results to help
        you further refine and enhance your exercise routine.
      </Typography>
      <Stack>
        <Typography level="title-lg" color="primary">
          Exercise Name
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
