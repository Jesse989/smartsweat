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
      <Box component="body" bgcolor="background.level1">
        <Container
          disableGutters
          maxWidth="xs"
          sx={{
            height: '100vh',
            backgroundColor: 'background.surface',
            border: '1px solid',
            borderColor: 'divider',
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              position: 'relative',
            }}>
            <ThemeRegistry options={{ key: 'joy' }}>{children}</ThemeRegistry>
          </Box>
        </Container>
      </Box>
    </html>
  );
}
