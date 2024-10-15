import { type ClassValue, clsx } from 'clsx';
import { DateTime } from 'luxon';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTemperature = async (): Promise<string> => {
  if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
    console.error('Geolocation is not supported');
    return 'N/A';
  }

  try {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&current_weather=true`,
      { next: { revalidate: 30 * 60 * 1000 } }
    );
    const data = await response.json();
    return data.current_weather.temperature.toString();
  } catch (error) {
    if (error instanceof GeolocationPositionError) {
      console.error('Error getting geolocation:', error);
    } else {
      console.error('Error fetching temperature:', error);
    }
    return 'N/A';
  }
};

export function getEnglishDate(): string {
  return DateTime.now().toLocaleString(DateTime.DATE_FULL);
}

export function formatTime(date: Date, use12Hour: boolean = false): string {
  const dateTime = DateTime.fromJSDate(date);
  const format = use12Hour ? 'hh:mm:ss' : 'HH:mm:ss';
  const formattedTime = dateTime.toFormat(format);

  if (use12Hour) {
    const ampm = dateTime.toFormat('a');
    return `${formattedTime}<span class="text-7xl font-normal align-top font-sans">${ampm}</span>`;
  }

  return formattedTime;
}

export function addMinutes(date: Date, minutes: number): Date {
  return DateTime.fromJSDate(date).plus({ minutes }).toJSDate();
}

export const locationCoordinates = {
  colombo: { latitude: 6.9271, longitude: 79.8612 },
  kandy: { latitude: 7.2906, longitude: 80.6337 },
  batticaloa: { latitude: 7.717, longitude: 81.7 },
  jaffna: { latitude: 9.6615, longitude: 80.0255 },
  galle: { latitude: 6.0535, longitude: 80.221 },
};

const hijriMonths = [
  'Muharram',
  'Safar',
  "Rabi' al-Awwal",
  "Rabi' al-Thani",
  'Jumada al-Ula',
  'Jumada al-Thani',
  'Rajab',
  "Sha'ban",
  'Ramadan',
  'Shawwal',
  "Dhu al-Qi'dah",
  'Dhu al-Hijjah',
];
