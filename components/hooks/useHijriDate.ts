import { useEffect, useState } from 'react';

const hijriMonths = {
  1: 'Muharram',
  2: 'Safar',
  3: 'Rabi-al-Awwal',
  4: 'Rabi-al-Akhir',
  5: 'Jumada-al-Ula',
  6: 'Jumada-al-Akhir',
  7: 'Rajab',
  8: "Sha'ban",
  9: 'Ramadan',
  10: 'Shawwal',
  11: "Dhu-al-Qi'dah",
  12: 'Dhu-al-Hijjah',
};
interface UseHijriDateProps {
  now: Date;
  adjust: number;
}

export function useHijriDate({ now, adjust }: UseHijriDateProps) {
  const [hijriDate, setHijriDate] = useState<string>('');

  useEffect(() => {
    const adjustedDate = new Date(now.getTime() + adjust * 24 * 60 * 60 * 1000);

    const [month, day, year] = adjustedDate
      .toLocaleDateString('en-SA-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      })
      .split('/');

    const finalHijriDate = `${day} ${hijriMonths[parseInt(month) as keyof typeof hijriMonths]} ${year}`;
    setHijriDate(finalHijriDate);
  }, [now, adjust]);

  return hijriDate;
}
