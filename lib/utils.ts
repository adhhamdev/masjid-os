import { type ClassValue, clsx } from 'clsx';
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
  const today = new Date();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = today.getDate();
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();

  return `${day} ${month} ${year}`;
}

export function formatTime(date: Date, use12Hour: boolean = false): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  let ampm = '';

  if (use12Hour) {
    ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
  }

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return use12Hour
    ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}<span class="text-7xl font-normal align-top font-sans">${ampm}</span>`
    : `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

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
