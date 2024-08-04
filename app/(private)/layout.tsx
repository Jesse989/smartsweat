import AppBar from '@/components/AppBar';
import MobileNavBar from '@/components/MobileNavBar';
import { Stack } from '@mui/joy';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <Stack height="100vh">
      <AppBar />
      <Stack
        overflow="auto"
        sx={{
          px: 2,
          py: 2.5,
          flex: '1 1 0%',
        }}>
        {children}
      </Stack>
      <MobileNavBar />
    </Stack>
  );
}
