import AuthButtonServer from '@/app/(public)/login/auth-button-server';
import NewExerciseButton from '@/components/NewExerciseButton';
import { Sheet, Stack, Typography } from '@mui/joy';

export default async function NewUserHome() {
  return (
    <Stack gap={2}>
      <Typography>
        Get started with SmartSweat by simply uploading a video of your workout.
        Let our AI analyze your form, taking your first step towards enhanced
        precision and safety in your exercise routine.
      </Typography>
    </Stack>
  );
}
