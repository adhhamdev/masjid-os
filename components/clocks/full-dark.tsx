"use client"

import AnimatedDigit from "@/components/animated-digit";
import { montserrat } from "@/fonts";

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
}

export default function FullDark({
    hours,
    minutes,
    seconds,
    azanTime,
    iqamahTime,
    islamicDate,
    englishDate,
    prayerName,
    temperature,
}: FullDarkProps) {

    return (
        <div className={`flex flex-col justify-between w-screen h-screen bg-gradient-to-b from-[#000001] to-[#0f1925] ${montserrat.className} p-4 landscape:p-6`}>
            <div className="flex justify-between items-start w-full">
                <div className="text-white">
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{temperature}</div>
                </div>
                <div className="text-white text-right">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">{islamicDate}</div>
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">{englishDate}</div>
                </div>
            </div>

            <div className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-bold tracking-wider flex items-center justify-center" aria-live="polite">
                <span className="text-white w-[1.1em] text-center">{hours}</span>
                <span className="text-white w-[0.4em] text-center">:</span>
                <span className="text-white w-[1.4em] text-center">{minutes}</span>
                <span className="text-white w-[0.4em] text-center">:</span>
                <div className="flex text-gray-600 w-[1.2em] text-center">
                    <AnimatedDigit digit={seconds[0]} />
                    <AnimatedDigit digit={seconds[1]} />
                </div>
            </div>

            <div className="flex justify-between w-full">
                <div className="flex flex-col items-center">
                    <span className="font-bold text-yellow-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl">{prayerName}</span>
                    <span className="font-bold text-yellow-300 text-6xl sm:text-7xl md:text-8xl lg:text-9xl">{azanTime}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-bold text-green-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl">Iqamah</span>
                    <span className="font-bold text-green-300 text-6xl sm:text-7xl md:text-8xl lg:text-9xl">{iqamahTime}</span>
                </div>
            </div>
        </div>
    );
}