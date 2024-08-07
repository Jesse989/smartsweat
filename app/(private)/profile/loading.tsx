import { Skeleton, Stack } from '@mui/joy';

export default function Loading() {
  return (
    <Stack minHeight="100%" bgcolor="background.surface" gap={3}>
      <Stack alignItems="center" gap={0.5} py={1}>
        <Skeleton variant="rectangular" height="36px" width="340px" />
        <Skeleton variant="rectangular" height="36px" width="100%" />
      </Stack>
      <Stack gap={2}>
        <Skeleton variant="rectangular" width="100%" height="34px" />
        <Skeleton variant="rectangular" width="100%" height="34px" />
        <Skeleton variant="rectangular" width="100%" height="34px" />
        <Skeleton variant="rectangular" width="100%" height="34px" />
        <Skeleton variant="rectangular" width="100%" height="34px" />
        <Skeleton variant="rectangular" width="100%" height="34px" />
        <Skeleton variant="rectangular" width="100%" height="34px" />
        <Skeleton variant="rectangular" height="36px" />
      </Stack>
    </Stack>
  );
}
