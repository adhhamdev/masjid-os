'use client'
import { updateClockNightMode } from '@/app/actions'
import { FormMessage } from '@/components/form-message'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Save } from 'lucide-react'
import { useState, useTransition } from 'react'

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
                <CardContent className="space-y-6 pt-4">
                    <h3 className='text-lg font-semibold mb-4 text-gray-800'>
                        Night Mode
                    </h3>
                    <div className='space-y-4'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                            <div>
                                <label htmlFor='fromTime' className='block text-sm font-medium text-gray-700 mb-1'>
                                    From Time
                                </label>
                                <Input
                                    id='fromTime'
                                    type='time'
                                    className='w-full'
                                    defaultValue={nightMode?.from}
                                    name='nightmode-from'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='toTime' className='block text-sm font-medium text-gray-700 mb-1'>
                                    To Time
                                </label>
                                <Input
                                    id='toTime'
                                    type='time'
                                    className='w-full'
                                    defaultValue={nightMode?.to}
                                    name='nightmode-to'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='active' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Active
                                </label>
                                <Select defaultValue={nightMode?.active.toString()} name='nightmode-active' required>
                                    <SelectTrigger id='active' className='w-full'>
                                        <SelectValue placeholder='Select' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='true'>✅ Active</SelectItem>
                                        <SelectItem value='false'>❌ Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <Button type="submit" className='bg-emerald-500 hover:bg-emerald-600 text-white' disabled={isPending}>
                        {isPending ? (
                            <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                        ) : (
                            <Save className='w-4 h-4 mr-2' />
                        )}
                        Save Night Mode
                    </Button>
                    {message && (
                        <FormMessage message={message} />
                    )}
                </CardContent>
            </Card>
        </form>
    )
}