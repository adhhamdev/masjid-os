import DashboardMain from "@/components/dashboard/DashboardMain";


function IslamicPattern() {
    return (
        <div className="absolute inset-0 opacity-25 pointer-events-none">
            <div className="w-full h-full bg-repeat" style={{
                backgroundImage: `url("/bg-pattern.svg")`
            }} ></div>
        </div>
    )
}

export default function Dashboard() {

    return (
        <div className="min-h-screen bg-emerald-100">
            <IslamicPattern />
            <DashboardMain />
        </div>
    )
}