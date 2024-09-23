import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";

function IslamicPattern() {
    return (
        <div className="absolute inset-0 opacity-25 pointer-events-none">
            <div className="w-full h-full bg-repeat" style={{
                backgroundImage: `url("/bg-pattern.svg")`
            }} ></div>
        </div>
    )
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (

        <>
            <IslamicPattern />
            <DashboardHeader />
            <DashboardNavigation />
            {children}
        </>
    );
}
