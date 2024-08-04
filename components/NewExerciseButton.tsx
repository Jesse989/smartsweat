import { Add } from '@mui/icons-material';
import { Button } from '@mui/joy';
import Link from 'next/link';

export default async function NewExerciseButton() {
  return (
    <Link href="/upload">
      <Button fullWidth startDecorator={<Add />}>
        Upload new exercise
      </Button>
    </Link>
  );
}
