import Clock from "@/components/Clock";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

const ClientTime = async ({ params }: { params: any }) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("masjid")
        .select(`
            *,
            contact (*),
            clock_settings (
                *,
                iqamath_time (*),
                night_mode (*)
            ),
            prayer_settings (*)
        `)
        .eq('clock_code', params.code)
        .single();

    if (error) {
        notFound();
    }

    const { data: globalSettings } = await supabase
        .from("global_settings")
        .select("*")
        .single();

    return (
        <>
            <Clock
                masjid={data}
                clockSettings={data.clock_settings}
                masjidName={data.contact.masjid_name}
                prayerSettings={data.prayer_settings}
                iqamathTime={data.clock_settings.iqamath_time}
                nightMode={data.clock_settings.night_mode}
                globalSettings={globalSettings}
            />
        </>
    )
}

export default ClientTime;
