import { getContactDetails, getMasjidDetails, getPrayerSettings } from "@/app/actions"
import ContactTab from "@/components/ContactTab"
import PrayerSettingsTab from "@/components/PrayerSettingsTab"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, Save, XIcon } from "lucide-react"

export default async function Info() {

    const { masjid } = await getMasjidDetails();
    const { contact } = await getContactDetails(masjid?.contact);
    const { prayerSettings } = await getPrayerSettings(masjid?.prayer_settings);

    return (
        <div className="min-h-screen py-8">
            <main className="container mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Masjid Information</h2>
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                    </Button>
                </div>
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
                                    <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="title01">HISTORY 01</label>
                                    <Input
                                        id="title01"
                                        className="focus-visible:ring-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="desc1">Description</label>
                                    <Textarea
                                        id="desc1"
                                        rows={4}
                                        className="focus-visible:ring-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="title02">HISTORY 02</label>
                                    <Input
                                        id="title02"
                                        className="focus-visible:ring-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="desc02">Description</label>
                                    <Textarea
                                        id="desc02"
                                        rows={4}
                                        className="focus-visible:ring-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="title03">HISTORY 03</label>
                                    <Input
                                        id="title03"
                                        className="focus-visible:ring-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="desc03">Description</label>
                                    <Textarea
                                        id="desc03"
                                        rows={4}
                                        className="focus-visible:ring-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="title04">HISTORY 04</label>
                                    <Input
                                        id="title04"
                                        className="focus-visible:ring-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="desc04">Description</label>
                                    <Textarea
                                        id="desc04"
                                        rows={4}
                                        className="focus-visible:ring-gray-500"
                                    />
                                </div>

                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="contact">
                        <ContactTab contact={contact} />
                    </TabsContent>
                    <TabsContent value="prayer">
                        <PrayerSettingsTab prayerSettings={prayerSettings} />
                    </TabsContent>
                </Tabs>
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Masjid Photos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="relative aspect-square shadow-inner border border-gray-300 rounded-lg overflow-hidden">
                                <Button variant="destructive" className="absolute top-2 right-2 w-8 h-8 p-0 bg-red-500 hover:bg-red-600">
                                    <XIcon className="w-4 h-4" />
                                </Button>
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <PlusIcon className="w-10 h-10" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}