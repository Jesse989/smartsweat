import { AspectRatio, Box, Skeleton, Stack } from '@mui/joy';
import Link from 'next/link';

export default function Loading() {
  return (
    <Stack minHeight="100%" gap={2}>
      <Skeleton height="36px" width="240px" />
      <Skeleton variant="rectangular" height="100px" width="100%" />
      <Link href="/workouts">
        <Box position="relative">
          <AspectRatio ratio={16 / 9}>
            <Skeleton variant="rectangular" height="100%" />
          </AspectRatio>
        </Box>
      </Link>
      <Skeleton variant="rectangular" height="36px" />
    </Stack>
  );
}
