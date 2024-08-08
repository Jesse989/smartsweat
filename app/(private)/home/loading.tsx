import { AspectRatio, Box, Skeleton, Stack } from '@mui/joy';

export default function Loading() {
  return (
    <Stack minHeight="100%" gap={2}>
      <Skeleton height="36px" width="240px" />
      <Skeleton variant="rectangular" height="100px" width="100%" />
      <Box position="relative">
        <AspectRatio ratio={16 / 9}>
          <Skeleton variant="rectangular" height="100%" />
        </AspectRatio>
      </Box>
    </Stack>
  );
}
