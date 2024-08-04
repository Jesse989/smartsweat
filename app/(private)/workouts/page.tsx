import { createClient } from '@/utils/supabase/server';
import { Add } from '@mui/icons-material';
import { Button, Sheet, Stack, Typography } from '@mui/joy';
import { redirect } from 'next/navigation';

export default async function WorkoutsPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/');
  }

  return (
    <Stack minHeight="100%" gap={2}>
      <Typography level="h3" textAlign="center" py={1}>
        Select a Workout and Let's Get Moving!
      </Typography>
      <Button startDecorator={<Add />}>Upload new exercise</Button>
      <Sheet variant="outlined">
        <Stack
          height="200px"
          justifyContent="flex-end"
          alignItems="flex-start"
          p={2}>
          <Typography level="title-lg">Workout 001</Typography>
        </Stack>
      </Sheet>

      <Sheet variant="outlined">
        <Stack
          height="200px"
          justifyContent="flex-end"
          alignItems="flex-start"
          p={2}>
          <Typography level="title-lg">Workout 002</Typography>
        </Stack>
      </Sheet>

      <Sheet variant="outlined">
        <Stack
          height="200px"
          justifyContent="flex-end"
          alignItems="flex-start"
          p={2}>
          <Typography level="title-lg">Workout 003</Typography>
        </Stack>
      </Sheet>
    </Stack>
  );
}
