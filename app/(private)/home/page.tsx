import { createClient } from '@/utils/supabase/server';
import { Add } from '@mui/icons-material';
import { AspectRatio, Button, Sheet, Stack, Typography } from '@mui/joy';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect('/');
  // }

  return (
    <Stack minHeight="100%" gap={2}>
      <Typography level="h2">Welcome!</Typography>
      <Stack direction="row" gap={2} justifyContent="space-between">
        <Sheet variant="outlined" sx={{ width: '100%' }}>
          <Stack p={2}>
            <Typography>Current streak</Typography>
            <Typography level="h2">24</Typography>
          </Stack>
        </Sheet>
        <Sheet variant="outlined" sx={{ width: '100%' }}>
          <Stack p={2}>
            <Typography>Total workouts</Typography>
            <Typography level="h2">124</Typography>
          </Stack>
        </Sheet>
      </Stack>
      <Sheet variant="outlined">
        <Stack
          height="200px"
          justifyContent="flex-end"
          alignItems="flex-start"
          p={2}>
          <Typography level="title-lg">Workouts</Typography>
        </Stack>
      </Sheet>
      <Button startDecorator={<Add />}>Upload new exercise</Button>
    </Stack>
  );
}
