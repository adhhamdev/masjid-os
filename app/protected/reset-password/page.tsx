"use client";

import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";

export default function ResetPassword() {
  const [message, setMessage] = useState<Message | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await resetPasswordAction(formData);
    if ("error" in result) {
      setMessage({ error: result.error! });
    } else if ("success" in result) {
      setMessage({ success: result.success! });
    }
  }

  return (
    <div className="min-h-screen bg-emerald-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center">
            <Image src="/mosque.png" alt="Mosque Logo" width={80} height={80} className="mx-auto" />
            <h1 className="mt-6 text-3xl font-extrabold text-emerald-900">Reset Password</h1>
            <p className="mt-2 text-sm text-emerald-600">
              Enter your new password below
            </p>
          </div>
          <form className="mt-8 space-y-6" action={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">New password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <SubmitButton className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
              Reset Password
            </SubmitButton>
            {message && <FormMessage message={message} />}
          </form>
        </div>
      </div>
    </div>
  );
}
