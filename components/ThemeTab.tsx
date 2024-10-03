'use client'

import { updateClockTheme } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Save } from 'lucide-react'
import { useState, useTransition } from 'react'
import { FormMessage } from './form-message'

export default function ThemeTab({ theme, masjid }: { theme: string, masjid: any }) {
    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<any>(null)

    const handleSubmit = async (formData: FormData) => {
        setMessage(null)
        startTransition(async () => {
            const response = await updateClockTheme(formData, masjid)
            setMessage(response)
        })
    }

    return (
        <form action={handleSubmit}>
            <Card>
                <CardContent className='space-y-4 pt-4'>
                    <div>
                        <label className='block text-sm font-medium mb-1 text-gray-700' htmlFor='theme'>
                            Theme
                        </label>
                        <Select defaultValue={theme} name="theme">
                            <SelectTrigger className='border-gray-300 focus:border-gray-500'>
                                <SelectValue placeholder='Select theme' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='light'>Light</SelectItem>
                                <SelectItem value='dark'>Dark</SelectItem>
                            </SelectContent>
                        </Select>
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
                            Save Theme
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