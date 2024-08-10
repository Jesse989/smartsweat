import { Markdown } from '@/components/Markdown';
import { createClient } from '@/utils/supabase/server';
import { Circle } from '@mui/icons-material';
import { AspectRatio, Box, Sheet, Stack, Typography } from '@mui/joy';
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

  const getHeaderText = () => {
    switch (workout.status) {
      case 'indexing':
        return "We're hard at work analyzing your exercise video. Please check back later for your personalized results.";
      case 'complete':
        return 'Great job on your workout! Here are your personalized results to help you further refine and enhance your exercise routine.';
      default:
        return 'Unknown status';
    }
  };

  const headerText = getHeaderText();

  return (
    <Stack minHeight="100%" gap={2}>
      <Stack>
        <Typography level="h3">Your Exercise Results</Typography>
        <Typography level="body-md">{headerText}</Typography>
      </Stack>
      <Sheet variant="outlined" sx={{ borderRadius: 'md', overflow: 'hidden' }}>
        <AspectRatio ratio={1} objectFit="contain">
          <video
            height="100%"
            width="100%"
            src={workout.video_url ?? ''}
            controls
          />
        </AspectRatio>
      </Sheet>
      {workout.status === 'indexing' && (
        <Typography startDecorator={<Circle color="warning" />} level="body-md">
          Analyzing video...
        </Typography>
      )}
      {workout.status === 'completed' && (
        <Box>
          <Stack gap={0.5}>
            <Typography level="title-lg" color="primary">
              Exercise Name
            </Typography>
            <Markdown>{workout.exercise_type ?? 'None'}</Markdown>
          </Stack>
          <Stack gap={2}>
            <Stack gap={0.5}>
              <Typography level="title-lg" color="primary">
                Issues
              </Typography>
              <Markdown>{workout.issues_with_form ?? 'None'}</Markdown>
            </Stack>

            <Stack gap={0.5}>
              <Typography level="title-lg" color="primary">
                Recommendations
              </Typography>
              <Markdown>{workout.recommendations ?? 'None'}</Markdown>
            </Stack>

            <Stack gap={0.5}>
              <Typography level="title-lg" color="primary">
                Alternate Excercise
              </Typography>
              <Markdown>{workout.alt_exercise ?? 'None'}</Markdown>
            </Stack>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
