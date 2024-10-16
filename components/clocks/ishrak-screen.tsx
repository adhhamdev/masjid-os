import { lcdTime } from '@/fonts'
import { formatTime } from '@/lib/utils'

export default function IshrakScreen() {
    const now = new Date()

    return (
        <div className="flex flex-col h-screen w-screen bg-emerald-100 text-emerald-900 font-sans overflow-hidden">
            <div className="bg-emerald-600 p-4 text-center text-2xl sm:text-3xl md:text-4xl font-bold text-white border-b-2 border-emerald-700">
                ISHRAK PRAYER TIME
            </div>
            <div className="flex-1 flex flex-col justify-center items-center p-8">
                <div className={`text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold ${lcdTime.className} text-emerald-700 mb-8`}
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{ __html: formatTime(now, true) }}
                />
                <p className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold text-emerald-800">
                    It's time for Ishrak prayer.<br />May Allah accept our prayers.
                </p>
            </div>
        </div>
    )
}
