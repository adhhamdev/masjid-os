import { addMinutes, locationCoordinates } from '@/lib/utils';
import { IqamathTime, Prayer, PrayerSettings } from '@/types/clock';
import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useHijriDate } from './useHijriDate';

export function useClockLogic(
  prayerSettings: PrayerSettings,
  iqamathTime: IqamathTime,
  hijriAdjust: number
) {
  const [time, setTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<Prayer | null>(null);
  const [showIqamahCountdown, setShowIqamahCountdown] = useState(false);
  const [showSwitchOffPhones, setShowSwitchOffPhones] = useState(false);
  const [iqamahCountdown, setIqamahCountdown] = useState<string>('00:00');
  const hijriDate = useHijriDate({ now: time, adjust: hijriAdjust });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);
      if (!nextPrayer || now >= nextPrayer.iqamah) {
        calculateNextPrayer(now);
      }
      if (nextPrayer) {
        updateClockState(DateTime.fromJSDate(now), nextPrayer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [nextPrayer, prayerSettings, hijriAdjust]);

  function calculateNextPrayer(currentTime: Date) {
    const coordinates = new Coordinates(
      locationCoordinates[prayerSettings.location].latitude,
      locationCoordinates[prayerSettings.location].longitude
    );
    const params = CalculationMethod.MuslimWorldLeague();
    const prayerTimes = new PrayerTimes(coordinates, currentTime, params);
    const prayers: Prayer[] = [
      {
        name: 'Fajr',
        time: prayerTimes.fajr,
        iqamah: getIqamahTime(prayerTimes.fajr, iqamathTime.fajr),
      },
      {
        name: 'Dhuhr',
        time: prayerTimes.dhuhr,
        iqamah: getIqamahTime(prayerTimes.dhuhr, iqamathTime.dhuhr),
      },
      {
        name: 'Asr',
        time: prayerTimes.asr,
        iqamah: getIqamahTime(prayerTimes.asr, iqamathTime.asr),
      },
      {
        name: 'Maghrib',
        time: prayerTimes.maghrib,
        iqamah: getIqamahTime(prayerTimes.maghrib, iqamathTime.maghrib),
      },
      {
        name: 'Isha',
        time: prayerTimes.isha,
        iqamah: getIqamahTime(prayerTimes.isha, iqamathTime.isha),
      },
    ];

    const nextPrayer = prayers.find((prayer) => prayer.time > currentTime);
    setNextPrayer(nextPrayer || prayers[0]);
  }

  function getIqamahTime(prayerTime: Date, iqamahSetting: string[]): Date {
    if (iqamahSetting[2] === '1') {
      const nowDate = new Date();
      return new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        nowDate.getDate(),
        parseInt(iqamahSetting[1].slice(0, 2)),
        parseInt(iqamahSetting[1].slice(3, 5)),
        parseInt(iqamahSetting[1].slice(6, 8))
      );
    } else {
      const minutesToAdd = parseInt(iqamahSetting[0], 10);
      return addMinutes(prayerTime, minutesToAdd);
    }
  }

  function updateClockState(now: DateTime, prayer: Prayer) {
    const prayerTime = DateTime.fromJSDate(prayer.time);
    const prayerIqamah = DateTime.fromJSDate(prayer.iqamah);

    if (now >= prayerTime && now < prayerIqamah) {
      setShowIqamahCountdown(true);
      const diff = prayerIqamah.diff(now, ['minutes', 'seconds']);
      const minutes = Math.floor(diff.minutes);
      const seconds = Math.floor(diff.seconds);
      const countdown = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      setIqamahCountdown(countdown);
    } else if (
      now >= prayerIqamah &&
      now < prayerIqamah.plus({ seconds: 12 })
    ) {
      setShowIqamahCountdown(false);
      setShowSwitchOffPhones(true);
    } else {
      setShowIqamahCountdown(false);
      setShowSwitchOffPhones(false);
    }
  }

  return {
    time,
    nextPrayer,
    showIqamahCountdown,
    showSwitchOffPhones,
    iqamahCountdown,
    hijriDate,
  };
}
