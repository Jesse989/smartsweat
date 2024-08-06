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

  const { data } = await supabase.from('profiles').select().eq('id', user.id);

  if (!data) {
    throw new Error('Profile not found');
  }

  const profile = data[0];

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
            <Typography level="title-lg" textAlign="center">
              Shape Your Fitness Journey
            </Typography>
            <Typography level="body-md" color="neutral" textAlign="center">
              Create your SmartSweat profile to tailor your pathway to peak
              health!
            </Typography>
          </Box>
          <Stack gap={2}>
            <FormControl>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                required
                defaultValue={profile.name ?? ''}
              />
            </FormControl>
            <FormControl>
              <Input
                type="number"
                name="age"
                placeholder="Age"
                required
                defaultValue={profile.age ?? 0}
              />
            </FormControl>
            <FormControl>
              <Input
                type="number"
                name="weight"
                placeholder="Weight"
                required
                defaultValue={profile.weight ?? 0}
              />
            </FormControl>
            <FormControl>
              <Input
                type="number"
                name="height"
                placeholder="Height"
                required
                defaultValue={profile.height ?? 0}
              />
            </FormControl>
            <FormControl>
              <Input
                type="text"
                name="sex"
                placeholder="Sex"
                required
                defaultValue={profile.sex ?? ''}
              />
            </FormControl>
            <FormControl>
              <Input
                type="text"
                name="fitness_level"
                placeholder="Fitness level"
                required
                defaultValue={profile.fitness_level ?? ''}
              />
            </FormControl>
            <FormControl>
              <Input
                type="text"
                name="fitness_goal"
                placeholder="Fitness goal"
                required
                defaultValue={profile.fitness_goal ?? ''}
              />
            </FormControl>
          </Stack>
        </Stack>
        <Stack gap={1} flex={0}>
          {searchParams?.message && <p>{searchParams.message}</p>}
          <SubmitButton
            formAction={updateProfile}
            pendingText="Updating profile...">
            Submit
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
