import { addMinutes, locationCoordinates } from '@/lib/utils';
import { IqamathTime, NightMode, Prayer, PrayerSettings } from '@/types/clock';
import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useHijriDate } from './useHijriDate';

export function useClockLogic(
  prayerSettings: PrayerSettings,
  iqamathTime: IqamathTime,
  hijriAdjust: number,
  nightMode: NightMode
) {
  const [time, setTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<Prayer | null>(null);
  const [showIqamahCountdown, setShowIqamahCountdown] = useState(false);
  const [showIshrak, setShowIshrak] = useState(false);
  const [iqamahCountdown, setIqamahCountdown] = useState<string>('00:00');
  const hijriDate = useHijriDate({ now: time, adjust: hijriAdjust });
  const [isNightModeActive, setIsNightModeActive] = useState(false);

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
      checkIshrakTime(now);
      checkNightModeActive(now);
    }, 1000);
    return () => clearInterval(timer);
  }, [nextPrayer, prayerSettings, hijriAdjust, nightMode]);

  function calculateNextPrayer(currentTime: Date) {
    const coordinates = new Coordinates(
      locationCoordinates[prayerSettings.location].latitude,
      locationCoordinates[prayerSettings.location].longitude
    );
    const params = CalculationMethod.MuslimWorldLeague();
    const prayerTimes = new PrayerTimes(coordinates, currentTime, params);
    const nextDayPrayerTimes = new PrayerTimes(
      coordinates,
      addDays(currentTime, 1),
      params
    );

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
      {
        name: 'Fajr (Next Day)',
        time: nextDayPrayerTimes.fajr,
        iqamah: getIqamahTime(nextDayPrayerTimes.fajr, iqamathTime.fajr),
      },
    ];

    const nextPrayer = prayers.find((prayer) => prayer.time > currentTime);
    setNextPrayer(nextPrayer || prayers[0]);
  }

  function getIqamahTime(
    prayerTime: Date,
    iqamahSetting: string[] = ['0', '00:00', '0']
  ): Date {
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
    const waitEndTime = prayerIqamah.plus({ seconds: 12 });

    if (now >= prayerTime && now < prayerIqamah) {
      setShowIqamahCountdown(true);
      const diff = prayerIqamah.diff(now, ['minutes', 'seconds']);
      const minutes = Math.floor(diff.minutes);
      const seconds = Math.floor(diff.seconds);
      const countdown = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      setIqamahCountdown(countdown);
    } else if (now >= prayerIqamah && now < waitEndTime) {
      setShowIqamahCountdown(false);
    } else {
      setShowIqamahCountdown(false);
    }
  }

  function checkIshrakTime(currentTime: Date) {
    const coordinates = new Coordinates(
      locationCoordinates[prayerSettings.location].latitude,
      locationCoordinates[prayerSettings.location].longitude
    );
    const params = CalculationMethod.MuslimWorldLeague();
    const prayerTimes = new PrayerTimes(coordinates, currentTime, params);

    const sunrise = DateTime.fromJSDate(prayerTimes.sunrise);
    const ishrakStart = sunrise.plus({ minutes: 20 });
    const ishrakEnd = sunrise.plus({ minutes: 30 });
    const now = DateTime.fromJSDate(currentTime);

    setShowIshrak(now >= ishrakStart && now < ishrakEnd);
  }

  function checkNightModeActive(currentTime: Date) {
    if (!nightMode.active) {
      setIsNightModeActive(false);
      return;
    }

    const now = DateTime.fromJSDate(currentTime);
    const fromTime = DateTime.fromFormat(nightMode.from, 'HH:mm');
    const toTime = DateTime.fromFormat(nightMode.to, 'HH:mm');

    if (toTime < fromTime) {
      // Night mode spans across midnight
      setIsNightModeActive(now >= fromTime || now < toTime);
    } else {
      setIsNightModeActive(now >= fromTime && now < toTime);
    }
  }

  return {
    time,
    nextPrayer,
    showIqamahCountdown,
    showIshrak,
    iqamahCountdown,
    hijriDate,
    isNightModeActive,
  };
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
