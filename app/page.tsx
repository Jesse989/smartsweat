import { Button, Stack, Typography } from '@mui/joy';
import landingBg from './landing-bg.png';
import Image from 'next/image';
import Link from 'next/link';

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
        justifyContent="space-around"
        minHeight="100%"
        p={2}
        bgcolor="rgba(0, 0, 0, 0.8)">
        <Stack flex={1} justifyContent="center" px={2}>
          <Typography
            level="h3"
            fontWeight={400}
            textAlign="center"
            textColor="common.white">
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
