"use client"
import { useEffect, useState } from 'react';

export default function IqamahCountdown({ iqamahTime }: { iqamahTime: string }) {

    const [countdown, setCountdown] = useState(0)

    useEffect(() => {
        console.log(iqamahTime)
    }, [iqamahTime])

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCount: number) => (prevCount > 0 ? prevCount - 1 : 0))
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="flex flex-col h-screen w-screen bg-gray-900 text-white font-sans overflow-hidden">
            <div className="bg-gray-800 p-4 text-center text-2xl sm:text-3xl md:text-4xl font-bold border-b-2 border-gray-700">
                IQAMAH COUNTDOWN
            </div>
            <div className="flex-1 flex flex-col justify-center items-center bg-gray-100 p-8">
                <div className="text-red-600 text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold text-center shadow-lg">
                    {countdown.toString().padStart(2, '0')}
                </div>
            </div>
            <div className="bg-gray-200 p-4 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-2xl sm:text-3xl">🚫</span>
                </div>
                <p className="text-black text-lg sm:text-xl md:text-2xl font-semibold leading-tight">
                    Please Turn off Your<br />Mobile Phones
                </p>
            </div>
        </div>
    )
}