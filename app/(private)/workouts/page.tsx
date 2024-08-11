import VideoCard from '@/components/VideoCard';
import { createClient } from '@/utils/supabase/server';
import { Stack, Typography } from '@mui/joy';
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
    .order('created_at', { ascending: false })
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
        {workouts?.map((workout: Workout) => (
          <VideoCard key={workout.id} workout={workout} />
        ))}
      </Stack>
    </>
  );
}
