import { Button, Stack, Typography } from '@mui/joy';
import landingBg from '@/assets/landing-bg.png';
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
            'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 100%)',
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
          <Button component={Link} href="/login" fullWidth>
            Login
          </Button>
          <Button component={Link} href="/signup" fullWidth variant="outlined">
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
