import AuthButtonServer from '@/app/(public)/login/auth-button-server';
import WorkoutStats from '@/components/WorkoutStats';
import { createClient } from '@/utils/supabase/server';
import { AspectRatio, Box, Stack, Typography } from '@mui/joy';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import landingBg from '@/assets/landing-bg.png';
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

  const { count } = await supabase
    .from('workouts')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  return (
    <Stack minHeight="100%" gap={2} position="relative">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="baseline">
        <Typography level="h3">Hi, {profile.name}</Typography>
        <AuthButtonServer />
      </Stack>
      <WorkoutStats currentStreak={0} totalWorkouts={count ?? 0} />
      <Link href="/workouts">
        <Box position="relative">
          <AspectRatio ratio={1} variant="outlined" sx={{ borderRadius: 'md' }}>
            <Image
              style={{ objectFit: 'cover' }}
              alt="Mountains"
              priority
              src={landingBg}
            />
          </AspectRatio>
          <Typography
            position="absolute"
            level="h3"
            textAlign="center"
            left="16px"
            bottom="16px">
            My workouts
          </Typography>
        </Box>
      </Link>
    </Stack>
  );
}
