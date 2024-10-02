"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Prayer {
    name: string
    time: string | undefined
    minutes: number[]
}

interface IqamathTimeProps {
    iqamathTime: any
}

function IqamathTime({ iqamathTime }: IqamathTimeProps) {
    console.log(iqamathTime)
    const azanTimes: Prayer[] = [
        { name: 'fajr', time: iqamathTime?.fajr?.[1], minutes: iqamathTime?.fajr?.[0] },
        { name: 'dhuhr', time: iqamathTime?.dhuhr?.[1], minutes: iqamathTime?.dhuhr?.[0] },
        { name: 'asr', time: iqamathTime?.asr?.[1], minutes: iqamathTime?.asr?.[0] },
        { name: 'maghrib', time: iqamathTime?.maghrib?.[1], minutes: iqamathTime?.maghrib?.[0] },
        { name: 'isha', time: iqamathTime?.isha?.[1], minutes: iqamathTime?.isha?.[0] },
    ];

    const [selectedInputs, setSelectedInputs] = useState<Record<string, 'minutes' | 'fixed'>>(
        Object.fromEntries(azanTimes.map(prayer => [prayer.name, prayer.time ? 'fixed' : 'minutes']))
    );

    function handleCheckboxChange(prayerName: string, checked: boolean) {
        setSelectedInputs(prev => ({ ...prev, [prayerName]: checked ? 'fixed' : 'minutes' }));
    }

    return (
        <Card>
            <CardContent className="space-y-4 pt-4 overflow-x-auto">
                <div className="min-w-full">
                    {azanTimes.map((prayer) => (
                        <div key={prayer.name} className="mb-6 pb-6 border-b last:border-b-0">
                            <div className="flex flex-col sm:flex-row sm:items-center mb-2">
                                <h3 className="text-lg font-semibold mb-2 sm:mb-0 sm:w-1/4">{prayer.name.charAt(0).toUpperCase() + prayer.name.slice(1)}</h3>
                                <p className="text-sm text-gray-600 sm:w-1/4">Azan Time: {prayer.time || 'N/A'}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                <div className="flex-1">
                                    <Label htmlFor={`minutes-${prayer.name}`} className="mb-1 block">Minutes after Azan</Label>
                                    <Input
                                        id={`minutes-${prayer.name}`}
                                        type="number"
                                        className="w-full"
                                        placeholder="Minutes after Azan"
                                        disabled={selectedInputs[prayer.name] === 'fixed'}
                                        defaultValue={prayer?.minutes.toString()}
                                        name={`minutes-${prayer.name}`}
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <Label htmlFor={`fixed-time-${prayer.name}`} className="mb-1 block">Fixed Iqamath Time</Label>
                                    <Input
                                        id={`fixed-time-${prayer.name}`}
                                        type="time"
                                        className="w-full "
                                        placeholder="Fixed Iqamath Time"
                                        disabled={selectedInputs[prayer.name] === 'minutes'}
                                        defaultValue={prayer.time}
                                        name={`fixed-time-${prayer.name}`}
                                        step='1'
                                        required
                                    />
                                </div>
                                <div className="flex items-center space-x-2 sm:w-1/4">
                                    <Checkbox
                                        id={`fixed-${prayer.name}`}
                                        checked={selectedInputs[prayer.name] === 'fixed'}
                                        onCheckedChange={(checked) => handleCheckboxChange(prayer.name, checked as boolean)}
                                    />
                                    <Label htmlFor={`fixed-${prayer.name}`}>Fixed Time</Label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export default IqamathTime
