import VideoUpload from '@/components/VideoUpload';
import { createClient } from '@/utils/supabase/server';
import { Stack, Typography } from '@mui/joy';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { SubmitButton } from '@/components/SubmitButton';
import { TwelveLabs } from 'twelvelabs-js';

export default async function UploadPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/');
  }

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id);

  if (!data) {
    throw new Error('Profile not found');
  }

  const profile = data[0];
  const fileName = profile.upload_video_url?.split('/').pop() ?? '';

  const handleSetVideoUrl = async (videoUrl: string) => {
    'use server';

    const supabase = createClient();

    const { error } = await supabase
      .from('profiles')
      .update({
        upload_video_url: videoUrl,
      })
      .eq('id', user.id);

    if (error) {
      return redirect(`/upload?message=${error.message}`);
    }

    return revalidatePath('/upload');
  };

  const handleSubmit = async () => {
    'use server';

    if (!profile.upload_video_url) {
      return redirect('/upload?message=Please upload a video');
    }

    const client = new TwelveLabs({ apiKey: process.env.TWELVE_LABS_API_KEY! });

    // Upload the video to the Twelve Labs API
    const task = await client.task.create({
      indexId: process.env.TWELVE_LABS_INDEX_ID!,
      url: profile.upload_video_url,
    });
    console.log(`Task id=${task.id}`);

    const supabase = createClient();

    // Create a workout in the database
    const { data, error } = await supabase
      .from('workouts')
      .insert({
        user_id: user.id,
        video_url: profile.upload_video_url,
        twelve_labs_task_id: task.id,
        status: 'indexing',
      })
      .select();

    if (error) {
      return redirect(`/upload?message=${error.message}`);
    }

    // Reset the users upload_video_url
    await handleSetVideoUrl('');

    const result = data[0];

    return redirect(`/results/${result.id}`);
  };

  const handleClear = async () => {
    'use server';

    const supabase = createClient();

    const { error } = await supabase.storage
      .from('videos')
      .remove([`${user.id}/${fileName}`]);

    if (error) {
      return redirect(`/upload?message=${error.message}`);
    }

    // remove the videoUrl from the users profile
    await handleSetVideoUrl('');
  };

  return (
    <Stack component="form" gap={2}>
      <Stack textAlign="center" py={1}>
        <Typography level="h3">Upload Your Video</Typography>
        <Typography level="body-md" textColor="text.secondary">
          Upload a video of your exercise and let SmartSweat AI guide you
          towards precision and safety.
        </Typography>
      </Stack>
      <VideoUpload
        videoUrl={profile.upload_video_url ?? ''}
        setVideoUrl={handleSetVideoUrl}
        userId={user.id}
      />
      {searchParams?.message && (
        <Typography level="body-md" color="danger">
          {searchParams.message}
        </Typography>
      )}
      <Stack gap={1}>
        <SubmitButton
          formAction={handleSubmit}
          pendingText="Submitting video"
          fullWidth>
          Analyze my form!
        </SubmitButton>

        <SubmitButton
          formAction={handleClear}
          variant="outlined"
          color="neutral"
          pendingText="Clearing..."
          fullWidth>
          Clear
        </SubmitButton>
      </Stack>
    </Stack>
  );
}
