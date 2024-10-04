"use client"
import { updateContactDetails } from '@/app/actions'
import { FormMessage } from '@/components/form-message'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save } from 'lucide-react'
import { useState, useTransition } from 'react'

export default function ContactTab({ contact }: { contact: any }) {

    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<any>(null)

    const handleSubmit = async (formData: FormData) => {
        setMessage(null)
        startTransition(async () => {
            const response = await updateContactDetails(formData);
            setMessage(response)
        })
    }

    return (
        <form action={handleSubmit}>
            <Card>
                <CardContent className="pt-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">CONTACT DETAILS</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="masjidName">MASJID NAME</label>
                            <Input
                                id="masjidName"
                                className="focus-visible:ring-gray-500"
                                defaultValue={contact?.masjid_name ?? ""}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="address">ADDRESS</label>
                            <Textarea
                                id="address"
                                rows={2}
                                className="focus-visible:ring-gray-500"
                                defaultValue={contact?.address ?? ""}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="code">CODE</label>
                                <Select defaultValue={contact?.country_code ?? ""}>
                                    <SelectTrigger className="border-gray-300 focus:border-gray-500">
                                        <SelectValue placeholder="Select code" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sri-lanka">Sri Lanka (+94)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="telephone">TELEPHONE NO</label>
                                <Input id="telephone" className="border-gray-300 focus:border-gray-500" defaultValue={contact?.tel_no ?? ""} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="fax">FAX NO</label>
                                <Input id="fax" className="border-gray-300 focus:border-gray-500" defaultValue={contact?.fax_no ?? ""} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="email">EMAIL</label>
                                <Input id="email" type="email" className="border-gray-300 focus:border-gray-500" defaultValue={contact?.email ?? ""} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">SOCIAL MEDIA LINKS</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Input placeholder="www.abc.com/xyz masjid" className="border-gray-300 focus:border-gray-500" defaultValue={contact?.social_links[0]} />
                                <Input placeholder="www.abc.com/xyz masjid" className="border-gray-300 focus:border-gray-500" defaultValue={contact?.social_links[1]} />
                                <Input placeholder="www.abc.com/xyz masjid" className="border-gray-300 focus:border-gray-500" defaultValue={contact?.social_links[2]} />
                            </div>
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