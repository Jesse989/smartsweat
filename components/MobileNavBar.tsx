'use client';

import { AccountCircle, Favorite, Home } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/joy';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <Box position={{ xs: 'fixed', sm: 'sticky' }} bottom={0} left={0} right={0}>
      <Stack
        height="84px"
        direction="row"
        justifyContent="space-between"
        sx={{
          p: 2,
          px: 4,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.surface',
        }}>
        <IconButton component={Link} href="/home">
          <Stack justifyContent="center" alignItems="center" width="60px">
            <Home
              sx={{ fontSize: '32px' }}
              color={pathname.includes('home') ? 'primary' : 'action'}
            />
            <Typography level="body-xs">Home</Typography>
          </Stack>
        </IconButton>
        <IconButton component={Link} href="/workouts">
          <Stack justifyContent="center" alignItems="center" width="60px">
            <Favorite
              sx={{ fontSize: '32px' }}
              color={pathname.includes('workouts') ? 'primary' : 'action'}
            />
            <Typography level="body-xs">Workouts</Typography>
          </Stack>
        </IconButton>
        <IconButton component={Link} href="/profile">
          <Stack justifyContent="center" alignItems="center" width="60px">
            <AccountCircle
              sx={{ fontSize: '32px' }}
              color={pathname.includes('profile') ? 'primary' : 'action'}
            />
            <Typography level="body-xs">My Profile</Typography>
          </Stack>
        </IconButton>
      </Stack>
    </Box>
  );
}
