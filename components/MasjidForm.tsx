'use client'

import { deleteMasjid, requestResetPassword, updateMasjidProStatus } from '@/app/actions'
import { useToast } from '@/components/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function MasjidForm({ masjid }: { masjid: any }) {
    const { toast } = useToast()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isResetting, setIsResetting] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true)
        try {
            await updateMasjidProStatus(masjid.id, formData.get('pro') === 'Yes')
            toast({
                title: 'Success',
                description: 'Masjid Pro status updated successfully',
            })
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update Masjid Pro status',
                variant: 'destructive',
            })
        }
        setIsLoading(false)
    }

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await deleteMasjid(masjid.id)
            toast({
                title: 'Success',
                description: 'Masjid deleted successfully',
            })
            router.push('/superadmin')
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete masjid',
                variant: 'destructive',
            })
        }
        setIsDeleting(false)
        setIsDeleteDialogOpen(false)
    }

    const handleResetPassword = async () => {
        setIsResetting(true)
        try {
            const { error } = await requestResetPassword(masjid.contact.email)
            if (error) {
                throw new Error(error || 'Failed to send verification code')
            }
            toast({
                title: 'Success',
                description: `A password reset link has been sent to ${masjid.contact.email}.`,
            })
        } catch (error) {
            console.error('Password reset error:', error)
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'An unexpected error occurred',
                variant: 'destructive',
            })
        } finally {
            setIsResetting(false)
        }
    }

    return (
        <div className="space-y-6 w-full sm:max-w-sm">
            <form action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="pro" className="text-sm font-medium">Pro Status</label>
                    <Select name="pro" defaultValue={masjid.pro ? 'Yes' : 'No'}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Pro status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        'Save Changes'
                    )}
                </Button>
            </form>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => handleResetPassword()} className="w-full sm:w-auto">
                    {isResetting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Resetting...
                        </>
                    ) : (
                        'Reset Password'
                    )}
                </Button>
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="destructive" className="w-full sm:w-auto">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Masjid
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure you want to delete {masjid.contact.masjid_name}?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete the Masjid and all associated data.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete'
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
