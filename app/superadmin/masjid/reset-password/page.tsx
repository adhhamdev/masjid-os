'use client'

import { resetPassword } from '@/app/actions'
import { useToast } from '@/components/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

export default function ResetPasswordPage() {
    const [isPending, startTransition] = useTransition()
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({ newPassword: '', confirmPassword: '' })
    const router = useRouter()
    const { toast } = useToast()

    const validateForm = () => {
        let isValid = true
        const newErrors = { newPassword: '', confirmPassword: '' }

        if (newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters long'
            isValid = false
        }

        if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const onSubmit = async (formData: FormData) => {
        if (!validateForm()) return

        startTransition(async () => {
            try {
                await resetPassword(formData.get('newPassword') as string)

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
        <div className="flex items-center justify-center min-h-screen bg-background px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Reset Your Password</CardTitle>
                    <CardDescription className="text-center">Enter your new password below</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" action={onSubmit}>
                        <div className="space-y-2">
                            <label htmlFor="new-password" className="text-sm font-medium text-foreground">New Password</label>
                            <Input
                                id="new-password"
                                name="newPassword"
                                type="password"
                                required
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            {errors.newPassword && <p className="text-sm text-destructive">{errors.newPassword}</p>}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="confirm-password" className="text-sm font-medium text-foreground">Confirm Password</label>
                            <Input
                                id="confirm-password"
                                name="confirmPassword"
                                type="password"
                                required
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
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
                </CardContent>
            </Card>
        </div>
    )
}
