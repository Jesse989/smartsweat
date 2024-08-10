import { Sheet, Stack, Typography } from '@mui/joy';

export default async function WorkoutStats() {
  return (
    <Stack direction="row" gap={2} justifyContent="space-between">
      <Sheet variant="outlined" sx={{ width: '100%', borderRadius: 'md' }}>
        <Stack p={2}>
          <Typography>Current streak</Typography>
          <Typography level="h2">24 days</Typography>
        </Stack>
      </Sheet>
      <Sheet variant="outlined" sx={{ width: '100%', borderRadius: 'md' }}>
        <Stack p={2}>
          <Typography>Total workouts</Typography>
          <Typography level="h2">124</Typography>
        </Stack>
      </Sheet>
    </Stack>
  );
}
