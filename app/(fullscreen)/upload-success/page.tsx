import { createClient } from '@/utils/supabase/server';
import { CheckCircle } from '@mui/icons-material';
import { CircularProgress, Stack, Typography } from '@mui/joy';
import { redirect } from 'next/navigation';

export default async function UploadSuccessPage() {
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
      <CheckCircle sx={{ fontSize: '56px' }} color="primary" />
      <Typography textAlign="center">
        Exciting News Awaits, Your Results Are In! Dash Over to 'My Workouts'
        Page to Uncover Personalized Insights and Tips.
      </Typography>
    </Stack>
  );
}
