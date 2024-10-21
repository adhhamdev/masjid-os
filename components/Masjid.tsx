import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Calendar, Clock } from "lucide-react"
import Link from 'next/link'

export function Masjid({ mosque }: any) {
    return (
        <Card className="w-full hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
            <>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-primary">
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
                </CardContent>
            </>
            <CardFooter className='flex gap-2'>
                <Link href={`/clock/${mosque.clock_code}`} target="_blank">
                    <Button variant="outline" className="w-full">
                        <Clock className="w-4 h-4 mr-2" />
                        Open Clock
                    </Button>
                </Link>
                <Link href={`/superadmin/masjid/${mosque.id}`} className='flex-grow'>
                    <Button className="w-full" variant="outline">
                        <Building2 className="w-4 h-4 mr-2" />
                        Manage Masjid
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}