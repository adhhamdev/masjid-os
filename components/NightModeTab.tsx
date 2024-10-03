'use client'
import { updateClockNightMode } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Loader2, Save } from 'lucide-react'
import { useState, useTransition } from 'react'
import { FormMessage } from './form-message'

export default function NightModeTab({ nightMode, clockSettings }: { nightMode: any, clockSettings: any }) {
    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<any>(null)

    const handleSubmit = async (formData: FormData) => {
        setMessage(null)
        startTransition(async () => {
            const response = await updateClockNightMode(formData, clockSettings)
            setMessage(response)
        })
    }

    return (
        <form action={handleSubmit}>
            <Card>
                <CardContent className='space-y-4 pt-4'>
                    <div>
                        <label className='block text-sm font-medium mb-1 text-gray-700' htmlFor='startTime'>
                            Night Mode Start Time
                        </label>
                        <Input
                            id='startTime'
                            type='time'
                            className='focus-visible:ring-gray-500'
                            defaultValue={nightMode?.start_time}
                            name='start-time'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium mb-1 text-gray-700' htmlFor='endTime'>
                            Night Mode End Time
                        </label>
                        <Input
                            id='endTime'
                            type='time'
                            className='focus-visible:ring-gray-500'
                            defaultValue={nightMode?.end_time}
                            name='end-time'
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
                            Save Night Mode Settings
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