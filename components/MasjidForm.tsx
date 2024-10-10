'use client'

import { updateContactDetailsAdmin, updatePrayerSettingsAdmin } from '@/app/actions'
import { useToast } from '@/components/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function MasjidForm({ masjid }: { masjid: any }) {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            masjidName: masjid.contact.masjid_name,
            email: masjid.contact.email,
            address: masjid.contact.address,
            countryCode: masjid.contact.country_code,
            telNo: masjid.contact.tel_no,
            faxNo: masjid.contact.fax_no,
            socialLinks: masjid.contact.social_links,
            location: masjid.prayer_settings.location,
            juristic: masjid.prayer_settings.juristic,
        }
    })

    const onSubmit = async (data: any) => {
        setIsLoading(true)
        try {
            await updateContactDetailsAdmin(data, masjid.contact.id)
            await updatePrayerSettingsAdmin(data, masjid.prayer_settings.id)
            toast({
                title: 'Success',
                description: 'Masjid information updated successfully',
            })
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update masjid information',
                variant: 'destructive',
            })
        }
        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="masjidName" className="text-sm font-medium">Masjid Name</label>
                    <Input id="masjidName" {...register('masjidName', { required: 'Masjid name is required' })} />
                    {errors.masjidName && <p className="text-red-500 text-sm">{errors.masjidName.message?.toString()}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" {...register('email', { required: 'Email is required' })} />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message?.toString()}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="address" className="text-sm font-medium">Address</label>
                    <Textarea id="address" {...register('address', { required: 'Address is required' })} />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message?.toString()}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="countryCode" className="text-sm font-medium">Country Code</label>
                    <Input id="countryCode" {...register('countryCode')} />
                </div>
                <div className="space-y-2">
                    <label htmlFor="telNo" className="text-sm font-medium">Telephone Number</label>
                    <Input id="telNo" {...register('telNo')} />
                </div>
                <div className="space-y-2">
                    <label htmlFor="faxNo" className="text-sm font-medium">Fax Number</label>
                    <Input id="faxNo" {...register('faxNo')} />
                </div>
                <div className="space-y-2">
                    <label htmlFor="socialLinks" className="text-sm font-medium">Social Links</label>
                    <Input id="socialLinks" {...register('socialLinks')} />
                </div>
                <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium">Location</label>
                    <Input id="location" {...register('location', { required: 'Location is required' })} />
                    {errors.location && <p className="text-red-500 text-sm">{errors.location.message?.toString()}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="juristic" className="text-sm font-medium">Juristic Method</label>
                    <Select {...register('juristic', { required: 'Juristic method is required' })}>
                        <option value="Shafi">Shafi</option>
                        <option value="Hanafi">Hanafi</option>
                    </Select>
                    {errors.juristic && <p className="text-red-500 text-sm">{errors.juristic.message?.toString()}</p>}
                </div>
            </div>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Masjid Information'}
            </Button>
        </form>
    )
}