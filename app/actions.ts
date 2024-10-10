'use server';
import { createAdminClient, createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export async function signInAction(formData: FormData) {
  const supabase = createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user?.role !== 'authenticated') {
    redirect('/admin/sign-in');
  }

  revalidatePath('/', 'layout');
  redirect('/admin/protected/dashboard');
}

export async function superAdminSignInAction(formData: FormData) {
  const supabase = createAdminClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user?.role !== 'service_role') {
    return { error: 'You are not authorized!' };
  }

  revalidatePath('/superadmin', 'page');
  redirect('/superadmin');
}

export async function signOutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/admin/sign-in?logout=true');
}

export async function getMasjidDetails() {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

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
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

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

  return { clockSettings };
}

export async function getIqamathTime(iqamathTimeId: string) {
  const supabase = createClient();
  const { data: iqamathTime, error: iqamathError } = await supabase
    .from('iqamath_time')
    .select('*')
    .eq('id', iqamathTimeId)
    .single();

  if (iqamathError) {
    console.error('Error fetching iqamath time:', iqamathError);
    return { error: iqamathError.message };
  }

  return { iqamathTime };
}

export async function getNightMode(nightModeId: string) {
  const supabase = createClient();
  const { data: nightMode, error: nightModeError } = await supabase
    .from('night_mode')
    .select('*')
    .eq('id', nightModeId)
    .single();

  if (nightModeError) {
    console.error('Error fetching night mode:', nightModeError);
    return { error: nightModeError.message };
  }

  return { nightMode };
}

export async function updateWebInfo(formData: FormData, masjidId: any) {
  try {
    const supabase = createClient();
    const { error: webInfoError } = await supabase
      .from('masjid')
      .update({
        web_info: [
          formData.get('title01') as string,
          formData.get('desc01') as string,
          formData.get('title02') as string,
          formData.get('desc02') as string,
          formData.get('title03') as string,
          formData.get('desc03') as string,
          formData.get('title04') as string,
          formData.get('desc04') as string,
        ],
      })
      .eq('id', masjidId);
    if (webInfoError) {
      console.error('Error updating web info:', webInfoError);
      return { error: 'Failed to update web info. Please try again.' };
    }

    revalidatePath('/admin/protected/masjid/info');
    return { success: 'Web info updated successfully' };
  } catch (error) {
    console.error('Error updating web info:', error);
    return { error: 'Failed to update web info. Please try again.' };
  }
}

export async function updateClockMasjidDetails(
  formData: FormData,
  masjid: any
) {
  try {
    const supabase = createClient();

    const masjidName = formData.get('masjid-name') as string;
    const { error: masjidError } = await supabase
      .from('contact')
      .update({ masjid_name: masjidName })
      .eq('id', masjid.contact);
    if (masjidError) {
      console.error('Error updating masjid:', masjidError);
      return { error: 'Failed to update masjid details. Please try again.' };
    }

    revalidatePath('/admin/protected', 'layout');
    return { success: 'Masjid details updated successfully' };
  } catch (error) {
    console.error('Error updating masjid details:', error);
    return { error: 'Failed to update masjid details. Please try again.' };
  }
}

export async function updateClockIqamathTime(
  formData: FormData,
  clockSettings: any
) {
  try {
    const supabase = createClient();
    const prayerTimes = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const updatedIqamathTime: Record<string, [string, string, string]> = {};

    prayerTimes.forEach((prayer) => {
      const minutes = formData.get(`minutes-${prayer}`) as string;
      const fixedTime = formData.get(`fixed-time-${prayer}`) as string;
      let formattedFixedTime = '';
      if (fixedTime) {
        const [fixedHours, fixedMinutes] = fixedTime.split(':');
        formattedFixedTime = `${fixedHours}:${fixedMinutes}:00`;
      }
      const mode = formData.get(`iqamath-mode-${prayer}`) as string;
      updatedIqamathTime[prayer] = [
        minutes || '',
        formattedFixedTime || fixedTime || '',
        mode || '0',
      ];
    });

    const { fajr, dhuhr, asr, maghrib, isha } = updatedIqamathTime;
    const { error: iqamathError } = await supabase
      .from('iqamath_time')
      .update({ fajr, dhuhr, asr, maghrib, isha })
      .eq('id', clockSettings.iqamath_time);

    if (iqamathError) {
      console.error('Error updating iqamath time:', iqamathError);
      return { error: 'Failed to update iqamath time. Please try again.' };
    }

    revalidatePath('/admin/protected/masjid/clock-settings');
    return { success: 'Iqamath time updated successfully' };
  } catch (error) {
    console.error('Error updating iqamath time:', error);
    return { error: 'Failed to update iqamath time. Please try again.' };
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
      return { error: 'Failed to update theme. Please try again.' };
    }

    revalidatePath('/admin/protected/masjid/clock-settings');
    return { success: 'Theme updated successfully' };
  } catch (error) {
    console.error('Error updating theme:', error);
    return { error: 'Failed to update theme. Please try again.' };
  }
}

export async function updateClockNightMode(
  formData: FormData,
  clockSettings: any
) {
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
      return { error: 'Failed to update night mode. Please try again.' };
    }

    revalidatePath('/admin/protected/masjid/clock-settings');
    return { success: 'Night mode updated successfully' };
  } catch (error) {
    console.error('Error updating night mode:', error);
    return { error: 'Failed to update night mode. Please try again.' };
  }
}

export async function updateContactDetails(formData: any, contactId: any) {
  try {
    const supabase = createClient();

    const { error: contactError } = await supabase
      .from('contact')
      .update({
        masjid_name: formData.get('masjid-name'),
        email: formData.get('email'),
        address: formData.get('address'),
        country_code: formData.get('country-code'),
        tel_no: formData.get('tel-no'),
        fax_no: formData.get('fax-no'),
        social_links: [
          formData.get('social-links-1') as string,
          formData.get('social-links-2') as string,
          formData.get('social-links-3') as string,
        ],
      })
      .eq('id', contactId);

    if (contactError) {
      console.error('Error updating contact details:', contactError);
      return { error: 'Failed to update contact details. Please try again.' };
    }

    revalidatePath('/admin/protected/masjid/info');
    return { success: 'Contact details updated successfully' };
  } catch (error) {
    console.error('Error updating contact details:', error);
    return { error: 'Failed to update contact details. Please try again.' };
  }
}

export async function updatePrayerSettings(
  formData: any,
  prayerSettingsId: any
) {
  try {
    const supabase = createClient();

    const { error: contactError } = await supabase
      .from('prayer_settings')
      .update({
        location: formData.get('location'),
        juristic: formData.get('juristic'),
      })
      .eq('id', prayerSettingsId);

    if (contactError) {
      console.error('Error updating prayer settings:', contactError);
      return { error: 'Failed to update prayer settings. Please try again.' };
    }

    revalidatePath('/admin/protected/masjid/info');
    return { success: 'Prayer settings updated successfully' };
  } catch (error) {
    console.error('Error updating prayer settings:', error);
    return { error: 'Failed to update prayer settings. Please try again.' };
  }
}

export async function uploadMasjidImage(fileData: FileData) {
  const supabase = createClient();
  const buffer = Buffer.from(fileData.content, 'base64');
  const fileName = `${uuidv4()}.${fileData.name.split('.').pop()}`;
  const { data, error } = await supabase.storage
    .from('masjid-images')
    .upload(fileName, buffer, { contentType: fileData.type });

  if (error) {
    throw error;
  }

  // Get the public URL of the uploaded file
  const {
    data: { publicUrl },
  } = supabase.storage.from('masjid-images').getPublicUrl(fileName);

  return publicUrl;
}

export async function removeMasjidImage(imageUrl: string) {
  const supabase = createClient();
  const fileName = imageUrl.split('/').pop();
  if (!fileName) {
    throw new Error('Invalid image URL');
  }

  const { error } = await supabase.storage
    .from('masjid-images')
    .remove([fileName]);

  if (error) {
    throw error;
  }
}

export async function updateMasjidPhotos(masjidId: string, photos: string[]) {
  console.log('photos: ', photos);
  const supabase = createClient();
  const { error } = await supabase
    .from('masjid')
    .update({ photos: photos })
    .eq('id', masjidId);

  if (error) {
    throw error;
  }

  revalidatePath('/admin/protected/masjid/info');
}

// SUPERADMIN
export async function getMosquesAdmin() {
  const supabase = createAdminClient();
  const { data: mosques, error } = await supabase.from('masjid').select(`
      *,
      contact (
        masjid_name
      )
    `);

  if (error) {
    console.error('Error fetching mosques:', error);
    return { error: error.message };
  }

  return { mosques };
}

type FileData = {
  name: string;
  type: string;
  size: number;
  content: string; // base64 encoded file content
};

export async function getMasjidDetailsAdmin(masjidId: string) {
  const supabase = createAdminClient();
  const { data } = await supabase.auth.admin.getUserById(
    '3d974148-a02c-4a19-92cd-869e9c246249'
  );
  console.log(data.user);
  const { data: masjid, error } = await supabase
    .from('masjid')
    .select(
      `
      *,
      contact (*),
      prayer_settings (*),
      clock_settings (
        *,
        iqamath_time (*),
        night_mode (*)
      )
    `
    )
    .eq('id', masjidId)
    .single();

  if (error) {
    console.error('Error fetching masjid details:', error);
    return { error: error.message };
  }

  return { masjid };
}

export async function updateContactDetailsAdmin(data: any, contactId: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('contact')
    .update({
      masjid_name: data.masjidName,
      email: data.email,
      address: data.address,
      country_code: data.countryCode,
      tel_no: data.telNo,
      fax_no: data.faxNo,
      social_links: data.socialLinks,
    })
    .eq('id', contactId);

  if (error) {
    console.error('Error updating contact details:', error);
    throw error;
  }
}

export async function updatePrayerSettingsAdmin(
  data: any,
  prayerSettingsId: string
) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('prayer_settings')
    .update({
      location: data.location,
      juristic: data.juristic,
    })
    .eq('id', prayerSettingsId);

  if (error) {
    console.error('Error updating prayer settings:', error);
    throw error;
  }
}

export async function getGlobalSettings() {
  const supabase = createAdminClient();
  const { data: globalSettings, error } = await supabase
    .from('global_settings')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching global settings:', error);
    return { error: error.message };
  }

  return { globalSettings };
}

export async function updateGlobalSettings(data: { hijri_date: string }) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('global_settings')
    .update({
      hijri_date: data.hijri_date,
    })
    .eq('id', 1);

  if (error) {
    console.error('Error updating global settings:', error);
    throw error;
  }

  revalidatePath('/superadmin');
}
