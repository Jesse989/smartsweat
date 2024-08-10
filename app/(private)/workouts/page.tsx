import { createClient } from '@/utils/supabase/server';
import { AspectRatio, Card, CardOverflow, Stack, Typography } from '@mui/joy';
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
    <>
      <Stack minHeight="100%" gap={2}>
        <Stack py={1}>
          <Typography level="h3" textAlign="center">
            Let's Get Moving!
          </Typography>
          <Typography level="body-md" textAlign="center">
            Upload a new exercise or choose one from your history below.
          </Typography>
        </Stack>
        {workouts?.map((workout: any) => (
          <Card key={workout.id}>
            <CardOverflow>
              <AspectRatio ratio={1} objectFit="contain">
                <video
                  height="100%"
                  width="100%"
                  src={workout.video_url}
                  controls
                  title={workout.exercise_type}
                />
              </AspectRatio>
            </CardOverflow>
            <Stack>
              <Link href={`/results/${workout.id}`}>
                <Typography level="title-md">{workout.id}</Typography>
              </Link>
              <Typography level="body-sm">
                {new Date(workout.created_at).toLocaleString()}
              </Typography>
            </Stack>
          </Card>
        ))}
      </Stack>
    </>
  );
}
