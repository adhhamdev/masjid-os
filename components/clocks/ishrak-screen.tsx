import { lcdTime } from '@/fonts'
import { formatTime } from '@/lib/utils'
import Image from 'next/image'

export default function IshrakScreen() {
    const now = new Date()

    return (
        <div className="flex flex-col h-screen w-screen font-sans overflow-hidden">
            <div className="relative h-1/2 w-full">
                <Image
                    src="/ishrak-sunrise.jpeg"
                    alt="Sunrise Landscape"
                    className='w-full h-full object-cover'
                    priority
                    width={735}
                    height={489}
                    quality={100}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold text-white text-center">
                        ISHRAK PRAYER TIME
                    </h1>
                </div>
            </div>
            <div className="flex justify-center items-center p-4 sm:p-8">
                <div
                    className={`text-6xl sm:text-8xl md:text-9xl lg:text-[14rem] font-bold ${lcdTime.className}`}
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{ __html: formatTime(now, true) }}
                />
            </div>
        </div>
    )
}
