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
          p: 2,
          flex: '1 1 0%',
        }}>
        {children}
      </Stack>
      <MobileNavBar />
    </Stack>
  );
}
