import { SubmitButton } from '@/components/SubmitButton';
import { createClient } from '@/utils/supabase/server';
import { Box, Button, FormControl, Input, Stack, Typography } from '@mui/joy';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/');
  }

  const updateProfile = async (formData: FormData) => {
    'use server';

    const name = formData.get('name') as string;
    const age = formData.get('age') as string;
    const weight = formData.get('weight') as string;
    const height = formData.get('height') as string;
    const sex = formData.get('sex') as string;
    const fitness_level = formData.get('fitness_level') as string;
    const fitness_goal = formData.get('fitness_goal') as string;

    const supabase = createClient();

    const { data, error } = await supabase
      .from('profiles')
      .update({
        name,
        status: 'onboarded',
        age: Number(age),
        weight: Number(weight),
        height: Number(height),
        sex,
        fitness_level,
        fitness_goal,
      })
      .eq('id', user.id)
      .select();

    if (error) {
      console.error('Error updating profile:', error);
      return redirect('/profile?message=Could not update profile');
    }

    console.log('Profile updated', data);

    return redirect('/home');
  };

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
              <Input type="text" name="name" placeholder="Name" required />
            </FormControl>
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
                name="fitness_level"
                placeholder="Fitness level"
                required
              />
            </FormControl>
            <FormControl>
              <Input
                type="text"
                name="fitness_goal"
                placeholder="Fitness goal"
                required
              />
            </FormControl>
          </Stack>
        </Stack>
        <Stack gap={1} flex={0}>
          {searchParams?.message && <p>{searchParams.message}</p>}
          <SubmitButton formAction={updateProfile} pendingText="Signing Up...">
            Let's Go!
          </SubmitButton>
          <Link href="/home">
            <Button fullWidth variant="outlined" color="neutral">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
}
