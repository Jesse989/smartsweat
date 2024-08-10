'use client';

import { Button, Stack } from '@mui/joy';

export default function Actions({
  primaryText,
  onPrimary,
  onCancel,
}: {
  primaryText: string;
  onPrimary: () => void;
  onCancel: () => void;
}) {
  return (
    <Stack gap={1}>
      <Button onClick={onPrimary} fullWidth>
        {primaryText}
      </Button>

      <Button onClick={onCancel} variant="outlined" color="neutral" fullWidth>
        Cancel
      </Button>
    </Stack>
  );
}
