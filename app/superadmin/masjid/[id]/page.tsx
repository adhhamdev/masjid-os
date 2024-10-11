import { getMasjidDetailsAdmin } from '@/app/actions'
import MasjidForm from '@/components/MasjidForm'

export default async function Page({ params }: { params: { id: string } }) {
    const { masjid, error: masjidError } = await getMasjidDetailsAdmin(params.id)

    if (masjidError) {
        return <div className="text-red-500">Error: {masjidError}</div>
    }

    if (!masjid) {
        return <div className="text-red-500">Masjid not found</div>
    }

    if (masjidError) {
        return <div className="text-red-500">Error fetching masjid details</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{masjid.contact.masjid_name}</h1>
            <MasjidForm masjid={masjid} />
        </div>
    )
}
