"use server";
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signInAction(formData: FormData) {
  const supabase = createClient();
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout')
  redirect('/admin/protected/dashboard')
}

export async function signOutAction() {
  const supabase = createClient();
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/admin/sign-in?logout=true')
}

export async function getMasjidDetails() {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error('Error fetching user:', userError);
    return { error: userError.message };
  }

  if (!user) {
    return { error: 'User not authenticated' };
  }

  const { data: masjid, error: masjidError } = await supabase
    .from('masjid')
    .select('*')
    .eq('user', user.id)
    .single();

  if (masjidError) {
    console.error('Error fetching masjid details:', masjidError);
    return { error: masjidError.message };
  }

  // Revalidate the path to ensure fresh data
  revalidatePath('/admin/protected/dashboard');

  return { masjid };
}

