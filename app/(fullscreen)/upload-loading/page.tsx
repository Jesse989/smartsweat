import { createClient } from '@/utils/supabase/server';
import { CircularProgress, Stack, Typography } from '@mui/joy';
import { redirect } from 'next/navigation';

export default async function UploadLoadingPage() {
  const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect('/');
  // }

  return (
    <Stack
      justifyContent="center"
      height="100%"
      gap={6}
      alignItems="center"
      margin={4}>
      <CircularProgress size="lg" />
      <Typography textAlign="center">
        Keep the momentum going! While your video uploads, power up with some
        jump squats! Stay active and get ready for insights from SmartSweat.
      </Typography>
    </Stack>
  );
}
