'use client';

import { uploadFile } from '@/utils/uploads';
import { Error as ErrorIcon, UploadFile } from '@mui/icons-material';
import {
  AspectRatio,
  CircularProgress,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy';
import { useRef, useState } from 'react';

export default function VideoUpload({
  userId,
  videoUrl,
  setVideoUrl,
}: {
  userId: string;
  videoUrl?: string;
  setVideoUrl: (videoUrl: string) => Promise<void>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSheetClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file upload event
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setError('');
    setIsUploading(true);

    try {
      const file = e.target.files[0];
      const bucket = 'videos';

      const random = Math.random().toString(36).substring(7);
      const fileName = `${userId}/${random}-${file.name}`;
      await uploadFile(bucket, fileName, file, setUploadProgress);
      const videoUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/videos/${fileName}`;
      await setVideoUrl(videoUrl);
    } catch (error) {
      if (error instanceof Error) {
        setError('Error uploading video!');
      }
      console.error('Error uploading file: ', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Stack justifyContent="space-between" gap={3} minHeight="100%">
      <Stack gap={2}>
        <Sheet
          variant="plain"
          onClick={handleSheetClick}
          style={{ cursor: 'pointer' }}>
          <AspectRatio
            ratio={1}
            objectFit="contain"
            sx={{
              borderRadius: 'md',
              overflow: 'hidden',
            }}>
            {videoUrl ? (
              <video height="100%" width="100%" src={videoUrl} controls />
            ) : (
              <Stack>
                <input
                  type="file"
                  onChange={handleUpload}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept=".mp4"
                />
                {isUploading && (
                  <CircularProgress
                    size="lg"
                    determinate
                    thickness={2}
                    value={uploadProgress}>
                    {uploadProgress.toFixed(0)}%
                  </CircularProgress>
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
            )}
          </AspectRatio>
        </Sheet>
      </Stack>
    </Stack>
  );
}
