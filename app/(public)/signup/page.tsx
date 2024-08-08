import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from '@/components/SubmitButton';
import { Box, Button, FormControl, Input, Stack, Typography } from '@mui/joy';
import Link from 'next/link';
import { InfoOutlined } from '@mui/icons-material';

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
      return redirect(`/signup?message=${error.message}`);
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
        <Stack p={3} gap={0.5}>
          <Typography level="title-lg" textAlign="center">
            Ignite Your Fitness Spark!
          </Typography>
          <Typography
            level="body-md"
            textAlign="center"
            textColor="text.secondary">
            Sign up to SmartSweat and transform your workout routine today!
          </Typography>
        </Stack>
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

          {searchParams?.message && (
            <Typography startDecorator={<InfoOutlined />} color="danger">
              {searchParams.message}
            </Typography>
          )}
        </Stack>
      </Stack>
      <Stack gap={2} flex={0}>
        <SubmitButton formAction={signUp} pendingText="Signing Up...">
          Sign Up
        </SubmitButton>
        <Button
          component={Link}
          href="/"
          fullWidth
          variant="outlined"
          color="neutral">
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
}
