import AppBar from '@/components/AppBar';
import MobileNavBar from '@/components/MobileNavBar';
import { Box, Stack } from '@mui/joy';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <Stack display="grid" gridTemplateRows="64px 1fr 84px" height="100vh">
      <AppBar />
      <Box
        overflow="auto"
        position="relative"
        sx={{
          p: 2,
        }}>
        {children}
      </Box>
      <MobileNavBar />
    </Stack>
  );
}
