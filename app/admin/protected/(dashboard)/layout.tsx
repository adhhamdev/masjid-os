import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <DashboardHeader />
            <DashboardNavigation />
            {children}
        </>
    );
}
