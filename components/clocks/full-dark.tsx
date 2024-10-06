import { lcdTime } from '@/fonts';
import { formatTime, getEnglishDate, getIslamicDate } from '@/lib/utils';
import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan';
import { useEffect, useState } from 'react';

interface FullDarkProps {
    iqamathTime: {
        fajr: string[];
        dhuhr: string[];
        asr: string[];
        maghrib: string[];
        isha: string[];
    };
    temperature: string;
    masjidName: string;
    clockSettings: any;
    prayerSettings: any;
}

const locationCoordinates = {
    colombo: { latitude: 6.9271, longitude: 79.8612 },
    kandy: { latitude: 7.2906, longitude: 80.6337 },
    batticaloa: { latitude: 7.7170, longitude: 81.7000 },
    jaffna: { latitude: 9.6615, longitude: 80.0255 },
    galle: { latitude: 6.0535, longitude: 80.2210 },
}

export default function FullDark({ iqamathTime, temperature, masjidName, clockSettings, prayerSettings }: FullDarkProps) {
    const [time, setTime] = useState(new Date())
    const [nextPrayer, setNextPrayer] = useState<{ name: string; time: Date; iqamah: string } | null>(null)

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date()
            setTime(now)
            calculateNextPrayer(now)
        }, 1000)
        return () => clearInterval(timer)
    }, [prayerSettings])

    function calculateNextPrayer(currentTime: Date) {
        const coordinates = new Coordinates(
            locationCoordinates[prayerSettings.location as keyof typeof locationCoordinates].latitude,
            locationCoordinates[prayerSettings.location as keyof typeof locationCoordinates].longitude
        )
        const params = CalculationMethod.MuslimWorldLeague();
        const prayerTimes = new PrayerTimes(coordinates, currentTime, params)

        const prayers = [
            { name: 'Fajr', time: prayerTimes.fajr, iqamah: iqamathTime.fajr[1] },
            { name: 'Dhuhr', time: prayerTimes.dhuhr, iqamah: iqamathTime.dhuhr[1] },
            { name: 'Asr', time: prayerTimes.asr, iqamah: iqamathTime.asr[1] },
            { name: 'Maghrib', time: prayerTimes.maghrib, iqamah: iqamathTime.maghrib[1] },
            { name: 'Isha', time: prayerTimes.isha, iqamah: iqamathTime.isha[1] },
        ]

        const nextPrayer = prayers.find(prayer => prayer.time > currentTime)
        setNextPrayer(nextPrayer || prayers[0])
    }

    return (
        <div className="flex h-screen bg-black text-white overflow-hidden">
            <div className="flex flex-col justify-center items-center w-16 bg-gray-900 border-r border-gray-700 py-4">
                <div className="flex flex-col items-center justify-between h-2/3">
                    <div className="text-lg sm:text-xl md:text-2xl font-semibold transform rotate-180 whitespace-nowrap writing-vertical">TIME</div>
                    <div className="text-lg sm:text-xl md:text-2xl font-semibold transform rotate-180 whitespace-nowrap writing-vertical">{nextPrayer?.name.toUpperCase() || 'Next Prayer'}</div>
                    <div className="text-lg sm:text-xl md:text-2xl font-semibold transform rotate-180 whitespace-nowrap writing-vertical">IQAMAH</div>
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="py-1 flex-shrink-0">
                    <div className="text-xs sm:text-sm md:text-base text-center text-yellow-300">
                        {getIslamicDate()} <span className='text-white'>|</span> {getEnglishDate()} <span className='text-white'>|</span> {temperature}°C <span className='text-white'>|</span> <span className='font-bold text-white'>{masjidName}</span>
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center space-y-4">
                    <div
                        className={`text-6xl sm:text-8xl md:text-10xl lg:text-[17.5vw] font-extrabold ${lcdTime.className}`}
                        suppressHydrationWarning
                        dangerouslySetInnerHTML={{ __html: formatTime(time, true) }}
                    />
                    {nextPrayer && (
                        <>
                            <div className={`text-5xl sm:text-7xl md:text-9xl lg:text-[17.5vw] font-extrabold text-center text-yellow-400 ${lcdTime.className}`} suppressHydrationWarning
                                dangerouslySetInnerHTML={{ __html: formatTime(nextPrayer.time, true) }}>
                            </div>
                            <div className={`text-5xl sm:text-7xl md:text-9xl lg:text-[17.5vw] font-extrabold text-center text-red-500 ${lcdTime.className}`} suppressHydrationWarning>
                                {nextPrayer.iqamah}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}