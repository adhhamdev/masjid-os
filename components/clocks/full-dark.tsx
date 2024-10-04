'use client'

import { lcdTime } from '@/fonts';

interface FullDarkProps {
    hours: string;
    minutes: string;
    seconds: string;
    azanTime: string;
    iqamahTime: string;
    islamicDate: string;
    englishDate: string;
    prayerName: string;
    temperature: string;
    masjidName: string;
}

import { useEffect, useState } from 'react';

const ISLAMIC_EPOCH = 1948439.5;
const ISLAMIC_MONTHS = [
    "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
    "Jumada al-Ula", "Jumada al-Thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
];

function gregorianToIslamicDate(date: Date) {
    const jd = Math.floor((date.getTime() / 86400000) + 2440587.5);
    const l = jd - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    const l2 = l - 10631 * n + 354;
    const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) + Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
    const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
    const month = Math.floor((24 * l3) / 709);
    const day = l3 - Math.floor((709 * month) / 24);
    const year = 30 * n + j - 30;

    return { day, month, year };
}

export default function FullDark({ hours, minutes, seconds, azanTime, iqamahTime, islamicDate, englishDate, prayerName, temperature }: FullDarkProps) {
    const [time, setTime] = useState(new Date())
    const [labels] = useState(['TIME', 'MAGHRIB', 'IQAMAH'])
    const masjidName = "Test Masjid"

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const formatTime = (date: Date, includeSeconds = false) => {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const seconds = date.getSeconds().toString().padStart(2, '0')
        return includeSeconds ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`
    }

    const formatIslamicDate = (date: Date) => {
        const { day, month, year } = gregorianToIslamicDate(date)
        return `${day} ${ISLAMIC_MONTHS[month - 1]} ${year}`
    }

    const formatGregorianDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    }

    return (
        <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
            <div className="py-1 flex-shrink-0">
                <div className="text-base text-center text-yellow-300">
                    {formatIslamicDate(time)} <span className='text-white'>|</span> {formatGregorianDate(time)} <span className='text-white'>|</span> {temperature} <span className='text-white'>|</span> <span className='font-bold text-white'>{masjidName}</span>
                </div>
            </div>
            <div className="flex flex-1 min-h-0">
                <div className="flex flex-col w-16">
                    {labels.map((label, index) => (
                        <div
                            key={index}
                            className="flex-1 bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-white flex items-center justify-center"
                            style={{
                                borderTopLeftRadius: index === 0 ? '0.25rem' : '0',
                                borderTopRightRadius: index === 0 ? '0.25rem' : '0',
                                borderBottomLeftRadius: index === labels.length - 1 ? '0.25rem' : '0',
                                borderBottomRightRadius: index === labels.length - 1 ? '0.25rem' : '0',
                                borderBottom: index !== labels.length - 1 ? '1px solid #4B5563' : 'none'
                            }}
                        >
                            <span className="transform -rotate-90 origin-center whitespace-nowrap text-lg font-bold">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    {[{ time: formatTime(time, true), color: 'text-yellow-300' }, { time: formatTime(time), color: 'text-white' }, { time: formatTime(new Date(time.getTime() + 7 * 60000)), color: 'text-red-600' }].map((item, index) => (
                        <div key={index} className="flex-1 flex items-center justify-center min-h-0 py-1">
                            <div className={`text-[20.5vw] ${item.color} w-full text-center ${lcdTime.className} tracking-widest leading-[0.9]`} suppressHydrationWarning>
                                {item.time}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}