import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Prayer {
    name: string
    time: string | undefined
    minutes: number[]
    mode: string
}

interface IqamathTimeProps {
    iqamathTime: any
}

function IqamathTime({ iqamathTime }: IqamathTimeProps) {
    const azanTimes: Prayer[] = [
        { name: 'fajr', time: iqamathTime?.fajr?.[1], minutes: iqamathTime?.fajr?.[0] || "", mode: iqamathTime?.fajr?.[2] || "" },
        { name: 'dhuhr', time: iqamathTime?.dhuhr?.[1], minutes: iqamathTime?.dhuhr?.[0] || "", mode: iqamathTime?.dhuhr?.[2] || "" },
        { name: 'asr', time: iqamathTime?.asr?.[1], minutes: iqamathTime?.asr?.[0] || "", mode: iqamathTime?.asr?.[2] || "" },
        { name: 'maghrib', time: iqamathTime?.maghrib?.[1], minutes: iqamathTime?.maghrib?.[0] || "", mode: iqamathTime?.maghrib?.[2] || "" },
        { name: 'isha', time: iqamathTime?.isha?.[1], minutes: iqamathTime?.isha?.[0] || "", mode: iqamathTime?.isha?.[2] || "" },
    ];

    const [selectedModes, setSelectedModes] = useState<{ [key: string]: '0' | '1' }>(
        {
            fajr: iqamathTime?.fajr?.[2] || "0",
            dhuhr: iqamathTime?.dhuhr?.[2] || "0",
            asr: iqamathTime?.asr?.[2] || "0",
            maghrib: iqamathTime?.maghrib?.[2] || "0",
            isha: iqamathTime?.isha?.[2] || "0",
        }
    );

    function handleCheckboxChange(prayerName: string, checked: boolean) {
        setSelectedModes(prev => ({ ...prev, [prayerName]: checked ? '1' : '0' }));
    }

    return (
        <>
            <div className="min-w-full">
                {azanTimes.map((prayer) => (
                    <div key={prayer.name} className="mb-6 pb-6 border-b last:border-b-0">
                        <div className="flex flex-col sm:flex-row sm:items-center mb-2">
                            <h3 className="text-lg font-semibold mb-2 sm:mb-0 sm:w-1/4">{prayer.name.charAt(0).toUpperCase() + prayer.name.slice(1)}</h3>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                            <div className="flex-1">
                                <Label htmlFor={`minutes-${prayer.name}`} className="mb-1 block">Minutes after Azan</Label>
                                <Input
                                    id={`minutes-${prayer.name}`}
                                    type="number"
                                    className="w-full"
                                    placeholder="Minutes after Azan"
                                    disabled={selectedModes[prayer.name] === '1'}
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
                                    disabled={selectedModes[prayer.name] === '0'}
                                    defaultValue={prayer.time}
                                    name={`fixed-time-${prayer.name}`}
                                    step='1'
                                    required
                                />
                            </div>
                            <div className="flex items-center space-x-2 sm:w-1/4">
                                <Checkbox
                                    id={`fixed-${prayer.name}`}
                                    checked={selectedModes[prayer.name] === '1'}
                                    onCheckedChange={(checked) => handleCheckboxChange(prayer.name, checked as boolean)}
                                />
                                <Label htmlFor={`fixed-${prayer.name}`}>Fixed Time</Label>
                            </div>
                            <input type="hidden" name={`iqamath-mode-${prayer.name}`} value={selectedModes[prayer.name]} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default IqamathTime
