import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Update the workflow with the matching twelve_labs_task_id
  // to the status 'completed'
  const supabase = createClient();

  const { type, data } = await request.json();

  console.log(`Received Twelve Labs webhook: ${type}`);

  if (type === 'index.task.ready') {
    const { id } = data;
    console.log(`Id: ${id}`);

    await supabase
      .from('workouts')
      .update({ status: 'completed' })
      .eq('twelve_labs_task_id', id);
  }

  return NextResponse.json({ status: 'ok' });
}
