interface PosterProps {
    hours: string;
    minutes: string;
    seconds: string;
    azanTime: string;
    iqamahTime: string;
}

export default function Poster({ hours, minutes, seconds, azanTime, iqamahTime }: PosterProps) {
    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center text-white font-mono p-4"
            style={{
                backgroundImage: "url('/mosque-poster-bg.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
            <div className="relative z-10 flex flex-col items-start">
                <div className="flex items-center mb-4 sm:mb-6">
                    <div className="text-xl sm:text-2xl md:text-3xl w-16 sm:w-24 text-right mr-2 sm:mr-6">Time</div>
                    <div className="text-green-500 text-4xl sm:text-6xl md:text-8xl font-extrabold shadow-text" aria-live="polite" suppressHydrationWarning>
                        {`${hours}:${minutes}:${seconds}`}
                    </div>
                </div>
                <div className="flex items-center mb-4 sm:mb-6">
                    <div className="text-xl sm:text-2xl md:text-3xl w-16 sm:w-24 text-right mr-2 sm:mr-6">Azan</div>
                    <div className="text-yellow-500 text-5xl sm:text-7xl md:text-9xl font-extrabold shadow-text">
                        {azanTime}
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="text-xl sm:text-2xl md:text-3xl w-16 sm:w-24 text-right mr-2 sm:mr-6">Iqamah</div>
                    <div className="text-red-500 text-4xl sm:text-6xl md:text-8xl font-extrabold shadow-text">
                        {iqamahTime}
                    </div>
                </div>
            </div>
        </div>
    )
}