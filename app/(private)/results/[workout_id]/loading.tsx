import { Skeleton, Stack } from '@mui/joy';

export default function Loading() {
  return (
    <Stack minHeight="100%" gap={2}>
      <Skeleton variant="rectangular" height="36px" width="120px" />
      <Stack>
        <Skeleton variant="rectangular" height="32px" />
        <Skeleton variant="rectangular" height="22px" />
        <Skeleton variant="rectangular" height="22px" />
      </Stack>
      <Skeleton variant="rectangular" height="380px" />
    </Stack>
  );
}
