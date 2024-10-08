import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Crown } from 'lucide-react'

interface StatCardProps {
    title: string
    value: string | number
    icon: React.ElementType
    tooltip?: string
    isPro?: boolean
}

export default function StatCard({ title, value, icon: Icon, tooltip, isPro = true }: StatCardProps) {
    return (
        <Card className="bg-emerald-50 border-emerald-200 relative">
            {isPro && (
                <div className="absolute -top-3 left-4 flex items-center space-x-1 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                    <Crown className="h-3 w-3" />
                    <span>PRO</span>
                </div>
            )}
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