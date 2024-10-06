import Clock from "@/components/Clock";
import { createClient } from "@/utils/supabase/client";


const ClientTime = async ({ params }: { params: any }) => {
    const supabase = createClient();
    const { data: masjid } = await supabase.from("masjid").select("*").eq('clock_code', params.code).single();
    const { data: clockSettings } = await supabase.from("clock_settings").select("*").eq('id', masjid?.clock_settings).single();
    const { data: prayerSettings } = await supabase.from("prayer_settings").select("*").eq('id', masjid?.prayer_settings).single();
    const { data: iqamathTime } = await supabase.from("iqamath_time").select("*").eq('id', clockSettings?.iqamath_time).single();
    const { data: nightMode } = await supabase.from("night_mode").select("*").eq('id', clockSettings?.night_mode).single();

    return (
        <>
            <Clock
                masjid={masjid}
                clockSettings={clockSettings}
                prayerSettings={prayerSettings}
                iqamathTime={iqamathTime}
                nightMode={nightMode}
            />
        </>
    )
}

export default ClientTime