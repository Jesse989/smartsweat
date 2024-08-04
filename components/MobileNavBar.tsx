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
      justifyContent="space-around"
      sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
      <Link href="/home">
        <Stack justifyContent="center" alignItems="center" width="60px">
          <Home
            sx={{ fontSize: '32px' }}
            color={pathname.includes('home') ? 'primary' : 'action'}
          />
          <Typography
            level="body-xs"
            color={pathname.includes('home') ? 'primary' : 'neutral'}>
            Home
          </Typography>
        </Stack>
      </Link>
      <Link href="/upload">
        <Stack justifyContent="center" alignItems="center" width="60px">
          <Favorite
            sx={{ fontSize: '32px' }}
            color={pathname.includes('upload') ? 'primary' : 'action'}
          />
          <Typography
            level="body-xs"
            color={pathname.includes('upload') ? 'primary' : 'neutral'}>
            Workout
          </Typography>
        </Stack>
      </Link>
      <Link href="/profile">
        <Stack justifyContent="center" alignItems="center" width="60px">
          <AccountCircle
            sx={{ fontSize: '32px' }}
            color={pathname.includes('profile') ? 'primary' : 'action'}
          />
          <Typography
            level="body-xs"
            color={pathname.includes('profile') ? 'primary' : 'neutral'}>
            My Profile
          </Typography>
        </Stack>
      </Link>
    </Stack>
  );
}
