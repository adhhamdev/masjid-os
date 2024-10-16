import { locationCoordinates } from '@/lib/utils';

export interface ClockProps {
  masjid: any;
  clockSettings: any;
  prayerSettings: PrayerSettings;
  iqamathTime: IqamathTime;
  nightMode: NightMode;
  masjidName: string;
  globalSettings: any;
}

export interface Prayer {
  name: string;
  time: Date;
  iqamah: Date;
}

export interface PrayerSettings {
  location: keyof typeof locationCoordinates;
  // Add other prayer settings as needed
}

export interface IqamathTime {
  fajr: string[];
  dhuhr: string[];
  asr: string[];
  maghrib: string[];
  isha: string[];
}

export interface NightMode {
  active: boolean;
  from: string;
  to: string;
}
