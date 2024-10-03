"use client"

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

const Clock = ({ masjidName }: { masjidName: string }) => {
    const [time, setTime] = useState(new Date())
    const [temperature, setTemperature] = useState<string>('')
    const [location, setLocation] = useState<string>('')

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        const fetchTemperature = async () => {
            try {
                // working on location based time
                const latitude = 51.5074
                const longitude = -0.1278
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`, { next: { revalidate: 30 * 60 * 1000 } })
                const data = await response.json()
                const temp = data.current_weather.temperature
                setTemperature(`${temp}°C`)
            } catch (error) {
                console.error('Error fetching temperature:', error)
                setTemperature('N/A')
            }
        }

        fetchTemperature()
    }, [])

    const formatTime = (num: number) => {
        return num.toString().padStart(2, '0')
    }

    const hours = formatTime(time.getHours())
    const minutes = formatTime(time.getMinutes())
    const seconds = formatTime(time.getSeconds())

    // Placeholder data for Azan and Iqamah times
    const azanTime = "05:30 AM"
    const iqamahTime = "12:00 PM"

    // Placeholder for Islamic date (you'll need to implement actual conversion)
    const islamicDate = "15 Ramadan 1444"
    const englishDate = time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    return (
        <div>
            <FullDark
                hours={hours}
                minutes={minutes}
                seconds={seconds}
                azanTime={azanTime}
                iqamahTime={iqamahTime}
                islamicDate={islamicDate}
                englishDate={englishDate}
                prayerName={"Dhuhr"}
                temperature={temperature}
                masjidName={masjidName}
            />
        </div>
    )
}

export default Clock