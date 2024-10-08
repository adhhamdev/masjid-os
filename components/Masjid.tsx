import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Clock, Moon } from "lucide-react"
import Link from 'next/link'

export function Masjid({ mosque }: any) {
    return (
        <Card className="w-full hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center text-xl font-semibold text-primary truncate">
                        <Moon className="w-5 h-5 mr-2" />
                        {mosque.name} • <span className="text-gray-400 px-1">{mosque.clock_code}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                        {new Date(mosque.created_at).toLocaleDateString()}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <Link href={`/clock/${mosque.clock_code}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="w-full">
                            <Clock className="w-4 h-4 mr-2" />
                            Open Clock
                        </Button>
                    </Link>
                </div>
            </CardContent>
            <CardFooter>
                <Link href={`/superadmin/masjid/${mosque.id}`} className="w-full">
                    <Button className="w-full" variant="outline">
                        <Building2 className="w-4 h-4 mr-2" />
                        Manage Masjid
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}