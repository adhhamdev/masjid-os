import Clock from "@/components/Clock";
import { createClient } from "@/utils/supabase/client";

const ClientTime = async ({ params }: { params: any }) => {
    const supabase = createClient();
    const user = await supabase.from("masjid").select("*")
    console.log(user)
    console.log(params)

    const masjidName = ""

    return (
        <>
            <Clock masjidName={masjidName} />
        </>
    )
}

export default ClientTime