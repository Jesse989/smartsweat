import { createClient } from '@/utils/supabase/server';
import { Stack } from '@mui/joy';
import { redirect } from 'next/navigation';

export default async function UploadLoadingPage() {
  const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect('/');
  // }

  return <Stack>Upload Loading</Stack>;
}
