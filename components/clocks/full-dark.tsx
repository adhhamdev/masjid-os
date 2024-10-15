import { lcdTime } from '@/fonts';
import { formatTime } from '@/lib/utils';
import { Prayer, PrayerSettings } from '@/types/clock';
import { DateTime, Duration } from 'luxon';
import { useEffect, useState } from 'react';

interface FullDarkProps {
    iqamathTime: any;
    temperature: string;
    masjidName: string;
    clockSettings: any;
    prayerSettings: PrayerSettings;
    hijriDate: string;
    time: Date;
    nextPrayer: Prayer | null;
    getEnglishDate: () => string;
}

export default function FullDark({
    iqamathTime,
    temperature,
    masjidName,
    clockSettings,
    prayerSettings,
    hijriDate,
    time,
    nextPrayer,
    getEnglishDate,
}: FullDarkProps) {
    const [countdown, setCountdown] = useState<string | null>(null);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const updateCountdown = () => {
            if (nextPrayer) {
                const now = DateTime.local();
                const prayerTime = DateTime.fromJSDate(nextPrayer.iqamah);
                const diff = prayerTime.diff(now);

                if (diff.as('milliseconds') > 0) {
                    const duration = Duration.fromObject({ minutes: diff.as('minutes'), seconds: diff.as('seconds') });
                    setCountdown(duration.toFormat('mm:ss'));
                } else {
                    setCountdown(null);
                }
            } else {
                setCountdown(null);
            }
        };

        intervalId = setInterval(updateCountdown, 1000);
        updateCountdown();

        return () => clearInterval(intervalId);
    }, [nextPrayer]);

    return (
        <div className="flex h-screen bg-black text-white overflow-hidden">
            <SideBar nextPrayer={nextPrayer} />
            <MainContent
                hijriDate={hijriDate}
                getEnglishDate={getEnglishDate}
                temperature={temperature}
                masjidName={masjidName}
                time={time}
                nextPrayer={nextPrayer}
            />
        </div>
    );
}

function SideBar({ nextPrayer }: { nextPrayer: FullDarkProps['nextPrayer'] }) {
    return (
        <div className="flex flex-col justify-center items-center w-20 border-2 border-white py-4 bg-gradient-to-r from-gray-900 to-gray-700">
            <div className="flex flex-col items-center justify-between h-4/5">
                <SideBarText text="TIME" />
                <SideBarText text={nextPrayer?.name.replace(' (Next Day)', '').toUpperCase() || 'Next Prayer'} />
                <SideBarText text="IQAMAH" />
            </div>
        </div>
    );
}

function SideBarText({ text }: { text: string }) {
    return (
        <div className="text-lg sm:text-xl md:text-4xl font-extrabold transform rotate-180 whitespace-nowrap writing-vertical text-white">
            {text}
        </div>
    );
}

function MainContent({
    hijriDate,
    getEnglishDate,
    temperature,
    masjidName,
    time,
    nextPrayer,
}: Pick<FullDarkProps, 'hijriDate' | 'getEnglishDate' | 'temperature' | 'masjidName' | 'time' | 'nextPrayer'>) {
    return (
        <div className="flex-1 flex flex-col">
            <Header
                hijriDate={hijriDate}
                getEnglishDate={getEnglishDate}
                temperature={temperature}
                masjidName={masjidName}
            />
            <ClockDisplay time={time} nextPrayer={nextPrayer} />
        </div>
    );
}

function Header({
    hijriDate,
    getEnglishDate,
    temperature,
    masjidName,
}: Pick<FullDarkProps, 'hijriDate' | 'getEnglishDate' | 'temperature' | 'masjidName'>) {
    return (
        <div className="py-1 flex-shrink-0">
            <div className="text-xs sm:text-sm md:text-base text-center text-yellow-300">
                {hijriDate} <span className='text-white'>|</span> {getEnglishDate()} <span className='text-white'>|</span> {temperature}°C <span className='text-white'>|</span> <span className='font-bold text-white'>{masjidName}</span>
            </div>
        </div>
    );
}

function ClockDisplay({ time, nextPrayer }: Pick<FullDarkProps, 'time' | 'nextPrayer'>) {
    return (
        <div className="flex-1 flex flex-col justify-center items-center space-y-4">
            <TimeDisplay time={DateTime.fromJSDate(time)} />
            {nextPrayer && (
                <>
                    <TimeDisplay time={DateTime.fromJSDate(nextPrayer.time)} color="text-yellow-400" />
                    <TimeDisplay time={DateTime.fromJSDate(nextPrayer.iqamah)} color="text-red-500" />
                </>
            )}
        </div>
    );
}

function TimeDisplay({ time, color = 'text-white' }: { time: DateTime; color?: string }) {
    return (
        <div
            className={`text-6xl sm:text-8xl md:text-10xl lg:text-[17.5vw] font-extrabold ${lcdTime.className} ${color}`}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: formatTime(time.toJSDate(), true) }}
        />
    );
}
