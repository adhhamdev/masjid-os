"use client"

interface IqamahCountdownProps {
    countdown: number;
}

export default function IqamahCountdown({ countdown }: IqamahCountdownProps) {
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
        </div>
    );
}
