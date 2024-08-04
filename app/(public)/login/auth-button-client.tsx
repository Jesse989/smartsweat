'use client';

import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Button, IconButton } from '@mui/joy';
import { GitHub, Logout } from '@mui/icons-material';

interface Props {
  user: User | null;
}

export default function AuthButtonClient({ user }: Props) {
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return user ? (
    <IconButton onClick={handleSignOut}>
      <Logout />
    </IconButton>
  ) : (
    <Button
      startDecorator={<GitHub />}
      variant="outlined"
      color="neutral"
      onClick={handleSignIn}>
      Continue with Github
    </Button>
  );
}
