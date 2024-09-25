"use client"

import { montserrat } from '@/fonts'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const AnimatedDigit = ({ digit }: { digit: string }) => (
    <div className="relative w-[0.65em] h-[1em] overflow-hidden">
        <AnimatePresence mode="popLayout">
            <motion.span
                key={digit}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center"
            >
                {digit}
            </motion.span>
        </AnimatePresence>
    </div>
)

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
    const iqamahTime = "05:45 AM"

    // Placeholder for Islamic date (you'll need to implement actual conversion)
    const islamicDate = "15 Ramadan 1444"
    const englishDate = time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    return (
        <div className={`flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-b from-[#000001] to-[#0f1925] ${montserrat.className}`}>
            <div className="text-white text-center mb-8">
                <div className="text-4xl font-bold mb-2">{islamicDate}</div>
                <div className="text-2xl">{englishDate}</div>
            </div>
            <div className="text-9xl font-bold tracking-wider flex items-center mb-12" aria-live="polite">
                <span className="text-white w-[1.3em] text-center">{hours}</span>
                <span className="text-white w-[0.3em] text-center">:</span>
                <span className="text-white w-[1.3em] text-center">{minutes}</span>
                <span className="text-white w-[0.3em] text-center">:</span>
                <div className="flex text-gray-600 w-[1.3em]">
                    <AnimatedDigit digit={seconds[0]} />
                    <AnimatedDigit digit={seconds[1]} />
                </div>
            </div>
            <div className="text-7xl text-white text-center">
                <div className="mb-4">
                    <span className="font-bold text-yellow-300">{azanTime}</span>
                </div>
                <div>
                    <span className="font-bold text-green-300">{iqamahTime}</span>
                </div>
            </div>
        </div>
    )
}

export default function Clock() {
    return <ClientTime />
}