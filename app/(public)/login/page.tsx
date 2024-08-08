import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from '@/components/SubmitButton';
import {
  Button,
  Divider,
  FormControl,
  Input,
  Stack,
  Typography,
} from '@mui/joy';
import Link from 'next/link';
import AuthButtonServer from './auth-button-server';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/home');
  };

  return (
    <Stack
      component="form"
      height="100%"
      bgcolor="background.surface"
      p={2}
      justifyContent="space-between">
      <Stack gap={4}>
        <Stack p={4} gap={0.5}>
          <Typography level="title-lg" textAlign="center">
            Ignite Your Fitness Spark!
          </Typography>
          <Typography level="body-md" textAlign="center">
            Login to SmartSweat and transform your workout routine today!
          </Typography>
        </Stack>
        <AuthButtonServer />
        <Divider>or</Divider>

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
        <SubmitButton formAction={signIn} pendingText="Signing In...">
          Login
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
