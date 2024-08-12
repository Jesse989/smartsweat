'use client';

import { getStatusText } from '@/utils/uploads';
import {
  AspectRatio,
  Box,
  Card,
  CardOverflow,
  Stack,
  Typography,
} from '@mui/joy';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import WorkoutMenu from './WorkoutMenu';

export default function WorkoutCard({
  workout,
  deleteWorkout,
}: {
  workout: Workout;
  deleteWorkout: (workout: Workout) => void;
}) {
  const router = useRouter();

  const statusText = getStatusText(workout.status);

  const handleClick = () => {
    router.push(`/results/${workout.id}`);
  };

  return (
    <Card sx={{ bgcolor: '#000', position: 'relative', p: 0 }}>
      <CardOverflow sx={{ borderRadius: 'md', overflow: 'hidden' }}>
        <AspectRatio ratio={1} objectFit="cover" onClick={handleClick}>
          <video height="100%" width="100%" src={workout.video_url ?? ''} />
        </AspectRatio>
      </CardOverflow>
      <Box sx={{ p: 2 }} />
      <Stack
        position="absolute"
        sx={{
          bottom: 0,
          right: 0,
          left: 0,
          borderRadius: '0 0 8px 8px',
          p: 2,
          pt: 8,
          background:
            'linear-gradient(to top, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)',
        }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography
            href={`/results/${workout.id}`}
            component={Link}
            level="title-lg">
            {statusText}
          </Typography>
          <WorkoutMenu workout={workout} deleteWorkout={deleteWorkout} />
        </Stack>

        <Typography level="body-md">
          {new Date(workout.created_at).toLocaleString()}
        </Typography>
      </Stack>
    </Card>
  );
}
