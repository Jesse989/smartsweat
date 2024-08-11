'use client';

import { PlayCircle } from '@mui/icons-material';
import { AspectRatio, Box } from '@mui/joy';
import { useRef, useState } from 'react';

export default function VideoPlayer({ workout }: { workout: Workout }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
    <AspectRatio
      ratio={1}
      objectFit="cover"
      sx={{ borderRadius: 'md', overflow: 'hidden' }}>
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
              color: 'common.white',
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
  );
}
