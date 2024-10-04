'use client'

import { updateClockMasjidDetails } from '@/app/actions'
import { FormMessage } from '@/components/form-message'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Loader2, Save } from 'lucide-react'
import { useState, useTransition } from 'react'

export default function MasjidDetailsTab({ clockSettings, masjid }: { clockSettings: any, masjid: any }) {
    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<any>(null)

    const handleSubmit = async (formData: FormData) => {
        setMessage(null)
        startTransition(async () => {
            const response = await updateClockMasjidDetails(formData, masjid)
            setMessage(response)
        })
    }

    return (
        <form action={handleSubmit}>
            <Card>
                <CardContent className='space-y-4 pt-4'>
                    <div>
                        <label
                            className='block text-sm font-medium mb-1 text-gray-700'
                            htmlFor='masjidName'>
                            Masjid Name
                        </label>
                        <Input
                            id='masjidName'
                            placeholder='Enter Masjid Name'
                            className='focus-visible:ring-gray-500'
                            defaultValue={clockSettings?.masjid_name}
                            name='masjid-name'
                        />
                    </div>
                    <div className='space-y-2'>
                        <Button
                            type="submit"
                            className='bg-emerald-500 hover:bg-emerald-600 text-white'
                            disabled={isPending}
                        >
                            {isPending ? (
                                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                            ) : (
                                <Save className='w-4 h-4 mr-2' />
                            )}
                            Save Masjid Details
                        </Button>
                        {message && (
                            <FormMessage message={message} />
                        )}
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}