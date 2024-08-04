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
        Keep the Momentum Going! While Your Video Uploads, Power Up with Some
        Jump Squats! Stay Active and Get Ready for Insights from SmartSweat.
      </Typography>
    </Stack>
  );
}
