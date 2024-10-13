"use client";
import { signOutAction } from '@/app/actions';
import { LogoutButton } from '@/components/logout-button';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ChevronDown, Clock, Menu, Settings, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function ProfileDropdown({ isMobile = false }: { isMobile?: boolean }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="lg" className={`flex items-center space-x-2 text-emerald-50 hover:text-emerald-200 ${isMobile ? 'w-full justify-start' : ''}`}>
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
            <DropdownMenuContent align={isMobile ? "center" : "end"} className="w-48 p-1 max-h-60">
                <DropdownMenuItem className="py-2 px-3 text-sm cursor-pointer hover:bg-emerald-100">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/admin/protected/masjid/clock-settings" className="py-2 px-3 text-sm cursor-pointer hover:bg-emerald-100">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>
                <hr className="my-2 h-[2px] w-5/6 mx-auto bg-gray-400 rounded-full" />
                <LogoutButton logoutAction={signOutAction} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default function DashboardHeader({ masjidName }: { masjidName: string }) {
    return (
        <header className="bg-emerald-800 text-emerald-50 py-4 relative z-10">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <div className="flex items-center justify-between w-full md:w-auto">
                    <div className="flex items-center space-x-3">
                        <Image src="/mosque.png" alt="Mosque Logo" width={40} height={40} className="mr-2" />
                        <div className="flex flex-col">
                            <h1 className="text-sm font-bold md:text-lg">A & A CO.</h1>
                            <p className="text-xs md:text-sm text-emerald-200 font-medium">{masjidName}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-emerald-50 hover:text-emerald-200">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-emerald-700 text-emerald-50">
                                <SheetTitle className="text-emerald-50">Menu</SheetTitle>
                                <SheetDescription className="text-emerald-100 mb-4">
                                    Access your account and settings
                                </SheetDescription>
                                <nav className="flex flex-col space-y-4 mt-8">
                                    <ProfileDropdown isMobile={true} />
                                    <Link href="/admin/protected/masjid/clock-settings">
                                        <Button variant="ghost" size="lg" className="justify-start text-emerald-50 hover:text-emerald-200">
                                            <Clock className="mr-2 h-5 w-5" />
                                            Clock Settings
                                        </Button>
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
                <nav className="hidden md:flex items-center space-x-4">
                    <ProfileDropdown />
                    <Link href="/admin/protected/masjid/clock-settings">
                        <Button variant="ghost" className="hidden md:flex items-center text-emerald-50 hover:text-emerald-200">
                            <Clock className="h-4 w-4" />
                            <span className='ml-2 hidden lg:block'>Clock Settings</span>
                        </Button>
                    </Link>
                </nav>
            </div>
        </header >
    )
}