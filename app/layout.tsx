import { Box, Container } from '@mui/joy';
import './globals.css';
import ThemeRegistry from './theme-registry';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'SmartSweat',
  description:
    'SmartSweat analyzes your exercise form and provides feedback to help you improve.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Box
        component="body"
        sx={{
          bgcolor: '#161b1c',
          height: '100%',
        }}>
        <Container
          disableGutters
          maxWidth="xs"
          sx={{
            backgroundColor: 'background.surface',
            borderColor: 'divider',
          }}>
          <Box
            sx={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}>
            <ThemeRegistry options={{ key: 'joy' }}>{children}</ThemeRegistry>
          </Box>
        </Container>
      </Box>
    </html>
  );
}
