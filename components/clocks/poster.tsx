
interface PosterProps {
    hours: string;
    minutes: string;
    seconds: string;
    azanTime: string;
    iqamahTime: string;
}

export default function Poster({ hours, minutes, seconds, azanTime, iqamahTime }: PosterProps) {
    const timeStyle = {
        fontWeight: 900,
        textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff, 2px 2px 4px rgba(0,0,0,0.5)',
    }

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center text-white font-mono"
            style={{
                backgroundImage: "url('/mosque-poster-bg.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
            <div className="relative z-10 flex flex-col items-start">
                <div className="flex items-center mb-4">
                    <div className="text-3xl w-24 text-right mr-6">Time</div>
                    <div className="text-green-500 text-8xl" style={timeStyle} aria-live="polite" suppressHydrationWarning>
                        {`${hours}:${minutes}:${seconds}`}
                    </div>
                </div>
                <div className="flex items-center mb-4">
                    <div className="text-3xl w-24 text-right mr-6">Azan</div>
                    <div className="text-yellow-500 text-9xl" style={timeStyle}>
                        {azanTime}
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="text-3xl w-24 text-right mr-6">Iqamah</div>
                    <div className="text-red-500 text-8xl" style={timeStyle}>
                        {iqamahTime}
                    </div>
                </div>
            </div>
        </div>
    )
}