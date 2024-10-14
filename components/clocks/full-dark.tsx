import { lcdTime } from '@/fonts';

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
    hijriDate: string;
    time: Date;
    nextPrayer: { name: string; time: Date; iqamah: Date } | null;
    getEnglishDate: () => string;
    formatTime: (date: Date, includeSeconds?: boolean) => string;
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
    formatTime,
}: FullDarkProps) {
    return (
        <div className="flex h-screen bg-black text-white overflow-hidden">
            <div className="flex flex-col justify-center items-center w-20 border-2 border-white py-4 bg-gradient-to-r from-gray-900 to-gray-700">
                <div className="flex flex-col items-center justify-between h-4/5">
                    <div className="text-lg sm:text-xl md:text-4xl font-extrabold transform rotate-180 whitespace-nowrap writing-vertical text-white">TIME</div>
                    <div className="text-lg sm:text-xl md:text-4xl font-extrabold transform rotate-180 whitespace-nowrap writing-vertical text-white">{nextPrayer?.name.toUpperCase() || 'Next Prayer'}</div>
                    <div className="text-lg sm:text-xl md:text-4xl font-extrabold transform rotate-180 whitespace-nowrap writing-vertical text-white">IQAMAH</div>
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="py-1 flex-shrink-0">
                    <div className="text-xs sm:text-sm md:text-base text-center text-yellow-300">
                        {hijriDate} <span className='text-white'>|</span> {getEnglishDate()} <span className='text-white'>|</span> {temperature}°C <span className='text-white'>|</span> <span className='font-bold text-white'>{masjidName}</span>
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
                            <div className={`text-5xl sm:text-7xl md:text-9xl lg:text-[17.5vw] font-extrabold text-center text-red-500 ${lcdTime.className}`} suppressHydrationWarning
                                dangerouslySetInnerHTML={{ __html: formatTime(nextPrayer.iqamah, true) }}>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
