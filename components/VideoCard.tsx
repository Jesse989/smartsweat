'use client';

import { PlayCircle } from '@mui/icons-material';
import {
  AspectRatio,
  Box,
  Card,
  CardOverflow,
  Stack,
  Typography,
} from '@mui/joy';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function VideoCard({ workout }: { workout: Workout }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const getStatusText = () => {
    switch (workout.status) {
      case 'indexing':
        return 'Indexing video...';
      case 'indexed':
        return 'Preparing to analyze video...';
      case 'analyzing':
        return 'Analyzing video...';
      case 'completed':
        return 'Analysis complete!';
      default:
        return 'Unknown status';
    }
  };

  const statusText = getStatusText();

  const handlePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <Card sx={{ bgcolor: '#000' }}>
      <CardOverflow>
        <AspectRatio ratio={1} objectFit="cover">
          <video
            ref={videoRef}
            height="100%"
            width="100%"
            src={workout.video_url ?? ''}
            loop
          />
          <Box
            onClick={handlePlay}
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            sx={{ '&:hover': { cursor: 'pointer' } }}>
            {!isPlaying && (
              <PlayCircle
                sx={{
                  fontSize: 100,
                  color: 'primary',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  '&:hover': {
                    bgcolor: 'transparent',
                  },
                }}
              />
            )}
          </Box>
        </AspectRatio>
      </CardOverflow>
      <Stack direction="row" gap={1}>
        <Stack>
          <Typography
            href={`/results/${workout.id}`}
            component={Link}
            level="title-md">
            {statusText}
          </Typography>

          <Typography level="body-sm">
            {new Date(workout.created_at).toLocaleString()}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
