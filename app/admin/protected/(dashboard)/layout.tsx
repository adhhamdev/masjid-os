import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";
import { IdleTimerWrapper } from "@/components/IdleTimerWrapper";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <IdleTimerWrapper>
                <DashboardHeader />
                <DashboardNavigation />
                {children}
            </IdleTimerWrapper>
        </>
    );
}
