'use client'

import { superAdminSignInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, UserCog } from "lucide-react";
import { Suspense, useState } from 'react';

function SuperAdminLoginForm() {
    const [message, setMessage] = useState<Message | null>(null);

    async function handleSubmit(formData: FormData) {
        const result = await superAdminSignInAction(formData);
        if (result?.error) {
            setMessage({ error: result.error });
        }
    }

    return (
        <form className="mt-8 space-y-6" action={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="mt-1 block w-full rounded-md shadow-sm"
                        placeholder="you@example.com"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck="false"
                    />
                </div>
                <div>
                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="mt-1 block w-full rounded-md shadow-sm"
                        placeholder="••••••••"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck="false"
                        minLength={6}
                        maxLength={64}
                    />
                </div>
            </div>
            <SubmitButton className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                <LogIn className="mr-2 h-4 w-4" />
                Sign in
            </SubmitButton>
            {message && <FormMessage message={message} />}
        </form>
    );
}

export default function SuperAdminLogin() {
    return (
        <div className="min-h-screen bg-emerald-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
                <div className="mx-auto">
                    <div className="text-center">
                        <UserCog className="w-16 h-16 text-emerald-500 mx-auto" />
                        <h1 className="mt-6 text-3xl font-extrabold text-emerald-900">Sign in as Superadmin</h1>
                        <p className="text-sm text-emerald-700 mt-2">Please enter your email and password to sign in.</p>
                    </div>
                    <Suspense fallback={<div className="text-center text-emerald-900 mt-4">Loading...</div>}>
                        <SuperAdminLoginForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}