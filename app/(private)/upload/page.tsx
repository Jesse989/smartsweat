import VideoUpload from '@/components/VideoUpload';
import { createClient } from '@/utils/supabase/server';
import { Stack, Typography } from '@mui/joy';
import { redirect } from 'next/navigation';
import {
  ConvoApi,
  ConvoApiApiKeys,
  ConversationCreationParams,
} from '@nft-portal/portal-ts';

export default async function UploadPage() {
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

  const handleSubmit = async (videoUrl: string) => {
    'use server';

    // Instantiate the API
    const convoApi = new ConvoApi();

    // Set the API key. You can get your API key from the Portal settings page.
    convoApi.setApiKey(ConvoApiApiKeys.apiKey, process.env.PORTAL_API_KEY!);

    // Call the API
    const res = await convoApi.createConversation({
      appId: process.env.PORTAL_APP_ID!,
      status: ConversationCreationParams.StatusEnum.Running,
    });

    if (res.response.statusCode !== 200) {
      throw new Error('Failed to get ConvoApi');
    }

    // Insert message
    await convoApi.createMessage(res.body.id, {
      creator: 'anonymous',
      content: `Please complete the work flow using the video with URL: 66afaf5d13a154f3eecb71e1, and the following users workout profile: ${JSON.stringify(
        profile,
        null,
        2,
      )}`,
    });

    return redirect('/upload-loading');
  };

  return (
    <Stack gap={2}>
      <Stack gap={0.5} textAlign="center" py={1}>
        <Typography level="h3">Upload Your Video</Typography>
        <Typography level="body-md" textColor="text.secondary">
          Upload a video of your exercise routine and let SmartSweat AI guide
          you towards precision and safety.
        </Typography>
      </Stack>
      <VideoUpload onSubmit={handleSubmit} />
    </Stack>
  );
}
