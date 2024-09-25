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
}

export default function FullDark({ hours, minutes, seconds, azanTime, iqamahTime, islamicDate, englishDate }: FullDarkProps) {
    return (
        <div className={`flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-b from-[#000001] to-[#0f1925] ${montserrat.className} p-4`}>
            <div className="text-white text-center mb-4 sm:mb-6">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">{islamicDate}</div>
                <div className="text-lg sm:text-xl md:text-2xl">{englishDate}</div>
            </div>
            <div className="text-4xl sm:text-6xl md:text-7xl lg:text-[8rem] font-bold tracking-wider flex items-center mb-4 sm:mb-6" aria-live="polite">
                <span className="text-white w-[1.6em] text-center">{hours}</span>
                <span className="text-white w-[0.3em] text-center">:</span>
                <span className="text-white w-[1.6em] text-center">{minutes}</span>
                <span className="text-white w-[0.3em] text-center">:</span>
                <div className="flex text-gray-600 w-[1.6em] text-center pl-2">
                    <AnimatedDigit digit={seconds[0]} />
                    <AnimatedDigit digit={seconds[1]} />
                </div>
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white text-center">
                <div className="mb-2 sm:mb-4">
                    <span className="font-bold text-yellow-300">{azanTime}</span>
                </div>
                <div>
                    <span className="font-bold text-green-300">{iqamahTime}</span>
                </div>
            </div>
        </div>
    );
}