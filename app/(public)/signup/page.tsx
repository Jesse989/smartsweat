import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from '@/components/SubmitButton';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
} from '@mui/joy';

export default function SignUp({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (formData: FormData) => {
    'use server';

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/login?message=Check email to continue sign in process');
  };

  return (
    <Stack
      component="form"
      height="100%"
      bgcolor="background.surface"
      p={2}
      justifyContent="space-between">
      <Stack gap={10} py={10}>
        <Box p={4}>
          <Typography level="h3" textAlign="center">
            Get Ready to Ignite Your Fitness Spark! Sign Up to SmartSweat and
            Transform Your Workout Routine Today!
          </Typography>
        </Box>
        <Stack gap={2}>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input name="name" placeholder="Your name" required />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input name="email" placeholder="you@example.com" required />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </FormControl>
        </Stack>
      </Stack>
      <Stack gap={2} flex={0}>
        <SubmitButton formAction={signUp} pendingText="Signing Up...">
          Sign Up
        </SubmitButton>
        {searchParams?.message && <p>{searchParams.message}</p>}
      </Stack>
    </Stack>
  );
}
