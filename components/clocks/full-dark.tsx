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
        <div className={`flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-b from-[#000001] to-[#0f1925] ${montserrat.className}`}>
            <div className="text-white text-center">
                <div className="text-4xl font-bold mb-2">{islamicDate}</div>
                <div className="text-2xl">{englishDate}</div>
            </div>
            <div className="text-[10rem] font-bold tracking-wider flex items-center" aria-live="polite">
                <span className="text-white w-[1.3em] text-center">{hours}</span>
                <span className="text-white w-[0.3em] text-center">:</span>
                <span className="text-white w-[1.3em] text-center">{minutes}</span>
                <span className="text-white w-[0.3em] text-center">:</span>
                <div className="flex text-gray-600 w-[1.4em]">
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
    );
}