import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

function createClient() {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  return createSupabaseClient(supabaseUrl, supabaseKey);
}

export async function POST(request: Request) {
  const { type, data } = await request.json();

  const supabase = createClient();

  console.log(`Received Twelve Labs webhook: ${type}`);

  if (type === 'index.task.ready') {
    const { id } = data;
    console.log(`Id: ${id}`);

    const { data: updated, error } = await supabase
      .from('workouts')
      .update({ status: 'completed' })
      .eq('twelve_labs_task_id', id)
      .select();

    if (error) {
      console.error(error);
    }

    if (updated) {
      console.log(`Updated ${updated.length} workouts`);
    }

    // Trigger Portal workflow
  }

  return NextResponse.json({ status: 'ok' });
}
