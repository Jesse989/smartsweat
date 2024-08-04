'use client';

import { Stack, useColorScheme, useTheme } from '@mui/joy';
import { YogaIcon } from './YogaIcon';
import { SmartSweatIcon } from './SmartSweatIcon';

export default function Logo() {
  const { mode } = useColorScheme();
  const theme = useTheme();

  const logoColor =
    mode === 'light' ? theme.palette.common.black : theme.palette.common.white;

  return (
    <Stack direction="row" alignItems="center" height="26px">
      <SmartSweatIcon sx={{ width: '128px', color: logoColor }} />
      <YogaIcon sx={{ fontSize: '50px', mt: -0.6, ml: -1.8 }} />
    </Stack>
  );
}
