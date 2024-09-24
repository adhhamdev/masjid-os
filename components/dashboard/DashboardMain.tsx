import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { BarChart2, DollarSign, FileText, Globe, Grid, Users } from 'lucide-react'

interface StatCardProps {
    title: string
    value: string | number
    icon: React.ElementType
    tooltip?: string
}

function StatCard({ title, value, icon: Icon, tooltip }: StatCardProps) {
    return (
        <Card className="bg-emerald-50 border-emerald-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                {tooltip ? (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <CardTitle className="text-sm font-medium text-emerald-800" aria-label={tooltip}>
                                    <abbr title="">
                                        {title}
                                    </abbr>
                                </CardTitle>
                            </TooltipTrigger>
                            <TooltipContent>
                                <span>{tooltip}</span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : (
                    <CardTitle className="text-sm font-medium text-emerald-800">
                        {title}
                    </CardTitle>
                )}
                <Icon className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-emerald-900">{value}</div>
            </CardContent>
        </Card>
    )
}

export default function DashboardMain() {
    const data = {
        organization: 'YASEER ARAFATH JUMMAH MASJID',
        governmentSectors: 'Government Sectors',
        projects: 'Project',
        donations: 'Donations',
        members: 'Members',
        finance: ['Finance 1', 'Finance 2', 'Finance 3'],
        events: 'Events',
    }

    return (
        <main className="p-8 relative z-10">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-emerald-900">Overview Panel</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <StatCard title="Non-profit Organization" value={data.organization} icon={Grid} />
                    <StatCard title="Government Sectors" value={data.governmentSectors} icon={Globe} />
                    <StatCard title="Project" value={data.projects} icon={BarChart2} />
                    <StatCard title="Donations" value={`$${data.donations}`} icon={DollarSign} />
                    <StatCard title="Members" value={data.members} icon={Users} tooltip="Mahallah" />
                    <StatCard title="Events" value={data.events} icon={FileText} />
                    <Card className="md:col-span-2 bg-emerald-50 border-emerald-200">
                        <CardHeader>
                            <CardTitle className="text-emerald-800">Finance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-emerald-700">
                                {data.finance.map((activity, index) => (
                                    <li key={index}>{activity}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}