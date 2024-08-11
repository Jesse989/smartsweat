import {
  ConversationCreationParams,
  ConvoApi,
  ConvoApiApiKeys,
} from '@nft-portal/portal-ts';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

function createClient() {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  return createSupabaseClient(supabaseUrl, supabaseKey);
}

export async function POST(request: Request) {
  // Validate request signature

  const { type, data } = await request.json();

  const supabase = createClient();

  console.log(`Received Twelve Labs webhook: ${type}`);

  if (type === 'index.task.ready') {
    const { id } = data;

    const { data: workoutData, error } = await supabase
      .from('workouts')
      .update({ status: 'indexed' })
      .eq('twelve_labs_task_id', id)
      .select();

    if (error) {
      console.error(error);
    }

    if (!workoutData) {
      console.error('Workout not found');
      return NextResponse.json({ status: 'error' });
    }

    const workout = workoutData[0];

    // Fetch user profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select()
      .eq('id', workout.user_id);

    if (!profileData) {
      console.error('Profile not found');
      return NextResponse.json({ status: 'error' });
    }

    const profile = profileData[0];

    // Trigger Portal workflow

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
    const portalRes = await convoApi.createMessage(res.body.id, {
      creator: 'anonymous',
      content: `Please complete the work flow using the video with ID: ${id}, and the following users workout profile:\n\n${JSON.stringify(
        profile,
        null,
        2,
      )}`,
    });

    const { error: workoutError } = await supabase
      .from('workouts')
      .update({ status: 'analyzing', portal_convo_id: portalRes.body.convoId })
      .eq('twelve_labs_task_id', id);

    if (workoutError) {
      console.error(workoutError);
    }
  }

  return NextResponse.json({ status: 'ok' });
}
