import { Masjid } from "@/components/Masjid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createAdminClient } from "@/utils/supabase/server";
import { Plus, Search } from "lucide-react";
import { getMosques } from "../actions";

export default async function SuperAdminPage() {
    const { mosques } = await getMosques();

    const supabase = createAdminClient()

    return (
        <div className="container mx-auto p-4 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-primary">Super Administration</h1>
                <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Masjid
                </Button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                    className="pl-10 w-full bg-background text-foreground border-input"
                    placeholder="Search mosques..."
                    type="search"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mosques?.map((mosque) => (
                    <Masjid key={mosque.id} mosque={mosque} />
                ))}
            </div>
        </div>
    );
}
