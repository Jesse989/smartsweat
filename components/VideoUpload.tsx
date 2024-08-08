'use client';

import { uploadFile } from '@/utils/uploads';
import { Check, Error as ErrorIcon, UploadFile } from '@mui/icons-material';
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
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoSize, setVideoSize] = useState('');
  const [error, setError] = useState('');

  // Handle file upload event
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setError('');
    setIsUploading(true);

    try {
      const file = e.target.files[0];
      const bucket = 'videos';

      // Convert file size from bytes to kilobytes
      const fileSizeInKB = (file.size / 1024).toFixed(2); // Convert to KB and round to 2 decimal places
      setVideoSize(fileSizeInKB);

      const fileName = `${Date.now()}-${file.name}`;

      await uploadFile(bucket, fileName, file);
      setVideoTitle(file.name);
    } catch (error) {
      if (error instanceof Error) {
        setError('Error uploading video!');
      }
      console.error('Error uploading file: ', error);
    } finally {
      setIsUploading(false);
    }
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
    <Stack justifyContent="space-between" gap={3} minHeight="100%">
      <Stack gap={2}>
        <Sheet
          variant="plain"
          onClick={handleSheetClick}
          style={{ cursor: 'pointer' }}>
          <AspectRatio ratio={1}>
            <Stack>
              <input
                type="file"
                onChange={handleUpload}
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".mp4"
              />
              {isUploading && (
                <Stack alignItems="center" gap={0.5}>
                  <CircularProgress />
                  <Typography textColor="text.tertiary">
                    Uploading...
                  </Typography>
                </Stack>
              )}
              {!isUploading && !error && (
                <Stack alignItems="center" gap={0.5}>
                  <UploadFile sx={{ fontSize: '42px' }} />
                  <Typography textColor="text.tertiary">
                    Click to select a .mp4 file
                  </Typography>
                </Stack>
              )}
              {error && (
                <Stack alignItems="center" gap={0.5}>
                  <ErrorIcon
                    color={'danger' as 'error'}
                    sx={{ fontSize: '42px' }}
                  />
                  <Typography color="danger">{error}</Typography>
                </Stack>
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
      </Stack>

      <Button onClick={handleSubmit}>Submit!</Button>
    </Stack>
  );
}
