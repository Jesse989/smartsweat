import { createClient } from '@/utils/supabase/server';
import { Box, Button, Stack, Typography } from '@mui/joy';
import { redirect } from 'next/navigation';

export default async function LandingPage() {
  const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect('/');
  // }

  return (
    <Stack
      justifyContent="space-between"
      minHeight="100%"
      p={2}
      gap={8}
      bgcolor="common.black">
      <Stack flex={1} justifyContent="center">
        <Typography level="h2" textAlign="center" textColor="common.white">
          Revolutionize Your Fitness Journey with AI-Powered Workouts for a
          Healthier, Smarter You!
        </Typography>
      </Stack>
      <Stack gap={3} flex={0}>
        <Button>Login</Button>
        <Button variant="outlined">Sign Up</Button>
      </Stack>
    </Stack>
  );
}
