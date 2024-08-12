'use client';

import { Markdown } from '@/components/Markdown';
import VideoCard from '@/components/VideoPlayer';
import { createClient } from '@/utils/supabase/client';
import { getHeaderText, getStatusText } from '@/utils/uploads';
import { ArrowBackIos } from '@mui/icons-material';
import { Stack, Typography } from '@mui/joy';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import WorkoutMenu from '@/components/WorkoutMenu';
import { deleteWorkout } from './actions';

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
        () => {
          router.refresh();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  const headerText = getHeaderText(workout.status);
  const statusText = getStatusText(workout.status);

  return (
    <Stack minHeight="100%" gap={2}>
      <Typography
        component={Link}
        href="/workouts"
        startDecorator={<ArrowBackIos />}>
        Back
      </Typography>
      <Stack>
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="baseline">
          <Typography level="h3" color="primary">
            Results
          </Typography>
          <WorkoutMenu workout={workout} deleteWorkout={deleteWorkout} />
        </Stack>
        <Typography level="body-md">{headerText}</Typography>
      </Stack>
      <VideoCard workout={workout} />
      {workout.status === 'completed' ? (
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
      ) : (
        <Stack>
          <Typography level="title-lg" color="primary">
            Status
          </Typography>
          <Typography level="body-md">{statusText}</Typography>
        </Stack>
      )}
    </Stack>
  );
}
