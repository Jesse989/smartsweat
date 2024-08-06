'use client';

import { createClient } from '@/utils/supabase/client';
import { Check, UploadFile } from '@mui/icons-material';
import {
  AspectRatio,
  Button,
  CircularProgress,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function VideoUpload({
  onSubmit,
}: {
  onSubmit: (videoUrl: string) => void;
}) {
  const supabase = createClient();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoSize, setVideoSize] = useState('');

  // Handle file upload event
  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setIsUploading(true);

    const file = e.target.files[0];
    const bucket = 'videos';

    // Convert file size from bytes to kilobytes
    const fileSizeInKB = (file.size / 1024).toFixed(2); // Convert to KB and round to 2 decimal places
    setVideoSize(fileSizeInKB);

    // Call Storage API to upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(file.name, file);

    // Handle error if upload failed
    if (error) {
      console.error('Error uploading file:', error);
      return;
    }

    setIsUploading(false);
    setVideoTitle(data.path);
  };

  const handleSubmit = async () => {
    const videoUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/videos/${videoTitle}`;
    onSubmit(videoUrl);
    router.push('/upload-loading');
  };

  const handleSheetClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Stack gap={2}>
      <Sheet
        variant="outlined"
        onClick={handleSheetClick}
        style={{ cursor: 'pointer' }}>
        <AspectRatio ratio={16 / 9}>
          <Stack>
            <input
              type="file"
              onChange={uploadFile}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            {isUploading ? (
              <CircularProgress />
            ) : (
              <UploadFile sx={{ fontSize: '76px' }} />
            )}
          </Stack>
        </AspectRatio>
      </Sheet>

      {videoTitle && videoSize && !isUploading && (
        <Sheet variant="outlined">
          <Stack direction="row" justifyContent="space-between" p={1}>
            <Typography
              startDecorator={<Check color="success" />}
              level="body-md">
              {videoTitle}
            </Typography>
            <Typography level="body-md">{videoSize} KB</Typography>
          </Stack>
        </Sheet>
      )}

      <Button onClick={handleSubmit} disabled={!videoTitle || isUploading}>
        Submit!
      </Button>
    </Stack>
  );
}
