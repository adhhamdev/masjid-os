'use client'

import { createMasjid } from '@/app/actions'
import { useToast } from '@/components/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function AddMasjidModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const masjidName = formData.get('masjidName') as string
        const email = formData.get('email') as string

        try {
            const result = await createMasjid({ masjidName, email })
            if (result.error) {
                throw new Error(result.error)
            }
            toast({
                title: 'Success',
                description: 'New Masjid created successfully',
            })
            setIsOpen(false)
            router.refresh()
        } catch (error) {
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to create new Masjid',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Masjid
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Masjid</DialogTitle>
                    <DialogDescription>
                        Enter the details for the new Masjid.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="masjidName">Masjid Name</Label>
                            <Input id="masjidName" name="masjidName" required />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" required />
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Create Masjid'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}