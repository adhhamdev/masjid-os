import Clock from "@/components/Clock";
import { createClient } from "@/utils/supabase/server";


const ClientTime = async ({ params }: { params: any }) => {
    const supabase = createClient();
    const { data: masjid } = await supabase.from("masjid").select("*").eq('clock_code', params.code).single();
    const { data: contact } = await supabase.from("contact").select("*").eq('id', masjid?.contact).single();
    const [clockSettings, prayerSettings] = await Promise.all([
        await supabase.from("clock_settings").select("*").eq('id', masjid?.clock_settings).single(),
        await supabase.from("prayer_settings").select("*").eq('id', masjid?.prayer_settings).single()
    ]);
    const [iqamathTime, nightMode] = await Promise.all([
        await supabase.from("iqamath_time").select("*").eq('id', clockSettings?.data?.iqamath_time).single(),
        await supabase.from("night_mode").select("*").eq('id', clockSettings?.data?.night_mode).single()
    ]);
    return (
        <>
            <Clock
                masjid={masjid}
                clockSettings={clockSettings.data}
                masjidName={contact?.masjid_name}
                prayerSettings={prayerSettings.data}
                iqamathTime={iqamathTime.data}
                nightMode={nightMode.data}
            />
        </>
    )
}

export default ClientTime