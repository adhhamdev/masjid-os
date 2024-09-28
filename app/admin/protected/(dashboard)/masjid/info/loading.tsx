"use client"
export default function Loading() {
    return (
        <div className='min-h-screen py-8'>
            <main className='container mx-auto'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-2xl font-semibold text-gray-800 animate-pulse'>Masjid Information</h2>
                    <div className='bg-emerald-500 animate-pulse h-8 w-24 rounded'></div>
                </div>
                <div className='space-y-4'>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className='animate-pulse'>
                            <div className='h-6 bg-gray-300 rounded mb-2'></div>
                            <div className='h-12 bg-gray-200 rounded'></div>
                        </div>
                    ))}
                </div>
                <div className='mt-8'>
                    <h3 className='text-lg font-semibold mb-4 text-gray-800 animate-pulse'>Masjid Photos</h3>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className='relative aspect-square shadow-inner border border-gray-300 rounded-lg overflow-hidden animate-pulse'>
                                <div className='absolute inset-0 flex items-center justify-center bg-gray-200'></div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}