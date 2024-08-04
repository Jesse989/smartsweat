import { SubmitButton } from '@/components/SubmitButton';
import { createClient } from '@/utils/supabase/server';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
} from '@mui/joy';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const updateProfile = async (formData: FormData) => {
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

    return redirect('/protected');
  };
  const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect('/');
  // }

  return (
    <Stack
      component="form"
      minHeight="100%"
      bgcolor="background.surface"
      p={2}
      justifyContent="space-between">
      <Stack justifyContent="space-between" height="100%">
        <Stack gap={1}>
          <Box px={4} py={4}>
            <Typography level="title-lg" textAlign="center" fontWeight={500}>
              Shape Your Fitness Journey: Create Your SmartSweat Profile to
              Tailor Your Pathway to Peak Health!
            </Typography>
          </Box>
          <Stack gap={2}>
            <FormControl>
              <Input type="number" name="age" placeholder="Age" required />
            </FormControl>
            <FormControl>
              <Input
                type="number"
                name="weight"
                placeholder="Weight"
                required
              />
            </FormControl>
            <FormControl>
              <Input
                type="number"
                name="height"
                placeholder="Height"
                required
              />
            </FormControl>
            <FormControl>
              <Input type="text" name="sex" placeholder="Sex" required />
            </FormControl>
            <FormControl>
              <Input
                type="text"
                name="fitness"
                placeholder="Fitness level"
                required
              />
            </FormControl>
            <FormControl>
              <Input
                type="text"
                name="goal"
                placeholder="Fitness goal"
                required
              />
            </FormControl>
          </Stack>
        </Stack>
        <Stack gap={1} flex={0}>
          <SubmitButton formAction={updateProfile} pendingText="Signing Up...">
            Let's Go!
          </SubmitButton>
          <Link href="/home">
            <Button fullWidth variant="outlined" color="neutral">
              Cancel
            </Button>
          </Link>
          {searchParams?.message && <p>{searchParams.message}</p>}
        </Stack>
      </Stack>
    </Stack>
  );
}
