'use client';

import { AccountCircle, Favorite, Home } from '@mui/icons-material';
import { Stack, Typography } from '@mui/joy';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        p: 2,
        px: 4,
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.surface',
      }}>
      <Link href="/home">
        <Stack justifyContent="center" alignItems="center" width="60px">
          <Home
            sx={{ fontSize: '32px' }}
            color={pathname.includes('home') ? 'primary' : 'action'}
          />
          <Typography level="body-xs">Home</Typography>
        </Stack>
      </Link>
      <Link href="/workouts">
        <Stack justifyContent="center" alignItems="center" width="60px">
          <Favorite
            sx={{ fontSize: '32px' }}
            color={pathname.includes('workouts') ? 'primary' : 'action'}
          />
          <Typography level="body-xs">Workouts</Typography>
        </Stack>
      </Link>
      <Link href="/profile">
        <Stack justifyContent="center" alignItems="center" width="60px">
          <AccountCircle
            sx={{ fontSize: '32px' }}
            color={pathname.includes('profile') ? 'primary' : 'action'}
          />
          <Typography level="body-xs">My Profile</Typography>
        </Stack>
      </Link>
    </Stack>
  );
}
