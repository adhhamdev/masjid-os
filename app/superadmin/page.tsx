import { AddMasjidModal } from '@/components/AddMasjidModal';
import GlobalSettingsModal from '@/components/GlobalSettingsModal';
import { Masjid } from "@/components/Masjid";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Search, Settings } from "lucide-react";
import { getGlobalSettings, getMosquesAdmin } from "../actions";

export default async function SuperAdminPage() {
    const { mosques, error } = await getMosquesAdmin();
    const { globalSettings, error: globalSettingsError } = await getGlobalSettings();

    if (error) {
        console.error('Error fetching mosques:', error);
    }

    if (globalSettingsError) {
        console.error('Error fetching global settings:', globalSettingsError);
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold">Super Admin Dashboard</h1>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <AddMasjidModal />
                    <GlobalSettingsModal globalSettings={globalSettings}>
                        <Button variant="outline" className="w-full sm:w-auto">
                            <Settings className="w-4 h-4 mr-2" />
                            Global Settings
                        </Button>
                    </GlobalSettingsModal>
                </div>
            </div>

            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                    className="pl-10 w-full bg-background text-foreground border-input"
                    placeholder="Search mosques..."
                    type="search"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {mosques?.map((mosque) => (
                    <Masjid key={mosque.id} mosque={mosque} />
                ))}
            </div>
        </div>
    );
}
