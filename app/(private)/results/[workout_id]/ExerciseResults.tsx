'use client';

import { Markdown } from '@/components/Markdown';
import VideoCard from '@/components/VideoCard';
import { createClient } from '@/utils/supabase/client';
import { ArrowBackIos, Circle } from '@mui/icons-material';
import { CircularProgress, Stack, Typography } from '@mui/joy';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ExerciseResults({ workout }: { workout: Workout }) {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel('workout updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workouts',
        },
        (payload) => {
          router.refresh();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  const getHeaderText = () => {
    switch (workout.status) {
      case 'indexing':
        return "We're hard at work preparing your video to be analyzed. Please check back later for your personalized results.";
      case 'indexed':
        return 'your video has been indexed and is now ready to be analyzed.';
      case 'analyzing':
        return 'We are currently analyzing your video. Please check back later for your personalized results.';
      case 'completed':
        return 'Great job on your workout! Here are your personalized results to help you further refine and enhance your exercise routine.';
      default:
        return 'Unknown status';
    }
  };

  const headerText = getHeaderText();

  return (
    <Stack minHeight="100%" gap={2}>
      <Typography
        component={Link}
        href="/workouts"
        startDecorator={<ArrowBackIos />}>
        Back
      </Typography>
      <Stack>
        <Typography level="h3">Your Exercise Results</Typography>
        <Typography level="body-md">{headerText}</Typography>
      </Stack>
      <VideoCard workout={workout} />
      {workout.status === 'completed' && (
        <Stack gap={2}>
          <Stack gap={0.5}>
            <Typography level="title-lg" color="primary">
              Exercise Name
            </Typography>
            <Markdown>{workout.exercise_type ?? 'None'}</Markdown>
          </Stack>
          <Stack gap={2}>
            <Stack gap={0.5}>
              <Typography level="title-lg" color="primary">
                Issues
              </Typography>
              <Markdown>{workout.issues_with_form ?? 'None'}</Markdown>
            </Stack>

            <Stack gap={0.5}>
              <Typography level="title-lg" color="primary">
                Recommendations
              </Typography>
              <Markdown>{workout.recommendations ?? 'None'}</Markdown>
            </Stack>

            <Stack gap={0.5}>
              <Typography level="title-lg" color="primary">
                Alternate Excercise
              </Typography>
              <Markdown>{workout.alt_exercise ?? 'None'}</Markdown>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
