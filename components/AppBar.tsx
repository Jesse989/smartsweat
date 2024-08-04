import ColorSchemeToggle from './ColorSchemeToggle';
import { Stack } from '@mui/joy';
import Logo from './Logo';

export default function AppBar() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      height="64px"
      sx={{
        px: 2,
        py: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}>
      <Logo />
      <ColorSchemeToggle />
    </Stack>
  );
}
