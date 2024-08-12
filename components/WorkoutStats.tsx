import { Sheet, Stack, Typography } from '@mui/joy';

export default async function WorkoutStats({
  totalWorkouts,
  currentStreak,
}: {
  totalWorkouts: number;
  currentStreak: number;
}) {
  return (
    <Stack direction="row" gap={2} justifyContent="space-between">
      <Sheet variant="outlined" sx={{ width: '100%', borderRadius: 'md' }}>
        <Stack p={2}>
          <Typography>Current streak</Typography>
          <Typography level="h2">{currentStreak} days</Typography>
        </Stack>
      </Sheet>
      <Sheet variant="outlined" sx={{ width: '100%', borderRadius: 'md' }}>
        <Stack p={2}>
          <Typography>Total workouts</Typography>
          <Typography level="h2">{totalWorkouts}</Typography>
        </Stack>
      </Sheet>
    </Stack>
  );
}
