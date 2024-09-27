'use client'

import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const whatsappNumber = "+94743193834"
const whatsappMessage = encodeURIComponent("Hello! I'm interested in the Islamic Center Management System.")
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

function LoginForm() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (searchParams.has('logout')) {
      setMessage({ success: 'You have been logged out. Please sign in again.' });
    } else if (searchParams.has('timeout')) {
      setMessage({ error: 'Your session has expired due to inactivity. Please sign in again.' });
    }
  }, [searchParams]);

  async function handleSubmit(formData: FormData) {
    const result = await signInAction(formData);
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
            className="mt-1 block w-full rounded-md shadow-sm "
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
            autoComplete="current-passwor"
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

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center" style={{ backgroundImage: 'url(/login-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center">
            <Image src="/mosque.png" alt="Mosque Logo" width={80} height={80} className="mx-auto" priority />
            <h1 className="mt-6 text-3xl font-extrabold text-emerald-900">Sign in as Admin</h1>
            <p className="text-sm text-emerald-700 mt-2">Please enter your email and password to sign in.</p>
          </div>
          <Suspense fallback={<div className="text-center text-emerald-900 mt-4 ">Loading...</div>}>
            <LoginForm />
          </Suspense>
          {/* <hr className="my-8" /> */}
          <div className="text-center mt-1">
            <p className="text-sm text-emerald-700">Not an admin?</p>
            <Link href={whatsappLink} target="_blank" className="text-emerald-700 font-bold underline">WhatsApp Us</Link> to get the product get started.
          </div>
        </div>
      </div>
    </div >
  );
}
