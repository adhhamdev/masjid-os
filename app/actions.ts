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

  return {clockSettings} ;

}

export async function getIqamathTime(iqamathTimeId: string) {
  const supabase = createClient();
  const {data: iqamathTime, error: iqamathError} = await supabase
    .from('iqamath_time')
    .select('*')
    .eq('id', iqamathTimeId)
    .single();

  if (iqamathError) {
    console.error('Error fetching iqamath time:', iqamathError);
    return { error: iqamathError.message };
  }

  return {iqamathTime};
}

export async function getNightMode(nightModeId: string) {
  const supabase = createClient();
  const {data: nightMode, error: nightModeError} = await supabase
    .from('night_mode')
    .select('*')
    .eq('id', nightModeId)
    .single();

  if (nightModeError) {
    console.error('Error fetching night mode:', nightModeError);
    return { error: nightModeError.message };
  }

  return {nightMode};
}

export async function updateClockMasjidDetails(formData: FormData, masjid: any) {
  try {
    const supabase = createClient();
  
    const masjidName = formData.get('masjid-name') as string;
    const { error: masjidError } = await supabase
        .from('clock_settings')
        .update({ masjid_name: masjidName })
        .eq('id', masjid.clock_settings);
    if (masjidError) {
      console.error('Error updating masjid:', masjidError);
      return { error: 'Failed to update masjid details. Please try again.'};
      }

    revalidatePath('/admin/protected/masjid/clock-settings')
    return { success: 'Masjid details updated successfully' }
  } catch (error) {
    console.error('Error updating masjid details:', error)
    return { error: 'Failed to update masjid details. Please try again.' }
  }
}

export async function updateClockIqamathTime(formData: FormData, clockSettings: any) {
  try {
    const supabase = createClient();
    const prayerTimes = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const updatedIqamathTime: Record<string, [string, string]> = {};

    prayerTimes.forEach(prayer => {
      const minutes = formData.get(`minutes-${prayer}`) as string;
      const fixedTime = formData.get(`fixed-time-${prayer}`) as string;
      updatedIqamathTime[prayer] = [minutes || '', fixedTime || ''];
    });

    console.log(updatedIqamathTime)

    const { fajr, dhuhr, asr, maghrib, isha } = updatedIqamathTime;
    const { error: iqamathError } = await supabase
      .from('iqamath_time')
      .update({ fajr, dhuhr, asr, maghrib, isha })
      .eq('id', clockSettings.iqamath_time);

    if (iqamathError) {
      console.error('Error updating iqamath time:', iqamathError);
      return { error: 'Failed to update iqamath time. Please try again.' };
    }

    revalidatePath('/admin/protected/masjid/clock-settings')
    return { success: 'Iqamath time updated successfully' }
  } catch (error) {
    console.error('Error updating iqamath time:', error)
    return { error: 'Failed to update iqamath time. Please try again.' }
  }
}

export async function updateClockTheme(formData: FormData, masjid: any) {
  try {
    const supabase = createClient();
    const theme = formData.get('theme') as string;
    const { error: themeError } = await supabase
      .from('clock_settings')
      .update({ theme: theme })
      .eq('id', masjid.clock_settings);

    if (themeError) {
      console.error('Error updating theme:', themeError);
      return { error: 'Failed to update theme. Please try again.' }
    }

    revalidatePath('/admin/protected/masjid/clock-settings')
    return { success: 'Theme updated successfully' }
  } catch (error) {
    console.error('Error updating theme:', error)
    return { error: 'Failed to update theme. Please try again.' }
  }
}

export async function updateClockNightMode(formData: FormData, clockSettings: any) {
  try {
    const supabase = createClient();
    const nightModeFrom = formData.get('nightmode-from') as string;
    const nightModeTo = formData.get('nightmode-to') as string;
    const nightModeActive = formData.get('nightmode-active') as string;
    const { error: nightModeError } = await supabase
      .from('night_mode')
      .update({
        from: nightModeFrom,
        to: nightModeTo,
        active: nightModeActive,
      })
      .eq('id', clockSettings.night_mode);

    if (nightModeError) {
      console.error('Error updating night mode:', nightModeError);
      return { error: 'Failed to update night mode. Please try again.' }
    }

    revalidatePath('/admin/protected/masjid/clock-settings')
    return { success: 'Night mode updated successfully' }
  } catch (error) {
    console.error('Error updating night mode:', error)
    return { error: 'Failed to update night mode. Please try again.' }
  }
}

export async function updateContactDetails(formData : any) {

}