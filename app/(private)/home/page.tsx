import AuthButtonServer from '@/app/(public)/login/auth-button-server';
import NewExerciseButton from '@/components/NewExerciseButton';
import WorkoutStats from '@/components/WorkoutStats';
import { createClient } from '@/utils/supabase/server';
import { AspectRatio, Box, Stack, Typography } from '@mui/joy';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import nightSky from '@/assets/night-sky.png';
import Link from 'next/link';

export default async function HomePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/');
  }
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id);

  if (!data) {
    return redirect('/profile');
  }

  // profile is data[0]
  const profile = data[0];

  if (profile.status !== 'onboarded') {
    return redirect('/profile');
  }

  return (
    <Stack minHeight="100%" gap={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography level="h3">Hi, {profile.name}!</Typography>
        <AuthButtonServer />
      </Stack>
      <WorkoutStats />
      <Link href="/workouts">
        <Box position="relative">
          <AspectRatio ratio={16 / 9} variant="outlined">
            <Image alt="Mountains" src={nightSky} layout="fill" />
          </AspectRatio>
          <Typography
            position="absolute"
            level="h3"
            textAlign="center"
            left="16px"
            bottom="16px">
            Workouts
          </Typography>
        </Box>
      </Link>
      <NewExerciseButton />
    </Stack>
  );
}
