'use client';

import { updateGlobalSettings } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from 'react';

interface GlobalSettingsModalProps {
    children: React.ReactNode;
    globalSettings: {
        id: number;
        hijri_adjust: number;
    };
}

export default function GlobalSettingsModal({ children, globalSettings }: GlobalSettingsModalProps) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [hijriAdjust, setHijriAdjust] = useState(globalSettings.hijri_adjust);

    useEffect(() => {
        if (globalSettings.hijri_adjust) {
            setHijriAdjust(globalSettings.hijri_adjust);
        }
    }, [globalSettings.hijri_adjust]);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            await updateGlobalSettings(formData);
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
                        <Label htmlFor="hijri_adjust">Adjust Hijri Date</Label>
                        <Input
                            id="hijri_adjust"
                            name="hijri_adjust"
                            type="number"
                            value={hijriAdjust}
                            onChange={(e) => setHijriAdjust(Number(e.target.value))}
                            className="w-full"
                            placeholder="Enter days to adjust (-30 to 30)"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Adjust the Hijri date by -30 to 30 days if needed.
                        </p>
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
