import { signOutAction } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Bell, ChevronDown, LogOut, Menu, Settings, User } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function DashboardHeader() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    return (
        <header className="bg-emerald-800 text-emerald-50 p-4 relative z-10">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
                    <Image src="/dome.png" alt="Mosque Logo" width={40} height={40} className="mr-2" />
                    <h1 className="text-xl font-bold">YASEER ARAFATH JUMMAH MASJID</h1>
                </div>
                <div className="flex items-center justify-between w-full md:w-auto">
                    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="md:hidden text-emerald-50 hover:text-emerald-200 w-full">
                                <Menu className="h-6 w-6 mr-2" />
                                <span>Menu</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-screen bg-emerald-700 border-emerald-600 mt-2">
                            <nav className="flex flex-col space-y-4">
                                <Button variant="ghost" size="sm" className="justify-start text-emerald-50 hover:text-emerald-200">
                                    <Bell className="mr-2 h-5 w-5" />
                                    Notifications
                                </Button>
                                <Button variant="ghost" size="sm" className="justify-start text-emerald-50 hover:text-emerald-200">
                                    <User className="mr-2 h-5 w-5" />
                                    Profile
                                </Button>
                                <Button variant="ghost" size="sm" className="justify-start text-emerald-50 hover:text-emerald-200">
                                    <Settings className="mr-2 h-5 w-5" />
                                    Settings
                                </Button>
                                <Button variant="ghost" size="sm" className="justify-start text-emerald-50 hover:text-emerald-200">
                                    <Settings className="mr-2 h-5 w-5" />
                                    Prayer Settings
                                </Button>
                                <form action={signOutAction}>
                                    <Button variant="ghost" size="sm" className="w-full justify-start text-emerald-50 hover:text-emerald-200">
                                        <LogOut className="mr-2 h-5 w-5" />
                                        Logout
                                    </Button>
                                </form>
                            </nav>
                        </PopoverContent>
                    </Popover>
                    <nav className="hidden md:flex items-center space-x-4">
                        <Button variant="ghost" size="icon" className="text-emerald-50 hover:text-emerald-200">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center space-x-2 text-emerald-50 hover:text-emerald-200">
                                    <Image src="/placeholder.svg" alt="Profile" width={32} height={32} className="rounded-full" />
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <form action={signOutAction}>
                                        <button className="w-full flex items-center">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Logout</span>
                                        </button>
                                    </form>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="ghost" className="hidden lg:flex items-center text-emerald-50 hover:text-emerald-200">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Prayer Settings</span>
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}