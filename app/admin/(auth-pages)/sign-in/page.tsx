'use client'

import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [message, setMessage] = useState<Message | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await signInAction(formData);
    if (result?.error) {
      setMessage({ error: result.error });
    }
  }

  return (
    <div className="min-h-screen bg-emerald-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center">
            <Image src="/mosque.png" alt="Mosque Logo" width={80} height={80} className="mx-auto" priority />
            <h1 className="mt-6 text-3xl font-extrabold text-emerald-900">Sign in</h1>
          </div>
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  placeholder="you@example.com"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <SubmitButton className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
              <LogIn className="mr-2 h-3 w-3" />
              Sign in
            </SubmitButton>
            {message && <FormMessage message={message} />}
          </form>
        </div>
      </div>
    </div>
  );
}
