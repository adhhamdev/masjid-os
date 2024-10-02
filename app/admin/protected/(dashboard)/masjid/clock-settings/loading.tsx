"use client";
export default function ClockLoading() {
    return (
        <div className='min-h-screen py-8'>
            <main className='container mx-auto'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-2xl font-semibold text-gray-800'>Clock Settings</h2>
                </div>
                <div className='space-y-4'>
                    <div className='h-10 w-full max-w-md bg-gray-300 rounded animate-pulse'></div>
                    <div className='space-y-4'>
                        {[1, 2, 3, 4].map((index) => (
                            <div key={index} className='bg-white rounded-lg shadow-sm p-6 animate-pulse'>
                                <div className='h-6 w-1/4 bg-gray-300 rounded mb-4'></div>
                                <div className='space-y-3'>
                                    <div className='h-10 w-full bg-gray-200 rounded'></div>
                                    <div className='h-10 w-full bg-gray-200 rounded'></div>
                                    <div className='h-10 w-full bg-gray-200 rounded'></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
