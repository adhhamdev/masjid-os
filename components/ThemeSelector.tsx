"use client"
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { useState } from "react";

export default function ThemeSelector({ theme }: { theme: string }) {
    const [selectedTheme, setSelectedTheme] = useState(theme);

    const handleThemeChange = (value: string) => {
        setSelectedTheme(value);
    };

    const themes = [
        { id: '1', name: 'Black', image: '/clocks/black.png' },
    ]

    return (
        <>
            <h3 className='text-lg font-semibold mb-4 text-gray-800'>
                Select Theme
            </h3>
            <RadioGroup value={selectedTheme} onValueChange={handleThemeChange} name="theme">
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                    {themes.map((themeitem) => (
                        <div key={themeitem.id} className='flex items-center space-x-2'>
                            <RadioGroupItem value={themeitem.id} id={themeitem.id} className='sr-only' />
                            <Label
                                htmlFor={themeitem.id}
                                className='flex flex-col items-center cursor-pointer'
                            >
                                <div className='relative'>
                                    <Image
                                        src={themeitem.image}
                                        alt={themeitem.name}
                                        width={200}
                                        height={150}
                                        className={`rounded-md border-2 transition-all duration-200 ease-in-out ${selectedTheme === themeitem.id ? 'border-emerald-500' : 'border-transparent'
                                            }`}
                                    />
                                    {selectedTheme === themeitem.id && (
                                        <div className='absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <span className='mt-2 text-sm font-medium text-gray-700'>
                                    {themeitem.name}
                                </span>
                            </Label>
                        </div>
                    ))}
                </div>
            </RadioGroup>
        </>
    );
}
