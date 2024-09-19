import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import { useState } from 'react'

export default function DashboardNavigation() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    return (
        <nav className="bg-emerald-700 shadow-sm p-4 relative z-10">
            <ul className="flex space-x-4 overflow-x-auto">
                <li><Button variant="ghost" onClick={toggleSidebar} className="text-emerald-50 hover:text-emerald-200">Dashboard</Button></li>
                <li><Button variant="ghost" className="text-emerald-50 hover:text-emerald-200">Administrations</Button></li>
                <li><Button variant="ghost" className="text-emerald-50 hover:text-emerald-200">People & Places</Button></li>
                <li><Button variant="ghost" className="text-emerald-50 hover:text-emerald-200">Public Related</Button></li>
                <li><Button variant="ghost" className="text-emerald-50 hover:text-emerald-200">Finance & Accounts</Button></li>
                <li><Button variant="ghost" className="text-emerald-50 hover:text-emerald-200">Reports</Button></li>
                <li>
                    <Button variant="outline" className="flex items-center bg-emerald-600 text-emerald-50 hover:bg-emerald-500">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
                    </Button>
                </li>
            </ul>
        </nav>
    )
}