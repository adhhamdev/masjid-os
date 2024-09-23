"use client";
import { LogoutButton } from '@/components/logout-button';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Bell, ChevronDown, Menu, Settings, User } from 'lucide-react';
import Image from 'next/image';

function ProfileDropdown({ isMobile = false }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`flex items-center space-x-2 text-emerald-50 hover:text-emerald-200 ${isMobile ? 'w-full justify-start' : ''}`}>
                    {isMobile ? (
                        <>
                            <User className="mr-2 h-5 w-5" />
                            <span>Profile</span>
                            <ChevronDown className="h-4 w-4" />
                        </>
                    ) : (
                        <>
                            <Image className='select-none rounded-lg' src="/user.png" alt="Profile" width={24} height={24} />
                            <ChevronDown className="h-4 w-4" />
                        </>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isMobile ? "center" : "end"} className="w-48 p-1">
                <DropdownMenuItem className="py-2 px-3 text-sm cursor-pointer hover:bg-emerald-100">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2 px-3 text-sm cursor-pointer hover:bg-emerald-100">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <hr className="my-1 h-1 bg-gray-300 rounded-full" />
                <LogoutButton />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default function DashboardHeader() {
    return (
        <header className="bg-emerald-800 text-emerald-50 p-4 relative z-10">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
                    <Image src="/mosque.png" alt="Mosque Logo" width={40} height={40} className="mr-2" />
                    <h1 className="text-xl font-bold">YASEER ARAFATH JUMMAH MASJID</h1>
                </div>
                <div className="flex items-center justify-between w-full md:w-auto">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="sm" className="md:hidden text-emerald-50 hover:text-emerald-200">
                                <Menu className="h-6 w-6 mr-2" />
                                <span>Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-emerald-700 text-emerald-50">
                            <SheetTitle className="text-emerald-50">Menu</SheetTitle>
                            <SheetDescription className="text-emerald-100 mb-4">
                                Access your account and settings
                            </SheetDescription>
                            <nav className="flex flex-col space-y-4 mt-8">
                                <ProfileDropdown isMobile={true} />
                                <Button variant="ghost" size="sm" className="justify-start text-emerald-50 hover:text-emerald-200">
                                    <Bell className="mr-2 h-5 w-5" />
                                    Notifications
                                </Button>
                                <Button variant="ghost" size="sm" className="justify-start text-emerald-50 hover:text-emerald-200">
                                    <Settings className="mr-2 h-5 w-5" />
                                    Prayer Settings
                                </Button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <nav className="hidden md:flex items-center space-x-4">
                        <Button variant="ghost" size="icon" className="text-emerald-50 hover:text-emerald-200">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <ProfileDropdown />
                        <Button variant="ghost" className="hidden md:flex items-center text-emerald-50 hover:text-emerald-200">
                            <Settings className="h-4 w-4" />
                            <span className='ml-2 hidden lg:block'>Prayer Settings</span>
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}