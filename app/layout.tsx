import { Box } from '@mui/joy';
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
      <body>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <ThemeRegistry options={{ key: 'joy' }}>{children}</ThemeRegistry>
        </Box>
      </body>
    </html>
  );
}
