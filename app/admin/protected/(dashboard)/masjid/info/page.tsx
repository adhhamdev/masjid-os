import { getMasjidDetails } from "@/app/actions"
import ContactTab from "@/components/ContactTab"
import { MasjidImages } from "@/components/MasjidImages"
import PrayerSettingsTab from "@/components/PrayerSettingsTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WebTab from "@/components/WebTab"

export default async function Info() {
    const { masjid } = await getMasjidDetails();

    return (
        <div className="min-h-screen py-8">
            <main className="container mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Masjid Information</h2>
                </div>
                <Tabs defaultValue="web" className="w-full">
                    <TabsList className="bg-emerald-500">
                        <TabsTrigger value="web" className="text-white">Web</TabsTrigger>
                        <TabsTrigger value="contact" className="text-white">Contact Info</TabsTrigger>
                        <TabsTrigger value="prayer" className="text-white">Prayer Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="web">
                        <WebTab webInfo={masjid?.web_info} />
                    </TabsContent>
                    <TabsContent value="contact">
                        <ContactTab contact={masjid?.contact} contactId={masjid?.contact} />
                    </TabsContent>
                    <TabsContent value="prayer">
                        <PrayerSettingsTab prayerSettings={masjid?.prayer_settings} />
                    </TabsContent>
                </Tabs>
                <MasjidImages
                    initialImages={masjid?.photos || []}
                    masjidId={masjid?.id}
                />
            </main>
        </div>
    )
}