import { getContactDetails, getMasjidDetails } from "@/app/actions";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";
import { IdleTimerWrapper } from "@/components/IdleTimerWrapper";
import { Toaster } from "@/components/ui/toaster";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const { masjid } = await getMasjidDetails();
    const { contact } = await getContactDetails(masjid?.contact);

    return (
        <>
            <IdleTimerWrapper>
                <DashboardHeader masjidName={contact?.masjid_name} />
                <DashboardNavigation />
                {children}
                <Toaster />
            </IdleTimerWrapper>
        </>
    );
}
