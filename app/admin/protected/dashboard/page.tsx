import DashboardContent from '@/components/dashboard/DashboardContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Dashboard | YASEER ARAFATH JUMMAH MASJID',
    description: 'Mosque management dashboard',
}

export default function Dashboard() {
    return <DashboardContent />;
}