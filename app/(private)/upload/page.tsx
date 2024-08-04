import { createClient } from '@/utils/supabase/server';
import { UploadFile } from '@mui/icons-material';
import { AspectRatio, Button, Sheet, Stack, Typography } from '@mui/joy';
import { redirect } from 'next/navigation';

export default async function UploadPage() {
  const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect('/');
  // }

  return (
    <Stack gap={2}>
      <Typography level="body-md">
        Perfect Your Form! Upload a Video of Your Exercise Routine and Let
        SmartSweat AI Guide You Towards Precision and Safety.
      </Typography>
      <Sheet variant="outlined">
        <AspectRatio ratio={16 / 9}>
          <Stack>
            <UploadFile sx={{ fontSize: '76px' }} />
          </Stack>
        </AspectRatio>
      </Sheet>
      <Sheet variant="outlined">
        <Stack direction="row" justifyContent="space-between" p={1}>
          <Typography level="body-md">some_filename.mp4</Typography>
          <Typography level="body-md">644kbs</Typography>
        </Stack>
      </Sheet>
      <Button>Upload new exercise</Button>
    </Stack>
  );
}
