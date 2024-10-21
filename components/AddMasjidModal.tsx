'use client'

import { createMasjid } from '@/app/actions'
import { useToast } from '@/components/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Plus } from 'lucide-react'
import { useState, useTransition } from 'react'

interface AddMasjidModalProps {
    includeAdditionalFields?: boolean
}

export function AddMasjidModal({ includeAdditionalFields = false }: AddMasjidModalProps) {
    const [open, setOpen] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [clockCode, setClockCode] = useState('')
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()

    const handleSubmit = async (formData: FormData) => {
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirm-password') as string

        if (password !== confirmPassword) {
            setPasswordError("Passwords don't match")
            return
        }

        setPasswordError('')
        startTransition(async () => {
            const result = await createMasjid(formData)

            if (result.error) {
                toast({
                    title: "Error",
                    description: result.error,
                    variant: "destructive",
                })
            } else {
                toast({
                    title: "Success",
                    description: "Masjid created successfully",
                })
                setOpen(false)
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Masjid
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Masjid</DialogTitle>
                    <DialogDescription>
                        Add a new masjid.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Masjid Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter masjid name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                name='confirm-password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                                required
                            />
                            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clockCode">Clock Code</Label>
                            <Input
                                id="clockCode"
                                name='clock-code'
                                value={clockCode}
                                onChange={(e) => setClockCode(e.target.value)}
                                placeholder="Enter clock code"
                                required
                            />
                        </div>
                    </>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Adding Masjid...
                            </>
                        ) : (
                            'Add Masjid'
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}