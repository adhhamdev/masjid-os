"use client"

import { updatePrayerSettings } from '@/app/actions'
import { FormMessage } from '@/components/form-message'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Save } from 'lucide-react'
import { useState, useTransition } from 'react'

export default function PrayerSettingsTab({ prayerSettings }: { prayerSettings: any }) {

    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<any>(null)

    const handleSubmit = async (formData: FormData) => {
        setMessage(null)
        startTransition(async () => {
            const response = await updatePrayerSettings(formData, prayerSettings.id);
            setMessage(response)
        })
    }

    return (
        <form action={handleSubmit}>
            <Card>
                <CardContent className="space-y-4 pt-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Prayer Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="location">LOCATION</label>
                            <Select defaultValue={prayerSettings?.location} name="location">
                                <SelectTrigger className="border-gray-300 focus:border-gray-500">
                                    <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="colombo">Colombo</SelectItem>
                                    <SelectItem value="galle">Galle</SelectItem>
                                    <SelectItem value="kandy">Kandy</SelectItem>
                                    <SelectItem value="jaffna">Jaffna</SelectItem>
                                    <SelectItem value="batticaloa">Batticaloa</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="juristic">JURISTIC</label>
                            <Select defaultValue={prayerSettings?.juristic} name="juristic">
                                <SelectTrigger className="border-gray-300 focus:border-gray-500">
                                    <SelectValue placeholder="Select juristic" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="shafi-hanbli-maliki">Shafi, Hanbli, Maliki</SelectItem>
                                    <SelectItem value="hanafi">Hanafi</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
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
                            Save Prayer Settings
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