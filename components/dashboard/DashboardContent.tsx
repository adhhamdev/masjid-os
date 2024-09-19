'use client'

import DashboardHeader from './DashboardHeader'
import DashboardMain from './DashboardMain'
import DashboardNavigation from './DashboardNavigation'

function IslamicPattern() {
    return (
        <div className="absolute inset-0 opacity-25 pointer-events-none">
            <div className="w-full h-full bg-repeat" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23065f46' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} ></div>
        </div>
    )
}

export default function DashboardContent() {

    return (
        <div className="min-h-screen bg-emerald-100 relative">
            <IslamicPattern />
            <DashboardHeader />
            <DashboardNavigation />
            <DashboardMain />
        </div>
    )
}