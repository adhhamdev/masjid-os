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

export async function getContactDetails(contactId: string) {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error('Error fetching user:', userError);
    return { error: userError.message };
  }

  if (!user) {
    return { error: 'User not authenticated' };
  }

  const { data: contact, error: contactError } = await supabase
    .from('contact')
    .select('*')
    .eq('id', contactId)
    .single();

  if (contactError) {
    console.error('Error fetching contact details:', contactError);
    return { error: contactError.message };
  }

  // Revalidate the path to ensure fresh data
  revalidatePath('/admin/protected/dashboard');

  return { contact };
}

export async function getPrayerSettings(prayerId: string) {
  const supabase = createClient();
  const { error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error('Error fetching user:', userError);
    return { error: userError.message };
  }

  const { data: prayerSettings, error: prayerError } = await supabase
    .from('prayer_settings')
    .select('*')
    .eq('id', Number(prayerId))
    .single();

  if (prayerError) {
    console.error('Error fetching prayer details:', prayerError);
    return { error: prayerError.message };
  }

  // Revalidate the path to ensure fresh data
  revalidatePath('/admin/protected/dashboard');

  return { prayerSettings };
}

export async function getClockSettings(clockSettingsId: string) {
  const supabase = createClient();
  const { error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error('Error fetching user:', userError);
    return { error: userError.message };
  }

  const { data: clockSettings, error: clockError } = await supabase
    .from('clock_settings')
    .select('*')
    .eq('id', clockSettingsId)
    .single();

  if (clockError) {
    console.error('Error fetching clock settings:', clockError);
    return { error: clockError.message };
  }

  const {data: iqamathTime, error: iqamathError} = await supabase
    .from('iqamath_time')
    .select('*')
    .eq('id', clockSettings?.iqamath_time)
    .single();

  if (iqamathError) {
    console.error('Error fetching iqamath time:', iqamathError);
    return { error: iqamathError.message };
  }

  const {data: nightMode, error: nightModeError} = await supabase
    .from('night_mode')
    .select('*')
    .eq('id', clockSettings?.night_mode)
    .single();

  if (nightModeError) {
    console.error('Error fetching night mode:', nightModeError);
    return { error: nightModeError.message };
  }

  // Revalidate the path to ensure fresh data
  revalidatePath('/admin/protected/dashboard');

  return { clockSettings, iqamathTime, nightMode };
}

export async function updateClockSettings(formData: FormData) {
  const supabase = createClient();
  const masjidName = formData.get('masjid-name') as string;
  const nightModeFrom = formData.get('nightmode-from') as string;
  const nightModeTo = formData.get('nightmode-to') as string;
  const nightModeActive = formData.get('nightmode-active') as string;
  console.log(masjidName, nightModeFrom, nightModeTo, nightModeActive)
}