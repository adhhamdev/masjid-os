'use client';

import { updateGlobalSettings } from "@/app/actions";
import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { useForm } from "react-hook-form";

interface GlobalSettingsModalProps {
    children: React.ReactNode;
    globalSettings: {
        id: number;
        hijri_date: string;
    };
}

export default function GlobalSettingsModal({ children, globalSettings }: GlobalSettingsModalProps) {
    const [open, setOpen] = useState(false);
    const form = useForm({
        defaultValues: {
            hijri_date: globalSettings.hijri_date || '',
        },
    });

    const onSubmit = async (data: { hijri_date: string }) => {
        try {
            await updateGlobalSettings(data);
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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Global Settings</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="hijri_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hijri Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Save Changes</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}