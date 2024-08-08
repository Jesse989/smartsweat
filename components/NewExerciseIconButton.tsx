import { Add } from '@mui/icons-material';
import { Box, IconButton } from '@mui/joy';
import Link from 'next/link';

export default async function NewExerciseIconButton() {
  return (
    <Box position="absolute" bottom="16px" right="16px">
      <IconButton
        variant="solid"
        size="lg"
        sx={{ borderRadius: '50%', width: '62px', height: '62px' }}
        color="primary"
        component={Link}
        href="/upload">
        <Add />
      </IconButton>
    </Box>
  );
}
