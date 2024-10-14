import { lcdTime } from '@/fonts'
import { addMinutes, formatTime, getEnglishDate, locationCoordinates } from '@/lib/utils'
import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan'
import { useEffect, useState } from 'react'

interface PosterProps {
    iqamathTime: {
        fajr: string[]
        dhuhr: string[]
        asr: string[]
        maghrib: string[]
        isha: string[]
    }
    temperature: string
    masjidName: string
    clockSettings: any
    prayerSettings: any
    hijriDate: string
}



export default function Poster({ iqamathTime, temperature, masjidName, clockSettings, prayerSettings, hijriDate }: PosterProps) {
    const [time, setTime] = useState(new Date())
    const [prayerTimes, setPrayerTimes] = useState<{ name: string; time: Date; iqamah: string }[]>([])

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date()
            setTime(now)
            calculatePrayerTimes(now)
        }, 1000)
        return () => clearInterval(timer)
    }, [prayerSettings])

    function calculatePrayerTimes(currentTime: Date) {
        const coordinates = new Coordinates(
            locationCoordinates[prayerSettings.location as keyof typeof locationCoordinates].latitude,
            locationCoordinates[prayerSettings.location as keyof typeof locationCoordinates].longitude
        )
        const params = CalculationMethod.MuslimWorldLeague()
        const prayerTimes = new PrayerTimes(coordinates, currentTime, params)

        function getIqamahTime(prayerTime: Date, iqamahSetting: string[]): string {
            if (iqamahSetting[2] === "1") {
                return formatTime(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), parseInt(iqamahSetting[1].slice(0, 2)), parseInt(iqamahSetting[1].slice(3, 5)), parseInt(iqamahSetting[1].slice(6, 8))), true)
            } else {
                const minutesToAdd = parseInt(iqamahSetting[0], 10)
                return formatTime(addMinutes(prayerTime, minutesToAdd), true)
            }
        }

        const prayers = [
            { name: 'Fajr', time: prayerTimes.fajr, iqamah: getIqamahTime(prayerTimes.fajr, iqamathTime.fajr) },
            { name: 'Dhuhr', time: prayerTimes.dhuhr, iqamah: getIqamahTime(prayerTimes.dhuhr, iqamathTime.dhuhr) },
            { name: 'Asr', time: prayerTimes.asr, iqamah: getIqamahTime(prayerTimes.asr, iqamathTime.asr) },
            { name: 'Maghrib', time: prayerTimes.maghrib, iqamah: getIqamahTime(prayerTimes.maghrib, iqamathTime.maghrib) },
            { name: 'Isha', time: prayerTimes.isha, iqamah: getIqamahTime(prayerTimes.isha, iqamathTime.isha) },
        ]

        setPrayerTimes(prayers)
    }

    return (
        <div className="flex flex-col h-screen bg-black text-green-500 overflow-hidden font-mono">
            <header className="p-4 text-center border-b border-green-700">
                <h1 className="text-3xl font-bold text-green-400">{masjidName}</h1>
                <p className="text-xl mt-2">
                    {hijriDate} | {getEnglishDate()} | {temperature}°C
                </p>
            </header>

            <main className="flex-1 flex flex-col justify-center items-center bg-gradient-to-b from-black to-gray-900">
                <div
                    className={`text-8xl md:text-9xl lg:text-[12vw] font-bold ${lcdTime.className} bg-black p-8 rounded-lg shadow-lg shadow-green-500/20 border border-green-700`}
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{ __html: formatTime(time, true) }}
                />

                <div className="mt-12 grid grid-cols-5 gap-4 text-center w-full max-w-6xl px-4">
                    {prayerTimes.map((prayer) => (
                        <div key={prayer.name} className="bg-gray-900 p-4 rounded-lg shadow-md border border-green-700">
                            <h2 className="text-xl font-semibold text-green-400 mb-2">{prayer.name}</h2>
                            <p
                                className="text-2xl mb-1"
                                dangerouslySetInnerHTML={{ __html: formatTime(prayer.time, true) }}
                            />
                            <p
                                className="text-xl text-yellow-400"
                                dangerouslySetInnerHTML={{ __html: `Iqamah:<br>${prayer.iqamah}` }}
                            />
                        </div>
                    ))}
                </div>
            </main>

            <footer className="p-4 text-center border-t border-green-700">
                <p className="text-lg text-green-400">Please silence your mobile devices</p>
            </footer>
        </div>
    )
}