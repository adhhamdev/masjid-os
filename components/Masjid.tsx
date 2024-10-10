import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Calendar, Clock, Moon } from "lucide-react"
import Link from 'next/link'

export function Masjid({ mosque }: any) {
    return (
        <Card className="w-full hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold text-primary">
                    <Moon className="w-5 h-5 mr-2" />
                    {mosque.contact.masjid_name}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(mosque.created_at).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-400 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Clock: {mosque.clock_code}
                </div>
                <Link href={`/clock/${mosque.clock_code}`}>
                    <Button variant="outline" className="w-full mt-4">
                        <Clock className="w-4 h-4 mr-2" />
                        Open Clock
                    </Button>
                </Link>
                <Link href={`/superadmin/masjid/${mosque.id}`}>
                    <Button className="w-full mt-2" variant="outline">
                        <Building2 className="w-4 h-4 mr-2" />
                        Manage Masjid
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}