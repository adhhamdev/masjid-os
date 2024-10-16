import { Phone } from 'lucide-react'

export default function IqamahCountdown({ countdown }: { countdown: string }) {
    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-black text-white">
            <div className="w-full flex-grow flex flex-col lg:flex-row items-center justify-center gap-8 p-6">
                <div className="flex-shrink-0">
                    <div className="relative w-48 h-48 lg:w-96 lg:h-96">
                        <div className="w-full h-full rounded-full border-8 border-red-600 flex items-center justify-center">
                            <Phone className="w-2/3 h-2/3 text-red-600" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[120%] h-2 bg-red-600 transform -rotate-45"></div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center space-y-4 lg:space-y-6 text-center lg:text-left max-w-3xl">
                    <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
                        PLEASE SWITCH OFF YOUR MOBILE PHONE BEFORE ENTERING THE MASJID
                    </h1>

                    <p className="text-xl lg:text-3xl font-medium">
                        தயவு செய்து மஸ்ஜிதுக்கு நுழையும் முன்பே உங்கள் கைப்பேசியை முடக்கவும்
                    </p>

                    <p className="text-xl lg:text-3xl font-medium">
                        මස්ජිදයට ඇතුළු වීමට පෙර කරුණාකර ඔබගේ ජංගම දුරකථනය ක්‍රියා විරහිත කරන්න
                    </p>
                </div>
            </div>

            <div className="w-full h-[25vh] flex items-center justify-center bg-gradient-to-t from-red-600 to-red-800">
                <div className="text-6xl lg:text-9xl font-bold text-white">{countdown}</div>
            </div>
        </div>
    )
}
