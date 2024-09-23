import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function Info() {
    return (
        <div className="min-h-screen bg-lemon-50 p-4">
            <main className="container mx-auto mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-lemon-800">Masjid Information</h2>
                <Tabs defaultValue="web" className="w-full">
                    <TabsList className="bg-emerald-500">
                        <TabsTrigger value="web" className="text-white">Web</TabsTrigger>
                        <TabsTrigger value="contact" className="text-white">Contact Info</TabsTrigger>
                        <TabsTrigger value="prayer" className="text-white">Prayer Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="web">
                        <Card>
                            <CardContent className="space-y-4 pt-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-lemon-700" htmlFor="history1">HISTORY 01</label>
                                    <Input id="history1" placeholder="History of Masjid: EST.1992" className="border-lemon-300 focus:border-lemon-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-lemon-700" htmlFor="example">Example</label>
                                    <Textarea id="example" placeholder="Enter example text here" rows={4} className="border-lemon-300 focus:border-lemon-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-lemon-700" htmlFor="title02">HISTORY 02</label>
                                    <Input id="history2" placeholder="About Mahallah Peoples' status of education and economy" className="border-lemon-300 focus:border-lemon-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-lemon-700" htmlFor="description">Description</label>
                                    <Textarea id="description" placeholder="Enter description here" rows={4} className="border-lemon-300 focus:border-lemon-500" />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="contact">
                        <Card>
                            <CardContent className="pt-4">
                                <h3 className="text-lg font-semibold mb-4 text-lemon-800">CONTACT DETAILS</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-lemon-700" htmlFor="masjidName">MASJID NAME</label>
                                        <Input id="masjidName" placeholder="YASEER ARAFATH JUMMAH MASJID" className="border-lemon-300 focus:border-lemon-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-lemon-700" htmlFor="address">ADDRESS</label>
                                        <Textarea id="address" placeholder="191/02, Yaseer Arafath Road, Maradhana, Beruwela" rows={2} className="border-lemon-300 focus:border-lemon-500" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-lemon-700" htmlFor="code">CODE</label>
                                            <Select>
                                                <SelectTrigger className="border-lemon-300 focus:border-lemon-500">
                                                    <SelectValue placeholder="Select code" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="sri-lanka">Sri Lanka (+94)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-lemon-700" htmlFor="telephone">TELEPHONE NO</label>
                                            <Input id="telephone" placeholder="779925059" className="border-lemon-300 focus:border-lemon-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-lemon-700" htmlFor="fax">FAX NO</label>
                                            <Input id="fax" placeholder="777281718" className="border-lemon-300 focus:border-lemon-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-lemon-700" htmlFor="email">EMAIL</label>
                                            <Input id="email" type="email" placeholder="yaseerarafathjummahmasjidh@gmail.com" className="border-lemon-300 focus:border-lemon-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-lemon-700">SOCIAL MEDIA LINKS</label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <Input placeholder="www.abc.com/xyz masjid" className="border-lemon-300 focus:border-lemon-500" />
                                            <Input placeholder="www.abc.com/xyz masjid" className="border-lemon-300 focus:border-lemon-500" />
                                            <Input placeholder="www.abc.com/xyz masjid" className="border-lemon-300 focus:border-lemon-500" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="prayer">
                        <Card>
                            <CardContent className="pt-4">
                                <h3 className="text-lg font-semibold mb-4 text-lemon-800">Prayer Settings</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-lemon-700" htmlFor="location">LOCATION</label>
                                        <Select>
                                            <SelectTrigger className="border-lemon-300 focus:border-lemon-500">
                                                <SelectValue placeholder="Select location" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="colombo">Colombo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-lemon-700" htmlFor="juristic">JURISTIC</label>
                                        <Select>
                                            <SelectTrigger className="border-lemon-300 focus:border-lemon-500">
                                                <SelectValue placeholder="Select juristic" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="shafi-hanbli-maliki">Shafi, Hanbli, Maliki</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-lemon-800">Masjid Photos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="relative aspect-square bg-lemon-100 rounded-lg overflow-hidden">
                                <Button variant="destructive" className="absolute top-2 right-2 w-8 h-8 p-0 bg-red-500 hover:bg-red-600">X</Button>
                                <div className="absolute inset-0 flex items-center justify-center text-lemon-400">
                                    <span className="text-4xl">+</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-8 text-right">
                    <Button className="bg-lemon-500 hover:bg-lemon-600 text-white">Save</Button>
                </div>
            </main>
        </div>
    )
}