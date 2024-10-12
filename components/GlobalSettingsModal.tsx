'use client';

import { updateGlobalSettings } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from 'react';

const hijriMonths = [
    'Muharram', 'Safar', "Rabi-al-Awwal", "Rabi-al-Akhir",
    'Jumada-al-Ula', 'Jumada-al-Akhir', 'Rajab', "Sha'ban",
    'Ramadan', 'Shawwal', "Dhu-al-Qi'dah", 'Dhu-al-Hijjah'
];

interface GlobalSettingsModalProps {
    children: React.ReactNode;
    globalSettings: {
        id: number;
        hijri_date: string;
    };
}

export default function GlobalSettingsModal({ children, globalSettings }: GlobalSettingsModalProps) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    console.log(day, month, year);

    useEffect(() => {
        if (globalSettings.hijri_date) {
            const [d, m, y] = globalSettings.hijri_date.split(' ');
            setDay(d);
            setMonth(m);
            setYear(y.replace(' AH', ''));
        }
    }, [globalSettings.hijri_date]);

    const handleSubmit = async () => {
        startTransition(async () => {
            await updateGlobalSettings(`${day} ${month} ${year} AH`);
            setOpen(false);
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Global Settings</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Update the global settings for the system.
                </DialogDescription>
                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="hijri_date">Hijri Date</Label>
                        <div className="flex space-x-2">
                            <Input
                                id="hijri_day"
                                type="number"
                                placeholder="Day"
                                min="1"
                                max="30"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                className="w-20"
                            />
                            <Select value={month} onValueChange={setMonth}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent>
                                    {hijriMonths.map((m) => (
                                        <SelectItem key={m} value={m}>
                                            {m}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Input
                                id="hijri_year"
                                type="number"
                                placeholder="Year"
                                min="1"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="w-24"
                            />
                            <span className="flex items-center">AH</span>
                        </div>
                    </div>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
