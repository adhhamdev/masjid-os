import { getMosques } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, Plus, Search, Trash } from 'lucide-react'
import Link from 'next/link'

export default async function SuperAdminPage() {
    const { mosques } = await getMosques()

    return (
        <div className="min-h-screen bg-emerald-50 py-8">
            <main className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-emerald-800 mb-6">SUPERADMIN</h1>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl text-emerald-700">Masjids</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
                            <div className="relative w-full sm:w-64">
                                <Input
                                    type="text"
                                    placeholder="Search masjids..."
                                    className="pl-10 pr-4 py-2 w-full"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto">
                                <Plus className="mr-2 h-4 w-4" /> Add New Masjid
                            </Button>
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Admin</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mosques?.map((mosque) => (
                                        <TableRow key={mosque.id}>
                                            <TableCell className="font-medium">{mosque.name}</TableCell>
                                            <TableCell>{mosque.location}</TableCell>
                                            <TableCell>{mosque.admin_name}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs ${mosque.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                                                    }`}>
                                                    {mosque.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-800">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-8 text-center">
                    <Link href="/admin/protected/dashboard">
                        <Button variant="outline" className="text-emerald-600 border-emerald-600">
                            Back to Admin Dashboard
                        </Button>
                    </Link>
                </div>
            </main>
        </div>
    )
}
