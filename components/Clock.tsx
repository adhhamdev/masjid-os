"use client"

import { formatTime, getEnglishDate, getTemperature } from '@/lib/utils'
import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const FullDark = dynamic(() => import('@/components/clocks/full-dark'), {
    loading: () => <p>Loading...</p>
})

const FullLight = dynamic(() => import('@/components/clocks/full-light'), {
    loading: () => <p>Loading...</p>
})

const IqamahCountdown = dynamic(() => import('@/components/clocks/iqamath-countdown'), {
    loading: () => <p>Loading...</p>
})

const SwitchOffPhones = dynamic(() => import('@/components/clocks/switch-off-phones'), {
    loading: () => <p>Loading...</p>
})

interface ClockProps {
    masjid: any
    clockSettings: any
    prayerSettings: any
    iqamathTime: any
    nightMode: boolean
    masjidName: string
    globalSettings: any
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

function Clock({ masjid, clockSettings, prayerSettings, iqamathTime, nightMode, masjidName, globalSettings }: ClockProps) {
    const [temperature, setTemperature] = useState<string>('')
    const [time, setTime] = useState(new Date())
    const [nextPrayer, setNextPrayer] = useState<{ name: string; time: Date; iqamah: Date } | null>(null)
    const [hijriDate, setHijriDate] = useState(globalSettings.hijri_date)
    const [showIqamahCountdown, setShowIqamahCountdown] = useState(false)
    const [showSwitchOffPhones, setShowSwitchOffPhones] = useState(false)
    const [iqamahCountdown, setIqamahCountdown] = useState(0)

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

            if (nextPrayer) {
                if (now >= nextPrayer.time && now < nextPrayer.iqamah) {
                    setShowIqamahCountdown(true)
                    const countdown = Math.floor((nextPrayer.iqamah.getTime() - now.getTime()) / 1000)
                    setIqamahCountdown(countdown)
                } else if (now >= nextPrayer.iqamah && now < addMinutes(nextPrayer.iqamah, 0.2)) { // 12 seconds
                    setShowIqamahCountdown(false)
                    setShowSwitchOffPhones(true)
                } else {
                    setShowIqamahCountdown(false)
                    setShowSwitchOffPhones(false)
                }
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [nextPrayer, prayerSettings, globalSettings.hijri_date])

    function calculateNextPrayer(currentTime: Date) {
        const coordinates = new Coordinates(
            locationCoordinates[prayerSettings.location as keyof typeof locationCoordinates].latitude,
            locationCoordinates[prayerSettings.location as keyof typeof locationCoordinates].longitude
        )
        const params = CalculationMethod.MuslimWorldLeague()
        const prayerTimes = new PrayerTimes(coordinates, currentTime, params)

        function getIqamahTime(prayerTime: Date, iqamahSetting: string[]): Date {
            if (iqamahSetting[2] === "1") {
                return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), parseInt(iqamahSetting[1].slice(0, 2)), parseInt(iqamahSetting[1].slice(3, 5)), parseInt(iqamahSetting[1].slice(6, 8)))
            } else {
                const minutesToAdd = parseInt(iqamahSetting[0], 10)
                return addMinutes(prayerTime, minutesToAdd)
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
        if (showIqamahCountdown) {
            return <IqamahCountdown countdown={iqamahCountdown} />
        } else if (showSwitchOffPhones) {
            return <SwitchOffPhones />
        } else {
            const commonProps = {
                iqamathTime,
                masjidName,
                temperature,
                clockSettings,
                prayerSettings,
                hijriDate,
                time,
                nextPrayer,
                getEnglishDate,
                formatTime,
            }
            switch (clockSettings.theme) {
                case '1':
                    return <FullDark {...commonProps} />
                case '2':
                    return <FullLight {...commonProps} />
                default:
                    return <FullDark {...commonProps} />
            }
        }
    }

    return (
        <div>
            {renderClockComponent()}
        </div>
    )
}

export default Clock
