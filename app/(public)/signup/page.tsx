import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from '@/components/SubmitButton';
import { Box, Button, FormControl, Input, Stack, Typography } from '@mui/joy';
import Link from 'next/link';

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

    console.log('origin', origin);
    console.log('email', email);
    console.log('password', password);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
      return redirect('/signup?message=Could not authenticate user');
    }

    return redirect('/email');
  };

  return (
    <Stack
      component="form"
      height="100%"
      bgcolor="background.surface"
      p={2}
      justifyContent="space-between">
      <Stack>
        <Box p={4}>
          <Typography level="title-lg" textAlign="center">
            Get Ready to Ignite Your Fitness Spark! Sign Up to SmartSweat and
            Transform Your Workout Routine Today!
          </Typography>
        </Box>
        <Stack gap={2}>
          <FormControl>
            <Input name="email" placeholder="Email" required />
          </FormControl>
          <FormControl>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </FormControl>
        </Stack>
      </Stack>
      <Stack gap={2} flex={0}>
        {searchParams?.message && <p>{searchParams.message}</p>}
        <SubmitButton formAction={signUp} pendingText="Signing Up...">
          Sign Up
        </SubmitButton>
        <Link href="/">
          <Button fullWidth variant="outlined" color="neutral">
            Cancel
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
}
