'use client';

import { updateGlobalSettings } from "@/app/actions";
import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from 'react';

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

    const handleSubmit = async (formData: FormData) => {
        try {
            startTransition(async () => {
                await updateGlobalSettings(formData);

            });
            toast({
                title: "Success",
                description: "Global settings updated successfully",
            });
            setOpen(false);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update global settings",
                variant: "destructive",
            });
        }
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
                        <Input
                            id="hijri_date"
                            type="text"
                            placeholder="e.g., 15 Ramadan 1444"
                            defaultValue={globalSettings.hijri_date || ''}
                            name="hijri_date"
                        />
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