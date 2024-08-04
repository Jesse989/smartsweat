import { SubmitButton } from '@/components/SubmitButton';
import { createClient } from '@/utils/supabase/server';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
} from '@mui/joy';
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
      height="100%"
      bgcolor="background.surface"
      p={2}
      justifyContent="space-between">
      <Stack gap={4}>
        <Box px={4} py={5}>
          <Typography level="h4" textAlign="center">
            Shape Your Fitness Journey! Create Your SmartSweat Profile to Tailor
            Your Pathway to Peak Health!
          </Typography>
        </Box>
        <Stack gap={2}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input name="email" placeholder="you@example.com" required />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="age">Age</FormLabel>
            <Input type="number" name="age" placeholder="42" required />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="weight">Weight</FormLabel>
            <Input type="number" name="weight" placeholder="155" required />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="height">Height</FormLabel>
            <Input type="number" name="height" placeholder='72"' required />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="sex">Sex</FormLabel>
            <Input type="text" name="sex" placeholder="male" required />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="fitness">Fitness level</FormLabel>
            <Input type="text" name="fitness" placeholder="Inactive" required />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="goal">Fitness goal</FormLabel>
            <Input
              type="text"
              name="goal"
              placeholder="Lean muscle mass"
              required
            />
          </FormControl>
        </Stack>
      </Stack>
      <Stack gap={2} flex={0}>
        <SubmitButton formAction={updateProfile} pendingText="Signing Up...">
          Let's Go!
        </SubmitButton>
        {searchParams?.message && <p>{searchParams.message}</p>}
      </Stack>
    </Stack>
  );
}
