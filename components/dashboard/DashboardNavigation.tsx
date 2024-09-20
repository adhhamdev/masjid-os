import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Info, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function DashboardNavigation() {
    return (
        <nav className="bg-emerald-700 shadow-sm p-3 relative z-10">
            <ul className="flex space-x-2 overflow-x-auto">
                <li>
                    <Link href="/admin/protected/dashboard" passHref>
                        <Button variant="ghost" size="sm" className="text-emerald-50 hover:text-emerald-200">Dashboard</Button>
                    </Link>
                </li>
                <li>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-emerald-50 hover:text-emerald-200">
                                Administrations
                                <ChevronDown className="ml-1 h-3 w-3" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48 p-1">
                            <DropdownMenuItem className="py-2 px-3 text-sm cursor-pointer hover:bg-emerald-100">
                                <Info className="mr-2 h-3 w-3" />
                                Masjid Info
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </li>
                <li>
                    <Button variant="outline" size="sm" className="flex items-center bg-emerald-600 text-emerald-50 hover:bg-emerald-500">
                        <RefreshCw className="mr-1 h-3 w-3" />
                        Refresh
                    </Button>
                </li>
            </ul>
        </nav>
    )
}