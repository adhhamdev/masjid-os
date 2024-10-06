import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Info, RefreshCw } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'

export default function DashboardNavigation() {

    const handleRefresh = async () => {
        "use server"
        revalidatePath('/clock/[code]', 'page')
    }

    return (
        <nav className="bg-emerald-700 shadow-sm p-3 relative z-10">
            <ul className="flex space-x-2 overflow-x-auto">
                <li>
                    <Link href="/admin/protected/dashboard">
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
                            <DropdownMenuItem asChild className="py-2 px-3 text-sm cursor-pointer hover:bg-emerald-100">
                                <Link href="/admin/protected/masjid/info">
                                    <Info className="mr-2 h-4 w-4" />
                                    Masjid Info
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </li>
                <li>
                    <form action={handleRefresh}>
                        <Button type="submit" variant="outline" size="sm" className="flex items-center bg-emerald-600 text-emerald-50 hover:bg-emerald-500">
                            <RefreshCw className="mr-1 h-3 w-3" />
                            Refresh
                        </Button>
                    </form>
                </li>
            </ul>
        </nav>
    )
}

