import { Button } from "@/components/ui/button"
import { Calendar, Home, MessageCircle, Users } from "lucide-react"
import Link from "next/link"

export default function HomeContent() {
    const whatsappNumber = "+94743193834"
    const whatsappMessage = encodeURIComponent("Hello! I'm interested in the Islamic Center Management System.")
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

    return (
        <main className="container mx-auto px-4 py-8 sm:py-16">
            <section className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-4">Welcome to Islamic Center Management System</h2>
                <p className="text-lg sm:text-xl text-emerald-700 mb-6 sm:mb-8">Streamline Your Masjid Management with Our Comprehensive System</p>
                <div className="flex justify-center">
                    <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-green-500 text-white hover:bg-green-600 flex items-center justify-center">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            WhatsApp Us
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
                <FeatureCard
                    icon={<Home className="mx-auto mb-4 text-emerald-500" size={48} />}
                    title="Prayer Times"
                    description="Easily manage and display accurate prayer times for your community."
                />
                <FeatureCard
                    icon={<Users className="mx-auto mb-4 text-emerald-500" size={48} />}
                    title="Community Management"
                    description="Efficiently organize and engage with your Islamic Center's community members."
                />
                <FeatureCard
                    icon={<Calendar className="mx-auto mb-4 text-emerald-500" size={48} />}
                    title="Event Scheduling"
                    description="Plan and promote Islamic Center events with our intuitive calendar system."
                    className="sm:col-span-2 lg:col-span-1"
                />
            </section>
        </main>
    )
}

interface FeatureCardProps {
    icon: JSX.Element
    title: string
    description: string
    className?: string
}

function FeatureCard({ icon, title, description, className = "" }: FeatureCardProps) {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-md text-center ${className}`}>
            {icon}
            <h3 className="text-xl font-semibold mb-2 text-emerald-800">{title}</h3>
            <p className="text-emerald-600">{description}</p>
        </div>
    )
}