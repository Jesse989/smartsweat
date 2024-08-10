import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

function createClient(options = {}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createSupabaseClient(supabaseUrl, supabaseKey, options);
}

export async function POST(request: Request) {
  // Generate a JWT with the webhook_role
  const payload = {
    role: 'webhook',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
  };

  const secret = process.env.SUPABASE_JWT_SECRET!;
  const token = jwt.sign(payload, secret);

  // Create the Supabase client with the JWT
  const supabase = createClient({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { type, data } = await request.json();

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
  }

  return NextResponse.json({ status: 'ok' });
}
