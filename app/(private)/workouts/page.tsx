import NewExerciseButton from '@/components/NewExerciseButton';
import { createClient } from '@/utils/supabase/server';
import { Add } from '@mui/icons-material';
import { AspectRatio, Button, Sheet, Stack, Typography } from '@mui/joy';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function WorkoutsPage() {
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
    .eq('user_id', user.id);

  if (!data) {
    throw new Error('Workouts not found');
  }

  const workouts = data;

  return (
    <Stack minHeight="100%" gap={2}>
      <Typography level="h3" textAlign="center" py={1}>
        Select a Workout and Let's Get Moving!
      </Typography>
      <NewExerciseButton />
      {workouts?.map((workout: any) => (
        <Stack key={workout.id} gap={1}>
          <Sheet variant="outlined">
            <AspectRatio ratio={16 / 9} objectFit="contain">
              <video
                height="100%"
                width="100%"
                src={workout.video_url}
                controls
                title={workout.exercise_type}
              />
            </AspectRatio>
          </Sheet>
          <Stack>
            <Link href={`/results/${workout.id}`}>
              <Typography level="title-md">{workout.exercise_type}</Typography>
            </Link>
            <Typography level="body-sm">
              {new Date(workout.created_at).toLocaleString()}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
