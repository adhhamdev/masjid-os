"use client"

import { formatTime, getEnglishDate, getIslamicDate, getTemperature } from '@/lib/utils'
import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const FullDark = dynamic(() => import('@/components/clocks/full-dark'), {
    loading: () => <p>Loading...</p>
})

const Poster = dynamic(() => import('@/components/clocks/poster'), {
    loading: () => <p>Loading...</p>
})

const IqamahCountdown = dynamic(() => import('@/components/clocks/iqamath-countdown'), {
    loading: () => <p>Loading...</p>
})

interface ClockProps {
    masjid: any
    clockSettings: any
    prayerSettings: any
    iqamathTime: any
    nightMode: boolean
    masjidName: string
}

const locationCoordinates = {
    colombo: { latitude: 6.9271, longitude: 79.8612 },
    kandy: { latitude: 7.2906, longitude: 80.6337 },
    batticaloa: { latitude: 7.7170, longitude: 81.7000 },
    jaffna: { latitude: 9.6615, longitude: 80.0255 },
    galle: { latitude: 6.0535, longitude: 80.2210 },
}

function addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000)
}

function Clock({ masjid, clockSettings, prayerSettings, iqamathTime, nightMode, masjidName }: ClockProps) {
    const [temperature, setTemperature] = useState<string>('')
    const [time, setTime] = useState(new Date())
    const [nextPrayer, setNextPrayer] = useState<{ name: string; time: Date; iqamah: string } | null>(null)

    useEffect(() => {
        async function fetchTemperature() {
            const temp = await getTemperature()
            setTemperature(temp)
        }
        fetchTemperature()
    }, [])

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

        const nextPrayer = prayers.find(prayer => prayer.time > currentTime)
        setNextPrayer(nextPrayer || prayers[0])
    }

    function renderClockComponent() {
        const commonProps = {
            iqamathTime,
            masjidName,
            temperature,
            clockSettings,
            prayerSettings,
            time,
            nextPrayer,
            getEnglishDate,
            getIslamicDate,
            formatTime,
        }

        if (clockSettings.theme === "1") {
            return <FullDark {...commonProps} />
        } else if (clockSettings.theme === "2") {
            return <Poster {...commonProps} />
        }

        // Default to FullDark if theme is not 1 or 2
        return <FullDark {...commonProps} />
    }

    return (
        <div>
            {renderClockComponent()}
        </div>
    )
}

export default Clock