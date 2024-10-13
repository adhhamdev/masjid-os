'use client'

import { verifyOtp } from '@/app/actions'
import { useToast } from '@/components/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

export default function ResetPasswordPage({ params }: { params: { id: string } }) {
    const [isPending, startTransition] = useTransition()
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [errors, setErrors] = useState({ otp: '', newPassword: '' })
    const router = useRouter()
    const { toast } = useToast()

    const validateForm = () => {
        let isValid = true
        const newErrors = { otp: '', newPassword: '' }

        if (otp.length !== 6) {
            newErrors.otp = 'OTP must be 6 characters long'
            isValid = false
        }

        if (newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters long'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const onSubmit = async () => {
        if (!validateForm()) return

        startTransition(async () => {
            try {
                await verifyOtp(otp, params.id, newPassword);

                toast({
                    title: 'Password Reset Successful',
                    description: 'Your password has been reset successfully.',
                })

                router.push('/superadmin')
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to reset password. Please try again.',
                    variant: 'destructive',
                })
            }
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center">Reset Password</h1>
                <form action={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP Code</label>
                        <Input
                            id="otp"
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        {errors.otp && <p className="mt-1 text-sm text-red-600">{errors.otp}</p>}
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                        <Input
                            id="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
                    </div>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Resetting...
                            </>
                        ) : (
                            'Reset Password'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}
