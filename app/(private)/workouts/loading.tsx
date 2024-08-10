import { AspectRatio, Box, Skeleton, Stack } from '@mui/joy';

export default function Loading() {
  return (
    <Stack minHeight="100%" gap={2}>
      <Stack gap={1} alignItems="center">
        <Skeleton variant="rectangular" height="36px" width="50%" />
        <Skeleton variant="rectangular" height="16px" width="80%" />
        <Skeleton variant="rectangular" height="16px" width="30%" />
      </Stack>
      <Box position="relative">
        <AspectRatio ratio={1}>
          <Skeleton variant="rectangular" height="100%" />
        </AspectRatio>
      </Box>
    </Stack>
  );
}
