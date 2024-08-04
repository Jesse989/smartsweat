'use client';
import { createClient } from '@/utils/supabase/client';
import { CircularProgress, Stack, Typography } from '@mui/joy';
import { redirect, useRouter } from 'next/navigation';

export default async function UploadLoadingPage() {
  const supabase = createClient();
  const router = useRouter();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/');
  }

  // Redirect to 'upload-success' after 5 seconds
  setTimeout(() => {
    router.push('/upload-success');
  }, 5000);

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
