"use client";
import { signOutAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useTransition } from 'react';

export function LogoutButton() {
    const [isPending, startTransition] = useTransition();

    function handleLogout(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        startTransition(() => {
            signOutAction();
        });
    }

    return (
        <form onSubmit={handleLogout} className="w-full">
            <Button variant="destructive" className="w-full flex items-center py-2 px-3 text-sm cursor-pointer" disabled={isPending}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{isPending ? 'Logging out...' : 'Logout'}</span>
            </Button>
        </form>
    );
}