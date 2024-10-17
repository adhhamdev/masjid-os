import Image from 'next/image'

export default function NightModeScreen() {
    return (
        <div className="fixed inset-0">
            <Image
                src="/night-mode.jpeg"
                alt="Night mode background"
                className='w-full h-full object-cover'
                quality={100}
                priority
                width={1200}
                height={750}
            />
        </div>
    )
}
