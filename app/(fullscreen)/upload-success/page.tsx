import { createClient } from '@/utils/supabase/server';
import { CheckCircle } from '@mui/icons-material';
import { Stack, Typography } from '@mui/joy';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function UploadSuccessPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/');
  }

  return (
    <Stack
      justifyContent="center"
      height="100%"
      gap={6}
      alignItems="center"
      margin={4}>
      <CheckCircle sx={{ fontSize: '56px' }} color="primary" />
      <Typography textAlign="center">
        Exciting news awaits! Your results are in and can be viewed in the 'My
        Workouts' page. Keep up the great work!
      </Typography>
      <Link href="/results/1">View results</Link>
    </Stack>
  );
}
