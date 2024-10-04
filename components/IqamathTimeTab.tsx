'use client'

import { updateClockIqamathTime } from '@/app/actions'
import { FormMessage } from '@/components/form-message'
import IqamathTime from '@/components/IqamathTime'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Save } from 'lucide-react'
import { useState, useTransition } from 'react'

export default function IqamathTimeTab({ iqamathTime, clockSettings }: { iqamathTime: any, clockSettings: any }) {
    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<any>(null)

    const handleSubmit = async (formData: FormData) => {
        setMessage(null)
        startTransition(async () => {
            const response = await updateClockIqamathTime(formData, clockSettings)
            setMessage(response)
        })
    }

    return (

        <form action={handleSubmit}>
            <Card>
                <CardContent className='space-y-4 pt-4'>
                    <IqamathTime iqamathTime={iqamathTime} />
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
                            Save Iqamath Times
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