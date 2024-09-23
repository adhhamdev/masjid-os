"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
    pendingText?: string;
};

export function SubmitButton({
    children,
    pendingText = "Submitting...",
    ...props
}: Props) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} aria-disabled={pending} {...props}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    {pendingText}
                </>
            ) : (
                children
            )}
        </Button>
    );
}