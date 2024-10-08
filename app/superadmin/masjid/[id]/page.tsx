import { createAdminClient } from "@/utils/supabase/server";

export default async function Page() {
    const supabase = createAdminClient();;

    const { data, error } = await supabase.auth.admin.listUsers();

    console.log(data);

    return <div>Masjid</div>
}
