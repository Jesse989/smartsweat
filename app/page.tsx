import { Button, Stack, Typography } from '@mui/joy';
import landingBg from './landing-bg.png';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function LandingPage() {
  return (
    <>
      <Image
        src={landingBg}
        style={{ objectFit: 'cover' }}
        fill
        alt="woman working out"
      />
      <Stack
        zIndex={1}
        justifyContent="space-between"
        gap={12}
        minHeight="100%"
        p={2}
        sx={{
          background:
            'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 80%)',
        }}>
        <Stack flex={1} justifyContent="center" alignItems="center" gap={2}>
          <Logo />
          <Typography
            level="h3"
            fontWeight={400}
            textAlign="center"
            textColor="text.secondary">
            Revolutionize Your Fitness Journey with AI-Powered Workouts for a
            Healthier, Smarter You!
          </Typography>
        </Stack>
        <Stack gap={2} flex={0}>
          <Link href="/login" passHref>
            <Button fullWidth>Login</Button>
          </Link>
          <Link href="/signup" passHref>
            <Button variant="outlined" fullWidth>
              Sign Up
            </Button>
          </Link>
        </Stack>
      </Stack>
    </>
  );
}
