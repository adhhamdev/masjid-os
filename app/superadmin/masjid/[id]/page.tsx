import { getSuperAdminMasjidData } from '@/app/actions'
import MasjidForm from '@/components/MasjidForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function Page({ params }: { params: { id: string } }) {
    const { masjid, error: masjidError } = await getSuperAdminMasjidData(params.id)

    if (masjidError) {
        return <div className="text-red-500">Error: {masjidError}</div>
    }

    if (!masjid) {
        return <div className="text-red-500">Masjid not found</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Link href="/superadmin">
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Superadmin
                    </Button>
                </Link>
            </div>
            <h1 className="text-3xl font-bold mb-6">{masjid.contact.masjid_name}</h1>
            <MasjidForm masjid={masjid} />
        </div>
    )
}
