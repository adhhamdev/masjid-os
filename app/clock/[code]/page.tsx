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

const ClientTime = () => {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    const formatTime = (num: number) => {
        return num.toString().padStart(2, '0')
    }

    const hours = formatTime(time.getHours())
    const minutes = formatTime(time.getMinutes())
    const seconds = formatTime(time.getSeconds())

    // Placeholder data for Azan and Iqamah times
    const azanTime = "05:30 AM"
    const iqamahTime = "12:00 PM";

    // Placeholder for Islamic date (you'll need to implement actual conversion)
    const islamicDate = "15 Ramadan 1444";
    const englishDate = time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    return (
        <div className='select-none pointer-events-none'>
            <FullDark
                hours={hours}
                minutes={minutes}
                seconds={seconds}
                azanTime={azanTime}
                iqamahTime={iqamahTime}
                islamicDate={islamicDate}
                englishDate={englishDate}
            />
        </div>
    )
}

export default function Clock() {
    return <ClientTime />
}