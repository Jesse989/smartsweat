import { Box, useColorScheme } from '@mui/joy';

interface Props {
  onClick?: () => void;
}

export default function Logo({ onClick }: Props) {
  const { mode } = useColorScheme();

  return (
    <Box
      component="img"
      alt="portal logo"
      src={'/logo.svg'}
      height="32px"
      ml={0.75}
      onClick={onClick}
      sx={{ cursor: onClick ? 'pointer' : 'default' }}
    />
  );
}
