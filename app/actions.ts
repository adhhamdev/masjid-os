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

