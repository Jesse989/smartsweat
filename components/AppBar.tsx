import Box from '@mui/joy/Box';
import ColorSchemeToggle from './ColorSchemeToggle';
import { Stack } from '@mui/joy';

export default function AppBar() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Box>Logo</Box>
      <ColorSchemeToggle />
    </Stack>
  );
}
